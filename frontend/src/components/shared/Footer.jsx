import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-[#1a1c2c] via-[#2d1b4e] to-[#1a1c2c] text-gray-200 py-12 mt-12 overflow-hidden">
      {/* Decorative gradient blur blobs */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Info */}
          <div>
            <h2 className="text-3xl font-extrabold text-white">JobPortal</h2>
            <p className="mt-4 text-sm text-gray-300 leading-relaxed">
              Your trusted platform to search, apply, and land your dream job.  
              Explore opportunities and connect with top recruiters worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/jobs" className="hover:text-purple-400 transition">Jobs</Link></li>
              <li><Link to="/browse" className="hover:text-purple-400 transition">Browse</Link></li>
              <li><Link to="/profile" className="hover:text-purple-400 transition">View Profile</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-purple-600 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30 transform transition">
                <FaFacebookF className="h-5 w-5 text-white" />
              </a>

              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-sky-500 hover:scale-110 hover:shadow-lg hover:shadow-sky-500/30 transform transition">
                <FaTwitter className="h-5 w-5 text-white" />
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-blue-500 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30 transform transition">
                <FaLinkedinIn className="h-5 w-5 text-white" />
              </a>

              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-pink-500 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30 transform transition">
                <FaInstagram className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            <a className="hover:text-purple-400 transition cursor-pointer">Privacy Policy</a>
            <a className="hover:text-purple-400 transition cursor-pointer">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
