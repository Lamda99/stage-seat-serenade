import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase';
import { useUserProfile } from '@/hooks/useUserProfile';
import { updateProfile as updateFirebaseProfile } from 'firebase/auth';
import { Loader2, Camera } from 'lucide-react';

const Profile = () => {
  const { user, updateUserProfile } = useUserProfile();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || 'Pune',
    notifications: user?.preferences?.notifications ?? true,
    categories: user?.preferences?.categories || []
  });

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      if (auth.currentUser) {
        await updateFirebaseProfile(auth.currentUser, {
          displayName: profileData.name,
          photoURL: user?.picture || null
        });

        updateUserProfile({
          ...user,
          name: profileData.name,
          city: profileData.city,
          preferences: {
            categories: profileData.categories,
            notifications: profileData.notifications
          }
        });

        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-24 h-24 rounded-full"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-600 text-4xl font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full p-2"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <Input
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  value={profileData.email}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-sm text-gray-500">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <Input
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Your phone number"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">City</label>
                <Input
                  value={profileData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Your city"
                />
              </div>

              {/* Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Preferences</h3>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={profileData.notifications}
                    onChange={(e) => handleInputChange('notifications', e.target.checked)}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="notifications" className="text-sm text-gray-700">
                    Receive email notifications about new events
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateProfile}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
