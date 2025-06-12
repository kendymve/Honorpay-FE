import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export default function TransactionPanel() {
  const [search, setSearch] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For approve modal
  const [approvingTx, setApprovingTx] = useState(null); // { id, name, ... }
  const [approveAmount, setApproveAmount] = useState('');
  const [approveError, setApproveError] = useState(null);
  const [approving, setApproving] = useState(false);

  // Fetch all transactions on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found');
      setLoading(false);
      return;
    }
    try {
      jwtDecode(token);
    } catch {
      setError('Invalid token');
      setLoading(false);
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const fetchTransactions = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/transactions');
        if (Array.isArray(res.data)) {
          setTransactions(res.data);
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // Filter by name
  const filterByName = (tx) =>
    tx.user && tx.user.name
      ? tx.user.name.toLowerCase().includes(search.toLowerCase())
      : false;

  // Separate pending and approved
  const pendingTx = transactions.filter(
    (tx) => tx.status === 'pending' && filterByName(tx)
  );
  const approvedTx = transactions.filter(
    (tx) =>
      (tx.status === 'success' || tx.status === 'rejected') &&
      filterByName(tx)
  );

  // Open approve modal
  const handleOpenApprove = (tx) => {
    // tx: the transaction object, ensure it has id, user.name, etc.
    setApprovingTx(tx);
    setApproveAmount(''); // reset
    setApproveError(null);
  };
  const handleCloseApprove = () => {
    setApprovingTx(null);
    setApproveAmount('');
    setApproveError(null);
  };

  const handleApproveConfirm = async () => {
    if (!approvingTx) return;
    const txId = approvingTx._id || approvingTx.id;
    if (!approveAmount || isNaN(approveAmount) || Number(approveAmount) <= 0) {
      setApproveError('Enter a valid amount > 0');
      return;
    }
    setApproving(true);
    setApproveError(null);
    try {
      const res = await axios.put(
        `http://localhost:3001/api/transactions/${txId}/approve`,
        { amount: Number(approveAmount) }
      );
      // Update in state: replace that transaction
      setTransactions((prev) =>
        prev.map((tx) => {
          const id = tx._id || tx.id;
          if (id === txId) {
            // API returns updated transaction?
            return res.data.transaction || res.data; 
            // if your API returns { message, transaction }, do: res.data.transaction
          }
          return tx;
        })
      );
      handleCloseApprove();
    } catch (err) {
      console.error(err);
      setApproveError(err.response?.data?.message || err.message);
    } finally {
      setApproving(false);
    }
  };

  // Handle reject immediately
  const handleReject = async (tx) => {
    const txId = tx._id || tx.id;
    try {
      // Optionally, you could disable the button while rejecting
      await axios.put(`http://localhost:3001/api/transactions/${txId}/reject`);
      // Update state
      setTransactions((prev) =>
        prev.map((item) => {
          const id = item._id || item.id;
          if (id === txId) {
            // either API returns updated transaction or not
            return { ...item, status: 'rejected' };
          }
          return item;
        })
      );
    } catch (err) {
      console.error('Error rejecting:', err);
      // Optionally display an error toast or inline error
      alert(err.response?.data?.message || err.message);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow max-h-[700px] overflow-auto">
        <p>Loading transactions...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl shadow max-h-[700px] overflow-auto">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow max-h-[700px] overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>

      <input
        type="text"
        placeholder="Search transactions by user name"
        className="w-full p-3 border rounded mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Pending Transactions */}
      <h3 className="font-semibold mb-2">Pending Transactions</h3>
      {pendingTx.length === 0 ? (
        <p className="text-gray-500 mb-4">No pending transactions.</p>
      ) : (
        <ul className="divide-y mb-6">
          {pendingTx.map((tx) => {
            const txId = tx._id || tx.id;
            const name = tx.user?.name || 'Unknown';
            const amountDisplay = tx.amount || 0;
            const dateDisplay = tx.date
              ? new Date(tx.date).toLocaleDateString()
              : '';
            return (
              <li
                key={txId}
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-gray-500 text-sm">
                    ${amountDisplay} — {dateDisplay}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleOpenApprove(tx)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(tx)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Approved/Rejected Transactions */}
      <h3 className="font-semibold mb-2">Processed Transactions</h3>
      {approvedTx.length === 0 ? (
        <p className="text-gray-500">No processed transactions.</p>
      ) : (
        <ul className="divide-y max-h-48 overflow-auto">
          {approvedTx.map((tx) => {
            const txId = tx._id || tx.id;
            const name = tx.user?.name || 'Unknown';
            const amountDisplay = tx.amount || 0;
            const dateDisplay = tx.date
              ? new Date(tx.date).toLocaleDateString()
              : '';
            const isSuccess = tx.status === 'success';
            return (
              <li
                key={txId}
                className="py-2 flex justify-between items-center"
              >
                <div>
                  <p>{name}</p>
                  <p className="text-gray-500 text-sm">
                    ${amountDisplay} — {dateDisplay}
                  </p>
                </div>
                <span
                  className={`text-sm font-semibold px-2 py-1 rounded ${
                    isSuccess
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {isSuccess ? 'Success' : 'Failed'}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {/* Approve Modal */}
      {approvingTx && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <h3 className="text-lg font-semibold mb-4">Approve Transaction</h3>
            <p className="mb-2">
              User: <strong>{approvingTx.user?.name || 'Unknown'}</strong>
            </p>
            <p className="mb-4">
              Requested date:{' '}
              {approvingTx.date
                ? new Date(approvingTx.date).toLocaleDateString()
                : ''}
            </p>
            <label className="block mb-4">
              <span className="text-sm text-gray-600">Amount</span>
              <input
                type="number"
                min="1"
                name="amount"
                value={approveAmount}
                onChange={(e) => setApproveAmount(e.target.value)}
                className="mt-1 block w-full p-2 border rounded"
                placeholder="Enter amount to approve"
              />
            </label>
            {approveError && (
              <p className="text-red-600 mb-2">Error: {approveError}</p>
            )}
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={handleCloseApprove}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                disabled={approving}
              >
                Cancel
              </button>
              <button
                onClick={handleApproveConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={approving}
              >
                {approving ? 'Approving...' : 'Approve'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
