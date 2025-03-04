import { Routes, Route } from "react-router";
import {Suspense} from "react";

import Login from "./components/Login";

function App() {
  return (
      <Suspense fallback={null} >
        <Routes >
            <Route path={"/"}></Route>
            <Route path={"/login"} element={<Login />}></Route>
        </Routes>
      </Suspense>
  )
}

export default App
