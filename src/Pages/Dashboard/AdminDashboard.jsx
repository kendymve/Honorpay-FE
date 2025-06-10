import React, {useState} from 'react';
import AdminStats from './components/AdminStats';
import RecentUsers from './components/Recentusers.jsx';
import SystemActivity from './components/SystemActivity';
import UserManager from './components/userManager.jsx';
import TransactionPanel from './components/TransactionPanel';
import AddAmountForm from './components/AddAmountForm';
import AddClientForm from './components/AddClientForm';

export default function AdminDashboard() {

const [showAddClient, setShowAddClient] = useState(false);
const isSuperAdmin = true; // 🔐 replace this with real logic later

  return (
    <div className="space-y-8 px-6">
        <h1 className="text-3xl font-bold text-blue-800">Admin Dashboard</h1>
        <div className="flex  justify-end">
      
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
        <AddAmountForm />
        <SystemActivity />
      </div>

      <RecentUsers />
    </div>
  );
}
