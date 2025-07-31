import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import InputSection from "../InputSection.tsx";
import MsgBox from "./MsgBox.tsx";

interface Message {
    id: number;
    message: string;
    role: string;
}

function Dialog() {
    const { sessionId } = useParams<{ sessionId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [aiMessageId, setAiMessageId] = useState<number>(0);
    const [isUserScrolling, setIsUserScrolling] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const scrollTimeoutRef = useRef<number | null>(null);

    // 检测用户是否正在手动滚动
    const handleScroll = useCallback(() => {
        if (!scrollContainerRef.current) return;
        
        const container = scrollContainerRef.current;
        const { scrollTop, scrollHeight, clientHeight } = container;
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 10;
        
        // 只有当用户不在底部时才标记为手动滚动
        if (!isAtBottom) {
            setIsUserScrolling(true);
        } else {
            // 用户滚动到底部时，恢复自动滚动
            setIsUserScrolling(false);
        }
        
        // 清除之前的定时器
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
    }, []);

    useEffect(() => {
        if (sessionId && messages.length === 0) {
            axios.get(`http://localhost:5927/history?sessionId=${sessionId}`, { withCredentials: true })
                .then(res => setMessages(res.data))
                .catch(err => console.error("Error fetching messages:", err));
        }
    }, [sessionId]);

    // 只有在用户没有手动滚动时才自动滚动到底部
    useEffect(() => {
        if (!isUserScrolling) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isUserScrolling]);

    // 用户发送消息
    const handleSendMessage = (newMessage: string) => {
        setAiMessageId(pre => pre + 1);

        setMessages(prev => [
            ...prev,
            { id: Date.now(), message: newMessage, role: "user" },
            { id: aiMessageId, message: "", role: "ai" } // 预留 AI 消息框
        ]);
        
        // 用户发送消息时，恢复自动滚动
        setIsUserScrolling(false);
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
        
        // AI回复时，如果用户没有手动滚动，则恢复自动滚动
        if (!isUserScrolling) {
            setIsUserScrolling(false);
        }
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

        const interval = setInterval(fetchMessages, 200);

        const counter = setTimeout(() => {
            clearInterval(interval);
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(counter);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [sessionId]);

    return (
        <div className="relative h-full">
            <div 
                ref={scrollContainerRef}
                className="h-[calc(100vh-120px)] overflow-y-auto pb-32"
                onScroll={handleScroll}
            >
                {messages.map(item => (
                    <MsgBox key={item.id} msg={item.message} role={item.role} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <InputSection sessionId={sessionId ?? ""} onSendMessage={handleSendMessage} onAiMessage={handleAiMessage} />
        </div>
    );
}

export default Dialog;
