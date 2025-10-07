import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {

    const navigate = useNavigate();


    const handlesubmit = async (e) =>{
      e.preventDefault();

      const email = e.target.email.value;
      const password = e.target.password.value;

      try {

        const response = await axios.post(
            ("http://localhost:3000/api/user/adminlogin"),
            {email , password},
            {withCredentials: true}
        )
        console.log(response.data)
        navigate("/create-item")
        
      } catch (error) {
        console.log("error in admin login" , error)
        
      }

    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
        <form className="space-y-4" onSubmit={handlesubmit} noValidate >
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button className="w-full py-3 bg-red-600 rounded-lg hover:bg-red-700 transition" type="submit" >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/admin/register" className="text-red-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
