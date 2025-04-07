import {useEffect, useMemo} from 'react';

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
                        <div class="relative -mt-28 -mb-23" >
                            <div class="code-header flex justify-between items-center w-[660px] absolute top-23 text-[#5D5D5D] text-[0.8rem] pl-5">
                                <span class="code-lang ">${lang}</span>
                                <button class="copy-btn hover:cursor-pointer z-10">复制</button>   
                            </div>
                            <div class="hljs p-5 pt-10 overflow-auto rounded-xl text-[0.88rem]" data-code="${encodeURIComponent(str)}">${highlighted}</div>
                        </div>
                    `;
                    } catch (__) {}
                }
                return `<div class="hljs px-5 py-2 rounded-xl my-4">${md.utils.escapeHtml(str)}</div>`;
            },
        });
    }, [])

    useEffect(() => {
        const handleCopyClick = (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains("copy-btn")) {
                const wrapper = target.closest(".relative") as HTMLElement;
                const codeBlock = wrapper?.querySelector(".hljs") as HTMLElement;
                if (codeBlock) {
                    const code = decodeURIComponent(codeBlock.getAttribute("data-code") ?? "");
                    navigator.clipboard.writeText(code).then(() => {
                        alert("Copied to clipboard!");
                        console.log("Copy successfully!");
                    }).catch(console.error);
                }
            }
        };

        document.addEventListener("click", handleCopyClick);
        return () => document.removeEventListener("click", handleCopyClick);
    }, []);


    return (
        <div className="w-[728px] mx-auto flex text-md leading-7 mb-5">
            {role === "user" ? (
                <div className="flex justify-end w-full">
                    <div
                        className="bg-[#F3F3F3] rounded-2xl py-[10px] px-5
                        inline-block break-words max-w-[521px]"
                    >
                        {msg}
                    </div>
                </div>
            ) : (
                <div className="flex justify-start w-full">
                    <div
                        className="rounded-2xl py-[10px] px-5
                       inline-block break-words max-w-[736px]"
                        dangerouslySetInnerHTML={{ __html: md.render(msg) }}
                    />
                </div>
            )}
        </div>
    );
}

export default MsgBox;
