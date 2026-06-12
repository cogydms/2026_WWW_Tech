import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Admin() {
    const [users, setUsers] = useState([]);
    const [capsules, setCapsules] = useState([]);
    const [tab, setTab] = useState("users");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const payload = JSON.parse(atob(token.split(".")[1]));
        if(payload.role !== "admin") {
            alert("only admin allowed!");
            navigate("/capsules");
            return;
        }
        const url = tab === "users" 
            ? "http://localhost:3000/api/admin" 
            : "http://localhost:3000/api/admin/capsules";
        
        fetch(url, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => res.json())
        .then((data) => {
            if(tab === "users") setUsers(data);
            else setCapsules(data);
        })
        .catch((err) => console.error(err));
    }, [tab]);

    const handleDelete = async (id) => {
        const url = tab === "users"
            ? `http://localhost:3000/api/admin/${id}`
            : `http://localhost:3000/api/admin/capsules/${id}`;
        
        await fetch(url, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        if(tab === "users") setUsers(users.filter((u) => u._id !== id));
        else setCapsules(capsules.filter((c) => c._id !== id));
    }
    return (
        <div className="capsules-container">
            <h1>Admin</h1>
            <div>
                <button className="btn-sort" onClick={() => setTab("users")}>Users</button>
                <button className="btn-sort" onClick={() => setTab("capsules")}>Capsules</button>
            </div>

            {tab === "users" && (
                <div>
                    {users.map((user) => (
                        <div key={user._id} className="capsule-card">
                            <div>
                                <h3>{user.username}</h3>
                                <p>{user.email}</p>
                            </div>
                            <button className="btn-delete" onClick={() => handleDelete(user._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}

            {tab === "capsules" && (
                <div>
                    {capsules.map((capsule) => (
                        <div key={capsule._id} className="capsule-card">
                            <div>
                                <h3>{capsule.title}</h3>
                                <p>{capsule.userId?.username}</p>
                            </div>
                            <button className="btn-delete" onClick={() => handleDelete(capsule._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Admin;