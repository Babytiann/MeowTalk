// components/MarkdownRenderer.tsx
import React, { useState } from 'react';
import { md } from './md';
import hljs from 'highlight.js';
import 'highlight.js/styles/base16/atelier-sulphurpool-light.css';

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    const tokens = md.parse(content, {});
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const renderTokens = () => {
        const elements: React.ReactNode[] = [];
        let i = 0;

        while (i < tokens.length) {
            const token = tokens[i];

            if (token.type === 'paragraph_open') {
                const inlineToken = tokens[i + 1];
                const text = inlineToken.content;
                elements.push(<p key={i} className="my-2">{text}</p>);
                i += 3; // paragraph_open, inline, paragraph_close
            }

            else if (token.type === 'fence') {
                const lang = token.info.trim();
                const code = token.content;

                let highlighted = code;
                try {
                    if (lang && hljs.getLanguage(lang)) {
                        highlighted = hljs.highlight(code, { language: lang }).value;
                    } else {
                        highlighted = hljs.highlightAuto(code).value;
                    }
                } catch (_) {
                    highlighted = code;
                }

                const isCopied = copiedCode === code;

                elements.push(
                    <div key={i} className="relative my-4 rounded-xl border bg-[#F9F9F9] overflow-hidden">
                        <div className="code-header flex justify-between items-center px-4 py-2 text-sm text-gray-500 bg-gray-100">
                            <span>{lang || 'code'}</span>
                            <button
                                className="copy-btn"
                                onClick={() => {
                                    navigator.clipboard.writeText(code).then(() => {
                                        setCopiedCode(code);
                                        setTimeout(() => setCopiedCode(null), 1000);
                                    });
                                }}
                            >
                                {isCopied ? '已复制' : '复制'}
                            </button>
                        </div>
                        <pre className="hljs p-4 text-sm overflow-auto" dangerouslySetInnerHTML={{ __html: highlighted }} />
                    </div>
                );
                i++;
            }

            else {
                // 忽略其他 token 类型
                i++;
            }
        }

        return elements;
    };

    return <div className="markdown-body">{renderTokens()}</div>;
};

export default MarkdownRenderer;
