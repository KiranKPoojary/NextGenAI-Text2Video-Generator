import React from "react";
import styles from "../styles/video-container.module.css";

function VideoContainer({ videoUrl }) {
  return (
    <div className={styles["video-placeholder"]}>
      <video width={450} height={300} controls src={videoUrl}></video>
    </div>
  );
}

export default VideoContainer;
