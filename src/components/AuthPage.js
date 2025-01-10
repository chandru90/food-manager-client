import React, { useState } from "react";
import axios from "axios";

const AuthPage = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false); // Toggle state for register/login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Only required for registration

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isRegistering) {
      // Handle registration
      if (username && password && role) {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/auth/register",
            {
              username,
              password,
              role,
            }
          );
          alert("Registration successful! Please log in.");
          setIsRegistering(false); // Switch to login form after registration
        } catch (error) {
          alert(error.response.data.message || "Error during registration.");
        }
      } else {
        alert("Please fill in all fields.");
      }
    } else {
      // Handle login
      if (username && password) {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/auth/login",
            {
              username,
              password,
            }
          );
          onLogin(response.data.user.username, response.data.user.role); // Pass role to parent
        } catch (error) {
          alert("Invalid username or password.");
        }
      } else {
        alert("Please enter both username and password.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          {isRegistering ? "Register" : "Login"} to Hospital Food Management
          System
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Role Selection for Registration */}
          {isRegistering && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Role</option>
                <option value="food-manager">Food Manager</option>
                <option value="pantry">Pantry</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        {/* Toggle between Register and Login */}
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="mt-4 text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
