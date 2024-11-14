import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
interface NavbarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Search term:', searchTerm);
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="navbar-left">
        <Link to="/problems" className="nav-link">
          Problems
        </Link>
      </div>

      <form className="search-container" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-btn">
          <i className="fas fa-search"></i>
        </button>
      </form>

      <div className="navbar-right">
        <Link to="/contest" className="nav-link">
          Contest
        </Link>
        <button className="notification-btn">
          <i className="fas fa-bell"></i>
        </button>
        <button className="dark-mode-btn" onClick={toggleDarkMode}>
          <i className={`fas fa-${isDarkMode ? 'sun' : 'moon'}`}></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;