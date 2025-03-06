import {Outlet} from "react-router";
import Sider from "../Sider/Sider.tsx";

function Base() {
    return (
        <div className="flex ">
            <Sider></Sider>
            <Outlet />
        </div>
    )
}

export default Base