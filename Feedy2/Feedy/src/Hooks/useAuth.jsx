import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:8080/api/user/${userId}`)
        .then((response) => {
          setUser(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("userId");
          navigate("/login");
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/");
  };

  return { user, handleLogout };
};

export default useAuth;
