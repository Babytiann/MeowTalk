function MsgBox({ msg, role }: Readonly<MsgBoxProps>) {
    return (
        <div className="w-[728px] mx-auto flex text-md leading-7">
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
                       inline-block break-words "
                    >
                        {msg}
                    </div>
                </div>
            )}
        </div>
    );
}


export default MsgBox;
