import mysql from 'mysql2/promise';
import axios from "axios";

async function addHistoryText(message: string, role: string, sessionId: string, userName: string) {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })

    try {
        //接下来要写description，从fetchMeowTalk这个函数里面去请求AI
        const response = await axios.post("https://spark-api-open.xf-yun.com/v1/chat/completions/",
            {
                "max_tokens": 4096,
                "top_k": 4,
                "temperature": 0.5,
                "messages": [
                    {
                        "role": "system",
                        "content": "你是一个无所不知的人,现在请你概括消息内容"
                    },
                    {
                        "role": "user",
                        "content": `请概括一下句子，要求是简介精炼的提炼出用户的语句，可能是问题，可能是陈述，比如冒号后面的消息是‘请帮我讲解相机的呼吸补偿’那么你需要概括为，‘呼吸补偿是什么’，类似的话语，这是用于我们此次对话的历史记录展示的: ${message}`,
                    }
                ],
                "model": "4.0Ultra",
                "stream": true
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${process.env.SERVER_CLIENT_ID}`,
                },
                responseType: "stream",
            }
        );

        let description = "";
        let buffer = ""; // 用于存储整个流数据

        await new Promise<void>((resolve, reject) => {
            response.data.on("data", (chunk: Buffer) => {
                const dataStr = chunk.toString().trim();

                if (dataStr.startsWith("data: [DONE]")) {
                    return; // 结束标识，跳过
                }

                buffer += dataStr.replace(/^data:/, "").trim() + "\n"; // 追加数据
            });

            response.data.on("end", () => {
                try {
                    // 处理可能的多个 JSON 行
                    const lines = buffer.split("\n");
                    let finalText = "";

                    for (const line of lines) {
                        if (line.trim()) {
                            try {
                                const jsonData = JSON.parse(line);
                                const textChunk = jsonData?.choices?.[0]?.delta?.content;
                                if (textChunk) {
                                    finalText += textChunk;
                                }
                            } catch (err) {
                                console.error("JSON 解析失败:", err, "内容:", line);
                            }
                        }
                    }

                    description = finalText.trim(); // 赋值给 description
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });

            response.data.on("error", (err: any) => {
                reject(err);
            });
        });

        const insertIntoHistory = `INSERT INTO history (userName, sessionId, description) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE description = VALUES(description);`;
        const insertIntodialogInfo = `insert into dialoginfo (message, role, sessionId, userName) values (?, ?, ?, ?)`;

        await conn.query(insertIntoHistory, [userName, sessionId, description.trim()]);
        await conn.query(insertIntodialogInfo, [message, role, sessionId, userName]);

    }catch (error){
        console.error("add History error:", error);
    }finally {
        await conn.end()
    }
}

export default addHistoryText;