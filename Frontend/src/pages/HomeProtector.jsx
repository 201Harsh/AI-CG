import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/Axios";
import { UserDataContext } from "../context/UserContext";

const HomeProtector = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const { setuser } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      if (!token) {
        navigate("/register");
        return;
      }

      try {
        const res = await axios.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          setuser(res.data);
        } else {
          localStorage.removeItem("token");
          navigate("/register");
        }
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/register");
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [token, navigate, setuser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default HomeProtector;
