import { useParams } from "react-router";
import InputSection from "../InputSection.tsx";
import MsgBox from "./MsgBox.tsx";

function Dialog() {
    let { sessionId } = useParams<{ sessionId: string }>();

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