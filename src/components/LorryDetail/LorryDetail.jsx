import React, { useState } from 'react';
import './LorryDetail.css';
import AdSenseAd from '../AdSenseAd/AdSenseAd';

const LorryDetail = ({ lorry, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(null); // State for managing selected image
  const [isModalOpen, setIsModalOpen] = useState(false); // State for showing/hiding the modal

  // Function to open the modal with the selected image
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="lorry-detail">'
    '
 {/* <AdSenseAd /> */}

      
      <button onClick={onBack} className="back-button">Back</button>
      <h2>{lorry.lorry_name}</h2>
      <p>Lorry Number: {lorry.lorry_number}</p>
      <p>Manufacturing Year: {lorry.manufacturing_year}</p>
      <p>Mileage: {lorry.mileage}</p>
      <p>Fuel Type: {lorry.fuel_type}</p>
      <p>No. of Owners: {lorry.no_of_owner}</p>
      <p>FC: {lorry.lorry_fc}</p>
      <p>RC: {lorry.lorry_rc}</p>
      <p>National Permit: {lorry.national_permit}</p>
      <p>Location: {lorry.location}</p>
      <p>Price: {lorry.price}</p>
      
      <div className="images">
        {lorry.lorry_image.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Lorry ${index + 1}`}
            onClick={() => openModal(img)} // Open modal on image click
          />
        ))}
      </div>

      {/* <AdSenseAd /> */}

      {/* Modal to display the full-screen image */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <img 
              src={selectedImage} 
              alt="Zoomed" 
              className="zoomed-image" 
            />
          </div>
        </div>
      )}


{/* <AdSenseAd /> */}


    </div>
  );
};

export default LorryDetail;
