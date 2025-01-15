import React, { useState } from 'react';
import './Header.css'; // Add styles in this file

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">Kamaraj LorrySales</div>
      <div className="owner-info">
        <p><strong>Owner:</strong> Kamaraj</p>
        <p><strong>Contact:</strong> 9443262127</p>
      </div>
    </header>
  );
};

export default Header;
