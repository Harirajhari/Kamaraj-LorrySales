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
              <p>{lorry.lorry_number}</p>
              <p>Price: {lorry.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;
