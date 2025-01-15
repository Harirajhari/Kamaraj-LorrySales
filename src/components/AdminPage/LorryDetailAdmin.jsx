import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Client, Databases, Storage } from "appwrite";
import "./LorryDetailAdmin.css";

const LorryDetailAdmin = () => {
  const { lorryId } = useParams();
  const [lorry, setLorry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedLorry, setEditedLorry] = useState(null);

  // Appwrite Client Setup
  const client = new Client();
  client.setEndpoint('https://cloud.appwrite.io/v1').setProject('67810eb3001248099113'); // Your Appwrite endpoint and project ID
  const databases = new Databases(client);
  const storage = new Storage(client); // Appwrite Storage API

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

        // Fetch image URLs correctly
        const imageUrls = await Promise.all(
          response.lorry_image.map(async (fileId) => {
            try {
              console.log(fileId);
              
              // Fetch the file using just the fileId, not the full URL
              // const file = await storage.getFile('6783e2a6002aedc40288', fileId);
              // console.log(file);

              return fileId; // This will give you the full URL
            } catch (error) {
              console.error("Error fetching image from bucket:", error);
              return null; // In case of an error, return null
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

  // Make sure to check for `lorry_image` before rendering
  if (!lorry || !lorry.lorry_image) return <div>Loading images...</div>;

  if (!lorry) return <div>Loading...</div>;

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedLorry({ ...editedLorry, [name]: value });
  };

  const saveChanges = async () => {
    try {
      // Create a new object with all fields except `lorry_image` for updating
      const { 
        lorry_image, // Exclude images since you're not editing them
        $id,          // Exclude internal fields
        $createdAt,
        $updatedAt,
        $permissions,
        $databaseId,
        $collectionId,
        price,
        no_of_owner,
        mileage,
        manufacturing_year,
        ...updatedLorry  // Only the editable fields will remain
      } = editedLorry;
      
      // Check and validate the price field
      if (price && !isNaN(price)) {
        updatedLorry.price = parseFloat(price); // Convert to float
      } else if (price) {
        throw new Error("Invalid price value, must be a valid number");
      }
      
      // Check and validate other fields if necessary
      if (no_of_owner && !isNaN(no_of_owner)) {
        updatedLorry.no_of_owner = parseInt(no_of_owner, 10); // Convert to integer
      } else if (no_of_owner) {
        throw new Error("Invalid number of owners value, must be a valid number");
      }
      
      if (mileage && !isNaN(mileage)) {
        updatedLorry.mileage = parseFloat(mileage); // Convert to float
      } else if (mileage) {
        throw new Error("Invalid mileage value, must be a valid number");
      }
      
      if (manufacturing_year && !isNaN(manufacturing_year)) {
        updatedLorry.manufacturing_year = parseInt(manufacturing_year, 10); // Convert to integer
      } else if (manufacturing_year) {
        throw new Error("Invalid manufacturing year value, must be a valid number");
      }

      
      console.log("Updating with data:", updatedLorry);


      // Update the lorry details in Appwrite
      await databases.updateDocument(
        '6783dd920033baafee24', // Replace with your database ID
        '6783ddbb00096a0eca8d', // Replace with your collection ID
        lorryId, // The document ID
        updatedLorry // The updated lorry data excluding lorry_image
      );
      setLorry((prevLorry) => ({ ...prevLorry, ...updatedLorry }));
      setShowModal(false);
      console.log("Updated Lorry:", updatedLorry);
    } catch (error) {
      console.error("Error updating lorry:", error);
    }
  };

  return (
    <div className="LorryDetailPage">
      <div className="lorry-detail-container">
        <h1>{lorry.lorry_name}</h1>
        <div className="lorry-images">
          {lorry.lorry_image?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${lorry.lorry_name} - ${index + 1}`}
              className="lorry-image"
            />
          ))}
        </div>

        <div className="lorry-details">
          <p><strong>Lorry Number:</strong> {lorry.lorry_number}</p>
          <p><strong>Manufacturing Year:</strong> {lorry.manufacturing_year}</p>
          <p><strong>Mileage:</strong> {lorry.mileage}</p>
          <p><strong>Fuel Type:</strong> {lorry.fuel_type}</p>
          <p><strong>Number of Owners:</strong> {lorry.no_of_owner}</p>
          <p><strong>Lorry FC:</strong> {lorry.lorry_fc}</p>
          <p><strong>Lorry RC:</strong> {lorry.lorry_rc}</p>
          <p><strong>National Permit:</strong> {lorry.national_permit}</p>
          <p><strong>Location:</strong> {lorry.location}</p>
          <p><strong>Price:</strong> {lorry.price}</p>
        </div>
        <button
          className="edit-btn"
          onClick={() => setShowModal(true)}
        >
          Edit
        </button>
        <button
          className="back-btn"
          onClick={() => (window.location.href = "/admin")}
        >
          Back to Admin Panel
        </button>
      </div>

      {showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Edit Lorry Details</h2>
      <form>
        <label>
          Lorry Name:
          <input
            type="text"
            name="lorry_name"
            value={editedLorry.lorry_name}
            onChange={handleEditChange}
          />
        </label>
        <label>
          Lorry Number:
          <input
            type="text"
            name="lorry_number"
            value={editedLorry.lorry_number}
            onChange={handleEditChange}
          />
        </label>
        <label>
          Manufacturing Year:
          <input
            type="number"
            name="manufacturing_year"
            value={editedLorry.manufacturing_year}
            onChange={handleEditChange}
          />
        </label>
        <label>
          Mileage:
          <input
            type="text"
            name="mileage"
            value={editedLorry.mileage}
            onChange={handleEditChange}
          />
        </label>
        <label>
          Fuel Type:
          <input
            type="text"
            name="fuel_type"
            value={editedLorry.fuel_type}
            onChange={handleEditChange}
          />
        </label>
        <label>
          Number of Owners:
          <input
            type="number"
            name="no_of_owner"
            value={editedLorry.no_of_owner}
            onChange={handleEditChange}
          />
        </label>
        <label>
          Lorry FC:
          <input
            type="text"
            name="lorry_fc"
            value={editedLorry.lorry_fc}
            onChange={handleEditChange}
          />
        </label>
        <label>
          Lorry RC:
          <input
            type="text"
            name="lorry_rc"
            value={editedLorry.lorry_rc}
            onChange={handleEditChange}
          />
        </label>
        <label>
          National Permit:
          <input
            type="text"
            name="national_permit"
            value={editedLorry.national_permit}
            onChange={handleEditChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={editedLorry.location}
            onChange={handleEditChange}
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={editedLorry.price}
            onChange={handleEditChange}
          />
        </label>
        {/* Add more fields as needed */}
        <div className="modal-actions">
          <button type="button" onClick={saveChanges}>
            Save Changes
          </button>
          <button
            type="button"
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
