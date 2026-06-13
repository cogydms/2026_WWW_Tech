import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState(""); //이메일 저장 공간
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const response = await fetch("https://dearfutureme-9rng.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });
    const data = await response.json();
    console.log(data);  // 일단 콘솔에 찍어보기
    if(data.email) {
        navigate("/login");
    }
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
      <h1>Signup</h1>

      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} //입력하면 이메일 상태가 바뀜
      />

      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} //입력하면 이메일 상태가 바뀜
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Submit</button>
    </div>
  );
}



export default Signup;