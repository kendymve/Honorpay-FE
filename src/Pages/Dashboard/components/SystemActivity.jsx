import React from 'react';

const activityLogs = [
  'User Alice M. updated profile',
  'Manager Brian approved payment',
  'System backup completed',
  'New pension rules uploaded',
];

export default function SystemActivity() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">System Activity</h2>
      <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
        {activityLogs.map((log, idx) => (
          <li key={idx}>{log}</li>
        ))}
      </ul>
    </div>
  );
}
