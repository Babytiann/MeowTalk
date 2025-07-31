import InputSection from "../InputSection.tsx";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router";

function Home() {
    const sessionId = uuidv4();
    const navigate = useNavigate();

    function handleNavigate() {
        navigate(`${sessionId}`);
    }

    return (
        <div className="h-full flex flex-col items-center justify-center bg-white relative">
            {/* 简洁的欢迎文字 */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                    我们先从哪里开始呢？
                </h2>
            </div>
            
            <div className="relative w-full max-w-3xl mx-auto px-4">
                <InputSection sessionId={sessionId} onCreateDialog={handleNavigate}/>
            </div>
        </div>
    );
}

export default Home;