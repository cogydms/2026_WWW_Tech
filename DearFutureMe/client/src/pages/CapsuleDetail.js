import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./CapsuleDetail.css";

function CapsuleDetail() {
  const { id } = useParams();

  const [capsule, setCapsule] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");
  const payload = JSON.parse(atob(token.split(".")[1]));
  const myId = payload.id;

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`https://dearfutureme-9rng.onrender.com/api/capsules/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCapsule(data);
        setContent(data.content);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://dearfutureme-9rng.onrender.com/api/capsules/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content,
          }),
        }
      );

      const updatedCapsule = await res.json();

      setCapsule(updatedCapsule);
      setIsEditing(false);

      alert("Modified!");
    } catch (err) {
      console.error(err);
    }
  };

  if (!capsule) return <div>로딩 중...</div>;

  return (
    <div className="letter-container">
      <h1>{capsule.title}</h1>

      <p className="date">
        {new Date(capsule.openDate).toLocaleDateString()}
      </p>

      {isEditing ? (
        <textarea
          className="content-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <p className="content">{capsule.content}</p>
      )}

      <div className="button-container">
        {isEditing ? (
          <>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel </button>
          </>
        ) : (
          myId === capsule.userId &&
          <button onClick={() => setIsEditing(true)}>Update</button>
        )}
      </div>
    </div>
  );
}

export default CapsuleDetail;