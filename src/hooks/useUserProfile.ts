import { useMemo } from 'react';
import { useAuth } from '@/context/useAuth';

export interface UserProfile {
  id: string;
  name: string;
  email: string | null;
  phone?: string | null;
  picture?: string | null;
  provider: 'email' | 'google' | 'phone';
}

export const useUserProfile = () => {
  const { user, loading } = useAuth();

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
      provider: provider as 'email' | 'google' | 'phone'
    };
  }, [user]);

  return {
    user: profile,
    isLoading: loading
  };
};
