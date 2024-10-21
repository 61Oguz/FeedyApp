import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth.jsx";
import { BsArrowLeftRight } from "react-icons/bs";
import { CgToggleSquare } from "react-icons/cg";
import { CgToggleSquareOff } from "react-icons/cg";
import useMaintenanceCalories from "../../../Hooks/useMaintenanceCalories.jsx";

const DefaultSideBar = ({ user, logout, onToggle }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const dailyCalorieNeed = useMaintenanceCalories(user);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-logo-container">
        <img
          onClick={() => {
            navigate("/welcome");
          }}
          src={"../src/assets/logoRound.png"}
          className="sidebar-logo"
          alt="Logo"
        />
      </div>
      {isOpen && (
        <div>
          <div className="sideBar-info">
            <p
              style={{
                color: "white",
                fontFamily: "time",
              }}
            >
              {capitalizeFirstLetter(user.userName.split(" ")[0])} &nbsp;
              |&nbsp; Age: {user.age} &nbsp;{" "}
            </p>
            <p
              style={{
                color: "white",
                fontFamily: "time",
              }}
            >
              {user.sex} &nbsp; | &nbsp;{user.height}cm &nbsp; {user.weight}kg{" "}
            </p>{" "}
            <p
              style={{
                color: "white",
                fontFamily: "time",
              }}
            >
              D. Calories: {dailyCalorieNeed}{" "}
            </p>
          </div>
          <hr className="sidebar-divider" />

          <button
            className="sidebar-buttons"
            onClick={() => navigate("/welcome")}
          >
            Home
          </button>

          <button
            className="sidebar-buttons"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>

          <button
            className="sidebar-buttons"
            onClick={() => navigate("/foodlog")}
          >
            FoodLog
          </button>

          <button
            className="sidebar-buttons"
            onClick={() => navigate("/education")}
          >
            Info
          </button>

          <button className="sidebar-buttons" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
        {isOpen ? (
          <CgToggleSquare size={34} />
        ) : (
          <CgToggleSquareOff size={34} />
        )}
      </button>
    </div>
  );
};

export default DefaultSideBar;
