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
        <div className="max-h-[36px] w-[230px] p-[8px] rounded-xl bg-[#F9F9F9] flex items-center truncate hover:bg-[#ECECEC]">
            <Link to={`/home/${sessionId}`} className="w-full" title={msg}>
                <div className="max-w-[189px] truncate">{msg}</div>
            </Link>
            <div className="relative">
                <div className="z-10 text-red-500 hover:cursor-pointer" onClick={showModal}><DeleteOutlined /></div>
            </div>
            <Modal title="是否要删除该对话？" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>即将删除对话: "{msg}"</p>
            </Modal>
        </div>
    );
}

export default Card;
