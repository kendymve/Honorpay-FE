import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SystemActivity() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/contactus');
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/contactus/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      setSelectedMessage(null);
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow relative">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Messages</h2>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-500 text-sm">No messages found.</p>
      ) : (
        <ul className="text-sm text-gray-700 divide-y divide-gray-200">
          {messages.map((msg) => (
            <li
              key={msg._id}
              onClick={() => setSelectedMessage(msg)}
              className="py-3 px-2 cursor-pointer hover:bg-blue-50 transition rounded"
            >
              <p className="font-medium text-gray-800">{msg.name}</p>
              <p className="text-gray-500">{msg.email}</p>
            </li>
          ))}
        </ul>
      )}

      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Message Details</h3>
            <p><strong>Name:</strong> {selectedMessage.name}</p>
            <p><strong>Email:</strong> {selectedMessage.email}</p>
            <p><strong>Phone:</strong> {selectedMessage.phone}</p>
            <p className="mt-2"><strong>Message:</strong></p>
            <p className="bg-gray-100 p-2 rounded-md text-sm">{selectedMessage.message}</p>

            <button
              onClick={() => deleteMessage(selectedMessage._id)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Delete Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
