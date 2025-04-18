import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { UserDataContext } from "../context/UserContext";
import axios from "../config/Axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const Navigate = useNavigate();
  const { user, setuser } = useContext(UserDataContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const User = response.data;
        setuser(User.user);
        localStorage.setItem("token", User.token);
        toast.success("User Logged In! 🧔🏻‍♂️", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setTimeout(() => {
          Navigate("/home");
        }, 2000);
        setemail("");
        setPassword("");
      }
    } catch (err) {
      if (err.response.status === 400) {
        alert(err.response.data.msg);
      } else {
        alert("An error occurred while logging in. Please try again.");
      }
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Background Elements */}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      {/* Registration Form Container */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-2xl mx-4">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl mb-4">
            <FaUserPlus className="text-3xl sm:text-4xl text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
            Login to EndAI
          </h1>
          <p className="text-gray-300 text-center text-sm sm:text-base">
            Start generating code with EndAI
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-300 text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full bg-white/20 rounded-lg px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              placeholder="endgamingai2@gmail.com"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-gray-300 text-sm sm:text-base"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full bg-white/20 rounded-lg px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base pr-12"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-6 w-6" />
                ) : (
                  <EyeIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </form>

        {/* Footer Links */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-gray-400 text-sm sm:text-base">
            New Here? Create Account{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-purple-400 transition-colors"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
