'use client';

import React from 'react';
import { FiBell, FiSearch, FiUser } from 'react-icons/fi';

const Topbar = () => {
  return (
    <div className="bg-white shadow-md h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <div className="text-xl font-semibold text-gray-800"> </div>
      </div>
      <div className="flex items-center space-x-4">
        {/* <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> 
        </div> */}
        <button className="p-2 rounded-full hover:bg-gray-100">
          <FiBell className="text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <FiUser className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Topbar;