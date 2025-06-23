import { User } from 'firebase/auth';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export type AuthProvider = 'email' | 'google' | 'phone';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string | null;
  photoURL?: string | null;
  city?: string;
  preferences?: {
    categories: string[];
    notifications: boolean;
  };
  provider: AuthProvider;
}
