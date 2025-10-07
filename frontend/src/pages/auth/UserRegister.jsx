import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullname = e.target.fullname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/register",
        { fullname, email, password },
        { withCredentials: true }
      );

      console.log(response.data);
      navigate("/user/login"); // redirect after success
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">User Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            required
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/user/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
