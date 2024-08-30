import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LoginForm.css";
import { FaLock, FaUser } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import axios from "axios";

const LoginForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    try {
      await axios
        .post("http://localhost:8080/api/user/login", {
          userEmail: userEmail,
          userPassword: userPassword,
        })
        .then(
          (response) => {
            console.log(response.data);
            const { message, userId } = response.data;

            if (
              message === "Email does not exist in the System. Try to register."
            ) {
              alert("Email not exists");
            } else if (message === "Login Success") {
              localStorage.setItem("userId", userId);
              navigate("/welcome");
            } else {
              alert("Incorrect Email and Password do not match");
            }
          },
          (fail) => {
            console.error(fail);
          },
        );
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <div className={"logo-container"}>
        <img src="../../../../public/FeedyLogo.png" className="logo" />
      </div>

      <div className={"login-wrapper"}>
        <form action="Feedy/src/Pages/Pages/LoginPage/LoginForm.jsx">
          <h1>Login</h1>
          <div className={"input-box"}>
            <input
              type={"text"}
              placeholder={"User E-mail"}
              value={userEmail}
              onChange={(event) => {
                setUserEmail(event.target.value);
              }}
            />
            <FaUser className={"icon1"} />
          </div>
          <div className={"input-box"}>
            <input
              type={"password"}
              placeholder={"Password"}
              value={userPassword}
              onChange={(event) => {
                setUserPassword(event.target.value);
              }}
            />
            <FaLock className={"icon1"} />
          </div>
          <button type={"submit"} onClick={login}>
            Login <IoIosLogIn className={"icon2"} />
          </button>
          <div className={"register-link"}>
            <p>
              Don’t you have an Account yet?{" "}
              <a href={"/register"}>Register Now.</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
