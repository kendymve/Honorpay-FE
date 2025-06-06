import React from 'react';

export default function ProfileCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <img
        src="https://via.placeholder.com/100"
        alt="User avatar"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">John Doe</h3>
      <p className="text-sm text-gray-600">john.doe@example.com</p>
      <p className="text-sm text-gray-500 mt-2">Retired | Pension ID: #PE12345</p>
    </div>
  );
}
