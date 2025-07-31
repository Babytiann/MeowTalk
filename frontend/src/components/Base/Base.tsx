import {Outlet} from "react-router";
import Sider from "../Sider/Sider.tsx";
import Header from "./Header.tsx";

function Base() {
    return (
        <div className="flex h-screen">
            <Sider></Sider>
            <div className="flex flex-col flex-1 relative">
                <Header></Header>
                <div className="flex-1 relative">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Base