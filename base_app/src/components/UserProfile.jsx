import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import './Navigation.css';

const categories = [
  { key: 'food', label: '🍕 Food', color: '#ff6b6b' },
  { key: 'events', label: '🎭 Events', color: '#4ecdc4' },
  { key: 'cab', label: '🚗 Cab', color: '#45b7d1' },
  { key: 'hotel', label: '🏨 Hotel', color: '#96ceb4' }
];

export default function UserProfile({ activeCategory, setActiveCategory, onToggleNav }) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    onToggleNav?.(!isModalOpen);
  };

  return (
    <>
      <div className="user-profile">
        <div className="user-info">
          <button className="category-button" onClick={toggleModal}>📋</button>
          <span className="user-avatar">👤</span>
          <div className="user-details">
            <span className="username">{user.username}</span>
            <span className="user-role">{user.role}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout} title="Logout">🚪</button>
      </div>

      {/* Navigation Modal */}
      <div className={`navigation ${isModalOpen ? 'open' : ''}`}>
        <div className="nav-header">
          <h2>📋 Categories</h2>
        </div>
        <ul className="nav-list">
          {categories.map(category => (
            <li key={category.key}>
              <button
                className={`nav-item ${activeCategory === category.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.key)}
                style={{ '--accent-color': category.color }}
              >
                <span className="nav-icon">{category.label.split(' ')[0]}</span>
                <span className="nav-label">{category.label.split(' ')[1]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && <div className="overlay" onClick={toggleModal}></div>}
    </>
  );
}
