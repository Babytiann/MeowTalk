import { useEffect, useMemo, useRef } from 'react';

import markdownit from 'markdown-it'
import hljs from 'highlight.js'
import "highlight.js/styles/base16/atelier-sulphurpool-light.css";

function MsgBox({ msg, role }: Readonly<MsgBoxProps>) {

    const md = useMemo(() => {
        return markdownit({
            highlight: function (str, lang): string {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        const highlighted = hljs.highlight(str, { language: lang }).value;
                        return `
                        <div class="relative my-4" >
                            <div class="code-header flex justify-between items-center w-full bg-gray-800 text-gray-300 text-xs px-4 py-2 rounded-t-lg">
                                <span class="code-lang font-mono">${lang}</span>
                                <button class="copy-btn hover:text-white transition-colors duration-200">复制</button>
                            </div>
                            <div class="hljs bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-auto text-sm font-mono leading-relaxed" data-code="${encodeURIComponent(str)}">${highlighted}</div>
                        </div>
                    `;
                    } catch {
                        // 忽略高亮错误，使用默认渲染
                    }
                }
                return `<div class="hljs bg-gray-100 text-gray-800 px-4 py-3 rounded-lg my-4 font-mono text-sm">${md.utils.escapeHtml(str)}</div>`;
            },
        });
    }, [])

    const eventListenerRef = useRef<((e: Event) => void) | null>(null);

    useEffect(() => {
        // 如果已经存在事件监听器，先移除
        if (eventListenerRef.current) {
            document.removeEventListener("click", eventListenerRef.current);
        }

        const handleCopyClick = (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains("copy-btn")) {
                e.preventDefault();
                e.stopPropagation();
                
                const wrapper = target.closest(".relative") as HTMLElement;
                const codeBlock = wrapper?.querySelector(".hljs") as HTMLElement;
                if (codeBlock) {
                    const code = decodeURIComponent(codeBlock.getAttribute("data-code") ?? "");
                    navigator.clipboard.writeText(code).then(() => {
                        // 使用更友好的提示方式，而不是alert
                        const originalText = target.textContent;
                        target.textContent = "已复制!";
                        target.style.color = "#4CAF50";
                        
                        setTimeout(() => {
                            target.textContent = originalText;
                            target.style.color = "";
                        }, 2000);
                        
                        console.log("Copy successfully!");
                    }).catch((error) => {
                        console.error("Copy failed:", error);
                        // 如果复制失败，显示错误提示
                        const originalText = target.textContent;
                        target.textContent = "复制失败";
                        target.style.color = "#f44336";
                        
                        setTimeout(() => {
                            target.textContent = originalText;
                            target.style.color = "";
                        }, 2000);
                    });
                }
            }
        };

        eventListenerRef.current = handleCopyClick;
        document.addEventListener("click", handleCopyClick);
        
        return () => {
            if (eventListenerRef.current) {
                document.removeEventListener("click", eventListenerRef.current);
                eventListenerRef.current = null;
            }
        };
    }, []);


    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-3">
            {role === "user" ? (
                <div className="flex justify-end">
                    <div className="bg-blue-500 text-white rounded-2xl py-3 px-4 max-w-[80%] break-words shadow-sm message-bubble">
                        <div className="text-sm leading-relaxed">{msg}</div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-start">
                    <div className="bg-gray-50 rounded-2xl py-3 px-4 max-w-[90%] break-words shadow-sm border border-gray-100 message-bubble">
                        <div 
                            className="text-sm leading-relaxed text-gray-800 prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: md.render(msg) }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default MsgBox;
