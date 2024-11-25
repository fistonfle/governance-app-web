import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../features/authSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirecting

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
    role: "ROLE_USER", // Default role
  });

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const { status, error, user } = useSelector((state) => state.auth); // Get logged-in user from state

  useEffect(() => {
    // Redirect to homepage or dashboard if user is already logged in
    if (user) {
      navigate("/"); // Or redirect to the desired page, like "/dashboard"
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(userData));
  };

  // Show success alert and redirect to login after successful signup
  useEffect(() => {
    if (status === "succeeded") {
      alert("Account created successfully! Please log in.");
      navigate("/login"); // Redirect to login page
    }
  }, [status, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-yellow-500">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-4">
          Create Account
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            {status === "loading" ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
