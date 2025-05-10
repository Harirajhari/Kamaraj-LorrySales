import React from 'react';
import { Link } from 'react-router-dom';

const Body = ({ lorries, onCardClick }) => {

const formatPriceWithCommas = (num) => {
  return num.toLocaleString('en-IN');
};


  return (
    <div className="mt-15 bg-[#FFF9F1] py-8 pt-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
       {lorries.map((lorry, index) => (
  <Link to={`/lorry/${lorry.$id}`} key={lorry.id}>
    <div className="bg-white border border-[#E8C999] rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden">
      <img src={lorry.lorry_image[0]} alt={lorry.lorry_name} className="w-full h-52 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-bold text-[#8E1616]">{index + 1}. {lorry.lorry_name}</h3>
        <h4 className="text-[#333333] font-medium">
          {lorry.lorry_number.slice(0, 4) + '*'.repeat(lorry.lorry_number.length - 4)}
        </h4>
        <p className="text-sm text-[#555555]">
          <span className="font-semibold text-[#8E1616]">Price:</span> ₹{formatPriceWithCommas(lorry.price)}
        </p>
      </div>
    </div>
  </Link>
))}
      </div>
    </div>
  );
};

export default Body;
