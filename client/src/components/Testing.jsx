import React, { useState } from "react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Testing() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");
  const [saw, setRaw] = useState();

  const handleGenerateContent = async () => {
    // Access your API key as an environment variable
    const apiKey = "AIzaSyDhccoW-CYWaCCYo1Tr_J9xiogDbSGGdko";
    const genAI = new GoogleGenerativeAI(apiKey);

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
      const result = await model.generateContent(
        `create a story on ${userInput}. Then after teh story create 5 prompts for image generation related to the story, it should me seperated with story via '$' and each prompt should end by '|'. Don't write anything else like Image Generation Prompts:,prompt numbers  etc, just | is enough`
      );
      const response = await result.response;
      const generatedText = response.candidates[0].content.parts[0].text;
      setResult(generatedText);
      console.log(generatedText);
      let paragraphs = generatedText
        .split("$")
        .filter((para) => !para.includes("$ |"));

      // Concatenate the paragraphs using a delimiter of your choice (e.g., "\n" for a new line)
      let concatenatedData = paragraphs.join("\n");

      console.log({ concatenatedData });
      try {
        const response = await axios.post(
          "https://1449-34-124-233-191.ngrok-free.app/api/generate-image/",
          {
            data: JSON.stringify(concatenatedData),
          },
          {
            responseType: "json",
            headers: {
              "ngrok-skip-browser-warning": "true",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        if (response.status === 200) {
          const base64Data = response.data;
          setRaw(base64Data);
        }
      } catch (error) {
        console.error("Error generating video:", error);
      }
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  return (
    <div>
      <h1>Google Generative AI Demo</h1>
      <label>
        Enter a prompt:
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </label>
      <button onClick={handleGenerateContent}>Generate Content</button>
      {
        <div>
          <h2>Generated Content:</h2>
          <p>{result}</p>
        </div>
      }
    </div>
  );
}

export default Testing;
