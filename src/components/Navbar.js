import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              Dr. Online
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-blue-200 transition">Home</Link>
            <Link to="/about" className="hover:text-blue-200 transition">About</Link>
            <Link to="/services" className="hover:text-blue-200 transition">Services</Link>
            <Link to="/discussions" className="hover:text-blue-200 transition">Discussions</Link>
            <Link to="/contact" className="hover:text-blue-200 transition">Contact</Link>
            <Link to="/admin/messages" className="hover:text-blue-200 transition">Messages</Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 rounded hover:bg-blue-800">Home</Link>
            <Link to="/about" className="block px-3 py-2 rounded hover:bg-blue-800">About</Link>
            <Link to="/services" className="block px-3 py-2 rounded hover:bg-blue-800">Services</Link>
            <Link to="/discussions" className="block px-3 py-2 rounded hover:bg-blue-800">Discussions</Link>
            <Link to="/contact" className="block px-3 py-2 rounded hover:bg-blue-800">Contact</Link>
            <Link to="/admin/messages" className="block px-3 py-2 rounded hover:bg-blue-800">Messages</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
