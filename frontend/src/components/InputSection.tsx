import { Input, Form, Button, message } from 'antd';
import {useState} from "react";

function InputSection({sessionId, onSendMessage, onAiMessage, onCreateDialog}: Readonly<InputSectionProps>) {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const { TextArea } = Input;

    const handleSubmit = async () => {
        if (!value.trim()) {
            message.warning("请输入内容");
            return;
        }

        onSendMessage?.(value);

        setLoading(true);
        try {
            onCreateDialog?.()
            const response = await fetch("http://localhost:5927/askai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: value,
                    sessionId: sessionId,
                }),
                credentials: "include",
            });

            if (!response.ok) {
                console.log("请求失败:", response);
                return;
            }

            // 处理流式返回
            const reader = response.body?.getReader();
            setValue("")
            if (!reader) {
                console.error("无法读取响应流");
                return;
            }

            const decoder = new TextDecoder("utf-8");
            let aiResponse = "";

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                aiResponse = decoder.decode(value, { stream: true });

                onAiMessage?.(aiResponse)
            }
        } catch (error) {
            console.error("请求出错:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[768px] px-3 py-1 shadow-md rounded-2xl border border-green-200">
            <Form onFinish={handleSubmit}>
                <TextArea autoSize={{ minRows: 3, maxRows: 5 }}
                          placeholder="询问任何问题"
                          autoFocus
                          value={value}
                          onChange={(e) => {setValue(e.target.value)}}
                />
                <div className="flex justify-end">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="mt-2"
                    >
                        发送
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default InputSection;