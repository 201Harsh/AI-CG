import React, { useContext, useRef, useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OTPVerification = () => {
  const inputRefs = useRef([]);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);

  const { user, otp, setotp } = useContext(UserDataContext);
  const email = String(user.email);

  const Navigate = useNavigate();
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const updatedOtp = [...otpValues];
      updatedOtp[index] = value;
      setOtpValues(updatedOtp);

      // Move to next input if a digit is entered
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 4);
    if (/^[0-9]+$/.test(paste)) {
      const pasteArray = paste.split("");
      const updatedOtp = [...otpValues];
      pasteArray.forEach((digit, i) => {
        if (i < 4) {
          updatedOtp[i] = digit;
          if (inputRefs.current[i]) {
            inputRefs.current[i].value = digit;
          }
        }
      });
      setOtpValues(updatedOtp);
      if (pasteArray.length < 4) {
        inputRefs.current[pasteArray.length].focus();
      } else {
        inputRefs.current[3].blur();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullOtp = otpValues.join("");
    if (fullOtp === otp) {
      toast("Registered successfully! 🎉🧑", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setTimeout(() => {
        Navigate("/home");
      }, 2000);
      setotp("");
    } else {
      alert("Invalid OTP. Please try again.");
      setOtpValues(["", "", "", ""]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
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
        theme="colored"
        transition={Bounce}
      />
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl mb-4">
            <FaShieldAlt className="text-3xl sm:text-4xl text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
            Verify OTP
          </h1>
          <p className="text-gray-300 text-center text-sm sm:text-base">
            Enter the 4-digit code sent to your email{" "}
            <span className="font-lg font-bold text-pink-400">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className="flex justify-center gap-2 sm:gap-4"
            onPaste={handlePaste}
          >
            {[...Array(4)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-xl text-white text-2xl text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="•"
                autoComplete="one-time-code"
                autoFocus={index === 0}
                ref={(el) => (inputRefs.current[index] = el)}
                value={otpValues[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                required
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg hover:opacity-90 transition-opacity"
          >
            Verify Code
          </button>
        </form>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-gray-400 text-sm sm:text-base">
            Didn't receive code?{" "}
            <button className="text-blue-400 hover:text-purple-400 transition-colors">
              Resend Code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
