import React, { useState } from 'react';

const transactionsData = [
  { id: 201, name: 'Alice M.', amount: 1200, status: 'pending', date: '2025-06-01' },
  { id: 202, name: 'Sarah J.', amount: 800, status: 'approved-success', date: '2025-05-28' },
  { id: 203, name: 'Bob T.', amount: 500, status: 'pending', date: '2025-06-03' },
  { id: 204, name: 'Lara W.', amount: 700, status: 'approved-failed', date: '2025-06-02' },
  { id: 205, name: 'Mike S.', amount: 1000, status: 'approved-success', date: '2025-05-30' },
  // Add more as needed
];

export default function TransactionPanel() {
  const [search, setSearch] = useState('');
  const [transactions, setTransactions] = useState(transactionsData);

  // Filter function by name for search
  const filterByName = (tx) => tx.name.toLowerCase().includes(search.toLowerCase());

  // Separate pending and approved (success/failed)
  const pendingTx = transactions.filter(tx => tx.status === 'pending' && filterByName(tx));
  const approvedTx = transactions.filter(
    tx => (tx.status === 'approved-success' || tx.status === 'approved-failed') && filterByName(tx)
  );

  // Handlers for approving/rejecting pending transactions
  const handleApprove = (id) => {
    setTransactions((prev) =>
      prev.map(tx =>
        tx.id === id ? { ...tx, status: 'approved-success' } : tx
      )
    );
  };

  const handleReject = (id) => {
    setTransactions((prev) =>
      prev.map(tx =>
        tx.id === id ? { ...tx, status: 'approved-failed' } : tx
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-h-[700px] overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>

      <input
        type="text"
        placeholder="Search transactions by name"
        className="w-full p-3 border rounded mb-6"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Pending Transactions */}
      <h3 className="font-semibold mb-2">Pending Transactions</h3>
      {pendingTx.length === 0 ? (
        <p className="text-gray-500 mb-4">No pending transactions.</p>
      ) : (
        <ul className="divide-y mb-6">
          {pendingTx.map(tx => (
            <li key={tx.id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{tx.name}</p>
                <p className="text-gray-500 text-sm">
                  ${tx.amount} — {new Date(tx.date).toLocaleDateString()}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleApprove(tx.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(tx.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Approved Transactions */}
      <h3 className="font-semibold mb-2">Approved Transactions</h3>
      {approvedTx.length === 0 ? (
        <p className="text-gray-500">No approved transactions.</p>
      ) : (
        <ul className="divide-y max-h-48 overflow-auto">
          {approvedTx.map(tx => (
            <li key={tx.id} className="py-2 flex justify-between items-center">
              <div>
                <p>{tx.name}</p>
                <p className="text-gray-500 text-sm">
                  ${tx.amount} — {new Date(tx.date).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`text-sm font-semibold px-2 py-1 rounded ${
                  tx.status === 'approved-success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                }`}
              >
                {tx.status === 'approved-success' ? 'Success' : 'Failed'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
