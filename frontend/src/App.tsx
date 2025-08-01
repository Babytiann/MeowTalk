import { Routes, Route, Navigate } from "react-router";
import {Suspense} from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import Base from "./components/Base/Base.tsx"
import Home from "./components/Base/Home.tsx"
import Loading from "./components/Loading";
import Dialog from "./components/Dialog/Dialog.tsx"
import AuthGuard from "./components/AuthGuard";

function App() {
    return (
      <Suspense fallback={<Loading />} >
        <Routes>
            <Route path={"/"} element={<Navigate to="/login" />}></Route>
            <Route path={"/login"} element={
                <AuthGuard requireAuth={false}>
                    <Login />
                </AuthGuard>
            }></Route>
            <Route path={"/register"} element={
                <AuthGuard requireAuth={false}>
                    <Register />
                </AuthGuard>
            }></Route>
            <Route path={"/home"} element={
                <AuthGuard requireAuth={true}>
                    <Base />
                </AuthGuard>
            }>
                <Route index element={<Home />}></Route>
                <Route path={":sessionId"} element={<Dialog />} ></Route>
            </Route>
        </Routes>
      </Suspense>
  )
}

export default App
