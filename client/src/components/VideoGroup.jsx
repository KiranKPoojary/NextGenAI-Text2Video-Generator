import React from "react";
import styles from "../styles/video-group.module.css";
import VideoContainer from "./VideoContainer";
function VideoGroup({ data }) {
  return (
    <div className={styles["video-placeholders"]}>
      {data.map((video, index) => (
        <VideoContainer key={index} videoUrl={video} />
      ))}
    </div>
  );
}

export default VideoGroup;
