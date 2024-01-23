import React, { useState } from "react";
import styles from "../styles/login.module.css";
import Button from "../components/Button.jsx";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        {
          email: email,
          password: password,
        },
        {
          responseType: "json",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        navigate("/home");
      }
    } catch (error) {
      alert("enter valid details");
    }
  };

  return (
    <div className={styles["input-fields"]}>
      <div className={styles["login-container"]}>
        <h1>NextGen AIs</h1>
        <p className={styles["login-heading"]}>Login</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button value={"Login"} handleClick={handleLogin} />

        <p>
          <Link to={`/signup`}>Don’t have Account ? Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
