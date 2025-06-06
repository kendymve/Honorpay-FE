import React from 'react';

const mockPayments = [
  { id: 1, amount: 1500, date: '2025-05-25' },
  { id: 2, amount: 1800, date: '2025-04-25' },
  { id: 3, amount: 1700, date: '2025-03-25' },
];

export default function LatestPayments() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Payments</h2>
      <ul className="divide-y divide-gray-200">
        {mockPayments.map((p) => (
          <li key={p.id} className="py-3 flex justify-between text-sm">
            <span className="text-gray-700">Paid on {new Date(p.date).toLocaleDateString()}</span>
            <span className="text-green-600 font-semibold">${p.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
