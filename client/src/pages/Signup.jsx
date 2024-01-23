import React, { useState } from "react";
import styles from "../styles/login.module.css";
import Button from "../components/Button.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !name) {
      alert("enter the email address and password and name");
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/sign-up",
        {
          email,
          password,
          name,
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
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles["input-fields"]}>
      <div className={styles["login-container"]}>
        <h1>NextGen AIs</h1>
        <p className={styles["login-heading"]}>Sign Up</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button value={"Sign Up"} handleClick={handleSignup} />
        <p>Already have Account? Login here</p>
      </div>
    </div>
  );
}

export default Signup;
