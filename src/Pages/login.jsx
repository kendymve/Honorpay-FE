import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this
import axios from 'axios'; // Add this for API requests

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const navigate = useNavigate(); // Initialize navigation

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/user/login', {
        email: formData.email,
        password: formData.password,
      });

      const { token, user: { role } } = response.data;

      // Optional: store token in localStorage or cookie
      localStorage.setItem('token', token);
      console.log(response.data)

      // Navigate based on role
      if (role === 'user') {
        navigate('/user');
      } else {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials or server error.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-blue-800 text-center">Login</h2>

        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Email</span>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
            placeholder="you@example.com"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Password</span>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
            placeholder="••••••••"
          />
        </label>

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">Remember Me</span>
          </label>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
