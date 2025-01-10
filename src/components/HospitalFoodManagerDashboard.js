// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const HospitalFoodManagerDashboard = () => {
//   const [deliveries, setDeliveries] = useState([]);
//   const [delayedDeliveries, setDelayedDeliveries] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [newPatient, setNewPatient] = useState({
//     name: "",
//     roomNumber: "",
//     bedNumber: "",
//     floorNumber: "",
//     age: "",
//     gender: "",
//     contactInfo: "",
//     emergencyContact: "",
//     menu: "",
//     deliveryStatus: "Prepared", // New patients will have "Prepared" as default
//   });
//   const [editPatientId, setEditPatientId] = useState(null);

//   const hardcodedMenus = ["Menu 1", "Menu 2", "Menu 3", "Menu 4", "Menu 5"];

//   // Fetching data when the component loads or after adding a patient
//   useEffect(() => {
//     fetchData();
//   }, []); // Empty dependency array ensures it runs once when the component mounts

//   const fetchData = async () => {
//     try {
//       const deliveriesResponse = await axios.get(
//         "http://localhost:5000/api/dashboard/mealStatus"
//       );
//       const delayedResponse = await axios.get(
//         "http://localhost:5000/api/dashboard/mealStatus"
//       );
//       const patientsResponse = await axios.get(
//         "http://localhost:5000/api/dashboard/patients"
//       );

//       setDeliveries(deliveriesResponse.data.deliveries);
//       setDelayedDeliveries(delayedResponse.data.deliveries);
//       setPatients(patientsResponse.data);
//     } catch (error) {
//       console.error("Error fetching dashboard data", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewPatient((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editPatientId) {
//         // Edit existing patient
//         const response = await axios.put(
//           `http://localhost:5000/api/updatePatient/${editPatientId}`,
//           newPatient
//         );
//         console.log("Patient updated successfully", response.data);

//         setPatients((prev) =>
//           prev.map((patient) =>
//             patient._id === editPatientId ? response.data.patient : patient
//           )
//         );
//         setEditPatientId(null); // Reset the edit form
//       } else {
//         // Add new patient
//         const response = await axios.post(
//           "http://localhost:5000/api/addPatient",
//           newPatient
//         );
//         console.log("Patient added successfully", response.data);

//         // Update patients state after adding a new patient
//         setPatients((prev) => [...prev, response.data.patient]);
//       }

//       // Re-fetch deliveries and patients data to show updated status
//       fetchData();

//       // Reset the form
//       setNewPatient({
//         name: "",
//         roomNumber: "",
//         bedNumber: "",
//         floorNumber: "",
//         age: "",
//         gender: "",
//         contactInfo: "",
//         emergencyContact: "",
//         menu: "",
//         deliveryStatus: "Prepared", // Ensure new patients have 'Prepared' status
//       });
//     } catch (error) {
//       console.error("Error adding or updating patient", error);
//     }
//   };

//   const handleEditClick = (patient) => {
//     setNewPatient(patient);
//     setEditPatientId(patient._id);
//   };

//   const handleDeleteClick = async (patientId) => {
//     try {
//       await axios.delete(
//         `http://localhost:5000/api/deletePatient/${patientId}`
//       );
//       setPatients((prev) =>
//         prev.filter((patient) => patient._id !== patientId)
//       );
//       console.log("Patient deleted successfully");
//     } catch (error) {
//       console.error("Error deleting patient", error);
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen p-8">
//       <div className="max-w-6xl mx-auto space-y-10">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-semibold text-blue-600">
//             Hospital Food Manager Dashboard
//           </h1>
//         </div>

//         {/* Add New Patient Form */}
//         <div className="bg-white p-8 rounded-lg shadow-lg">
//           <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
//             {editPatientId ? "Edit Patient" : "Add New Patient"}
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Patient input fields */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Patient Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={newPatient.name}
//                   onChange={handleInputChange}
//                   className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter patient's name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Room Number
//                 </label>
//                 <input
//                   type="text"
//                   name="roomNumber"
//                   value={newPatient.roomNumber}
//                   onChange={handleInputChange}
//                   className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Room number"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Bed Number
//                 </label>
//                 <input
//                   type="text"
//                   name="bedNumber"
//                   value={newPatient.bedNumber}
//                   onChange={handleInputChange}
//                   className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Bed number"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Floor Number
//                 </label>
//                 <input
//                   type="text"
//                   name="floorNumber"
//                   value={newPatient.floorNumber}
//                   onChange={handleInputChange}
//                   className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Floor number"
//                 />
//               </div>
//             </div>

//             {/* Additional fields for age, gender, contact info, emergency contact, and food menu */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Age
//                 </label>
//                 <input
//                   type="number"
//                   name="age"
//                   value={newPatient.age}
//                   onChange={handleInputChange}
//                   className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Age"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Gender
//                 </label>
//                 <select
//                   name="gender"
//                   value={newPatient.gender}
//                   onChange={handleInputChange}
//                   className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Contact Info
//                 </label>
//                 <input
//                   type="text"
//                   name="contactInfo"
//                   value={newPatient.contactInfo}
//                   onChange={handleInputChange}
//                   className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Contact info"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Emergency Contact
//                 </label>
//                 <input
//                   type="text"
//                   name="emergencyContact"
//                   value={newPatient.emergencyContact}
//                   onChange={handleInputChange}
//                   className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Emergency contact"
//                 />
//               </div>
//             </div>

//             {/* Food Menu Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Food Menu
//               </label>
//               <select
//                 name="menu"
//                 value={newPatient.menu}
//                 onChange={handleInputChange}
//                 className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="">Select Menu</option>
//                 {hardcodedMenus.map((menu, index) => (
//                   <option key={index} value={menu}>
//                     {menu}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6"
//             >
//               {editPatientId ? "Update Patient" : "Assign Food"}
//             </button>
//           </form>
//         </div>

//         {/* Patient Details */}
//         <div className="bg-white p-8 rounded-lg shadow-lg mt-10">
//           <h3 className="text-3xl font-semibold text-center text-blue-600 mb-6">
//             Patient Details
//           </h3>
//           <ul>
//             {patients.map((patient) => (
//               <li
//                 key={patient._id || `${patient.name}-${patient.roomNumber}`}
//                 className="border p-4 mb-4 rounded-lg shadow-sm bg-gray-50"
//               >
//                 <div className="font-semibold text-lg">{patient.name}</div>
//                 <div className="text-sm text-gray-600">
//                   Menu: {patient.menu}
//                 </div>
//                 <div className="mt-2 text-sm text-gray-600">
//                   Bed: {patient.bedNumber}, Room: {patient.roomNumber}, Floor:{" "}
//                   {patient.floorNumber}
//                 </div>
//                 <div className="mt-2 text-sm text-gray-600">
//                   Age: {patient.age}, Gender: {patient.gender}
//                 </div>
//                 <div className="mt-2 text-sm text-gray-600">
//                   Contact: {patient.contactInfo}, Emergency:{" "}
//                   {patient.emergencyContact}
//                 </div>

//                 {/* Delivery Status */}
//                 <ul className="mt-2 space-y-2">
//                   {delayedDeliveries
//                     .filter((delivery) => delivery.patientName === patient.name)
//                     .map((delivery) => (
//                       <li
//                         key={
//                           delivery._id ||
//                           `${delivery.patientName}-${delivery.menu}`
//                         }
//                         className="bg-yellow-100 p-2 rounded-md"
//                       >
//                         <div>Status: {delivery.deliveryStatus}</div>
//                         {delivery.deliveryStatus === "Prepared" && (
//                           <div className="flex space-x-4 mt-2">
//                             <button
//                               onClick={() => handleEditClick(patient)}
//                               className="text-blue-600 hover:text-blue-800"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteClick(patient._id)}
//                               className="text-red-600 hover:text-red-800"
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </li>
//                     ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HospitalFoodManagerDashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";

const HospitalFoodManagerDashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [delayedDeliveries, setDelayedDeliveries] = useState([]);
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    roomNumber: "",
    bedNumber: "",
    floorNumber: "",
    age: "",
    gender: "",
    contactInfo: "",
    emergencyContact: "",
    menu: "",
    deliveryStatus: "Prepared", // New patients will have "Prepared" as default
  });
  const [editPatientId, setEditPatientId] = useState(null);

  const hardcodedMenus = ["Menu 1", "Menu 2", "Menu 3", "Menu 4", "Menu 5"];

  // Fetching data when the component loads or after adding a patient
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  const fetchData = async () => {
    try {
      const deliveriesResponse = await axios.get(
        "http://localhost:5000/api/dashboard/mealStatus"
      );
      const delayedResponse = await axios.get(
        "http://localhost:5000/api/dashboard/mealStatus"
      );
      const patientsResponse = await axios.get(
        "http://localhost:5000/api/dashboard/patients"
      );

      setDeliveries(deliveriesResponse.data.deliveries);
      setDelayedDeliveries(delayedResponse.data.deliveries);
      setPatients(patientsResponse.data);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editPatientId) {
        // Edit existing patient
        const response = await axios.put(
          `http://localhost:5000/api/updatePatient/${editPatientId}`,
          newPatient
        );
        console.log("Patient updated successfully", response.data);

        setPatients((prev) =>
          prev.map((patient) =>
            patient._id === editPatientId ? response.data.patient : patient
          )
        );
        setEditPatientId(null); // Reset the edit form
      } else {
        // Add new patient
        const response = await axios.post(
          "http://localhost:5000/api/addPatient",
          newPatient
        );
        console.log("Patient added successfully", response.data);

        // Update patients state after adding a new patient
        setPatients((prev) => [...prev, response.data.patient]);
      }

      // Re-fetch deliveries and patients data to show updated status
      fetchData();

      // Reset the form
      setNewPatient({
        name: "",
        roomNumber: "",
        bedNumber: "",
        floorNumber: "",
        age: "",
        gender: "",
        contactInfo: "",
        emergencyContact: "",
        menu: "",
        deliveryStatus: "Prepared", // Ensure new patients have 'Prepared' status
      });
    } catch (error) {
      console.error("Error adding or updating patient", error);
    }
  };

  const handleEditClick = (patient) => {
    setNewPatient(patient);
    setEditPatientId(patient._id);
  };

  const handleDeleteClick = async (patientId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/deletePatient/${patientId}`
      );
      setPatients((prev) =>
        prev.filter((patient) => patient._id !== patientId)
      );
      console.log("Patient deleted successfully");
    } catch (error) {
      console.error("Error deleting patient", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-blue-600">
            Hospital Food Manager Dashboard
          </h1>
        </div>

        {/* Flex container for the form and patient details */}
        <div className="flex flex-wrap gap-8 justify-between">
          {/* Add New Patient Form */}
          <div className="flex-1 w-full sm:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
                {editPatientId ? "Edit Patient" : "Add New Patient"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient input fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newPatient.name}
                      onChange={handleInputChange}
                      className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter patient's name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Room Number
                    </label>
                    <input
                      type="text"
                      name="roomNumber"
                      value={newPatient.roomNumber}
                      onChange={handleInputChange}
                      className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Room number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bed Number
                    </label>
                    <input
                      type="text"
                      name="bedNumber"
                      value={newPatient.bedNumber}
                      onChange={handleInputChange}
                      className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Bed number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Floor Number
                    </label>
                    <input
                      type="text"
                      name="floorNumber"
                      value={newPatient.floorNumber}
                      onChange={handleInputChange}
                      className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Floor number"
                    />
                  </div>
                </div>

                {/* Additional fields for age, gender, contact info, emergency contact, and food menu */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={newPatient.age}
                      onChange={handleInputChange}
                      className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Age"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={newPatient.gender}
                      onChange={handleInputChange}
                      className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Contact Info
                    </label>
                    <input
                      type="text"
                      name="contactInfo"
                      value={newPatient.contactInfo}
                      onChange={handleInputChange}
                      className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Contact info"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={newPatient.emergencyContact}
                      onChange={handleInputChange}
                      className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Emergency contact"
                    />
                  </div>
                </div>

                {/* Food Menu Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Food Menu
                  </label>
                  <select
                    name="menu"
                    value={newPatient.menu}
                    onChange={handleInputChange}
                    className="mt-2 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Menu</option>
                    {hardcodedMenus.map((menu, index) => (
                      <option key={index} value={menu}>
                        {menu}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6"
                >
                  {editPatientId ? "Update Patient" : "Assign Food"}
                </button>
              </form>
            </div>
          </div>

          {/* Patient Details */}
          <div className="flex-1 w-full sm:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow-lg mt-10 sm:mt-0">
              <h3 className="text-3xl font-semibold text-center text-blue-600 mb-6">
                Patient Details
              </h3>
              <ul>
                {patients.map((patient) => (
                  <li
                    key={patient._id || `${patient.name}-${patient.roomNumber}`}
                    className="border p-4 mb-4 rounded-lg shadow-sm bg-gray-50"
                  >
                    <div className="font-semibold text-lg">{patient.name}</div>
                    <div className="text-sm text-gray-600">
                      Menu: {patient.menu}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      Bed: {patient.bedNumber}, Room: {patient.roomNumber},
                      Floor: {patient.floorNumber}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      Age: {patient.age}, Gender: {patient.gender}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      Contact: {patient.contactInfo}, Emergency:{" "}
                      {patient.emergencyContact}
                    </div>

                    {/* Delivery Status */}
                    <ul className="mt-2 space-y-2">
                      {delayedDeliveries
                        .filter(
                          (delivery) => delivery.patientName === patient.name
                        )
                        .map((delivery) => (
                          <li
                            key={
                              delivery._id ||
                              `${delivery.patientName}-${delivery.menu}`
                            }
                            className="bg-yellow-100 p-2 rounded-md"
                          >
                            <div>Status: {delivery.deliveryStatus}</div>
                            {delivery.deliveryStatus === "Prepared" && (
                              <div className="flex space-x-4 mt-2">
                                <button
                                  onClick={() => handleEditClick(patient)}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(patient._id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalFoodManagerDashboard;
