"use client";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';  
import { changePassword} from '../../../../redux/authSlice';
import { RootState, AppDispatch } from "../../../../redux/store";

const ChangePasswordPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  
  if (user) {
    console.log('User ID:', user.id); // TypeScript biết user có thuộc tính id
  }
  
  const userId = user?.id;

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  if (!userId) {
    return (
      <div>
        <p>User ID not found. Please log in again.</p>
        <button onClick={() => window.location.href = '/auth'}>Go to Login</button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await dispatch(changePassword({ userId, oldPassword, newPassword })).unwrap();
      console.log('Password changed successfully');
    } catch (err) {
      setError(err.message || 'Failed to change password');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div>{user.email}</div>
        <div>{user.name}</div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Change Password</h2>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <div className="mb-4">
          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            placeholder="Enter your old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordPage