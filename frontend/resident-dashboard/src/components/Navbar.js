import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../state/authSlice"; 
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); 
  const dispatch = useDispatch();

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const handleLogout = () => {
    dispatch(logout());
  };

  const guestLinks = () => (
    <ul className="flex items-center space-x-4">
      <li>
        <Link to="/signup" className="nav-link">Signup</Link>
      </li>
      <li>
        <Link to="/login" className="nav-link">Login</Link>
      </li>
    </ul>
  );

  const authLinks = () => (
    <ul className="flex items-center space-x-4">
      <li>
        <Link to="/profile" className="nav-link">Profile</Link>
      </li>
      <li>
        <button onClick={handleLogout} className="nav-link">Logout</button>
      </li>
    </ul>
  );

  return (
    <header className="bg-gray-800 shadow-sm fixed top-0 left-0 right-0 z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img className="h-8 w-auto" src={logo} alt="Logo" />
          <span className="ml-2 text-indigo-600 font-bold text-lg">Mekelle Waste Management</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/article-form" className="nav-link">Articles</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
          <Link to="/schedule" className="nav-link">Schedule</Link>
          <Link to="/report" className="nav-link">Contact</Link>
          {isAuthenticated ? authLinks() : guestLinks()}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden bg-gray-800 p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-gray-800`}>
        <div className="flex flex-col space-y-2 p-4">
          <Link to="/" className="mobile-nav-link">Home</Link>
          <Link to="/article-form" className="mobile-nav-link">Articles</Link>
          <Link to="/blog" className="mobile-nav-link">Blog</Link>
          <Link to="/schedule" className="mobile-nav-link">Schedule</Link>
          <Link to="/report" className="mobile-nav-link">Contact</Link>
          {isAuthenticated ? authLinks() : guestLinks()}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
