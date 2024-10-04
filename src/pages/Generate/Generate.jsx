import { useState } from "react";
import "./Generate.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "../../utils";

const Generate = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .post(
        "http://127.0.0.1:8000/api/generate",
        { prompt: prompt },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setImage(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
        setError(err.message);
      });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://127.0.0.1:8000/api/posts",
        { prompt: prompt, image_url: image },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSuggestions = (e) => {
    e.preventDefault();
    const randomPrompt = getRandomPrompt(prompt);
    setPrompt(randomPrompt);
  };

  return (
    <form className="generate">
      <input
        type="text"
        placeholder="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={(e) => handleSuggestions(e)}>Suggestions</button>

      {image && !isLoading ? (
        <>
          <img src={image} alt="" />
          <button onClick={(e) => handleSubmit(e)}>Regenerate</button>
          <button onClick={(e) => handleSave(e)}>Save</button>
        </>
      ) : (
        <>
          {isLoading ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <img src="http://127.0.0.1:8000/images/preview.png" alt="" />
          )}
          {prompt && !isLoading ? (
            <button onClick={(e) => handleSubmit(e)}>Generate</button>
          ) : null}
        </>
      )}
    </form>
  );
};

export default Generate;
