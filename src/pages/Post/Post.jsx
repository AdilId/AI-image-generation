import { useState, useEffect } from "react";
import "./Post.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const Post = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const accessToken = localStorage.getItem("accessToken");
      setIsLoading(true);
      await axios
        .get(`http://127.0.0.1:8000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setPost(response.data.post);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error.message);
        });
    };

    fetchPost();
  }, [id, navigate]);

  const handleDelete = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.delete(`http://127.0.0.1:8000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data); // Log the error message sent by the backend
      } else {
        console.log(err.message);
      }
    }
  };

  return (
    <main className="post-container">
      {isLoading ? (
        <div className="load">
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
        </div>
      ) : post ? (
        <>
          <h2>
            This post is from
            {parseInt(localStorage.getItem("owner")) === post.user_id
              ? "You: "
              : ": "}
            {post.user.name}
          </h2>
          <img src={`http://127.0.0.1:8000/images/${post.image_url}`} alt="" />
          <p>{post.prompt}</p>
          {parseInt(localStorage.getItem("owner")) === post.user_id ? (
            <div className="actions">
              <Link to={`/posts/${post.id}/update`}>Update</Link>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="error">{error}</div>
      )}
    </main>
  );
};

export default Post;
