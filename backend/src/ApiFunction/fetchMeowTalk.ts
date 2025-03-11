import { Response } from "express";
import axios from "axios";
import { marked } from "marked";

const fetchMeowTalk = async (message: string, res?: Response): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const response = axios.post("https://spark-api-open.xf-yun.com/v1/chat/completions/",
                {
                    "max_tokens": 4096,
                    "top_k": 4,
                    "temperature": 0.5,
                    "messages": [
                        {
                            "role": "system",
                            "content": "你是一个无所不知的人"
                        },
                        {
                            "role": "user",
                            "content": message,
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

            res?.setHeader("Content-Type", "text/event-stream");
            res?.setHeader("Cache-Control", "no-cache");
            res?.setHeader("Connection", "keep-alive");

            let fullResponse = "";
            let isFirstChunk = true; // 标记是否是第一个文本片段

            response.then(apiResponse => {
                apiResponse.data.on("data", (chunk: Buffer) => {
                    const dataStr = chunk.toString().trim();

                    if (!dataStr.startsWith('data: [DONE]')) {
                        try {
                            const jsonData = JSON.parse(dataStr.replace(/^data:/, "").trim());
                            const textChunk = jsonData?.choices?.[0]?.delta?.content;
                            if (textChunk) {
                                if (isFirstChunk) {
                                    fullResponse += textChunk;
                                    res?.write(marked.parse(textChunk));
                                    isFirstChunk = false;
                                } else {
                                    // 不是第一个片段，拼接时避免换行符带来的断句
                                    fullResponse += textChunk;
                                    res?.write(marked.parse(fullResponse));
                                }
                            }
                        } catch (err) {
                            console.error("JSON 解析失败:", err);
                        }
                    }
                });

                apiResponse.data.on("end", () => {
                    res?.end();
                    console.log("完整响应内容:", fullResponse);
                    resolve(fullResponse); // 这里确保最终返回 fullResponse
                });

                apiResponse.data.on("error", (err: any) => {
                    console.error("流式请求出错:", err);
                    res?.status(500).end();
                });
            }).catch(error => {
                console.error("Error fetching MeowTalk API:", error);
                res?.status(500).json({ error: "Failed to fetch AI response" });
            });

        } catch (error) {
            console.error("Error in fetchMeowTalk:", error);
            res?.status(500).json({ error: "Failed to fetch AI response" });
        }
    });
};

export default fetchMeowTalk;
