import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  const steps = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M8 9h8m-8 3h5m-5 3h2m3-11.484C15.092 3.402 16.739 3 19 3m0 0v3.5M4 21l3.5-3.5M19 3c-3.167 0-4.5 3.5-4.5 3.5"
          />
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M19 15v3m0 3v-3m0 0h-3m3 0h3"
          />
        </svg>
      ),
      title: "Describe Your Needs",
      text: "Input your code requirements in natural language",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M19 19h-3.5M5 5h3.5M19 5l-4 4.5m-6-4.5l4 4.5m-4 9.5l4-4.5m6-5l4 4.5"
          />
          <path fill="currentColor" d="M12 14a2 2 0 100-4 2 2 0 000 4z" />
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M12 14a2 2 0 100-4 2 2 0 000 4z"
          />
        </svg>
      ),
      title: "AI Processing",
      text: "Our neural networks analyze & generate optimal code",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 8l-4 4 4 4m10-8l4 4-4 4M14 4l-4 16"
          />
        </svg>
      ),
      title: "Get Clean Code",
      text: "Receive production-ready code in your preferred language",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Implement & Go",
      text: "Copy code directly to your project and start building",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-200 mb-8">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-200 to-purple-400 bg-clip-text text-transparent">
              EndAI Code Generator
            </span>
          </h1>
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            AI-Powered Code Generation
          </motion.h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your ideas into production-ready code with our intelligent
            AI assistant
          </p>
        </div>

        {/* How It Works Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all"
            >
              <div className="mb-4 text-blue-400">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="inline-block bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-2xl"
                >
                  {step.icon}
                </motion.div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-300">{step.text}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <Link
            to="/register"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
          >
            Get Started Now
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Start;
