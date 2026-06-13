import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import "./Capsules.css";

function FriendCapsules() {
    const {id} = useParams();  // URL에서 id 가져오기
    const [capsules, setCapsules] = useState([]); 
    const navigate = useNavigate();
    const location = useLocation(); // id 말고 추가 정보를 넘길 때 사용 
    const username = location.state?.username;


    useEffect(() => {
    const token = localStorage.getItem("token");
    
    fetch(`https://dearfutureme-9rng.onrender.com/api/friends/${id}/capsules`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setCapsules(data))
      .catch((err) => console.error(err));
  }, [id]);

    return (
        <div className="capsules-container">
            <h1>{username}'s Capsules</h1>
            {capsules.map((capsule) => (
                <div key={capsule._id} className="capsule-card">
                    <div>
                        <h3>🔓 {capsule.title}</h3>
                        <p>{new Date(capsule.openDate).toLocaleDateString()}</p>
                    </div>
                    <button className="btn-open" onClick={() => navigate(`/capsules/${capsule._id}`)}>Open</button>
                </div>
            ))}
        </div>
    );
}

export default FriendCapsules;