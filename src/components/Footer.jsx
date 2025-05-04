

// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-8 border-t border-gray-200 dark:border-gray-700">
<div className="container mx-auto px-4 text-center">
  <p className="text-gray-600 dark:text-gray-300">
    &copy; {new Date().getFullYear()} Country Explorer. All rights reserved.
  </p>
  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
    Made with ❤️ for geography enthusiasts around the world
  </p>
</div>
</footer>
  );
};

export default Footer;