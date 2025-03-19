import { Routes, Route, Navigate } from "react-router";
import {Suspense, lazy} from "react";

const Login = lazy(() => import ("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Base = lazy(() => import("./components/Base/Base.tsx"));
const Home = lazy(() => import("./components/Base/Base.tsx"))
const Loading = lazy(() => import("./components/Loading"));
const Dialog = lazy(() => import("./components/Loading"));

function App() {
    return (
      <Suspense fallback={<Loading />} >
        <Routes >
            <Route path={"/"} element={<Navigate to="/login" />}></Route>
            <Route path={"/login"} element={<Login />}></Route>
            <Route path={"/register"} element={<Register />} ></Route>
            <Route path={"/home"} element={<Base />}>
                <Route index element={<Home />}></Route>
                <Route path={":sessionId"} element={<Dialog />} ></Route>
            </Route>
        </Routes>
      </Suspense>
  )
}

export default App
