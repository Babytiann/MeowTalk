import { LogoutOutlined} from "@ant-design/icons";
import { useState } from "react";

function Header() {
    const [showWindow, setShowWindow] = useState<boolean>(false);

    function handleShowWindow() {
        showWindow ? setShowWindow(false) : setShowWindow(true);
    }

    return (
        <div className="h-[56px] p-[12px] flex items-center justify-between border-b-1 border-gray-200 z-10 relative">
            <a href={"https://github.com/Babytiann"} target={"_blank"} className="py-[6px] px-[12px]">
                <span className="text-xl font-bold text-[#5D5D5D]">MeowTalk</span>
            </a>
            <div className="size-[36px]">
                <button className="size-[36px]" onClick={handleShowWindow}>
                    <img src={"../../assets/img/克鲁鲁.jpg"} alt="avatar" className="object-contain rounded-full hover:cursor-pointer"/>
                </button>
            </div>
            {showWindow && (
                <div className="absolute right-4 p-[6px] top-15 w-[240px]
                            border-1 border-gray-200 rounded-lg
                            bg-white
                            z-10
                            ">
                <button className="w-full p-2 h-10 flex justify-start  rounded-md
                                hover:bg-[#ECECEC]
                                  hover:cursor-pointer
                                  gap-2
                                  ">
                    <LogoutOutlined className="text-[20px]"/>
                    <span>注销</span>
                </button>
            </div>
            )}

        </div>
    )
}

export default Header