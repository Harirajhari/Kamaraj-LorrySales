import React, { useState } from 'react';
import './Header.css'; // Add styles in this file

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">LorrySales Website</div>
      <div className="owner-info">
        <p><strong>Owner:</strong> John Doe</p>
        <p><strong>Contact:</strong> +123 456 7890</p>
      </div>
    </header>
  );
};

export default Header;
