import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import DefaultSideBar from "../Components/GeneralComponents/DefaultSideBar.jsx";
import Header from "../Components/GeneralComponents/Header.jsx";
import useAuth from "../../Hooks/useAuth.jsx";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const { user, handleLogout, refreshUserData } = useAuth(); // Import user and refreshUserData
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    age: "",
    sex: "",
    height: "",
    weight: "",
  });

  const [isFormModified, setIsFormModified] = useState(false); // Track if the form is modified
  const [highlightedField, setHighlightedField] = useState(null); // Track the focused field for highlighting

  // Update formData whenever the user data is available
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
  }, [user]); // This effect runs whenever the user data changes

  // Function to calculate maintenance calories (for display)
  const maintanenceCalories = () => {
    const BMR =
      10 * formData.weight +
      6.25 * formData.height -
      5 * formData.age +
      (formData.sex === "male" ? 5 : -161); // Adjust for sex
    return Math.round(BMR * 1.55); // Assuming moderate activity level
  };

  // Handle input changes and track modifications
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Check if the form is modified compared to the initial user data
    if (user) {
      setIsFormModified(true);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API request to update user data
      await axios.put(
        `http://localhost:8080/api/user/${user.userId}`,
        formData,
      );
      alert("Profile updated successfully!");

      // Refresh user data in global state after updating the profile
      await refreshUserData();
      setIsFormModified(false); // Reset form modification state after saving
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating profile");
    }
  };

  // Highlight input field when focused
  const handleFocus = (fieldName) => {
    setHighlightedField(fieldName);
  };

  // Remove highlight when input loses focus
  const handleBlur = () => {
    setHighlightedField(null);
  };

  // Show loading text if the user data hasn't loaded yet
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header logout={handleLogout} user={user} />
      <DefaultSideBar user={user} logout={handleLogout} />

      <div className="profile-wrapper">
        <form onSubmit={handleSubmit}>
          <h1>User Profile</h1>

          {/* Username Input */}
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

          {/* Email Input */}
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

          {/* Age Input */}
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

          {/* Sex Input */}
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

          {/* Height Input */}
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

          {/* Weight Input */}
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

          {/* Maintenance Calories Display */}
          <div className="input-box">
            <input
              type="text"
              placeholder="Maintenance Calories"
              value={maintanenceCalories()}
              readOnly
            />
            <FaUser className="icon1" />
          </div>

          {/* Save Changes Button */}
          <button type="submit" disabled={!isFormModified}>
            {" "}
            {/* Disable until form is modified */}
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
