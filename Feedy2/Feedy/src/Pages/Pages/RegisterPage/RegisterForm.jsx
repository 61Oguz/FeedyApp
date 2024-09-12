import React, {useState} from "react";
import {FaLock, FaUser} from "react-icons/fa";
import "../../styles/RegisterForm.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "primereact/dropdown";


const RegisterForm = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [sex, setSex] = useState("");
    const Sexes = ["Male", "Female"];
    const [activityLevel, setActivityLevel] = useState("");
    const activityLevels = ["1", "2", "3", "4", "5"];


    async function save(event) {
        event.preventDefault();
        try {
            await axios
                .post("http://localhost:8080/api/user/save", {
                    userName: userName,
                    userEmail: userEmail,
                    userPassword: userPassword,
                    age: age,
                    sex: sex,
                    height: height,
                    weight: weight,
                    activityLevel: activityLevel
                })
                .then((response) => {
                    console.log(response.data);
                    const userId = response.data;
                    localStorage.setItem("userId", userId);
                    alert("User Registation Successfully");
                    navigate("/welcome");
                });
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div>
            <div className={"logo-container"}>
                <img src="../../../../public/FeedyLogo.png" className="logo"/>
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
                        <FaUser className={"icon1"}/>
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
                        <FaUser className={"icon1"}/>
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
                        <FaLock className={"icon1"}/>
                    </div>
                    <div>

                        <Dropdown className={"drop-down"}
                                  value={sex}
                                  onChange={(e) => setSex(e.value)}
                                  options={Sexes}
                                  optionLabel="Sex"
                                  placeholder="Sex"
                                  checkmark={true}
                                  highlightOnSelect={true}
                                  variant={"filled"}
                                  style={{

                                  }}
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
                        <FaLock className={"icon1"}/>
                    </div>
                    <div className={"input-box"}>
                        <input
                            type={"text"}
                            placeholder={" Current Height"}
                            value={height}
                            onChange={(event) => {
                                setHeight(event.target.value);
                            }}
                        />
                        <FaLock className={"icon1"}/>
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
                        <FaLock className={"icon1"}/>
                    </div>
                    <div>
                        <Dropdown
                            value={activityLevel}
                            onChange={(e) => setActivityLevel(e.value)}
                            options={activityLevels}
                            optionLabel="Sex"
                            placeholder="Activity Level"
                            className="drop-down"
                            checkmark={true}
                            highlightOnSelect={false}
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
