import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'; // If using React Router
import AdminStats from './components/AdminStats';
import ProfileCard from './components/ProfileCard.jsx';
import RecentUsers from './components/Recentusers.jsx';
import SystemActivity from './components/SystemActivity';
import UserManager from './components/userManager.jsx';
import TransactionPanel from './components/TransactionPanel';
import AddAmountForm from './components/AddAmountForm';
import AddClientForm from './components/AddClientForm';

export default function AdminDashboard() {
  const [showAddClient, setShowAddClient] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(null); // null: loading, true: allowed, false: denied
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const role = decoded?.role; // Make sure your token has a role field

      if (role === 'admin' || role === 'manager') {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error('Invalid token:', error);
      setIsAuthorized(false);
    }
  }, []);

  if (isAuthorized === null) return <p className="p-4">Loading...</p>;
  if (isAuthorized === false) {
    return (
      <div className="p-4 text-red-600 font-semibold">
        ❌ You are not authorized to view this page.
      </div>
    );
    // Or optionally:
    // navigate('/unauthorized');
    // return null;
  }

  const isSuperAdmin = true; // 🔐 replace with real logic later

  return (
    <div className="space-y-8 px-6">
      <h1 className="text-3xl font-bold text-blue-800">Admin Dashboard</h1>
         <ProfileCard />
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddClient(!showAddClient)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {showAddClient ? 'Close Form' : '➕ Add Client'}
        </button>
      </div>

      {showAddClient && <AddClientForm isSuperAdmin={isSuperAdmin} />}

      <AdminStats />

      <div className="grid md:grid-cols-2 gap-6">
        <UserManager />
        <TransactionPanel />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <SystemActivity />
         <RecentUsers />
      </div>

     
    </div>
  );
}
