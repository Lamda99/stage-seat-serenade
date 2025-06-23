import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { User, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { AuthContext } from './auth-context';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Immediate check for current user
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setLoading(false);
    }

    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateUserProfile = useCallback(
    async (profileData: { displayName?: string; photoURL?: string }) => {
      if (!user) {
        throw new Error('No user is signed in');
      }

      await updateProfile(user, profileData);
      // Force a refresh of the user object to get the latest profile data
      const currentUser = auth.currentUser;
      if (currentUser) {
        await currentUser.reload();
        setUser({ ...currentUser });
      }
    },
    [user]
  );

  const value = useMemo(
    () => ({
      user,
      loading,
      updateUserProfile,
    }),
    [user, loading, updateUserProfile]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
