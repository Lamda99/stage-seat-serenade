import React from 'react';
import EnhancedHeader from '../components/layout/EnhancedHeader';
import Footer from '../components/layout/Footer';
import ThemedCard from '@/components/ui/themed-card';
import ThemedButton from '@/components/ui/themed-button';
import { Users, Target, Award, Globe } from 'lucide-react';
import { useCorporateTheme } from '@/components/ui/corporate-theme-provider';

const About = () => {
  const { isCorporate } = useCorporateTheme();

  const stats = [
    { icon: Users, label: 'Happy Customers', value: '2M+' },
    { icon: Target, label: 'Events Hosted', value: '50K+' },
    { icon: Award, label: 'Years Experience', value: '15+' },
    { icon: Globe, label: 'Cities Covered', value: '25+' }
  ];

  const team = [
    {
      name: 'Priya Sharma',
      role: isCorporate ? 'CEO & Founder' : 'Founder & Creative Director',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&q=80',
      description: isCorporate 
        ? 'Leading digital transformation in the events industry with 20+ years of experience.'
        : 'Passionate about bringing cultural experiences to every doorstep across India.'
    },
    {
      name: 'Rajesh Kumar',
      role: isCorporate ? 'CTO' : 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      description: isCorporate
        ? 'Technology visionary with expertise in scalable platform architecture.'
        : 'Ensures seamless booking experiences and smooth event operations.'
    },
    {
      name: 'Anita Desai',
      role: isCorporate ? 'VP of Partnerships' : 'Cultural Curator',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
      description: isCorporate
        ? 'Building strategic partnerships with leading corporations and venues.'
        : 'Curates exceptional cultural performances and artistic experiences.'
    }
  ];

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
            {isCorporate ? 'Transforming Professional Events' : 'Celebrating Cultural Heritage'}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {isCorporate 
              ? 'We connect professionals with premium business events, conferences, and networking opportunities that drive career growth and business success.'
              : 'We are passionate about bringing the rich tapestry of Indian arts, culture, and entertainment to audiences across the nation through seamless digital experiences.'
            }
          </p>
          <ThemedButton variant="hero-cta" size="lg">
            {isCorporate ? 'Explore Professional Events' : 'Discover Events'}
          </ThemedButton>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  isCorporate ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                }`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                {isCorporate ? 'Our Mission' : 'Our Vision'}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {isCorporate 
                  ? 'To revolutionize how professionals discover, attend, and benefit from business events. We bridge the gap between learning opportunities and career advancement through technology-driven solutions.'
                  : 'To democratize access to India\'s vibrant cultural landscape by making it easy for anyone, anywhere to discover and experience exceptional theatrical performances, music concerts, and artistic celebrations.'
                }
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    isCorporate ? 'bg-blue-500' : 'bg-red-500'
                  }`}></div>
                  {isCorporate ? 'Premium professional development experiences' : 'Authentic cultural experiences'}
                </li>
                <li className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    isCorporate ? 'bg-blue-500' : 'bg-red-500'
                  }`}></div>
                  {isCorporate ? 'Seamless networking opportunities' : 'Supporting local artists and venues'}
                </li>
                <li className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    isCorporate ? 'bg-blue-500' : 'bg-red-500'
                  }`}></div>
                  {isCorporate ? 'Data-driven insights and analytics' : 'Preserving traditional arts for future generations'}
                </li>
              </ul>
            </div>
            <div className="relative">
              <img 
                src={isCorporate 
                  ? "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80"
                  : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                }
                alt={isCorporate ? "Professional conference" : "Cultural performance"}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isCorporate 
                ? 'Industry leaders and technology experts driving innovation in professional events.'
                : 'Passionate individuals dedicated to celebrating and promoting Indian arts and culture.'
              }
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <ThemedCard key={index} variant="elevated" className="text-center p-6">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className={`font-medium mb-3 ${
                  isCorporate ? 'text-blue-600' : 'text-red-600'
                }`}>
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </ThemedCard>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
