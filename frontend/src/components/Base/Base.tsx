import {Outlet} from "react-router";
import Sider from "../Sider/Sider.tsx";
import Header from "./Header.tsx";

function Base() {
    return (
        <div className="flex">
            <Sider></Sider>
            <div className="flex flex-col w-full">
                <Header></Header>
                <Outlet />
            </div>

        </div>
    )
}

export default Base