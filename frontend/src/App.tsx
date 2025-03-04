import { Routes, Route } from "react-router";
import {Suspense} from "react";

function App() {
  return (
      <Suspense fallback={null} >
        <Routes >
          <Route path={"/"}></Route>
        </Routes>
      </Suspense>
  )
}

export default App
