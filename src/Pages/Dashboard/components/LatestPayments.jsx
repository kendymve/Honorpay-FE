import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function LatestPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3001/api/transactions/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPayments(res.data || []);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Payments</h2>
      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : payments.length === 0 ? (
        <p className="text-gray-500 text-sm">No transactions</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {payments.map((p) => (
            <li key={p._id || p.id} className="py-3 flex justify-between text-sm">
              <span className="text-gray-700">
  Paid on {new Date(p.date).toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24-hour format
  })}
</span>
              <span className="text-green-600 font-semibold">${p.amount}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
