import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      fetchUserData(storedUserId);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/${userId}`,
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const refreshUserData = async () => {
    if (user) {
      await fetchUserData(user.userId);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/");
  };

  return { user, setUser, handleLogout, refreshUserData };
};

export default useAuth;
