import React, { useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/custom-video.module.css";
import Options from "../components/Options";
import axios from "axios";

function CustomVideo() {
  const [optionsValue, setOptionsValue] = useState({
    audio: false,
    length: 2,
    prompt: "",
  });
  const [rawData, setRaw] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleGenerate = async () => {
    setLoading(true);
    console.log(optionsValue);
    try {
      const response = await axios.post(
        "https://0b81-34-83-12-70.ngrok-free.app/api/generate-video/",
        {
          audio: optionsValue.audio,
          length: optionsValue.length,
          prompt: optionsValue.prompt,
        },
        {
          responseType: "json",
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.status === 200) {
        const base64Data = response.data;
        setRaw(base64Data);
        setLoading(true);
      }
    } catch (error) {
      console.error("Error generating video:", error);
    }
  };

  return (
    <div className={styles["custom-video"]}>
      <Navbar />
      <section className={styles["video-controls"]}>
        <div className={styles["container"]}>
          <textarea
            onChange={(e) =>
              setOptionsValue({ ...optionsValue, prompt: e.target.value })
            }
            value={optionsValue.prompt}
            className={styles["story-input"]}
            placeholder="Enter Your Story Here"
          />
          <button
            onClick={handleGenerate}
            className={styles["generate-button"]}
          >
            Generate
          </button>
        </div>
        <div className={styles["select-options"]}>
          <Options
            optionsValue={optionsValue}
            setOptionsValue={setOptionsValue}
          />
        </div>
      </section>
      <section className={styles["generated-video"]}>
        <h1>Your Generated Video </h1>
        <div className={styles["video-placeholder"]}>
          {rawData && (
            <video
              height={550}
              width={"100%"}
              className={styles["video"]}
              src={rawData ? rawData.toString() : ""}
              controls
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default CustomVideo;
