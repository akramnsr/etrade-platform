import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>© {new Date().getFullYear()} PORTNET Morocco - eTrade Platform</p>
        <p className="mt-1 text-gray-400">Export Bill Purchase Digital Financing</p>
      </div>
    </footer>
  );
};

export default Footer;
