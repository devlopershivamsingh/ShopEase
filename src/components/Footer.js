import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">ShopMate</h2>
            <p className="text-sm">Your one-stop shop for all your needs. Quality products at affordable prices.</p>

            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-300">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-blue-400 text-white p-2 rounded-full transition-colors duration-300">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-pink-600 text-white p-2 rounded-full transition-colors duration-300">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-300">
                <FaLinkedinIn className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors duration-300">Shop</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors duration-300">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors duration-300">Contact Us</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors duration-300">Blog</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:text-white transition-colors duration-300">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors duration-300">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors duration-300">Return Policy</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <FaMapMarkerAlt className="mt-1 text-gray-400" />
                  <span>123 Main Street, City, Country</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaPhone className="text-gray-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-gray-400" />
                  <span>info@shopmate.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Newsletter</h3>
              <p className="text-sm mb-3">Subscribe to get updates on new arrivals and special offers.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 rounded-l-md bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} ShopMate. All rights reserved.</p>
          <p className="mt-1">Designed with ❤️ for modern e-commerce</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;