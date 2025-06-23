import React, { useState } from 'react';
import EnhancedHeader from '../components/layout/EnhancedHeader';
import Footer from '../components/layout/Footer';
import ThemedCard from '@/components/ui/themed-card';
import ThemedButton from '@/components/ui/themed-button';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useCorporateTheme } from '@/components/ui/corporate-theme-provider';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { isCorporate } = useCorporateTheme();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: [
        'BookREVent Headquarters',
        'Baner Road, Pune, Maharashtra 411045',
        'India'
      ]
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        '+91 20 1234 5678',
        '+91 98765 43210',
        'Mon-Sat: 9:00 AM - 8:00 PM'
      ]
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        isCorporate ? 'corporate@bookrevent.com' : 'support@bookrevent.com',
        isCorporate ? 'partnerships@bookrevent.com' : 'bookings@bookrevent.com',
        'Response within 24 hours'
      ]
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 8:00 PM',
        'Saturday: 10:00 AM - 6:00 PM',
        'Sunday: Closed'
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      <EnhancedHeader />
      
      {/* Hero Section */}
      <section className={`py-20 ${
        isCorporate 
          ? 'bg-gradient-to-br from-blue-900 via-slate-800 to-gray-900' 
          : 'bg-gradient-to-br from-red-900 via-orange-800 to-yellow-700'
      }`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {isCorporate ? 'Get In Touch' : 'Contact Us'}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {isCorporate 
              ? 'Ready to elevate your professional events? Our team is here to help you create exceptional business experiences.'
              : 'Have questions about bookings, events, or our platform? We\'re here to help you discover amazing cultural experiences.'
            }
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <ThemedCard key={index} variant="elevated" className="text-center p-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  isCorporate ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                }`}>
                  <info.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                </div>
              </ThemedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Send Us a Message</h2>
            <p className="text-lg text-gray-600">
              {isCorporate 
                ? 'Let\'s discuss how we can help your organization succeed.'
                : 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.'
              }
            </p>
          </div>

          <ThemedCard variant="elevated" className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={isCorporate ? "Partnership inquiry, event planning, etc." : "Booking inquiry, technical support, etc."}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              
              <div className="text-center">
                <ThemedButton 
                  type="submit" 
                  variant="primary" 
                  size="lg"
                  className="inline-flex items-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </ThemedButton>
              </div>
            </form>
          </ThemedCard>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Find Us</h2>
            <p className="text-lg text-gray-600">
              Visit our office in the heart of Pune's tech district
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Interactive map would be embedded here</p>
              <p className="text-sm text-gray-500">Baner Road, Pune, Maharashtra</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
