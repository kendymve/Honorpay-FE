import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function RecentUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchRecentUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await axios.get('http://localhost:3001/api/user/');

        const filtered = res.data
          .filter((u) => u.role === 'user' && u.lastLogin)
          .sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin)) // Sort by latest login

        setUsers(filtered.slice(0, 10)); // Limit to 10 most recent
      } catch (err) {
        console.error('Error fetching recent users:', err.message);
      }
    };

    fetchRecentUsers();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent User Logins</h2>
      {users.length === 0 ? (
        <p className="text-sm text-gray-500">No recent logins by users.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user._id} className="py-3 text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-400 text-xs">
                Last login: {new Date(user.lastLogin).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
