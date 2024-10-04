import { useEffect, useState } from "react";
import "./UpdatePost.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/posts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setPost(response.data.post);
        setPrompt(response.data.post.prompt);
      } catch (error) {
        console.log(error.messaage);
      }
    };

    fetchPost();
  }, [id, accessToken]);

  const handleGenerate = async () => {
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
        setIsLoading(false);
        setImage(response.data);
      })
      .catch((err) => console.log(err.message));
  };

  const handleUpdate = async (id) => {
    if (image.startsWith("http")) {
      await axios
        .put(
          `http://127.0.0.1:8000/api/posts/${id}`,

          {
            prompt,
            image_url: image,
          },

          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => navigate(`/posts/${post.id}/show`))
        .catch((err) => console.log(err.messaage));
    } else {
      if (prompt === post.prompt) {
        navigate(`/posts/${post.id}/show`);
      } else {
        await axios
          .put(
            `http://127.0.0.1:8000/api/posts/${id}`,

            {
              prompt,
            },

            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => navigate(`/posts/${post.id}/show`))
          .catch((err) => console.log(err.messaage));
      }
    }
  };

  return (
    <div className="update-container">
      {post ? (
        <form className="update-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          {isLoading ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : image ? (
            <img src={image} alt="" />
          ) : (
            <img
              src={`http://127.0.0.1:8000/images/${post.image_url}`}
              alt=""
            />
          )}
          <button onClick={() => handleGenerate()}>Generate</button>
          <button onClick={() => handleUpdate(id)}>Update</button>
        </form>
      ) : null}
    </div>
  );
};

export default UpdatePost;
