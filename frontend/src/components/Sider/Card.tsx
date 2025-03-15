import { Link } from "react-router";

function Card({ sessionId, msg }: Readonly<CardProps>) {
    return (
        <div className="max-h-[36px] w-[220px] p-[8px] rounded-xl bg-[#F9F9F9] flex items-center truncate hover:bg-[#ECECEC]">
            <Link to={`/home/${sessionId}`} className="w-full">
                <div>{msg}</div>
            </Link>
        </div>
    );
}

export default Card;
