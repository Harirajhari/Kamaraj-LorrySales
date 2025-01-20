import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import LorryDetail from './components/LorryDetail/LorryDetail';
import AdminPage from './components/AdminPage/AdminPage'; // Import AdminPage component
import LorryDetailAdmin from './components/AdminPage/LorryDetailAdmin';
import AddLorry from './components/AdminPage/AddLorry';
import { Client, Databases } from 'appwrite'; // Import Appwrite SDK

function App() {
  const [selectedLorry, setSelectedLorry] = useState(null);
  const [lorries, setLorries] = useState([]); // State to hold lorries fetched from Appwrite

  // Appwrite Client Setup
  const client = new Client();
  client.setEndpoint('https://cloud.appwrite.io/v1').setProject('67810eb3001248099113'); // Your Appwrite endpoint and project ID
  const databases = new Databases(client); // Appwrite Database API

  // Fetch lorries from Appwrite
  useEffect(() => {
    const fetchLorries = async () => {
      try {
        const response = await databases.listDocuments(
          '6783dd920033baafee24', // Replace with your Appwrite database ID
          '6783ddbb00096a0eca8d' // Replace with your Appwrite collection ID
        );
        setLorries(response.documents); // Set fetched data to lorries state
      } catch (error) {
        console.error('Error fetching lorries:', error); // Log any errors
      }
    };

    fetchLorries(); // Fetch data when the component mounts
  }, []); // Empty dependency array to only run on component mount

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              selectedLorry ? (
                <LorryDetail lorry={selectedLorry} onBack={() => setSelectedLorry(null)} />
              ) : (
                <Body lorries={lorries} onCardClick={setSelectedLorry} />
              )
            }
          />
          <Route path="/admin" element={<AdminPage />} /> {/* Admin route */}
          <Route path="/admin/add-lorry" element={<AddLorry />} />
          <Route path="/lorry-detail/:lorryId" element={<LorryDetailAdmin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
