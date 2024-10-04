import "./Login.css";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://127.0.0.1:8000/api/login", {
        email,
        password: pwd,
      })
      .then((res) => {
        if (!res.data.token) {
          throw Error("Email or password is incorrect.");
        }
        localStorage.setItem("accessToken", res.data.token);
        localStorage.setItem("logged", true);
        localStorage.setItem("owner", res.data.owner.id);
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <section>
      <>
        <h1>Login</h1>
        {error ? <div className="error-login">{error}</div> : null}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">email:</label>
          <input
            id="email"
            ref={emailRef}
            type="email"
            autoComplete="off"
            required
            aria-describedby="unote"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="pwd">password:</label>
          <input
            id="pwd"
            type="password"
            required
            aria-describedby="pwdnote"
            onChange={(e) => setPwd(e.target.value)}
          />
          <button>Log In</button>
        </form>
      </>
    </section>
  );
};

export default Login;
