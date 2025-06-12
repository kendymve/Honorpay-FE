import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddClientForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    nationalID: '',
    phone: '',
    role: 'user',
    image: null,
  });

  const [currentUserRole, setCurrentUserRole] = useState(null);

  // Decode JWT from localStorage and extract the role
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const base64Payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      const role = decodedPayload.role || 'user';
      setCurrentUserRole(role);
    } catch (error) {
      console.error('Invalid token format:', error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('password', form.password);
      formData.append('dob', form.dob);
      formData.append('nationalID', form.nationalID);
      formData.append('role', form.role);
      if (form.image) {
        formData.append('profilePicture', form.image);
      }

      const response = await axios.post(
        'http://localhost:3001/api/user/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      alert(`Client ${response.data.name} registered successfully`);
      setForm({
        name: '',
        email: '',
        password: '',
        dob: '',
        nationalID: '',
        phone: '',
        role: 'user',
        image: null,
      });
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      alert('Failed to register client.');
    }
  };

  // Allowed roles based on the logged-in user's role
  const roleOptions =
    currentUserRole === 'admin'
      ? ['user', 'manager', 'admin']
      : ['user']; // Managers can only create 'user'

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Client</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          name="dob"
          type="date"
          className="w-full p-3 border rounded"
          value={form.dob}
          onChange={handleChange}
          required
        />
        <input
          name="nationalID"
          type="text"
          placeholder="National ID"
          className="w-full p-3 border rounded"
          value={form.nationalID}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="w-full p-3 border rounded"
          value={form.role}
          onChange={handleChange}
          required
        >
          {roleOptions.map((r) => (
            <option key={r} value={r}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </option>
          ))}
        </select>

        <input
          name="image"
          type="file"
          accept="image/*"
          className="w-full p-3 border rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Register Client
        </button>
      </form>
    </div>
  );
}
