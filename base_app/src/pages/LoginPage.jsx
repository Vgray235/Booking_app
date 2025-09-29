import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/userSlice';
import { loadUserCart } from '../redux/cartSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const urlUsername = searchParams.get('username');
    if (urlUsername) {
      setUsername(urlUsername);
      handleLogin(urlUsername, 'user'); // auto-login via URL
    }
  }, [searchParams]);

  const handleLogin = (user = username, userRole = role) => {
    const trimmed = user.trim();
    if (!trimmed) return;

    dispatch(loadUserCart({ username: trimmed }));
    dispatch(loginUser({ username: trimmed, role: userRole }));
    navigate(`/home?username=${encodeURIComponent(trimmed)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🎯 Booking Portal</h1>
          <p>Welcome! Enter your username to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="user">👤 User</option>
              <option value="admin">👑 Admin</option>
            </select>
          </div>

          <button type="submit" className="login-btn">
            🚀 Start Booking
          </button>
        </form>

        <div className="login-footer">
          <p><small>Each user has their own separate cart!</small></p>
        </div>
      </div>
    </div>
  );
}
