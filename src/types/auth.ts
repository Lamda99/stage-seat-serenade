import { User } from 'firebase/auth';

export interface AuthFormProps {
  onSuccess?: (user: User) => void;
  onError?: (error: Error) => void;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  photoURL?: string | null;
  city: string;
  preferences: {
    categories: string[];
    notifications: boolean;
  };
  provider: string;
}
