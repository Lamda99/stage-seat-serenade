
import React, { useState, useEffect } from 'react';
import { Search, MapPin, User, Menu, X, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import GoogleSignIn from '../auth/GoogleSignIn';

const EnhancedHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Pune');
  const [showSignIn, setShowSignIn] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const cities = ['Mumbai', 'Delhi', 'Pune', 'Bangalore', 'Chennai', 'Kolkata'];
  const navItems = [
    { name: 'Events', path: '/events' },
    { name: 'Theatre', path: '/events?category=Theatre' },
    { name: 'Music', path: '/events?category=Music' },
    { name: 'Dance', path: '/events?category=Dance' },
    { name: 'Comedy', path: '/events?category=Comedy' }
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleSignInSuccess = (userData) => {
    setUser(userData);
    setShowSignIn(false);
  };

  return (
    <>
      <header className="bg-white shadow-lg border-b sticky top-0 z-50">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-red-800 to-red-700 text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span className="hover:text-red-200 cursor-pointer transition-colors">About</span>
              <span className="hover:text-red-200 cursor-pointer transition-colors">Contact US</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Location Selector */}
              <div className="flex items-center space-x-1 cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors">
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events, venues, artists..."
                  className="w-80 pl-10 pr-4 py-2 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              
              {/* User Section */}
              {user ? (
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <Bell className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center space-x-2 hover:bg-white/10 px-2 py-1 rounded transition-colors">
                    <img 
                      src={user.picture} 
                      alt={user.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="hidden sm:block">{user.name.split(' ')[0]}</span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white hover:bg-white/10"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/10"
                  onClick={() => setShowSignIn(true)}
                >
                  <User className="h-4 w-4 mr-1" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-white py-3 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded-lg font-bold text-xl hover:shadow-lg transition-shadow">
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
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-gray-600 hover:text-red-600 cursor-pointer transition-colors">Corporate</span>
              <span className="text-gray-600 hover:text-red-600 cursor-pointer transition-colors">Help</span>
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search events..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-gray-700 hover:text-red-600 font-medium py-2"
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

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-2 -right-2 bg-white rounded-full p-2 hover:bg-gray-100"
              onClick={() => setShowSignIn(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <GoogleSignIn 
              onSuccess={handleSignInSuccess}
              onError={() => setShowSignIn(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EnhancedHeader;
