import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Form/Login";

import SignUp from "./pages/Form/SignUp";
import ChatBox from "./pages/home/Chat/ChatBox";
import Home from "./pages/home/Home";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
