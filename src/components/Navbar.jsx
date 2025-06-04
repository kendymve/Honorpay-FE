import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          HonorPay
        </Link>
        <div className="space-x-4 hidden md:flex">
          <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
          <Link to="/user" className="text-gray-700 hover:text-blue-500">User Dashboard</Link>
          <Link to="/manager" className="text-gray-700 hover:text-blue-500">Manager</Link>
          <Link to="/admin" className="text-gray-700 hover:text-blue-500">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
