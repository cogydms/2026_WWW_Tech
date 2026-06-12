import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState(""); //이메일 저장 공간
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    console.log(data);  // 일단 콘솔에 찍어보기
    if(data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/capsules"; //로그인하면 페이지 새로고침해서 nav가 보여
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
      <h1>Login</h1>

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

      <button onClick={handleLogin}>next</button>
      <button onClick={() => navigate("/signup")}>Signup</button>
    </div>
  );
}



export default Login;