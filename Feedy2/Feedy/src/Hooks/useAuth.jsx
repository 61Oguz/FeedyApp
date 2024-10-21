import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data from localStorage and set the user state when the hook is initialized
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      fetchUserData(storedUserId); // Fetch user data if userId exists in localStorage
    }
  }, []); // Only run on component mount

  // Function to fetch user data by userId
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/${userId}`,
      );
      setUser(response.data); // Set the fetched user data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to refresh user data (can be called after profile updates)
  const refreshUserData = async () => {
    if (user) {
      await fetchUserData(user.userId); // Re-fetch user data based on the current user
    }
  };

  // Function to handle user logout (for convenience)
  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUser(null); // Reset user state to null after logout
    navigate("/");
  };

  // Return the user object and utility functions
  return { user, setUser, handleLogout, refreshUserData };
};

export default useAuth;
