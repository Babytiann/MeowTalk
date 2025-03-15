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
                console.log(res.data);
                setCardHistory(res.data)
            })
            .catch(err => console.error("Error fetching CardHistory:", err));

    }, []);

    function navigatetoHome() {
        navigate("/home");
    }

    return (
        <div className="min-w-[248px] h-[100vh] bg-[#F9F9F9] rounded-md flex flex-col">
            <div className="h-14 pr-3 flex justify-end items-center">
                <button className="size-10 px-2 rounded-md flex justify-center items-center
                                   hover:bg-[#E7E7E7]"
                      onClick={() => navigatetoHome()}
                      aria-label="Go to home"
                >
                    <FormOutlined className="text-[24px]"/>
                </button>
            </div>
            <div>
                {CardHistory.map((item, _) => (
                    <Card key={item.id} sessionId={item.sessionId} msg={item.description} />
                ))}
            </div>

        </div>
    )
}

export default Sider