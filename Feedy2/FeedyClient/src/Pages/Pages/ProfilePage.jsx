import React from "react";
import axios from "axios";
import "../styles/ProfilePage.css";
import DefaultSideBar from "../Components/GeneralComponents/DefaultSideBar.jsx";
import { FaUser } from "react-icons/fa";
import Header from "../Components/GeneralComponents/Header.jsx";
import useAuth from "../../Hooks/useAuth.jsx";

const ProfilePage = () => {
  const { user, handleLogout } = useAuth();
  if (!user) {
    return <div>Loading...</div>;
  }

  const maintanenceCalories = (user) => {
    // Using Mifflin-St Jeor Equation for maintenance calories
    const BMR =
      10 * user.weight +
      6.25 * user.height -
      5 * user.age +
      (user.sex === "male" ? 5 : -161);
    const maintenanceCalories = BMR * 1.55; // Assuming moderate activity level
    return Math.round(maintenanceCalories);
  };

  return (
    <div>
      <Header logout={handleLogout} user={user} />
      <DefaultSideBar user={user} logout={handleLogout} />

      <div className={"profile-wrapper"}>
        <form action="">
          <h1>User Profile</h1>
          <div className={"input-box"}>
            <input
              type={"text"}
              placeholder={"Username"}
              value={user.userName}
              readOnly
            />
            <FaUser className={"icon1"} />
          </div>
          <div className={"input-box"}>
            <input
              type={"text"}
              placeholder={"Email"}
              value={user.userEmail}
              readOnly
            />
            <FaUser className={"icon1"} />
          </div>
          <div className={"input-box"}>
            <input
              type={"text"}
              placeholder={"Age"}
              value={user.age}
              readOnly
            />
            <FaUser className={"icon1"} />
          </div>   <div className={"input-box"}>
            <input
              type={"text"}
              placeholder={"Sex"}
              value={user.sex}
              readOnly
            />
            <FaUser className={"icon1"} />
          </div>
          <div className={"input-box"}>
            <input
              type={"text"}
              placeholder={"Height"}
              value={user.height}
              readOnly
            />
            <FaUser className={"icon1"} />
          </div>
          <div className={"input-box"}>
            <input
              type={"text"}
              placeholder={"Weight"}
              value={user.weight}
              readOnly
            />
            <FaUser className={"icon1"} />
          </div>
          <div className={"input-box"}>
            <input
              type={"text"}
              placeholder={"Maintenance Calories"}
              value={maintanenceCalories(user)}
              
            />
            <FaUser className={"icon1"} />
          </div>
          <button>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
