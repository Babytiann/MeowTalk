import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function MsgBox({ msg, role }: Readonly<MsgBoxProps>) {
    return (
        <div className="w-[728px] mx-auto flex text-md leading-7">
            {role === "user" ? (
                <div className="flex justify-end w-full">
                    <div
                        className="bg-[#F3F3F3] rounded-2xl py-[10px] px-5
                       inline-block break-words max-w-[521px]"
                        dangerouslySetInnerHTML={{ __html: msg }}
                    >
                    </div>
                </div>
            ) : (
                <div className="flex justify-start w-full">
                    <div
                        className="rounded-2xl py-[10px] px-5
                       inline-block break-words max-w-[736px]"
                    >
                        <SyntaxHighlighter style={docco} language="tsx" >
                            {msg} {/* 将 msg 作为字符串传递给 SyntaxHighlighter */}
                        </SyntaxHighlighter>
                    </div>
                </div>
            )}
        </div>
    );
}


export default MsgBox;
