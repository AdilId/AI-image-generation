import "./Header.css";
import { logo } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");

    await axios
      .get("http://127.0.0.1:8000/api/logout", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("logged");
        localStorage.removeItem("owner");
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <div className="links">
        {!localStorage.getItem("logged") ? (
          <>
            <Link to="register">Register</Link>
            <Link to="login">Login</Link>
          </>
        ) : null}
        {localStorage.getItem("logged") ? (
          <>
            <Link to="generate">Generate</Link>
            <Link to="profile">Profile</Link>
            <button onClick={() => handleLogout()}>Logout</button>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
