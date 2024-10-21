import React, { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import "../../styles/RegisterForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [sex, setSex] = useState(null);
  const [activityLevel, setActivityLevel] = useState(null);

  const Sexes = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const activityLevels = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

  async function save(event) {
    event.preventDefault();
    try {
      await axios
        .post("http://localhost:8080/api/user/save", {
          userName: userName,
          userEmail: userEmail,
          userPassword: userPassword,
          age: age,
          sex: sex ? sex.value : "",
          height: height,
          weight: weight,
          activityLevel: activityLevel ? activityLevel.value : "",
        })
        .then((response) => {
          console.log(response.data);
          const userId = response.data;
          localStorage.setItem("userId", userId);
          alert("User Registration Successfully");
          navigate("/welcome");
        });
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <div className={"logo-container"}>
        <img src="../../../../public/FeedyLogo.png" className="logo" />
      </div>
      <div className={"register-wrapper"}>
        <form action="../RegisterPage/RegisterForm.jsx">
          <h1>Register</h1>
          <div className={"input-box"}>
            <input
              type={"text"}
              placeholder={"Username"}
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
            <FaUser className={"icon1"} />
          </div>
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

          {/* React-Select for Sex */}
          <div className="select-wrapper">
            <Select
              value={sex}
              onChange={setSex}
              options={Sexes}
              placeholder="Sex"
              classNamePrefix="react-select"
            />
          </div>

          <div className={"input-box"}>
            <input
              type={"text"}
              placeholder={"Age"}
              value={age}
              onChange={(event) => {
                setAge(event.target.value);
              }}
            />
          </div>
          <div className={"input-box"}>
            <input
              type={"text"}
              placeholder={"Current Height"}
              value={height}
              onChange={(event) => {
                setHeight(event.target.value);
              }}
            />
          </div>
          <div className={"input-box"}>
            <input
              type={"text"}
              placeholder={"Current Weight"}
              value={weight}
              onChange={(event) => {
                setWeight(event.target.value);
              }}
            />
          </div>

          {/* React-Select for Activity Level */}
          <div className="select-wrapper">
            <Select
              value={activityLevel}
              onChange={setActivityLevel}
              options={activityLevels}
              placeholder="Activity Level"
              classNamePrefix="react-select"
            />
          </div>

          <button type={"submit"} onClick={save}>
            Register
          </button>
          <div className={"register-link"}>
            <p>
              Already have an Account? <a href={"/"}>Login.</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
