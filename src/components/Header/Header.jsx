import React from 'react';

const Header = () => {
  return (
<header className="bg-[#E8C999] text-[#222222] shadow-md">
  <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
    <div className="text-2xl font-bold text-[#8E1616]">
      NSR Lorry Sales
    </div>
    <div className="text-sm md:text-right">
      <p className="font-semibold">
        Broker: <span className="text-[#8E1616]">KAMARAJ</span>
      </p>
      <p>📞 9443262127</p>
    </div>
  </div>
</header>

  );
};

export default Header;
