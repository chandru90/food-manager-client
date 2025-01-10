import React, { useState, useEffect } from "react";
import axios from "axios";

const DeliveryPersonnelDashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [notes, setNotes] = useState("");

  // Fetch "In Progress" deliveries on initial load
  useEffect(() => {
    const fetchInProgressDeliveries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/getInProgressDeliveries" // Fetch deliveries with "In Progress" status
        );
        console.log(response.data); // Logging the response for debugging
        setDeliveries(response.data); // Set the fetched deliveries
      } catch (error) {
        console.error("Error fetching in-progress deliveries", error);
      }
    };

    fetchInProgressDeliveries();
  }, []);

  // Update meal status (used for when delivery status is updated)
  const updateMealStatus = async (mealId, newStatus) => {
    try {
      const updatedMealStatus = { deliveryStatus: newStatus };
      await axios.put(
        `http://localhost:5000/api/dashboard/updateMealStatus/${mealId}`,
        updatedMealStatus
      );
      // Update the delivery status locally
      setDeliveries((prevState) =>
        prevState.map((delivery) =>
          delivery._id === mealId
            ? { ...delivery, deliveryStatus: newStatus }
            : delivery
        )
      );
    } catch (error) {
      console.error("Error updating meal status", error);
    }
  };

  // Handle marking the delivery as completed
  const handleMarkDelivered = async (deliveryId) => {
    if (!deliveryId) {
      alert("Please select a delivery to mark as delivered.");
      return;
    }

    try {
      const deliveryTime = new Date().toISOString(); // Timestamp for delivery
      const deliveryData = {
        notes,
        deliveryTime,
        deliveryStatus: "Delivered",
      };

      // Updating the meal delivery status and adding notes
      await axios.put(
        `http://localhost:5000/api/delivery/markDelivered/${deliveryId}`,
        deliveryData
      );

      // After marking as delivered, update the meal status to "Delivered" locally
      updateMealStatus(deliveryId, "Delivered");

      alert("Delivery marked as completed.");
      setNotes(""); // Clear the notes after marking
    } catch (error) {
      console.error("Error marking delivery as done", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Delivery Personnel Dashboard
      </h2>

      {/* Deliveries Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {deliveries
          .filter((delivery) => delivery.deliveryStatus === "In Progress") // Only show "In Progress" deliveries
          .map((delivery) => (
            <div
              key={delivery._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {delivery.patientName}
              </h3>
              <p className="text-gray-600">Menu: {delivery.menu}</p>

              <p className="text-gray-600">
                Delivery Status: {delivery.deliveryStatus}
              </p>

              {/* Notes Input */}
              <div className="mt-4">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add delivery notes (optional)"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Mark as Delivered Button */}
              <div className="mt-4 text-center">
                <button
                  onClick={() => handleMarkDelivered(delivery._id)}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Mark as Delivered
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DeliveryPersonnelDashboard;
