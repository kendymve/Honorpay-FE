import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from '../Pages/Welcome.jsx';
import UserDashboard from '../Pages/Dashboard/UserDashboard.jsx';
import AdminDashboard from '../Pages/Dashboard/AdminDashboard.jsx';
import ContactUs from '../Pages/ContactUs.jsx';
import Login from '../Pages/login.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/contactus" element={<ContactUs/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  );
}
