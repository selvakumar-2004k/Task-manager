import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) return null;

  const handleLogout = () => {
    authContext.logout();
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#2c3e50', color: '#fff' }}>
      <h2 style={{ margin: 0 }}>Task Manager</h2>
      {authContext.user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span>Hi, {authContext.user.name}</span>
          <button onClick={handleLogout} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;