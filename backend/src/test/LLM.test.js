import request from "supertest";
import app from "../index";

describe("MeowTalk API 流式返回测试", () => {
    it("应该能够流式接收返回内容", async () => {
        const response = await request(app)
            .post("/askai")
            .send({ message: "你好" })
            .set("Content-Type", "application/json")
            .buffer(true)
            .parse((res, callback) => {
                let data = "";
                res.on("data", (chunk) => {
                    data += chunk.toString();
                    console.log("收到数据:", chunk.toString());
                });
                res.on("end", () => {
                    console.log("完整返回内容:", data);
                    callback(null, data);
                });
            });

        // 确保在测试结束前流处理完成
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 检查是否有错误信息
        if (response.body.error) {
            console.error("API 错误:", response.body.error);
        }

        // 断言返回状态
        expect(response.status).toBe(200);
    }, 10000);  // 设置超时时间为 10000 毫秒
});
