import React, { useState } from 'react';

export default function AddClientForm({ isSuperAdmin = false }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New client:', form);
    alert(`Client ${form.name} added as ${form.role}`);
    setForm({ name: '', email: '', phone: '', role: 'user' });
  };

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
          name="phone"
          type="tel"
          placeholder="Phone Number"
          className="w-full p-3 border rounded"
          value={form.phone}
          onChange={handleChange}
          required
        />

        {isSuperAdmin && (
          <select
            name="role"
            className="w-full p-3 border rounded"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
          </select>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Add Client
        </button>
      </form>
    </div>
  );
}
