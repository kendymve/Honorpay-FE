import React from 'react';

export default function AdminStats() {
  const stats = {
    users: 1245,
    payments: 93400,
    managers: 12,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <h3 className="text-lg text-gray-600">Total Users</h3>
        <p className="text-2xl font-bold text-blue-700">{stats.users}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <h3 className="text-lg text-gray-600">Total Payments</h3>
        <p className="text-2xl font-bold text-green-600">${stats.payments.toLocaleString()}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <h3 className="text-lg text-gray-600">Active Managers</h3>
        <p className="text-2xl font-bold text-purple-600">{stats.managers}</p>
      </div>
    </div>
  );
}
