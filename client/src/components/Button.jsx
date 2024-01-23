import React from "react";
import styles from "../styles/button.module.css";
function Button({ handleClick, value }) {
  return (
    <button onClick={handleClick} className={styles["login-button"]}>
      {value}
    </button>
  );
}

export default Button;
