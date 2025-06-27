import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useUserProfile } from '@/hooks/useUserProfile';
import AuthForm from '../components/auth/AuthForm';
import { auth, type User } from '@/lib/firebase';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, updateUserProfile } = useUserProfile();

  useEffect(() => {
    // If already logged in, redirect to home
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleAuthSuccess = (user: User) => {
    toast({
      title: "Welcome!",
      description: "Successfully logged in",
    });
    navigate('/');
  };

  const handleAuthError = (error: Error) => {
    console.error('Authentication error:', error);
    toast({
      title: "Authentication Failed",
      description: error.message,
      variant: "destructive",
    });
  };

  if (user) {
    return null; // Already logged in, will redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <AuthForm 
        onSuccess={handleAuthSuccess}
        onError={handleAuthError}
      />
    </div>
  );
};

export default Login;
