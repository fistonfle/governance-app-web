import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to send password reset link
    console.log("Password reset email sent to:", email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-500 to-blue-500">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-yellow-600 mb-4">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition duration-300"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
