import InputSection from "../InputSection.tsx";
import { v4 as uuidv4 } from 'uuid';

function Home() {
    const sessionId = uuidv4();

    return (
        <div>
            <div className="relative h-[100vh]">
                <div className="absolute left-1/2 top-3/8 -translate-x-1/2 -translate-y-1/2">
                    <InputSection sessionId={sessionId} />
                </div>
            </div>
        </div>
    )
}

export default Home;