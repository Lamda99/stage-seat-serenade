
import React, { useState } from 'react';
import { ArrowLeft, Clock, MapPin, Calendar, Users, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Header from '../components/layout/Header';
import { useNavigate } from 'react-router-dom';

interface BookingConfirmationProps {
  bookingData?: {
    showTitle: string;
    venue: string;
    date: string;
    time: string;
    seats: string[];
    seatType: string;
    totalAmount: number;
  };
}

const BookingConfirmation = ({ bookingData }: BookingConfirmationProps) => {
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: ''
  });

  // Mock booking data if not provided
  const booking = bookingData || {
    showTitle: 'Folk लोक',
    venue: 'Anna Bhau Sathe Auditorium',
    date: 'Sunday, 15 Jun 2025',
    time: '7:30 PM',
    seats: ['A12', 'A13'],
    seatType: 'Stall Level 1',
    totalAmount: 1000
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomerDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfirmBooking = () => {
    // Validate customer details
    if (!customerDetails.fullName || !customerDetails.email || !customerDetails.phone) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Navigate to payment page
    navigate('/payment', { 
      state: { 
        booking,
        customerDetails 
      }
    });
  };

  const gstAmount = Math.round(booking.totalAmount * 0.18);
  const convenienceFee = 50;
  const finalAmount = booking.totalAmount + gstAmount + convenienceFee;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Booking Confirmation</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Details Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={customerDetails.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={customerDetails.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      placeholder="Enter your age"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerDetails.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerDetails.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Important Information</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Tickets once booked cannot be cancelled or exchanged</li>
                    <li>• Please carry a valid ID proof to the venue</li>
                    <li>• Gates will close 30 minutes after the show starts</li>
                    <li>• Photography and videography are strictly prohibited</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{booking.showTitle}</h3>
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{booking.venue}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Seat Details</h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Category:</span>
                      <span className="font-medium">{booking.seatType}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Seats:</span>
                      <span className="font-medium">{booking.seats.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Ticket Price ({booking.seats.length} × ₹{booking.totalAmount / booking.seats.length})</span>
                    <span>₹{booking.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>GST (18%)</span>
                    <span>₹{gstAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Convenience Fee</span>
                    <span>₹{convenienceFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span>₹{finalAmount}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold"
                  onClick={handleConfirmBooking}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Proceed to Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
