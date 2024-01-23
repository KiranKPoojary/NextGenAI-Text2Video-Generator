import React from "react";
import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className={styles["navbar"]}>
      <div className={styles["navbar-left"]}>
        <h3>NextGen AI</h3>
      </div>
      <div className={styles["navbar-right"]}>
        <ul>
          <li>
            <Link to={`/home`}>Home</Link>
          </li>
          <li>
            <Link to={`/hello`}>Generate</Link>
          </li>
          <li>
            <Link to={`/custom-video`}>Custom Videos</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
