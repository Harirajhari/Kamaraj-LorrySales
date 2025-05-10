import React, { useState } from 'react';
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from 'react-share';
import { useParams, useNavigate } from 'react-router-dom';

const LorryDetail = ({ lorries , onBack }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  
  const formatPriceWithCommas = (num) => {
    return num.toLocaleString('en-IN');
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

    const lorry = lorries.find((l) => l.$id === id); // Assuming `id` is string

  if (!lorry) return <p className="p-8 text-red-600">Lorry not found.</p>;
  

  const shareUrl = window.location.href;
  const shareTitle = `Lorry Name : ${lorry.lorry_name}`;

  return (
<div className="mt-15 bg-[#FDF8EE]  min-h-screen pt-20 p-4 sm:p-6 lg:p-10 text-[#222222] ">
      {/* Back Button */}
       <button
    onClick={() => navigate(-1)}
    className="mb-4 inline-block text-sm text-[#8E1616] font-medium hover:underline"
  >
    ← Back to Listings
  </button>

      {/* Container */}
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
        {/* Title & Price */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#8E1616]">
            {lorry.lorry_name}
          </h2>
          <p className="text-xl font-semibold text-[#222222] mt-2 sm:mt-0">
            ₹{formatPriceWithCommas(lorry.price)}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#E8C999] pt-4 text-sm sm:text-base">
          <p><strong>Lorry Number:</strong> {lorry.lorry_number.slice(0, 4) + '*'.repeat(lorry.lorry_number.length - 4)}</p>
          <p><strong>Year:</strong> {lorry.manufacturing_year}</p>
          <p><strong>Mileage:</strong> {lorry.mileage}</p>
          <p><strong>Fuel:</strong> {lorry.fuel_type}</p>
          <p><strong>Owners:</strong> {lorry.no_of_owner}</p>
          <p><strong>FC:</strong> {lorry.lorry_fc}</p>
          <p><strong>RC:</strong> {lorry.lorry_rc}</p>
          <p><strong>Permit:</strong> {lorry.national_permit}</p>
          <p><strong>Location:</strong> {lorry.location}</p>
        </div>

        {/* Image Grid */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-[#8E1616] mb-4">Photos</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {lorry.lorry_image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Lorry ${index + 1}`}
                className="w-full h-40 object-cover rounded-md cursor-pointer shadow hover:shadow-lg transition-all duration-200"
                onClick={() => openModal(img)}
              />
            ))}
          </div>
        </div>

        {/* Contact Button */}
        <div className="mt-8">
          <a
            href={`https://wa.me/91${lorry.contact_number || '9443262127'}?text=${encodeURIComponent(
              `Hello, I'm interested in the lorry "${lorry.$id} : ${lorry.lorry_name}" listed at ₹${lorry.price}. Could you provide more details? --> Direct Link : ${shareUrl}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#8E1616] text-white px-6 py-2 rounded-lg hover:bg-[#6e1111] transition"
          >
            📞 Contact Seller on WhatsApp
          </a>
        </div>

        {/* Share Buttons */}
        <div className="mt-6">
          <h4 className="text-[#8E1616] font-semibold mb-2">Share this listing:</h4>
          <div className="flex space-x-4">
            <WhatsappShareButton url={shareUrl} title={shareTitle}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>

            <FacebookShareButton url={shareUrl} quote={shareTitle}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            <TwitterShareButton url={shareUrl} title={shareTitle}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>

          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-4 -right-4 bg-white text-[#8E1616] w-10 h-10 rounded-full shadow-md flex items-center justify-center text-2xl font-bold hover:bg-[#f8f8f8] transition"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Zoomed"
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LorryDetail;
