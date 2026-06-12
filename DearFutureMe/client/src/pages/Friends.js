import { useState, useEffect } from 'react';
import "./Friends.css";
import { useNavigate } from "react-router-dom";

function Friends() {
    const [friends, setFriends] = useState([]);
    const [friendId, setFriendId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:3000/api/friends", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => res.json())
        .then((data) => setFriends(data))
        .catch((err) => console.error(err));
    }, []);

    const handleAddFriend = async () => {
        if(!friendId) {
            alert("Enter the email!");
            return;
        }
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/friends`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify({ email: friendId })  // ← fetch 안에
        });
        const data = await response.json();
        console.log(data);
        if(data.friend) {
            setFriends([...friends, data.friend]);
        } else {
            alert(data.message);
        }
    }

    return (
        <div className="friends-container">
            <h1>Friends</h1>
            {friends.map((friend) => (
                <div key={friend._id} className="friend-card">
                    <p>{friend.username}</p>
                    <button onClick={() => navigate(`/friends/${friend._id}/capsules`, { state: { username: friend.username } })}>View Capsules</button>
                </div>
            ))}
            <div className="add-friend">
                <input 
                    type="text" 
                    placeholder="Enter friend's email" 
                    value={friendId}
                    onChange={(e) => setFriendId(e.target.value)}
                />
                <button onClick={handleAddFriend}>Add Friend</button>
            </div>
        </div>
    );
}

export default Friends;