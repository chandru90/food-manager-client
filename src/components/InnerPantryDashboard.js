// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const InnerPantryDashboard = () => {
//   const [mealStatus, setMealStatus] = useState([]);
//   const [pantryPerformance, setPantryPerformance] = useState([]);
//   const [deliveryPersonnel, setDeliveryPersonnel] = useState([]);

//   // Fetch data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const mealStatusResponse = await axios.get("http://localhost:5000/api/dashboard/mealStatus");
//         const pantryPerformanceResponse = await axios.get("http://localhost:5000/api/dashboard/pantryPerformance");
//         const deliveryPersonnelResponse = await axios.get("http://localhost:5000/api/dashboard/deliveryPersonnel");

//         setMealStatus(mealStatusResponse.data.deliveries);
//         setPantryPerformance(pantryPerformanceResponse.data);
//         setDeliveryPersonnel(deliveryPersonnelResponse.data);
//       } catch (error) {
//         console.error("Error fetching pantry data", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Assign a random delivery personnel to a meal
//   const assignDeliveryPersonnel = (mealId) => {
//     const assignedPersonnel =
//       deliveryPersonnel[Math.floor(Math.random() * deliveryPersonnel.length)];
//     return assignedPersonnel;
//   };

//   // Update the preparation status of a meal
//   const updateMealStatus = async (mealId, newStatus) => {
//     try {
//       const updatedMealStatus = { deliveryStatus: newStatus };
//       await axios.put(`http://localhost:5000/api/dashboard/updateMealStatus/${mealId}`, updatedMealStatus);
//       setMealStatus((prevState) =>
//         prevState.map((meal) =>
//           meal._id === mealId ? { ...meal, deliveryStatus: newStatus } : meal
//         )
//       );
//     } catch (error) {
//       console.error("Error updating meal status", error);
//     }
//   };

//   // Mark meal as delivered by delivery personnel
//   const markAsDelivered = async (mealId) => {
//     try {
//       const updatedMealStatus = { deliveryStatus: "Delivered" };
//       await axios.put(`http://localhost:5000/api/dashboard/updateMealStatus/${mealId}`, updatedMealStatus);
//       setMealStatus((prevState) =>
//         prevState.map((meal) =>
//           meal._id === mealId ? { ...meal, deliveryStatus: "Delivered" } : meal
//         )
//       );
//     } catch (error) {
//       console.error("Error marking meal as delivered", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Inner Pantry Dashboard</h2>

//       {/* Meal Preparation and Delivery Status */}
//       <h3>Meal Preparation and Delivery Status</h3>
//       <ul>
//         {mealStatus.map((delivery) => {
//           const assignedPersonnel = assignDeliveryPersonnel(delivery._id);
//           return (
//             <li key={delivery._id}>
//               <strong>{delivery.patientName}</strong> - {delivery.deliveryStatus}
//               <br />
//               <em>Assigned to: {assignedPersonnel.name} ({assignedPersonnel.role})</em>
//               <br />
//               {delivery.deliveryStatus === "Prepared" && (
//                 <button onClick={() => updateMealStatus(delivery._id, "In Progress")}>
//                   Mark as In Progress
//                 </button>
//               )}
//               {delivery.deliveryStatus === "In Progress" && (
//                 <button onClick={() => markAsDelivered(delivery._id)}>
//                   Mark as Delivered
//                 </button>
//               )}
//             </li>
//           );
//         })}
//       </ul>

//       {/* Pantry Staff Performance */}
//       <h3>Pantry Staff Performance</h3>
//       <ul>
//         {pantryPerformance.map((staff) => (
//           <li key={staff._id}>
//             {staff.name} - {staff.role}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default InnerPantryDashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";

const InnerPantryDashboard = () => {
  const [mealStatus, setMealStatus] = useState([]);
  const [deliveryPersonnel, setDeliveryPersonnel] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mealStatusResponse = await axios.get(
          "http://localhost:5000/api/dashboard/mealStatus"
        );

        const deliveryPersonnelResponse = await axios.get(
          "http://localhost:5000/api/dashboard/deliveryPersonnel"
        );

        setMealStatus(mealStatusResponse.data.deliveries);
        setDeliveryPersonnel(deliveryPersonnelResponse.data);
      } catch (error) {
        console.error("Error fetching pantry data", error);
      }
    };

    fetchData();
  }, []);

  // Assign a random delivery personnel to a meal
  const assignDeliveryPersonnel = (mealId) => {
    const assignedPersonnel =
      deliveryPersonnel[Math.floor(Math.random() * deliveryPersonnel.length)];
    return assignedPersonnel;
  };

  // Update the preparation status of a meal
  const updateMealStatus = async (mealId, newStatus) => {
    try {
      const updatedMealStatus = { deliveryStatus: newStatus };
      await axios.put(
        `http://localhost:5000/api/dashboard/updateMealStatus/${mealId}`,
        updatedMealStatus
      );
      setMealStatus((prevState) =>
        prevState.map((meal) =>
          meal._id === mealId ? { ...meal, deliveryStatus: newStatus } : meal
        )
      );
    } catch (error) {
      console.error("Error updating meal status", error);
    }
  };

  // Mark meal as delivered by delivery personnel
  const markAsDelivered = async (mealId) => {
    try {
      const updatedMealStatus = { deliveryStatus: "Delivered" };
      await axios.put(
        `http://localhost:5000/api/dashboard/updateMealStatus/${mealId}`,
        updatedMealStatus
      );
      setMealStatus((prevState) =>
        prevState.map((meal) =>
          meal._id === mealId ? { ...meal, deliveryStatus: "Delivered" } : meal
        )
      );
    } catch (error) {
      console.error("Error marking meal as delivered", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-xl space-y-8">
        <h2 className="text-4xl font-semibold text-center text-blue-600">
          Inner Pantry Dashboard
        </h2>

        {/* Meal Preparation and Delivery Status */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Meal Preparation and Delivery Status
          </h3>
          <ul className="space-y-4">
            {mealStatus.map((delivery) => {
              const assignedPersonnel = assignDeliveryPersonnel(delivery._id);
              return (
                <li
                  key={delivery._id}
                  className="border p-4 rounded-lg shadow-sm bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <strong className="text-xl text-blue-600">
                      {delivery.patientName}
                    </strong>

                    <p
                      className={`mt-2 text-lg font-semibold ${
                        delivery.deliveryStatus === "Delivered"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      Status: {delivery.deliveryStatus}
                    </p>
                  </div>
                  <div className="space-x-2">
                    {delivery.deliveryStatus === "Prepared" && (
                      <button
                        onClick={() =>
                          updateMealStatus(delivery._id, "In Progress")
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Mark as In Progress
                      </button>
                    )}
                    {/* {delivery.deliveryStatus === "In Progress" && (
                      <button
                        onClick={() => markAsDelivered(delivery._id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        Mark as Delivered
                      </button>
                    )} */}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InnerPantryDashboard;
