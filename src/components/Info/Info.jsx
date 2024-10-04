import "./Info.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const Info = ({ profile }) => {
  return (
    <div className="Info">
      <div className="img">
        {profile.image_url ? (
          <img
            src={`http://127.0.0.1:8000/images/usersImages/${profile.image_url}`}
            alt=""
          />
        ) : (
          <div className="circle">{profile.name.charAt(0)}</div>
        )}
        <Link to={`update-img/${profile.id}`}>
          {" "}
          <FontAwesomeIcon icon={faPencil} />
        </Link>
      </div>
      <div className="name">
        <span>Username</span>
        <p>{profile.name}</p>
      </div>
      <div className="email">
        <span>Email</span>
        <p>{profile.email}</p>
      </div>
      <div className="password">
        <span>Password</span>
        <Link to={`update-password/${profile.id}`}>Update</Link>
      </div>
    </div>
  );
};

export default Info;
