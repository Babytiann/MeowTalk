import { useState, useRef, useEffect } from 'react';
import { message } from 'antd';

function InputSection({sessionId, onSendMessage, onAiMessage, onCreateDialog}: Readonly<InputSectionProps>) {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [textareaHeight, setTextareaHeight] = useState(56); // 初始高度
    const maxHeight = 200; // 最大高度限制

    // 自动调整高度
    const adjustHeight = () => {
        if (textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.style.height = 'auto';
            const scrollHeight = textarea.scrollHeight;
            const newHeight = Math.min(Math.max(56, scrollHeight), maxHeight);
            setTextareaHeight(newHeight);
            textarea.style.height = `${newHeight}px`;
        }
    };

    // 监听输入变化，调整高度
    useEffect(() => {
        adjustHeight();
    }, [value]);

    const handleSubmit = async () => {
        if (!value.trim()) {
            message.warning("请输入内容");
            return;
        }

        onSendMessage?.(value);
        setLoading(true);
        onCreateDialog?.();
        setValue("");
        setTextareaHeight(56); // 重置高度

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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4 z-50">
            <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 hover:border-gray-300 transition-all duration-200">
                {/* 输入区域 */}
                <div className="flex items-end p-4">
                    <div className="flex-1 relative">
                        <textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="询问任何问题"
                            className="w-full resize-none outline-none border-none bg-transparent text-gray-800 placeholder-gray-500 text-base leading-6 pr-12"
                            style={{
                                height: `${textareaHeight}px`,
                                minHeight: '56px',
                                maxHeight: `${maxHeight}px`
                            }}
                            rows={1}
                        />
                        
                        {/* 滚动提示 */}
                        {textareaHeight >= maxHeight && (
                            <div className="absolute bottom-0 right-0 text-xs text-gray-400 bg-white px-2 py-1 rounded">
                                可滚动查看更多
                            </div>
                        )}
                    </div>
                    
                    {/* 发送按钮 */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !value.trim()}
                        className={`ml-3 p-2 rounded-lg transition-all duration-200 ${
                            loading || !value.trim()
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-md'
                        }`}
                        style={{ minWidth: '40px', minHeight: '40px' }}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        )}
                    </button>
                </div>
                
                {/* 底部装饰线 */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-4"></div>
                
                {/* 提示文字 */}
                <div className="px-4 py-2 text-xs text-gray-400 text-center">
                    Shift + Enter 换行，Enter 发送
                </div>
            </div>
        </div>
    );
}

export default InputSection;