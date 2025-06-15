
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded-lg font-bold text-xl mb-4 inline-block">
              BookREVent
            </div>
            <p className="text-gray-300 mb-4">
              Your ultimate destination for booking theater shows, plays, and cultural events across India.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Browse Events</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Theater Listings</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">My Bookings</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Offers & Deals</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Refund Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-red-500" />
                <span className="text-gray-300">+91 12345 67890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-red-500" />
                <span className="text-gray-300">support@bookrevent.com</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Cities We Serve</h4>
              <p className="text-gray-300 text-sm">
                Mumbai, Delhi, Pune, Bangalore, Chennai, Kolkata, Hyderabad, Ahmedabad
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 BookREVent. All rights reserved. | Made with ❤️ for theater lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
