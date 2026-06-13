import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateCapsule(){
    const [title, setTitle] = useState(""); //이메일 저장 공간
    const [content, setContent] = useState("");
    const [openDate, setOpenDate] = useState("");

    const navigate = useNavigate();

    const handleCreate = async () => {
    const response = await fetch("https://dearfutureme-9rng.onrender.com/api/capsules", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ title, content, openDate })
    });
    const data = await response.json();
    console.log(data);
    navigate("/capsules");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "350px",
        margin: "100px auto",
      }}
    >
      <h1>New Capsule</h1>

      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} //입력하면 이메일 상태가 바뀜
      />

      <textarea 
        placeholder="Write the content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
            height: "200px",
            resize: "none",
            fontFamily: "Patrick Hand, cursive",
            fontSize: "1.2rem",
            backgroundColor: "#fffdee",
            color: "#070504",
            border: "1px solid #a08060",
            borderRadius: "4px",
            padding: "15px"
        }}
      />

      <input
        type="date"
        placeholder="open date"
        value={openDate}
        min={new Date().toISOString().split("T")[0]} //오늘 날짜 이전 선택 불가
        onChange={(e) => setOpenDate(e.target.value)}
      />

      <button onClick={handleCreate}>Save</button>
    </div>
  );
}
export default CreateCapsule;