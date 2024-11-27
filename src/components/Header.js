import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import { logout } from "../features/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          PAMOJA
        </Link>

        {/* Main Navigation */}
        <nav className="flex gap-6 items-center">
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>

          {user && (
            <Link to="/my-posts" className="hover:text-yellow-300">
              My Posts
            </Link>
          )}

          {/* Direct Category Links */}
          <Link to="/tag/trending" className="hover:text-yellow-300">
            Trending
          </Link>
          <Link to="/tag/new" className="hover:text-yellow-300">
            New
          </Link>
          <Link to="/tag/most-discussed" className="hover:text-yellow-300">
            Most Discussed
          </Link>

          <Link to="/about" className="hover:text-yellow-300">
            About
          </Link>
        </nav>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
