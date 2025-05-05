import React, { useState, useEffect } from 'react';
import { Client, Databases, Storage } from 'appwrite';

const AdminPage = () => {
  const [lorries, setLorries] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term

  const client = new Client();
  client.setEndpoint('https://cloud.appwrite.io/v1').setProject('67810eb3001248099113');
  const databases = new Databases(client);
  const storage = new Storage(client);

  useEffect(() => {
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
  }, []);

  const handleDeleteLorry = async (lorryId, lorryImages) => {
    try {
      for (const imageUrl of lorryImages) {
        const fileId = imageUrl.split('/files/')[1].split('/view')[0];
        await storage.deleteFile('6783e2a6002aedc40288', fileId);
      }
      await databases.deleteDocument(
        '6783dd920033baafee24', // Replace with your database ID
        '6783ddbb00096a0eca8d', // Replace with your collection ID
        lorryId
      );
      setLorries((prevLorries) => prevLorries.filter((lorry) => lorry.$id !== lorryId));
    } catch (error) {
      console.error('Error deleting lorry:', error);
    }
  };

  // Filter lorries by search term
  const filteredLorries = lorries.filter(lorry =>
    lorry.lorry_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="adminPage bg-[#F8F9FA] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="admin-container max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#8E1616] mb-8 text-center">Admin Panel</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by lorry name"
            className="w-full sm:w-auto border rounded-lg py-2 px-4 text-[#222222] border-[#888] focus:outline-none focus:border-[#8E1616] transition duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          />
        </div>

        {/* Add Lorry Button */}
        <button
          onClick={() => window.location.href = `/Admin/add-lorry`}
          className="w-full sm:w-auto bg-[#8E1616] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#6b1010] transition duration-300 mb-6 mx-auto block"
        >
          Add New Lorry
        </button>

        {/* Lorries List */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredLorries.map((lorry) => (
            <div key={lorry.$id} className="lorry-card bg-white rounded-lg shadow-lg overflow-hidden p-6 hover:shadow-xl transition-shadow duration-300">
              <img src={lorry.lorry_image[0]} alt={lorry.lorry_name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold text-[#8E1616] mb-2">{lorry.lorry_name}</h3>
              <p className="text-sm text-[#555555] mb-2">{lorry.lorry_number}</p>
              <p className="text-sm text-[#777777] mb-4">{lorry.manufacturing_year}</p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => window.location.href = `/lorry-detail/${lorry.$id}`}
                  className="text-[#8E1616] font-medium hover:underline transition duration-300"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleDeleteLorry(lorry.$id, lorry.lorry_image)}
                  className="text-white bg-[#8E1616] hover:bg-[#6b1010] font-medium py-1 px-3 rounded-lg transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
