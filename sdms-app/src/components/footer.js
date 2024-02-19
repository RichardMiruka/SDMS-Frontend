import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-700" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-16">
        <div className="flex flex-wrap items-baseline lg:justify-center">
          <span className="mt-2 text-sm font-light text-gray-500">
            Copyright © 2024 - 2025
            <a href="https://google.com" className="mx-2 text-yellow-300 hover:text-gray-500" rel="noopener noreferrer">
              @sdmsHQ
            </a>. Since 2024
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
