// Home.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://www.pexels.com/download/video/5076636" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Floating glow animation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-indigo-700 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div> */}
        {/* <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-700 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse delay-700"></div> */}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Welcome to <span className="text-yellow-400">Reelify</span>
        </h1>
        <p className="text-gray-200 text-sm sm:text-base mb-10 max-w-sm">
          Experience the next generation of shopping — where products meet reels!  
          Choose your role below to get started.
        </p>

        {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-5 w-full max-w-xs sm:max-w-md">
  {/* Seller Button */}
  <button
    onClick={() => navigate("/admin/register")}
    className="relative w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold shadow-lg transition-all duration-500 overflow-hidden group"
  >
    <span className="relative z-10">I’m a Seller 🍳</span>
    {/* Hover overlay animation */}
    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-90 transition-all duration-500 group-hover:scale-110"></div>
  </button>

  {/* Customer Button */}
  <button
    onClick={() => navigate("/user/register")}
    className="relative w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold shadow-lg transition-all duration-500 overflow-hidden group"
  >
    <span className="relative z-10">I’m a Customer 🛍️</span>
    {/* Hover overlay animation */}
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-700 opacity-0 group-hover:opacity-90 transition-all duration-500 group-hover:scale-110"></div>
  </button>
</div>

      </motion.div>
    </div>
  );
};

export default Home;
