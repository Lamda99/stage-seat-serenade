
import React from 'react';
import { CheckCircle, Download, Calendar, MapPin, Clock, Users, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '../components/layout/Header';
import { useLocation, Link } from 'react-router-dom';

const BookingSuccess = () => {
  const location = useLocation();
  const { booking, customerDetails, paymentMethod, transactionId } = location.state || {};

  const handleDownloadTicket = () => {
    // In a real app, this would generate and download a PDF ticket
    alert('Ticket download would start here. Check your email for the ticket.');
  };

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">
            Your tickets have been booked successfully. A confirmation email has been sent to{' '}
            {customerDetails?.email || 'your email address'}.
          </p>
        </div>

        {/* Booking Details Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Booking Details</span>
              <span className="text-sm font-normal text-gray-500">
                Booking ID: BK{Date.now().toString().slice(-8)}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Event Information */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {booking?.showTitle || 'Folk लोक'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3 text-red-600" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-sm">{booking?.date || 'Sunday, 15 Jun 2025'} • {booking?.time || '7:30 PM'}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-red-600" />
                  <div>
                    <p className="font-medium">Venue</p>
                    <p className="text-sm">{booking?.venue || 'Anna Bhau Sathe Auditorium'}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-3 text-red-600" />
                  <div>
                    <p className="font-medium">Seats</p>
                    <p className="text-sm">{booking?.seats?.join(', ') || 'A12, A13'} ({booking?.seatType || 'Stall Level 1'})</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <CreditCard className="h-5 w-5 mr-3 text-red-600" />
                  <div>
                    <p className="font-medium">Payment</p>
                    <p className="text-sm">Paid via {paymentMethod === 'card' ? 'Card' : paymentMethod?.toUpperCase()}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Customer Details */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Customer Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <span className="ml-2 font-medium">{customerDetails?.fullName || 'Customer Name'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <span className="ml-2 font-medium">{customerDetails?.email || 'customer@email.com'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <span className="ml-2 font-medium">{customerDetails?.phone || '+91 XXXXX XXXXX'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Booking Date:</span>
                  <span className="ml-2 font-medium">{currentDate}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Summary */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Payment Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Ticket Price ({booking?.seats?.length || 2} tickets)</span>
                  <span>₹{booking?.totalAmount || 1000}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{booking ? Math.round(booking.totalAmount * 0.18) : 180}</span>
                </div>
                <div className="flex justify-between">
                  <span>Convenience Fee</span>
                  <span>₹50</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-base">
                  <span>Total Paid</span>
                  <span>₹{booking ? (booking.totalAmount + Math.round(booking.totalAmount * 0.18) + 50) : 1230}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Transaction ID: {transactionId || 'TXN' + Date.now()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button 
            onClick={handleDownloadTicket}
            className="bg-red-600 hover:bg-red-700 text-white flex-1"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Ticket
          </Button>
          
          <Link to="/profile" className="flex-1">
            <Button variant="outline" className="w-full">
              View My Bookings
            </Button>
          </Link>
        </div>

        {/* Important Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Important Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Please carry a valid government-issued photo ID to the venue
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Entry gates will close 30 minutes after the show starts
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Your mobile ticket and ID are mandatory for entry
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Photography and videography are strictly prohibited during the show
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                For any queries, contact us at support@bookrevent.com or +91 12345 67890
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="text-center mt-8">
          <Link to="/">
            <Button variant="outline">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
