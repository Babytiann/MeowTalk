import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import InputSection from "../InputSection.tsx";
import MsgBox from "./MsgBox.tsx";

function Dialog() {
    const { sessionId } = useParams<{ sessionId: string }>();
    const [messages, setMessages] = useState<any[]>([]);
    const [aiMessageId, setAiMessageId] = useState<number>(0);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (sessionId && messages.length === 0) {
            axios.get(`http://localhost:5927/history?sessionId=${sessionId}`, { withCredentials: true })
                .then(res => setMessages(res.data))
                .catch(err => console.error("Error fetching messages:", err));
        }
    }, [sessionId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // 用户发送消息
    const handleSendMessage = (newMessage: string) => {
        setAiMessageId(pre => pre + 1);

        setMessages(prev => [
            ...prev,
            { id: Date.now(), message: newMessage, role: "user" },
            { id: aiMessageId, message: "", role: "ai" } // 预留 AI 消息框
        ]);
    };

    // AI 流式返回消息（覆盖上一次的 AI 消息）
    const handleAiMessage = (newMessage: string) => {
        setMessages(prev => {
            return prev.map(msg =>
                msg.id === aiMessageId
                    ? { ...msg, message: newMessage }
                    : msg
            );
        });
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:5927/history?sessionId=${sessionId}`, { withCredentials: true });
                setMessages(res.data);
            } catch (err) {
                console.error("Error fetching messages:", err);
            }
        };

        const interval = setInterval(fetchMessages, 500);

        setTimeout(() => {
            clearInterval(interval);
        }, 5000)
    }, [sessionId]);

    return (
        <div>
            <div className="h-[670px] overflow-y-scroll">
                {messages.map(item => (
                    <MsgBox key={item.id} msg={item.message} role={item.role} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="absolute bottom-6 left-[57%] -translate-x-1/2 z-10">
                <InputSection sessionId={sessionId ?? ""} onSendMessage={handleSendMessage} onAiMessage={handleAiMessage} />
            </div>
        </div>
    );
}

export default Dialog;
