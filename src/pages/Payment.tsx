
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Shield, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import Header from '../components/layout/Header';
import { useNavigate, useLocation } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  
  const { booking, customerDetails } = location.state || {};

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleCardInputChange = (field: string, value: string) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handlePayment = async () => {
    if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.nameOnCard) {
        alert('Please fill in all card details');
        return;
      }
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      navigate('/booking-success', {
        state: {
          booking,
          customerDetails,
          paymentMethod,
          transactionId: 'TXN' + Date.now()
        }
      });
    }, 3000);
  };

  const finalAmount = booking ? (booking.totalAmount + Math.round(booking.totalAmount * 0.18) + 50) : 1050;

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
          <h1 className="text-3xl font-bold text-gray-800">Secure Payment</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-green-600" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center cursor-pointer">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="cursor-pointer">UPI Payment</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking" className="cursor-pointer">Net Banking</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label htmlFor="wallet" className="cursor-pointer">Digital Wallets</Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 pt-4 border-t">
                    <div>
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        value={cardDetails.nameOnCard}
                        onChange={(e) => handleCardInputChange('nameOnCard', e.target.value)}
                        placeholder="Enter name as on card"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={(e) => handleCardInputChange('cardNumber', formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={cardDetails.expiryDate}
                          onChange={(e) => handleCardInputChange('expiryDate', formatExpiryDate(e.target.value))}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="password"
                          value={cardDetails.cvv}
                          onChange={(e) => handleCardInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="pt-4 border-t">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      placeholder="your-id@upi"
                    />
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-sm text-blue-800 font-medium">
                      Your payment is secured with 256-bit SSL encryption
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {booking && (
                  <>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{booking.showTitle}</h3>
                      <p className="text-sm text-gray-600">{booking.venue}</p>
                      <p className="text-sm text-gray-600">{booking.date} • {booking.time}</p>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Seats: {booking.seats.join(', ')}</span>
                        <span>{booking.seatType}</span>
                      </div>
                    </div>

                    <Separator />
                  </>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{booking ? booking.totalAmount : 1000}</span>
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
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{finalAmount}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold"
                  onClick={handlePayment}
                  disabled={processing}
                >
                  {processing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Pay ₹{finalAmount}
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By proceeding, you agree to our Terms & Conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
