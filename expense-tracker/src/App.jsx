import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registartion";
import Expense from "./Expense";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/Ragistration" element={<Registration />}></Route>
            <Route path="/Expense" element={<Expense />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
