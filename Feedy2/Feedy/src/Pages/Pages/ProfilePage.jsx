import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import DefaultSideBar from "../Components/GeneralComponents/DefaultSideBar.jsx";
import Header from "../Components/GeneralComponents/Header.jsx";
import useAuth from "../../Hooks/useAuth.jsx";
import "../styles/ProfilePage.css";
import "../styles/Header.css";
import useSidebar from "../../Hooks/useSidebar.jsx";

const ProfilePage = () => {
  const { isSidebarOpen, handleSidebarToggle } = useSidebar();
  const { user, handleLogout, refreshUserData } = useAuth();
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    age: "",
    sex: "",
    height: "",
    weight: "",
  });

  const [isFormModified, setIsFormModified] = useState(false);
  const [highlightedField, setHighlightedField] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName || "",
        userEmail: user.userEmail || "",
        age: user.age || "",
        sex: user.sex || "",
        height: user.height || "",
        weight: user.weight || "",
      });
    }
  }, [user]);

  const maintanenceCalories = () => {
    const BMR =
      10 * formData.weight +
      6.25 * formData.height -
      5 * formData.age +
      (formData.sex === "male" ? 5 : -161);
    return Math.round(BMR * 1.55);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (user) {
      setIsFormModified(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/user/${user.userId}`,
        formData,
      );
      alert("Profile updated successfully!");

      await refreshUserData();
      setIsFormModified(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating profile");
    }
  };

  const handleFocus = (fieldName) => {
    setHighlightedField(fieldName);
  };

  const handleBlur = () => {
    setHighlightedField(null);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header logout={handleLogout} user={user} isSidebarOpen={isSidebarOpen} />
      <DefaultSideBar user={user} logout={handleLogout} />

      <div className="profile-wrapper">
        <form onSubmit={handleSubmit}>
          <h1>User Profile</h1>
          <div className="input-box">
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
              onFocus={() => handleFocus("userName")}
              onBlur={handleBlur}
              className={highlightedField === "userName" ? "highlighted" : ""}
            />
            <FaUser className="icon1" />
          </div>

          <div className="input-box">
            <input
              type="email"
              name="userEmail"
              placeholder="Email"
              value={formData.userEmail}
              onChange={handleChange}
              onFocus={() => handleFocus("userEmail")}
              onBlur={handleBlur}
              className={highlightedField === "userEmail" ? "highlighted" : ""}
            />
            <FaUser className="icon1" />
          </div>

          <div className="input-box">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              onFocus={() => handleFocus("age")}
              onBlur={handleBlur}
              className={highlightedField === "age" ? "highlighted" : ""}
            />
            <FaUser className="icon1" />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="sex"
              placeholder="Sex"
              value={formData.sex}
              onChange={handleChange}
              onFocus={() => handleFocus("sex")}
              onBlur={handleBlur}
              className={highlightedField === "sex" ? "highlighted" : ""}
            />
            <FaUser className="icon1" />
          </div>

          <div className="input-box">
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              value={formData.height}
              onChange={handleChange}
              onFocus={() => handleFocus("height")}
              onBlur={handleBlur}
              className={highlightedField === "height" ? "highlighted" : ""}
            />
            <FaUser className="icon1" />
          </div>

          <div className="input-box">
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
              onFocus={() => handleFocus("weight")}
              onBlur={handleBlur}
              className={highlightedField === "weight" ? "highlighted" : ""}
            />
            <FaUser className="icon1" />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Maintenance Calories"
              value={maintanenceCalories()}
              readOnly
            />
            <FaUser className="icon1" />
          </div>

          <button type="submit" disabled={!isFormModified}>
            {" "}
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
