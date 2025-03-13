import Card from "../Sider/Card.tsx";
import axios from "axios";
import { useState, useEffect } from "react";

function Sider() {
    const [CardHistory, setCardHistory] = useState<CardHistory[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5927/CardHistory", { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setCardHistory(res.data)
            })
            .catch(err => console.error("Error fetching CardHistory:", err));

    }, []);

    return (
        <div className="min-w-[248px] h-[100vh] bg-[#F9F9F9] rounded-md flex flex-col">
            {CardHistory.map((item, _) => (
                <Card key={item.id} sessionId={item.sessionId} msg={item.description} />
            ))}
        </div>
    )
}

export default Sider