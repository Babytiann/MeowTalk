import { Routes, Route, Navigate } from "react-router";
import {Suspense} from "react";

import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
      <Suspense fallback={null} >
        <Routes >
            <Route path={"/"} element={<Navigate to="/register" />}></Route>
            <Route path={"/login"} element={<Login />}></Route>
            <Route path={"/register"} element={<Register />} ></Route>
        </Routes>
      </Suspense>
  )
}

export default App
