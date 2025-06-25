
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
    async (profileData: any) => {
      if (!user) {
        throw new Error('No user is signed in');
      }

      // Update Firebase profile if displayName or photoURL are provided
      if (profileData.displayName || profileData.photoURL) {
        await updateProfile(user, {
          displayName: profileData.displayName || user.displayName,
          photoURL: profileData.photoURL || user.photoURL
        });
      }

      // Force a refresh of the user object to get the latest profile data
      const currentUser = auth.currentUser;
      if (currentUser) {
        await currentUser.reload();
        setUser({ ...currentUser });
      }

      // Note: Additional profile data like city and preferences would need to be 
      // stored in a separate user profile collection in Firestore
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
