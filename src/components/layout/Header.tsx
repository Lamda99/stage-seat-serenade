
import React, { useState } from 'react';
import { Search, MapPin, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Pune');

  const cities = ['Mumbai', 'Delhi', 'Pune', 'Bangalore', 'Chennai', 'Kolkata'];
  const navItems = [
    { name: 'Events', path: '/events' },
    { name: 'Play', path: '/events?category=Play' },
    { name: 'Music', path: '/events?category=Music' },
    { name: 'Theatre', path: '/events?category=Theatre' },
    { name: 'Sports', path: '/events?category=Sports' }
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top Header */}
      <div className="palette-primary-gradient text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <span>About</span>
            <span>Contact US</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Location Selector */}
            <div className="flex items-center space-x-1 cursor-pointer">
              <MapPin className="h-4 w-4" />
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent border-none text-white outline-none cursor-pointer"
              >
                {cities.map(city => (
                  <option key={city} value={city} className="text-black">{city}</option>
                ))}
              </select>
            </div>
            
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search your event, plays music and more"
                className="w-80 pl-10 pr-4 py-2 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            
            {/* User Icon */}
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <div className="palette-primary-gradient text-white px-4 py-2 rounded-lg font-bold text-xl">
                BookREVent
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 hover:show-card-price font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-gray-600">Corporate</span>
            <span className="text-gray-600">Night Light</span>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <div className="flex flex-col space-y-4 pt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 hover:show-card-price font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
