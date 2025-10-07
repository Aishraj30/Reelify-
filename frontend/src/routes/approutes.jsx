import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Auth pages
import UserLogin from "../pages/auth/UserLogin";
import UserRegister from "../pages/auth/UserRegister";
import AdminLogin from "../pages/auth/AdminLogin";
import AdminRegister from "../pages/auth/AdminRegister";
import Home from "../pages/general/home";
import Mainhome from "../pages/general/MainHome";
import Createitem from "../pages/admin/Createitem";
// import Adminprofile from "../pages/admin/Adminprofile";
// import ProfilePage from "../pages/admin/Adminprofile";
// import Adminprofile from './pages/admin/Adminprofile.jsx';



// General pages


const Approutes = () => {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />

        {/* Admin Routes */}
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Home Route */}
        <Route path="/" element={<Mainhome />} />
        <Route path="/reel" element={<Home />} />

        //create item
        <Route path="/create-item" element={<Createitem/>} />

     
      
         
        
      </Routes>
    </Router>
  );
};

export default Approutes;
