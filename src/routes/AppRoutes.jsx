import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from '../Pages/Welcome.jsx';
import UserDashboard from '../Pages/Dashboard/UserDashboard.jsx';
import ManagerDashboard from '../Pages/Dashboard/ManagerDashboard.jsx';
import AdminDashboard from '../Pages/Dashboard/AdminDashboard.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/manager" element={<ManagerDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}
