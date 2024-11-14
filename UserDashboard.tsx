import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './styles.css';
// Define the props interface
interface UserDashboardProps {
  isDarkMode: boolean;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ isDarkMode }) => {
  return (
    <div className={`dashboard-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1>Welcome to Your Dashboard</h1>
      <Link to="/profile" className="profile-link">
        Go to Profile
      </Link>
      {/* Additional dashboard contents can go here */}
    </div>
  );
};

export default UserDashboard;

