
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCorporateTheme } from '@/components/ui/corporate-theme-provider';

const Footer = () => {
  const { isCorporate } = useCorporateTheme();

  const quickLinks = isCorporate ? [
    { name: 'Professional Events', path: '/events' },
    { name: 'Corporate Solutions', path: '/events?category=Corporate' },
    { name: 'Event Management', path: '/events?type=managed' },
    { name: 'Partnership Program', path: '/contact' },
    { name: 'Enterprise Plans', path: '/contact' }
  ] : [
    { name: 'Browse Events', path: '/events' },
    { name: 'Theater Listings', path: '/events?category=Theatre' },
    { name: 'Music Concerts', path: '/events?category=Music' },
    { name: 'Comedy Shows', path: '/events?category=Comedy' },
    { name: 'Gift Cards', path: '/contact' }
  ];

  const supportLinks = isCorporate ? [
    { name: 'Enterprise Support', path: '/contact' },
    { name: 'Account Management', path: '/contact' },
    { name: 'Technical Support', path: '/contact' },
    { name: 'Service Level Agreement', path: '/contact' },
    { name: 'Integration Guide', path: '/contact' }
  ] : [
    { name: 'Help Center', path: '/contact' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Refund Policy', path: '/contact' },
    { name: 'Terms & Conditions', path: '/contact' },
    { name: 'Privacy Policy', path: '/contact' }
  ];

  const cities = [
    'Mumbai', 'Delhi', 'Pune', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Ahmedabad'
  ];

  return (
    <footer className={`text-white ${
      isCorporate 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-gray-900' 
        : 'bg-gradient-to-br from-gray-900 via-red-900 to-black'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className={`text-white px-4 py-2 rounded-lg font-bold text-xl mb-6 inline-block ${
              isCorporate 
                ? 'bg-gradient-to-r from-blue-600 to-slate-800' 
                : 'bg-gradient-to-r from-red-600 to-orange-600'
            }`}>
              {isCorporate ? 'BookREVentPro' : 'BookREVent'}
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {isCorporate 
                ? 'Empowering professionals through premium business events, conferences, and networking opportunities that drive career growth and business success.'
                : 'Your ultimate destination for booking theater shows, plays, and cultural events across India. Celebrating the rich tapestry of Indian arts and entertainment.'
              }
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors duration-300" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors duration-300" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors duration-300" />
              <Youtube className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors duration-300" />
              {isCorporate && (
                <Linkedin className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors duration-300" />
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className={`w-0 h-0.5 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 ${
                      isCorporate ? 'bg-blue-400' : 'bg-red-400'
                    }`}></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className={`w-0 h-0.5 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2 ${
                      isCorporate ? 'bg-blue-400' : 'bg-red-400'
                    }`}></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className={`h-5 w-5 mt-1 ${isCorporate ? 'text-blue-400' : 'text-red-400'}`} />
                <div>
                  <p className="text-gray-300 text-sm">
                    Baner Road, Pune<br />
                    Maharashtra 411045<br />
                    India
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className={`h-5 w-5 ${isCorporate ? 'text-blue-400' : 'text-red-400'}`} />
                <span className="text-gray-300 text-sm">+91 20 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className={`h-5 w-5 ${isCorporate ? 'text-blue-400' : 'text-red-400'}`} />
                <span className="text-gray-300 text-sm">
                  {isCorporate ? 'corporate@bookrevent.com' : 'support@bookrevent.com'}
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Cities We Serve</h4>
              <div className="grid grid-cols-2 gap-1 text-gray-300 text-sm">
                {cities.map(city => (
                  <div key={city} className="hover:text-white transition-colors cursor-pointer">
                    {city}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 {isCorporate ? 'BookREVentPro' : 'BookREVent'}. All rights reserved. | Made with ❤️ for {isCorporate ? 'professionals' : 'culture lovers'}
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
