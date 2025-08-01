import { LogoutOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { clearAuthInfo, getAuthInfo } from "../../service/auth";
import { message } from "antd";

function Header() {
    const navigate = useNavigate();

    function handleLogout() {
        // 清除本地认证信息
        clearAuthInfo();
        
        // 调用后端登出接口
        fetch('http://localhost:5927/logout', { 
            method: 'POST', 
            credentials: 'include' 
        }).then(() => {
            message.success('已成功登出');
            navigate('/login');
        }).catch(() => {
            // 即使后端调用失败，也清除本地信息并跳转
            message.success('已成功登出');
            navigate('/login');
        });
    }

    return (
        <div className="h-[56px] p-[12px] flex items-center justify-between border-b border-gray-200 bg-white z-10 relative">
            <a href={"https://github.com/Babytiann"} target={"_blank"} className="py-[6px] px-[12px] hover:opacity-80 transition-opacity">
                <span className="text-xl font-bold text-[#5D5D5D]">MeowTalk</span>
            </a>
            
            {/* 头像区域 */}
            <div className="relative">
                <button className="w-10 h-10 rounded-full overflow-hidden hover:ring-2 hover:ring-blue-200 hover:ring-offset-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <img 
                        src={"../../assets/img/克鲁鲁.jpg"} 
                        alt="avatar" 
                        className="w-full h-full object-cover"
                    />
                </button>
                
                {/* 隐藏的checkbox用于控制下拉菜单 */}
                <input 
                    type={"checkbox"} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer peer"
                    onBlur={(e) => e.target.checked = false}
                />
                
                {/* 下拉菜单 */}
                <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible transition-all duration-200 transform origin-top-right scale-95 peer-checked:scale-100 z-50">
                    {/* 菜单头部 */}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img 
                                    src={"../../assets/img/克鲁鲁.jpg"} 
                                    alt="avatar" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-900">
                                    {getAuthInfo()?.userName || '克鲁鲁'}
                                </div>
                                <div className="text-xs text-gray-500">在线</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* 菜单项 */}
                    <div className="py-2">
                        <button className="w-full px-4 py-3 flex items-center space-x-3 text-left hover:bg-gray-50 transition-colors duration-150 group">
                            <UserOutlined className="text-gray-400 group-hover:text-blue-500 transition-colors duration-150" />
                            <span className="text-sm text-gray-700 group-hover:text-gray-900">个人资料</span>
                        </button>
                        
                        <button className="w-full px-4 py-3 flex items-center space-x-3 text-left hover:bg-gray-50 transition-colors duration-150 group">
                            <SettingOutlined className="text-gray-400 group-hover:text-blue-500 transition-colors duration-150" />
                            <span className="text-sm text-gray-700 group-hover:text-gray-900">设置</span>
                        </button>
                        
                        <div className="border-t border-gray-100 my-1"></div>
                        
                        <button 
                            onClick={handleLogout}
                            className="w-full px-4 py-3 flex items-center space-x-3 text-left hover:bg-red-50 transition-colors duration-150 group"
                        >
                            <LogoutOutlined className="text-gray-400 group-hover:text-red-500 transition-colors duration-150" />
                            <span className="text-sm text-gray-700 group-hover:text-red-600">注销</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header