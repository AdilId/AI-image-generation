import "./UpdateImg.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateImg = () => {
  const [profile, setProfile] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fecthProfile = async () => {
      setIsLoading(true);
      await axios
        .get(`http://127.0.0.1:8000/api/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setIsLoading(false);
          setProfile(res.data.profile);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    fecthProfile();
  }, [accessToken]);

  const handleUpdate = async () => {
    await axios
      .post(
        `http://127.0.0.1:8000/api/profile/updateImg`,
        { image: newImage },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      {isLoading ? (
        <div className="load">
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
        </div>
      ) : (
        <div className="image-update">
          <img
            src={`http://127.0.0.1:8000/images/usersImages/${profile.image_url}`}
            alt=""
          />
          <div className="custom-file-upload">
            <label htmlFor="file-input">
              <i className="fas fa-upload"></i>
              Upload
            </label>
            <input
              id="file-input"
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files[0])}
            />
          </div>
          <button onClick={() => handleUpdate()}>Update</button>
        </div>
      )}
    </>
  );
};

export default UpdateImg;
