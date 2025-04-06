import { LogoutOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router";

function Header() {
    const navigate = useNavigate();

    function handleLogout() {
        fetch(' http://localhost:5927/logout', { method: 'POST', credentials: 'include' }).then(() => {
            navigate('/login');
        });
    }

    return (
        <div className="h-[56px] p-[12px] flex items-center justify-between border-b-1 border-gray-200 z-10 relative">
            <a href={"https://github.com/Babytiann"} target={"_blank"} className="py-[6px] px-[12px]">
                <span className="text-xl font-bold text-[#5D5D5D]">MeowTalk</span>
            </a>
            <div className="size-[36px]">
                <button className="size-[36px]">
                    <img src={"../../assets/img/克鲁鲁.jpg"} alt="avatar" className="object-contain rounded-full hover:cursor-pointer"/>
                </button>
            </div>
            <input type={"checkbox"} className="size-8 appar absolute right-[14px] appearance-none hover:cursor-pointer peer"
                                     onBlur={(e) => e.target.checked = false}   />
            <div className="absolute right-4 p-[6px] top-15 w-[240px]
                            border-1 border-gray-200 rounded-lg
                            bg-white
                            z-10
                            invisible
                            peer-checked:visible
                            ">
                <button className="w-full p-2 h-10 flex justify-start  rounded-md
                                hover:bg-[#ECECEC]
                                  hover:cursor-pointer
                                  gap-2
                                  " onClick={handleLogout}>
                    <LogoutOutlined className="text-[20px]"/>
                    <span>注销</span>
                </button>
            </div>
        </div>
    )
}

export default Header