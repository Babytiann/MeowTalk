import Card from "../Sider/Card.tsx";
import axios from "axios";
import { useState, useEffect } from "react";
import {FormOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router";

function Sider() {
    const [CardHistory, setCardHistory] = useState<CardHistory[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5927/CardHistory", { withCredentials: true })
            .then(res => {
                setCardHistory(res.data.reverse());
            })
            .catch(err => console.error("Error fetching CardHistory:", err));
    }, []);

    function navigatetoHome() {
        navigate("/home");
    }

    return (
        <div className="min-w-[248px] h-[100vh] bg-[#F9F9F9] rounded-md flex flex-col">
            {/* 新聊天按钮 */}
            <div className="px-3 pt-4 mb-4">
                <button 
                    onClick={navigatetoHome}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 text-left hover:cursor-pointer"
                >
                    <FormOutlined className="text-gray-600 text-sm" />
                    <span className="text-gray-800 text-sm font-medium">新聊天</span>
                    <span className="text-gray-400 text-xs ml-auto">Ctrl + Shift + O</span>
                </button>
            </div>
            
            <div className="px-3">
                {CardHistory.map((item, _) => (
                    <Card key={item.id} sessionId={item.sessionId} msg={item.description} />
                ))}
            </div>

        </div>
    )
}

export default Sider