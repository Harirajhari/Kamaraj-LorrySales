import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Client, Databases, Storage } from "appwrite";
import "./LorryDetailAdmin.css"; // You can keep your custom styles if needed

const LorryDetailAdmin = () => {
  const { lorryId } = useParams();
  const [lorry, setLorry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedLorry, setEditedLorry] = useState(null);

  // Appwrite Client Setup
  const client = new Client();
  client.setEndpoint('https://cloud.appwrite.io/v1').setProject('67810eb3001248099113');
  const databases = new Databases(client);
  const storage = new Storage(client);

  useEffect(() => {
    const fetchLorry = async () => {
      try {
        const response = await databases.getDocument(
          '6783dd920033baafee24',
          '6783ddbb00096a0eca8d',
          lorryId
        );
        setLorry(response);
        setEditedLorry(response);

        const imageUrls = await Promise.all(
          response.lorry_image.map(async (fileId) => {
            try {
              return fileId; // Assume this is a complete URL
            } catch (error) {
              console.error("Error fetching image:", error);
              return null;
            }
          })
        );
        setLorry((prevLorry) => ({ ...prevLorry, lorry_image: imageUrls }));
      } catch (error) {
        console.error("Error fetching lorry details:", error);
      }
    };

    fetchLorry();
  }, [lorryId]);

  if (!lorry || !lorry.lorry_image) return <div>Loading...</div>;

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedLorry({ ...editedLorry, [name]: value });
  };

  const saveChanges = async () => {
    try {
      const { lorry_image, $id, ...updatedLorry } = editedLorry;

      // Data validation
      if (isNaN(editedLorry.price) || isNaN(editedLorry.no_of_owner) || isNaN(editedLorry.mileage) || isNaN(editedLorry.manufacturing_year)) {
        throw new Error("Please ensure all numeric fields are valid.");
      }

      await databases.updateDocument(
        '6783dd920033baafee24',
        '6783ddbb00096a0eca8d',
        lorryId,
        updatedLorry
      );

      setLorry((prevLorry) => ({ ...prevLorry, ...updatedLorry }));
      setShowModal(false);
      alert("Lorry details updated successfully!");
    } catch (error) {
      console.error("Error updating lorry:", error);
      alert(error.message);
    }
  };

  return (
    <div className="LorryDetailPage max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="lorry-detail-container mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">{lorry.lorry_name}</h1>

        {/* Lorry Images Section */}
        <div className="lorry-images mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lorry.lorry_image?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${lorry.lorry_name} - ${index + 1}`}
              className="w-full h-64 object-cover rounded-md shadow-md"
            />
          ))}
        </div>

        {/* Lorry Details Section */}
        <div className="lorry-details space-y-4 mb-6">
          <p><strong>Lorry Number:</strong> {lorry.lorry_number}</p>
          <p><strong>Manufacturing Year:</strong> {lorry.manufacturing_year}</p>
          <p><strong>Mileage:</strong> {lorry.mileage}</p>
          <p><strong>Fuel Type:</strong> {lorry.fuel_type}</p>
          <p><strong>Number of Owners:</strong> {lorry.no_of_owner}</p>
          <p><strong>Lorry FC:</strong> {lorry.lorry_fc}</p>
          <p><strong>Lorry RC:</strong> {lorry.lorry_rc}</p>
          <p><strong>National Permit:</strong> {lorry.national_permit}</p>
          <p><strong>Location:</strong> {lorry.location}</p>
          <p><strong>Price:</strong> ₹{lorry.price}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600"
            onClick={() => setShowModal(true)}
          >
            Edit
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md shadow-md hover:bg-gray-400"
            onClick={() => (window.location.href = "/admin")}
          >
            Back to Admin Panel
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit Lorry Details</h2>
            <form>
              {[
                { label: "Lorry Name", name: "lorry_name", type: "text" },
                { label: "Lorry Number", name: "lorry_number", type: "text" },
                { label: "Manufacturing Year", name: "manufacturing_year", type: "number" },
                { label: "Mileage", name: "mileage", type: "number" },
                { label: "Fuel Type", name: "fuel_type", type: "text" },
                { label: "Number of Owners", name: "no_of_owner", type: "number" },
                { label: "Lorry FC", name: "lorry_fc", type: "text" },
                { label: "Lorry RC", name: "lorry_rc", type: "text" },
                { label: "National Permit", name: "national_permit", type: "text" },
                { label: "Location", name: "location", type: "text" },
                { label: "Price", name: "price", type: "number" },
              ].map((field) => (
                <div key={field.name} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={editedLorry[field.name]}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <div className="flex justify-between gap-4 mt-6">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600"
                  onClick={saveChanges}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LorryDetailAdmin;
