import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./Capsules.css";

function Capsules() {
  const [capsules, setCapsules] = useState([]);
  const navigate = useNavigate();
  const [sort, setSort] = useState("desc");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    fetch(`https://dearfutureme-9rng.onrender.com/api/capsules?sort=${sort}&search=${search}&filter=${filter}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setCapsules(data))
      .catch((err) => console.error(err));
  }, [sort, search, filter]);

  const handleDelete = async (id) => {
    await fetch(`https://dearfutureme-9rng.onrender.com/api/capsules/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setCapsules(capsules.filter((c) => c._id !== id));  // 화면에서도 제거 (새로고침)
  }

  return (
      <div className="capsules-container">
        <h1>My Capsules</h1>
        <button className="btn-sort" onClick={() => setSort(sort === "desc" ? "asc" : "desc")}>
          {sort === "desc" ? "newest" : "oldest"}
        </button>
        <input 
          className="search-input"
          type="text" 
          placeholder="🔎 Search..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-sort" onClick={() => {
          if(filter === "") setFilter("opened");
          else if(filter === "opened") setFilter("locked");
          else setFilter("");
        }}>
          {filter === "" ? "All" : filter === "opened" ? "opened" : "locked"}
        </button>
        
        {capsules.map((capsule) => (
          <div key={capsule._id} className="capsule-card">
            <div>
              <h3>{capsule.isOpened ? "🔓" : "🔒"} {capsule.title}</h3>
              <p>{new Date(capsule.openDate).toLocaleDateString()}</p>
            </div>
            <div>
              {capsule.isOpened && (
                <button className="btn-open" onClick={() => navigate(`/capsules/${capsule._id}`)}>Open</button>
              )}
              <button className="btn-delete" onClick={() => handleDelete(capsule._id)}>Delete</button>
            </div>
          </div>
        ))}
        <button className="btn-new" onClick={() => navigate("/capsules/new")}>New Capsule</button>
      </div>
  );
}

export default Capsules;