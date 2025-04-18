import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "../pages/Start";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import OTPVerification from "../pages/OTPVerification";
import HomeProtector from "../pages/HomeProtector";
import AutoRedirector from "../pages/AutoRedirector";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AutoRedirector />} />
        <Route path="/start" element={<Start />} />
        <Route
          path="/home"
          element={
            <HomeProtector>
              <Home />
            </HomeProtector>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
