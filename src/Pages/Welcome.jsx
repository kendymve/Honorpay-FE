import React from 'react';

export default function Welcome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-6">
      <div className="max-w-xl text-center bg-white shadow-xl rounded-2xl p-10">
        <h1 className="text-4xl font-bold mb-4 text-blue-800">Welcome to PensionEase</h1>
        <p className="text-gray-700 text-lg">
          PensionEase is a secure platform for managing pension payments for individuals,
          company managers, and admin supervisors. We streamline access, tracking, and reporting
          of retirement contributions and disbursements.
        </p>
      </div>
    </div>
  );
}
