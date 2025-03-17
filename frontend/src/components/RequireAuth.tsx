import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

interface RequireAuthProps {
    children: ReactNode;
}

function RequireAuth({children}: Readonly<RequireAuthProps>){
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");

        setTimeout(() => {
            if (!token) {
                navigate("/login");
            }
        },2000);

    }, [navigate]);

    return (
        <>
            {children}
        </>
    )
}

export default RequireAuth;