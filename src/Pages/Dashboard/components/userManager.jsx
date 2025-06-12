import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingUser, setEditingUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const [deletingUser, setDeletingUser] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Fetch users & set auth header
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

    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/user/');
        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filter by name or email
  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Edit handlers
  const openEdit = (user) => {
    setEditingUser({ ...user });
    setSaveError(null);
  };
  const closeEdit = () => {
    setEditingUser(null);
    setSaveError(null);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prev => ({ ...prev, [name]: value }));
  };
  const handleSave = async () => {
    if (!editingUser) return;
    setSaving(true);
    setSaveError(null);
    try {
      const userId = editingUser._id || editingUser.id;
      if (!userId) throw new Error('User ID not found');
      const payload = {
        name: editingUser.name,
        email: editingUser.email,
      };
      const res = await axios.put(`http://localhost:3001/api/user/${userId}`, payload);
      setUsers(prev =>
        prev.map(u => {
          const uid = u._id || u.id;
          return uid === userId ? res.data : u;
        })
      );
      closeEdit();
    } catch (err) {
      setSaveError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete handlers
  const openDelete = (user) => {
    setDeletingUser(user);
    setDeleteError(null);
  };
  const closeDelete = () => {
    setDeletingUser(null);
    setDeleteError(null);
  };

// inside UserManager component...
const handleDelete = async () => {
  if (!deletingUser) return;
  setDeleting(true);
  setDeleteError(null);
  try {
    const userId = deletingUser._id || deletingUser.id;
    if (!userId) throw new Error('User ID not found');

    // 1. Delete all transactions for this user
    await axios.delete(`http://localhost:3001/api/transactions/user/${userId}`);

    // 2. Delete the user
    await axios.delete(`http://localhost:3001/api/user/${userId}`);

    // Remove user from state
    setUsers(prev => prev.filter(u => {
      const uid = u._id || u.id;
      return uid !== userId;
    }));

    closeDelete();

    // Adjust pagination if needed
    const newTotal = filteredUsers.length - 1;
    const newPages = Math.ceil(newTotal / ITEMS_PER_PAGE) || 1;
    if (currentPage > newPages) setCurrentPage(newPages);

  } catch (err) {
    setDeleteError(err.response?.data?.message || err.message);
  } finally {
    setDeleting(false);
  }
};


  // Pagination controls
  const goPrev = () => setCurrentPage(p => Math.max(1, p - 1));
  const goNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));
  const jumpTo = (n) => setCurrentPage(n);

  return (
    <div className="bg-white p-6 rounded-xl shadow  max-w-2xl ">
      <h2 className="text-xl font-semibold mb-4">Search & Manage Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search by name or email"
            className="w-full p-3 border rounded mb-4"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          {filteredUsers.length === 0 ? (
            <p className="text-gray-500">No users found.</p>
          ) : (
            <>
              <ul className="space-y-3 ">
                {paginatedUsers.map((u) => {
                  const uid = u._id || u.id;
                  return (
                    <li key={uid} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{u.name}</p>
                        <p className="text-sm text-gray-500">{u.email}</p>
                      </div>
                      <div className="space-x-2">
                        <button
                          className="text-blue-600 hover:underline text-sm"
                          onClick={() => openEdit(u)}
                        >
                          Edit
                        </button>
                        <button
                          className="hover:underline text-sm"
                          style={{color:'red'}}
                          onClick={() => openDelete(u)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {/* Pagination */}
              <div className="flex justify-center items-center mt-2 space-x-2">
                <button
                  onClick={goPrev}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Prev
                </button>
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => jumpTo(pageNum)}
                      className={`px-3 py-1 rounded ${
                        pageNum === currentPage
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={goNext}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>
            <label className="block mb-2">
              <span className="text-sm text-gray-600">Name</span>
              <input
                type="text"
                name="name"
                value={editingUser.name || ''}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded"
              />
            </label>
            <label className="block mb-2">
              <span className="text-sm text-gray-600">Email</span>
              <input
                type="email"
                name="email"
                value={editingUser.email || ''}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded"
              />
            </label>
            {saveError && <p className="text-red-600 mb-2">Error: {saveError}</p>}
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={closeEdit}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
            <h3 className="text-lg font-semibold mb-4 text-red-600">Confirm Deletion</h3>
            <p>Are you sure you want to delete <strong>{deletingUser.name}</strong>?</p>
            {deleteError && <p className="text-red-600 mt-2">Error: {deleteError}</p>}
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={closeDelete}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
