import "./Register.css";

import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,16}$/;
const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

const Register = () => {
  const userRef = useRef();
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [image, setImage] = useState(null);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidUser(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = matchPwd === pwd;
    setValidMatchPwd(match);
  }, [pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://127.0.0.1:8000/api/register",
        {
          name: user,
          email,
          password: pwd,
          password_confirmation: matchPwd,
          image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        setUser("");
        setPwd("");
        setEmail("");
        setMatchPwd("");
        setErrMsg("This email is used.");
      });
  };

  return (
    <section>
      <>
        <h1>Register</h1>
        {errMsg ? <div className="errmsg">{errMsg}</div> : null}
        <form onSubmit={handleSubmit}>
          <label htmlFor="user">
            username:
            <span className={!user || validUser ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <span className={validUser ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
          </label>
          <input
            id="user"
            ref={userRef}
            type="text"
            autoComplete="off"
            required
            value={user}
            onChange={(e) => setUser(e.target.value)}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            className={
              userFocus && user && !validUser ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
          <label htmlFor="email">
            email:
            <span className={!email || validEmail ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <span className={validEmail ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
          </label>
          <input
            id="email"
            type="text"
            autoComplete="off"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            className={
              emailFocus && email && !validEmail ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Should match the email format.
          </p>
          <label htmlFor="pwd">
            password:
            <span className={validPwd || !pwd ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <span className={validPwd ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
          </label>
          <input
            id="pwd"
            type="password"
            required
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters: ! @ # $ %
          </p>
          <label htmlFor="match">
            confirm password:
            <span className={validMatchPwd || !matchPwd ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <span className={matchPwd && validMatchPwd ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
          </label>
          <input
            id="match"
            type="password"
            required
            value={matchPwd}
            onChange={(e) => setMatchPwd(e.target.value)}
            onFocus={() => setMatchPwdFocus(true)}
            onBlur={() => setMatchPwdFocus(false)}
          />
          <p
            className={
              matchPwdFocus && !validMatchPwd ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Should match the password.
          </p>
          <div className="custom-file-upload">
            <label htmlFor="file-input">
              <i className="fas fa-upload"></i> Upload image
            </label>
            <input
              id="file-input"
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button
            disabled={!validUser || !validPwd || !validMatchPwd ? true : false}
          >
            Sign Up
          </button>
        </form>
      </>
    </section>
  );
};

export default Register;
