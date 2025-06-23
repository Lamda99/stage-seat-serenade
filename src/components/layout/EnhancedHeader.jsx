import React, { useState, useEffect } from 'react';
import { Search, MapPin, User, Bell, LogOut, Settings, Calendar, Ticket, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useLocation } from '@/hooks/useLocation';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import CorporateToggle from '@/components/ui/corporate-toggle';
import { useCorporateTheme } from '@/components/ui/corporate-theme-provider';

const EnhancedHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, isLoading } = useUserProfile();
  const { selectedCity, popularCities, updateSelectedCity, getCurrentLocation } = useLocation();
  const navigate = useNavigate();
  const location = useRouterLocation();
  const { toast } = useToast();
  const { isCorporate } = useCorporateTheme();

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      navigate('/', { replace: true });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCityChange = (city) => {
    updateSelectedCity(city);
  };

  const UserProfileDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2 hover:bg-white/10 px-2 py-1 rounded transition-colors cursor-pointer">
          {user?.picture ? (
            <img 
              src={user.picture} 
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          )}
          <div className="hidden sm:flex items-center space-x-1">
            <span className="text-white">{user?.name?.split(' ')[0] || 'User'}</span>
            <ChevronDown className="h-4 w-4 text-white" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/my-bookings')}>
          <Ticket className="mr-2 h-4 w-4" />
          <span>My Bookings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/upcoming-events')}>
          <Calendar className="mr-2 h-4 w-4" />
          <span>Upcoming Events</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

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

  const renderUserSection = () => {
    if (isAuthenticated) {
      return (
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Bell className="h-4 w-4" />
          </Button>
          <UserProfileDropdown />
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <Link to="/login">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/10"
          >
            Sign In
          </Button>
        </Link>
        <Link to="/signup">
          <Button 
            size="sm" 
            className="bg-white text-red-600 hover:bg-gray-100"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <header className="bg-white shadow-lg border-b sticky top-0 z-50">
      {/* Top Header */}
      <div className={`text-white py-2 px-4 ${
        isCorporate 
          ? 'bg-gradient-to-r from-blue-800 to-slate-700' 
          : 'bg-gradient-to-r from-red-800 to-red-700'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">          {/* Left Links */}
          <div className="flex items-center space-x-6">
            <Link to="/about" className="hover:text-white/80 cursor-pointer transition-colors">About</Link>
            <Link to="/contact" className="hover:text-white/80 cursor-pointer transition-colors">Contact Us</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Location Selector */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors">
                <MapPin className="h-4 w-4" />
                <select 
                  value={selectedCity} 
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="bg-transparent border-none text-white outline-none cursor-pointer"
                >
                  {popularCities.map(city => (
                    <option key={city} value={city} className="text-black">{city}</option>
                  ))}
                </select>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={getCurrentLocation}
                className="text-white hover:bg-white/10 text-xs"
              >
                Use Current
              </Button>
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
            {renderUserSection()}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`bg-white py-3 px-4 ${isCorporate ? 'border-b border-slate-200' : ''}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <div className={`px-4 py-2 rounded-lg font-bold text-xl hover:shadow-lg transition-shadow ${
                isCorporate 
                  ? 'bg-gradient-to-r from-blue-600 to-slate-700 text-white' 
                  : 'bg-gradient-to-r from-red-600 to-red-800 text-white'
              }`}>
                {isCorporate ? 'CorpREVent' : 'BookREVent'}
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-8">
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
          <div className="flex items-center">
            <CorporateToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default EnhancedHeader;
