import React, { useState, useEffect } from 'react';
import { Client, Databases, Storage } from 'appwrite';
import './AdminPage.css';

const AdminPage = () => {
  const [lorries, setLorries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLorry, setNewLorry] = useState({
    lorry_name: '',
    lorry_number: '',
    manufacturing_year: '',
    mileage: '',
    fuel_type: '',
    no_of_owner: '',
    lorry_fc: '',
    lorry_rc: '',
    national_permit: '',
    location: '',
    price: '',
    lorry_image: [],
  });

  // Appwrite Client Setup
  const client = new Client();
  client.setEndpoint('https://cloud.appwrite.io/v1').setProject('67810eb3001248099113'); // Your Appwrite endpoint and project ID
  const databases = new Databases(client);
  const storage = new Storage(client); // Appwrite Storage API

  useEffect(() => {
    // Fetch lorry data from Appwrite database
    const fetchLorries = async () => {
      try {
        const response = await databases.listDocuments(
          '6783dd920033baafee24', // Replace with your database ID
          '6783ddbb00096a0eca8d' // Replace with your collection ID
        );
        setLorries(response.documents);
      } catch (error) {
        console.error('Error fetching lorries:', error);
      }
    };
    fetchLorries();
  }, []); // Empty dependency array to run the effect once when the component mounts

  // Delete Lorry from Database and remove images from Storage
  const handleDeleteLorry = async (lorryId, lorryImages) => {
    console.log(lorryImages);
    
    try {
      // Delete images from the Appwrite Storage bucket
      for (const imageUrl of lorryImages) {
        // Extract the file ID from the image URL
        const fileId = imageUrl.split('/files/')[1].split('/view')[0]; // This extracts the file ID from the URL
        console.log(`Deleting image with file ID: ${fileId}`);
  
        // Delete the image from the storage bucket using the file ID
        await storage.deleteFile('6783e2a6002aedc40288', fileId); // Replace with your bucket ID
        console.log(`Deleted image with file ID: ${fileId}`);
      }
  
      // Delete lorry data from the database
      await databases.deleteDocument(
        '6783dd920033baafee24', // Replace with your database ID
        '6783ddbb00096a0eca8d', // Replace with your collection ID
        lorryId
      );
      console.log(`Deleted lorry with ID: ${lorryId}`);
  
      // Remove deleted lorry from state to update UI
      setLorries((prevLorries) => prevLorries.filter((lorry) => lorry.$id !== lorryId));
    } catch (error) {
      console.error('Error deleting lorry:', error);
    }
  };
  

  return (
    <div className="adminPage">
      <div className="admin-container">
        <h1 className="admin-title">Admin Panel</h1>

        {/* Add Lorry Button */}
        <button
          onClick={() => window.location.href = `/Admin/add-lorry`}
          className="add-lorry-btn"
        >
          Add New Lorry
        </button>

        <div className="lorries-list">
          {lorries.map((lorry) => (
            <div key={lorry.$id} className="lorry-card">
              <h3>{lorry.lorry_name}</h3>
              <p>{lorry.lorry_number}</p>
              <p>{lorry.manufacturing_year}</p>
              <button
                onClick={() => window.location.href = `/lorry-detail/${lorry.$id}`}
                className="detail-btn"
              >
                View Details
              </button>
              <button
                onClick={() => handleDeleteLorry(lorry.$id, lorry.lorry_image)}
                className="delete-btn"
              >
                Delete Lorry
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
