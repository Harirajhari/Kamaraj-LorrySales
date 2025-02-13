import React from 'react';
import './Body.css';

const Body = ({ lorries, onCardClick }) => {
  return (
    <div className="body-section">
      <div className="card-list">
        {lorries.map((lorry) => (
          <div className="card" key={lorry.id} onClick={() => onCardClick(lorry)}>
            <img src={lorry.lorry_image[0]} alt={lorry.lorry_name} />
            <div className="card-details">
              <h3>{lorry.lorry_name}</h3>
              <h3>{lorry.lorry_number.slice(0, 4) + "*".repeat(lorry.lorry_number.length - 4)}</h3>
              <p>Price: {lorry.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;
