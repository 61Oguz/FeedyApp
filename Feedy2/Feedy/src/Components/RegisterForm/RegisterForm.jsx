import React, {useState} from 'react';
import {FaLock, FaUser} from "react-icons/fa";
import "./RegisterForm.css";
import axios from "axios" ;
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    async function saveUser(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/user/save", {
                userName: userName, userEmail: userEmail, userPassword: userPassword,
            });
            alert("User Registation Successfull");
            navigate("/welcome")
        } catch (err) {
            alert(err);
        }
    }

    return (<>
        <div className={"logo-container"}>
            <img src="../../../public/FeedyLogo.png" className="logo" alt="Feedy Logo"/>
        </div>

        <div className={"wrapper"}>
            <form action="">
                <h1>Register</h1>
                <div className={"input-box"}>
                    <input type={"text"}
                           placeholder={"Name"}
                           value={userName}
                           onChange={(event) => {
                               setUserName(event.target.value)
                           }}
                    />
                    <FaUser className={"icon"}/>
                </div>
                <div className={"input-box"}>
                    <input type={"text"}
                           placeholder={"E-mail"}
                           value={userEmail}
                           onChange={event => {setUserEmail(event.target.value)}}
                    />
                    <FaUser className={"icon"}/>
                </div>
                <div className={"input-box"}>
                    <input type={"password"}
                           placeholder={"Password"}
                           value={userPassword}
                           onChange={event => {setUserPassword(event.target.value)}}
                    />
                    <FaLock className={"icon"}/>
                </div>

                <button type={"submit"}
                        onClick={saveUser}
                > Register</button>
                <div className={"register-link"}>
                    <p>Already have an account? <a href={"/"}>Login Here.</a></p>
                </div>
            </form>
        </div>
    </>);
};

export default RegisterForm;
