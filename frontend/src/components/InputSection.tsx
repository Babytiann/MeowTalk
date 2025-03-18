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
        onCreateDialog?.()
        setValue("");

        try {
            const eventSource = new EventSource(`http://localhost:5927/askai?message=${encodeURIComponent(value)}&sessionId=${sessionId}`, {withCredentials: true});

            eventSource.onmessage = (event) => {
                onAiMessage?.(event.data);
            };

            eventSource.onerror = () => {
                eventSource.close();
                setLoading(false);
                message.error("连接异常，已断开");
            };

            eventSource.addEventListener("end", () => {
                eventSource.close();
                setLoading(false);
            });

        } catch (error) {
            console.error("请求出错:", error);
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