import { useParams } from "react-router";
import axios from "axios";
import InputSection from "../InputSection.tsx";
import MsgBox from "./MsgBox.tsx";
import { useEffect, useState } from "react";

function Dialog() {
    let { sessionId } = useParams<{ sessionId: string }>();
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        if (sessionId) {
            axios.get(`http://localhost:5927/history?sessionId=${sessionId}`,
                {
                withCredentials: true,
                })
                .then(res => setMessages(res.data))
                .catch((err) => console.error("Error fetching messages in Dialog.tsx error, information:", err));
        }
    }, [sessionId]);

    const List = messages.map((item, _) => (
        <MsgBox key={item.id} msg={item.message} role={item.role} />
    ));

    return (
        <div>
            <div>
                {List}
            </div>
            <div className="absolute bottom-6 left-[55%] -translate-x-1/2 z-10 shadow-md rounded-2xl border-1 border-solid border-green-200">
                <InputSection sessionId={sessionId ?? ""} />
            </div>
        </div>
    )
}

export default Dialog;