import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../state/authSlice";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User, LayoutDashboard } from "lucide-react"; // Standard icons
import logo from '../assets/logo.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
  };

  // ---------------- COMPONENTS ----------------

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`text-sm font-medium transition-colors duration-300 ${
          isActive
            ? "text-green-400"
            : "text-slate-300 hover:text-white"
        }`}
      >
        {children}
      </Link>
    );
  };

  const MobileNavLink = ({ to, children }) => (
    <Link
      to={to}
      className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
    >
      {children}
    </Link>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* 1. LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8">
                {/* Optional: Add a glow behind logo */}
                <div className="absolute inset-0 bg-green-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img className="relative h-8 w-auto object-contain" src={logo} alt="Mekelle City Logo" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Mekelle<span className="text-green-500">Green</span>
            </span>
          </Link>

          {/* 2. DESKTOP NAVIGATION (Center) */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/article-form">Articles</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/schedule">Schedule</NavLink>
            <NavLink to="/report">Report Issue</NavLink>
          </div>

          {/* 3. AUTH BUTTONS (Right) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-green-400 transition-colors"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <div className="h-4 w-px bg-slate-700"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-200 px-4 py-2 rounded-full text-sm font-medium transition-all border border-slate-700 hover:border-red-500/50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-green-900/20 transition-all transform hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* 4. MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white focus:outline-none transition-transform active:scale-95"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* 5. MOBILE MENU DROPDOWN */}
      {/* We use a transition for smooth height or opacity changes */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isMenuOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          <MobileNavLink to="/">Home</MobileNavLink>
          <MobileNavLink to="/article-form">Articles</MobileNavLink>
          <MobileNavLink to="/blog">Blog</MobileNavLink>
          <MobileNavLink to="/schedule">Schedule</MobileNavLink>
          <MobileNavLink to="/report">Report Issue</MobileNavLink>

          <div className="pt-4 mt-4 border-t border-slate-800">
            {isAuthenticated ? (
              <div className="space-y-3">
                <Link 
                  to="/profile" 
                  className="flex items-center gap-3 px-3 text-slate-300 hover:text-white"
                >
                    <User size={20} /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                >
                  <LogOut size={20} /> Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/login"
                  className="block w-full text-center py-2.5 text-slate-300 border border-slate-700 rounded-lg font-medium hover:bg-slate-800 hover:text-white"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center py-2.5 bg-green-600 text-white rounded-lg font-bold hover:bg-green-500"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;