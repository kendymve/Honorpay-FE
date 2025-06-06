import React from 'react';

const recentUsers = [
  { id: 1, name: 'Alice M.', email: 'alice@example.com', joined: '2025-06-01' },
  { id: 2, name: 'Brian K.', email: 'brian@example.com', joined: '2025-05-28' },
  { id: 3, name: 'Sarah J.', email: 'sarah@example.com', joined: '2025-05-25' },
];

export default function RecentUsers() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent User Signups</h2>
      <ul className="divide-y divide-gray-200">
        {recentUsers.map((user) => (
          <li key={user.id} className="py-3 text-sm">
            <p className="font-medium">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-400 text-xs">Joined on {new Date(user.joined).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
