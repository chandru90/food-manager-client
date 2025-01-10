import React, { useState } from "react";
import AuthPage from "./components/AuthPage";
import HospitalFoodManagerDashboard from "./components/HospitalFoodManagerDashboard";
import InnerPantryDashboard from "./components/InnerPantryDashboard";
import DeliveryPersonnelDashboard from "./components/DeliveryPersonnelDashboard";

const App = () => {
  const [role, setRole] = useState(""); // "food-manager", "pantry", "delivery"
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (username, role) => {
    setRole(role); // Set role from login response
    setLoggedIn(true);
  };

  const logout = () => {
    setRole(""); // Clear the role
    setLoggedIn(false); // Set loggedIn to false
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 relative">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-semibold text-center text-blue-600">
          Hospital Food Management System
        </h1>

        {/* Logout Button */}
        {loggedIn && (
          <button
            onClick={logout}
            className="absolute top-6 right-6 bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Logout
          </button>
        )}

        {!loggedIn ? (
          <AuthPage onLogin={login} />
        ) : (
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-medium text-gray-800">
              Welcome, {role}!
            </h2>

            {/* Conditional Dashboards */}
            {role === "food-manager" && <HospitalFoodManagerDashboard />}
            {role === "pantry" && <InnerPantryDashboard />}
            {role === "delivery" && <DeliveryPersonnelDashboard />}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
