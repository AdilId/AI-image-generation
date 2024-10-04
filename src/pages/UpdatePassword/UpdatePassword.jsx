import "./UpdatePassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdatePassword = () => {
  const [error, setError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const handleUpdate = async () => {
    await axios
      .put(
        `http://127.0.0.1:8000/api/profile/update`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        navigate("/profile");
      })
      .catch((err) => {
        setError("Wrong password or incorrect new password format.");
      });
  };

  return (
    <div className="password-container">
      <form className="update-password" onSubmit={(e) => e.preventDefault()}>
        <label>Current password:</label>
        <input
          type="text"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        {error ? <div className="p-error">{error}</div> : null}
        <label>New password:</label>
        <input
          type="text"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          disabled={!currentPassword || !newPassword}
          onClick={() => handleUpdate()}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
