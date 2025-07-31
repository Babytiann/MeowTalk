import { Link } from "react-router";
import { DeleteOutlined } from "@ant-design/icons";
import {Modal} from "antd";
import {useState} from "react";
import axios from "axios";

function Card({ sessionId, msg }: Readonly<CardProps>) {
    const [isOpen, setIsOpen] = useState(false);

    function showModal(){
        setIsOpen(true);
    }

    const handleOk = () => {
        setIsOpen(false);
        axios.delete(`http://localhost:5927/CardHistory/${sessionId}`, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    console.log("删除成功");
                }
            })
            .catch(err => console.error("Error deleting CardHistory:", err));
    }

    const handleCancel = () => {
        setIsOpen(false);
    }
    return (
        <div className="w-full p-2 rounded-lg flex items-center truncate hover:bg-gray-100 transition-colors duration-200 mb-1">
            <Link to={`/home/${sessionId}`} className="flex-1 min-w-0" title={msg}>
                <div className="truncate text-sm text-gray-700">{msg}</div>
            </Link>
            <div className="relative ml-2">
                <div className="text-gray-400 hover:text-red-500 hover:cursor-pointer transition-colors duration-200" onClick={showModal}>
                    <DeleteOutlined className="text-sm" />
                </div>
            </div>
            <Modal title="是否要删除该对话？" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>即将删除对话: "{msg}"</p>
            </Modal>
        </div>
    );
}

export default Card;
