
import { useMemo } from 'react';
import { useAuth } from '@/context/useAuth';

export interface UserProfile {
  id: string;
  name: string;
  email: string | null;
  phone?: string | null;
  picture?: string | null;
  provider: 'email' | 'google' | 'phone';
  city?: string;
  preferences?: {
    categories: string[];
    notifications: boolean;
  };
}

export const useUserProfile = () => {
  const { user, loading, updateUserProfile } = useAuth();

  const profile = useMemo(() => {
    if (!user) return null;

    const providerId = user.providerData[0]?.providerId || '';
    const provider = providerId.includes('google.com') ? 'google' 
                  : providerId.includes('phone') ? 'phone' 
                  : 'email';

    return {
      id: user.uid,
      name: user.displayName || user.email?.split('@')[0] || 'User',
      email: user.email,
      phone: user.phoneNumber,
      picture: user.photoURL,
      provider: provider as 'email' | 'google' | 'phone',
      city: undefined, // This would need to be stored separately in a user profile collection
      preferences: {
        categories: [],
        notifications: true
      }
    };
  }, [user]);

  return {
    user: profile,
    isLoading: loading,
    updateUserProfile
  };
};
