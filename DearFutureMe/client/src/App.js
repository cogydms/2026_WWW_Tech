import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Capsules from "./pages/Capsules";
import CreateCapsule from "./pages/CreateCapsule";
import Signup from "./pages/Signup";
import Friends from "./pages/Friends";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CapsuleDetail from "./pages/CapsuleDetail";
import FriendCapsules from "./pages/FriendCapsules";
import Admin from "./pages/Admin";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <BrowserRouter>
      {token && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/capsules" element={<Capsules />} />
        <Route path="/capsules/new" element={<CreateCapsule />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/capsules/:id" element={<CapsuleDetail />} />
        <Route path="/friends/:id/capsules" element={<FriendCapsules />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
