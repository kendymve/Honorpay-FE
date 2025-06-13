import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function AdminStats() {
  const [stats, setStats] = useState({
    users: 0,
    payments: 0,
    managers: 0,
  });

  const [currentUserRole, setCurrentUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(token);
      setCurrentUserRole(decoded.role);
    } catch (err) {
      console.error('Invalid token', err);
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const fetchStats = async () => {
      try {
        // Fetch users
        const userRes = await axios.get('http://localhost:3001/api/user/');
        const users = userRes.data;

        const totalUsers = Array.isArray(users) ? users.length : 0;
        const totalManagers = Array.isArray(users)
          ? users.filter(u => u.role === 'manager' || u.role === 'admin').length
          : 0;

        // Fetch transactions
        const txRes = await axios.get('http://localhost:3001/api/transactions/');
        const transactions = txRes.data;

        const totalPayments = Array.isArray(transactions)
          ? transactions.reduce(
              (sum, tx) =>
                (tx.status === 'success' || tx.status === 'completed')
                  ? sum + (tx.amount || 0)
                  : sum,
              0
            )
          : 0;

        setStats({
          users: totalUsers,
          payments: totalPayments,
          managers: totalManagers,
        });
      } catch (error) {
        console.error('Error fetching stats', error);
      }
    };

    fetchStats();
  }, []);

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

      {currentUserRole === 'admin' && (
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-lg text-gray-600">Active Managers</h3>
          <p className="text-2xl font-bold text-purple-600">{stats.managers}</p>
        </div>
      )}
    </div>
  );
}
