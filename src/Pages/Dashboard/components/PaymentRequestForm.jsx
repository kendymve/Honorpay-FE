import React from 'react';

export default function PaymentRequestButton() {
  const handleInitiate = async () => {
    const token = localStorage.getItem('token'); // Get JWT from localStorage

    if (!token) {
      alert('❌ No token found. Please log in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/transactions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add token to headers
        },
        body: JSON.stringify({ amount: 0 }) // Or remove if backend sets amount later
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Transaction initiated successfully!');
      } else {
        alert(`❌ Failed: ${data.message || 'An error occurred'}`);
      }
    } catch (err) {
      alert(`❌ Network error: ${err.message}`);
    }
  };

  return (
    <div className="bg-white p-6  rounded-xl shadow text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Initiate Payment</h2>
      <button
        onClick={handleInitiate}
        className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
      >
        Start Transaction
      </button>
    </div>
  );
}
