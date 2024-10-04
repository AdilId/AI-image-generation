import { useState } from "react";
import "./Profile.css";
import { useEffect } from "react";
import { Info } from "../../components";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fecthProfile = async () => {
      const accessToken = localStorage.getItem("accessToken");
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
          setIsLoading(false);
          setError(err.message);
        });
    };

    fecthProfile();
  }, []);

  return (
    <main>
      {isLoading ? (
        <div className="load">
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
        </div>
      ) : profile ? (
        <Info profile={profile} />
      ) : (
        <div className="error">{error}</div>
      )}
    </main>
  );
};

export default Profile;
