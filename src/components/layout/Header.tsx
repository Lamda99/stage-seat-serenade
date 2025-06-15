
import React, { useState } from 'react';
import { Search, MapPin, User, Menu, X, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CorporateToggle from '@/components/ui/corporate-toggle';
import { useCorporateTheme } from '@/components/ui/corporate-theme-provider';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Pune');
  const [searchQuery, setSearchQuery] = useState('');
  const { isCorporate } = useCorporateTheme();

  const cities = ['Mumbai', 'Delhi', 'Pune', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Ahmedabad'];
  
  const navItems = isCorporate ? [
    { name: 'Professional Events', path: '/events' },
    { name: 'Conferences', path: '/events?category=Conference' },
    { name: 'Workshops', path: '/events?category=Workshop' },
    { name: 'Networking', path: '/events?category=Networking' },
    { name: 'Training', path: '/events?category=Training' }
  ] : [
    { name: 'Events', path: '/events' },
    { name: 'Theatre', path: '/events?category=Theatre' },
    { name: 'Music', path: '/events?category=Music' },
    { name: 'Dance', path: '/events?category=Dance' },
    { name: 'Comedy', path: '/events?category=Comedy' }
  ];

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <header className="bg-white shadow-lg border-b sticky top-0 z-50">
      {/* Top Header */}
      <div className={`text-white py-3 px-4 ${
        isCorporate 
          ? 'bg-gradient-to-r from-blue-800 to-slate-700' 
          : 'bg-gradient-to-r from-red-800 to-red-700'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link to="/about" className="text-sm hover:text-white/80 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm hover:text-white/80 transition-colors">
              Contact Us
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Location Selector */}
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <select 
                value={selectedCity} 
                onChange={(e) => handleCityChange(e.target.value)}
                className="bg-transparent border-none text-white outline-none cursor-pointer text-sm"
              >
                {cities.map(city => (
                  <option key={city} value={city} className="text-black">{city}</option>
                ))}
              </select>
            </div>
            
            {/* Search Bar */}
            <div className="relative hidden lg:block">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isCorporate ? "Search professional events, speakers..." : "Search events, venues, artists..."}
                className="w-96 pl-10 pr-4 py-2 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            
            {/* User Actions */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Bell className="h-4 w-4" />
              </Button>
              
              {/* Sign In and Sign Up buttons moved here */}
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className={`font-semibold transition-all duration-300 ${
                  isCorporate 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}>
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <div className={`text-white px-6 py-3 rounded-xl font-bold text-2xl transition-all duration-300 hover:scale-105 shadow-lg ${
                isCorporate 
                  ? 'bg-gradient-to-r from-blue-600 to-slate-800' 
                  : 'bg-gradient-to-r from-red-600 to-orange-600'
              }`}>
                {isCorporate ? 'BookREVentPro' : 'BookREVent'}
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-semibold transition-all duration-300 relative group py-2 ${
                  isCorporate 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  isCorporate ? 'bg-blue-600' : 'bg-red-600'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Corporate Theme Toggle moved here */}
          <div className="hidden lg:flex items-center space-x-6">
            <CorporateToggle />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-6">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isCorporate ? "Search professional events..." : "Search events..."}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
              
              {/* Mobile Navigation */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-semibold py-3 transition-colors ${
                    isCorporate 
                      ? 'text-gray-700 hover:text-blue-600' 
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Toggle */}
              <div className="pt-4">
                <CorporateToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
