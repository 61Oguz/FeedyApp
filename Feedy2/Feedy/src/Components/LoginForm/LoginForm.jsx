import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {FaLock, FaUser} from "react-icons/fa";
import axios from "axios";

const LoginForm = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/user/login", {
                userEmail: userEmail,
                userPassword: userPassword,
            }).then((response) => {
                console.log(response.data);

                if (response.data.message === "Email does not exits int the System. Try to register.") {
                    alert("Email not exits");
                } else if (response.data.message === "Login Success") {
                    navigate('/welcome');
                } else {
                    alert("Incorrect Email and Password not match");
                }
            }, fail => {
                console.error(fail); // Error!
            });
        } catch (err) {
            alert(err);
        }

    }

    return (
        <>
            <div className={"logo-container"}>
                <img src="../../../public/FeedyLogo.png" className="logo"/>
            </div>

            <div className={"wrapper"}>

                <form action="">
                    <h1>Login</h1>
                    <div className={"input-box"}>
                        <input type={"text"}
                               placeholder={"User E-mail"}
                               value={userEmail}
                               onChange={(event) => {
                                   setUserEmail(event.target.value)
                               }}
                        />
                        <FaUser className={"icon"}/>
                    </div>
                    <div className={"input-box"}>
                        <input type={"password"}
                               placeholder={"Password"}
                               value={userPassword}
                               onChange={event => {
                                   setUserPassword(event.target.value)
                               }}
                        />
                        <FaLock className={"icon"}/>
                    </div>
                    <button type={"submit"}
                     onClick={login}> Login</button>
                    <div className={"register-link"}>
                        <p>Don´t you have an Account yet? <a href={"/register"}>Register Now.</a></p>

                    </div>
                </form>
            </div>
        </>
    );
};

export default LoginForm;