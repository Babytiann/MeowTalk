import InputSection from "../InputSection.tsx";

function Home() {
    return (
        <div>
            <div className="relative h-[100vh]">
                <div className="absolute left-1/2 top-3/8 -translate-x-1/2 -translate-y-1/2">
                    <InputSection />
                </div>
            </div>
        </div>
    )
}

export default Home;