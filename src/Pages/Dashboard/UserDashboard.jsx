import React, { useEffect, useState } from 'react';
import ProfileCard from './components/ProfileCard.jsx';
import LatestPayments from './components/LatestPayments.jsx';
import PaymentRequestForm from './components/PaymentRequestForm.jsx';

export default function UserDashboard() {
  const [totalPaid, setTotalPaid] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await fetch('http://localhost:3001/api/transactions/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          const total = data
            .filter(tx => tx.status === 'success' || tx.status === 'completed')
            .reduce((sum, tx) => sum + tx.amount, 0);

          setTotalPaid(total);
        }
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
      }
    };

    fetchTransactions();
  }, []);


  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-blue-800">Welcome Back</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <ProfileCard />
          <PaymentRequestForm />
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Paid</h2>
            <p className="text-3xl font-bold text-green-600">${totalPaid.toLocaleString()}</p>
          </div>

          <LatestPayments />
        </div>
      </div>
    </div>
  );
}
