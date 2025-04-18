import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutoRedirector = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home"); // If token exists, redirect to home
    } else {
      navigate("/start"); // If not, go to landing page
    }
  }, [navigate]);

  return null;
};

export default AutoRedirector;
