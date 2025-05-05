import React from 'react';

const Body = ({ lorries, onCardClick }) => {
  return (
    <div className="bg-[#FFF9F1] py-8 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {lorries.map((lorry) => (
          <div
            key={lorry.id}
            className="bg-white border border-[#E8C999] rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
            onClick={() => onCardClick(lorry)}
          >
            <img
              src={lorry.lorry_image[0]}
              alt={lorry.lorry_name}
              className="w-full h-52 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-bold text-[#8E1616]">{lorry.lorry_name}</h3>
              <h4 className="text-[#333333] font-medium">
                {lorry.lorry_number.slice(0, 4) + '*'.repeat(lorry.lorry_number.length - 4)}
              </h4>
              <p className="text-sm text-[#555555]">
                <span className="font-semibold text-[#8E1616]">Price:</span> {lorry.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;
