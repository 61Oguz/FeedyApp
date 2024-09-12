import React from "react";
import {useNavigate} from "react-router-dom";
import "../../styles/Header.css";
import PropTypes from "prop-types";

const Header = ({user, logout, isSidebarOpen}) => {
    console.log("User in Header:", user); // Add this line for debugging
    console.log("Logout function in Header:", logout); // Add t

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    return (
        <div className={`header-header ${isSidebarOpen ? "" : "sidebar-closed"}`}>
            <div className="header-user-info">
                <div className="header-right">
          <span className="user-name">
            {user
                ? `Hey, ${capitalizeFirstLetter(user.userName.split(" ")[0])}!`
                : "Loading..."}
          </span>
                    <button className="logout-button" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );

    Header.propTypes = {
        user: PropTypes.object,
        logout: PropTypes.func.isRequired,
    };
};

export default Header;
