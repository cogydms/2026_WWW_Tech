import { useNavigate } from "react-router-dom";
import "../pages/Capsules.css";

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login"; //로그아웃하면 nav가 안 보임
    }

    return (
        <div>
            <button className="btn-sort" onClick={() => navigate("/capsules")}>capsule</button>
            <button className="btn-sort" onClick={() => navigate("/friends")}>friend</button>
            <button className="btn-sort" onClick={handleLogout}>logout</button>
            <button className="btn-sort" onClick={() => navigate("/admin")}>Admin</button>
        </div>
    );
}

export default Navbar;