import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export default function ProfileCard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const decoded = jwtDecode(token);
        console.log('Decoded JWT:', decoded); // Debugging line to check the decoded token
        const userID = decoded.userId || decoded._id; // depends on how your backend encodes it

        const response = await axios.get(`http://localhost:3001/api/user/${userID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <img
        src={user.profilePictureUrl || "https://via.placeholder.com/100"}
        alt="User avatar"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-sm text-gray-500 mt-2">
        {user.role === 'retired' ? 'Retired' : user.role} | Pension ID: {user._id || 'N/A'}
      </p>
    </div>
  );
}
