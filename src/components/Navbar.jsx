import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          HonorPay
        </Link>
        <div className="space-x-4 hidden md:flex">
          <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
          <Link to="/contactus" className="text-gray-700 hover:text-blue-500">Contact us</Link>
          {token ? (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-500 focus:outline-none"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
