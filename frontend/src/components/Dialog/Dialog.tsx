import { useParams } from "react-router";
import axios from "axios";
import InputSection from "../InputSection.tsx";
import MsgBox from "./MsgBox.tsx";
import {useEffect} from "react";

function Dialog() {
    let { sessionId } = useParams<{ sessionId: string }>();

    useEffect(() => {
        if (sessionId) {
            axios.get(`http://localhost:5927/history?sessionId=${sessionId}`,{
                withCredentials: true,
            })
                .then(response => console.log("后端响应:", response.data))
                .catch(error => console.error("请求失败:", error));
        }
    }, [sessionId]);

    return (
        <div>
            <div>
                <MsgBox msg={"你的111mx-automx-automx-automx-automx-automx-automx-automxautomx-automx-automx-automxautomx-automx-automx-automxautomx-automx-automx-automxautomx-automx-automx-automxautomx-automx-automx-automx-automx-automx-auto1"} role={"ai"}></MsgBox>
            </div>
            <div className="absolute bottom-6 left-[55%] -translate-x-1/2 z-10 shadow-md rounded-2xl border-1 border-solid border-green-200">
                <InputSection sessionId={sessionId ?? ""} />
            </div>
        </div>
    )
}

export default Dialog;