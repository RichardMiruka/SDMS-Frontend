import React from 'react';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  return (
    <nav className='bg-blue-700 text-white p-4'>
      <div className="container mx-auto flex justify-between text-center">
        <div className="text-xl text-bold">SDMS</div>
        <ul className='flex space-x-4'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/tournament">Tournament</Link></li>
          <li><Link to="/Register">Register</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
