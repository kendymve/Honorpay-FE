import React, { useState } from 'react';

const dummyUsers = [
  { id: 1, name: 'Alice M.', role: 'user', status: 'active' },
  { id: 2, name: 'Brian K.', role: 'manager', status: 'active' },
  { id: 3, name: 'Brian d.', role: 'manager', status: 'active' },
  { id: 4, name: 'Brian m.', role: 'manager', status: 'active' },
];

export default function UserManager() {
  const [search, setSearch] = useState('');

  const filteredUsers = dummyUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Search & Manage Users</h2>
      <input
        type="text"
        placeholder="Search by name"
        className="w-full p-3 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="space-y-3">
        {filteredUsers.map((u) => (
          <li key={u.id} className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{u.name}</p>
              <p className="text-sm text-gray-500">{u.role}</p>
            </div>
            <button className="text-blue-600 hover:underline text-sm">Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
