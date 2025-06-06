import React, { useState } from 'react';

export default function PaymentRequestForm() {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Payment request for $${amount} submitted!`);
    setAmount('');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Request New Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          required
          placeholder="Enter amount"
          className="w-full border rounded-md p-3 focus:ring focus:ring-blue-200"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
