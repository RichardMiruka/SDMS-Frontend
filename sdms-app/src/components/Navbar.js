// import React from 'react';
import { Link } from 'react-router-dom';

import React, { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-7xl">
      <div className="flex flex-col max-w-screen-xl p-5 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between lg:justify-start">
          <a className="text-lg font-bold tracking-tighter text-blue-600 transition duration-500 ease-in-out transform tracking-relaxed lg:pr-8" href="/groups/header/">
            SDMS
          </a>
          <button className="rounded-lg md:hidden focus:outline-none focus:shadow-outline" onClick={() => setOpen(!open)}>
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-8 h-8">
              <path className={open ? 'hidden' : 'block'} fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
              <path className={open ? 'block' : 'hidden'} fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>

        <nav className={`md:flex md:justify-end md:flex-row lg:border-l-2 lg:pl-2 ${open ? 'flex' : 'hidden'}`}>
          <a className="px-4 py-2 mt-2 text-sm text-gray-500 md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline">
            <li><Link to="/about">About</Link></li>
          </a>
          <a className="px-4 py-2 mt-2 text-sm text-gray-500 md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline">
          <Link to="/contact">Contact</Link>
          </a>
          <div onClick={() => setOpen(false)} className="relative" x-data="{ open: false }">
            <button onClick={() => setOpen(!open)} className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm text-left text-gray-500 md:w-auto md:inline md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline">
              <span>Tournaments</span>
              <svg fill="currentColor" viewBox="0 0 20 20" className={`inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform ${open ? 'rotate-180' : 'rotate-0'} md:-mt-1`}>
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            <div className={`absolute right-0 z-30 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48 ${open ? 'block' : 'hidden'}`}>
              <div className="px-2 py-2 bg-white rounded-md shadow">
                <a className="block px-4 py-2 mt-2 text-sm text-gray-500 md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline">
                <li><Link to="/dashboard">Dashboard</Link></li>
                </a>
                <a className="block px-4 py-2 mt-2 text-sm text-gray-500 md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline" href="#">
                  Link #2
                </a>
                <a className="block px-4 py-2 mt-2 text-sm text-gray-500 md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline" href="#">
                  Link #3
                </a>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
            <button className="items-center block px-10 py-2.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Sign in
            </button>
            <button className="items-center block px-10 py-3 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Sign up
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;


// const Navbar = () => {
//   return (
//     <nav className='bg-blue-700 text-white p-4'>
//       <div className="container mx-auto flex justify-between text-center">
//         <div className="text-xl text-bold">SDMS</div>
//         <ul className='flex space-x-4'>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/dashboard">Dashboard</Link></li>
//           <li><Link to="/about">About</Link></li>
//           <li><Link to="/contact">Contact</Link></li>
//           <li><Link to="/tournament">Tournament</Link></li>
//           <li><Link to="/Register">Register</Link></li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
