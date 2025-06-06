import React from 'react';
import ProfileCard from './components/ProfileCard.jsx';
import LatestPayments from './components/LatestPayments.jsx';
import PaymentRequestForm from './components/PaymentRequestForm.jsx';

export default function UserDashboard() {
  const totalPaid = 45200; // Mock data

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-blue-800">Welcome Back</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ProfileCard />
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Paid</h2>
            <p className="text-3xl font-bold text-green-600">${totalPaid.toLocaleString()}</p>
          </div>

          <LatestPayments />

          <PaymentRequestForm />
        </div>
      </div>
    </div>
  );
}
