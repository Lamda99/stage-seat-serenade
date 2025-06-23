import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  applyActionCode,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  updateProfile,
  type User,
  type ConfirmationResult,
  type ActionCodeSettings
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAeLdM8olNZA-ax_GFOd5nMSccdUpZqyLc",
  authDomain: "ticketnest-prod.firebaseapp.com",
  projectId: "ticketnest-prod",
  storageBucket: "ticketnest-prod.firebasestorage.app",
  messagingSenderId: "235002915224",
  appId: "1:235002915224:web:2ab6628acd8e4133cf23ed",
  measurementId: "G-KTEJR92D5D"
};

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
    recaptchaWidgetId?: number;
  }
  interface ReCaptchaV2 {
    render: (element: string | HTMLElement, params: object) => number;
    reset: (widgetId?: number) => void;
  }
  const grecaptcha: ReCaptchaV2;
}

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize reCAPTCHA verifier
const initializeRecaptcha = (buttonId: string): RecaptchaVerifier => {
  try {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, buttonId, {
        size: 'invisible',
        callback: (response: string) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber
          console.log('reCAPTCHA verified:', response);
        },
        'expired-callback': () => {
          // Reset reCAPTCHA when it expires
          resetRecaptcha();
        }
      });
    }
    
    // Store widget ID for reset functionality
    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });

    return window.recaptchaVerifier;
  } catch (error) {
    console.error('Error initializing reCAPTCHA:', error);
    throw error;
  }
};

// Reset reCAPTCHA widget
const resetRecaptcha = () => {
  if (window.recaptchaWidgetId !== undefined && typeof grecaptcha !== 'undefined') {
    grecaptcha.reset(window.recaptchaWidgetId);
  } else if (window.recaptchaVerifier) {
    window.recaptchaVerifier.render().then(function(widgetId) {
      if (typeof grecaptcha !== 'undefined') {
        grecaptcha.reset(widgetId);
      }
    });
  }
};

// Clean up reCAPTCHA verifier
const cleanupRecaptcha = () => {
  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear();
    window.recaptchaVerifier = undefined;
  }
  if (window.confirmationResult) {
    window.confirmationResult = undefined;
  }
  window.recaptchaWidgetId = undefined;
};

// Validate Indian phone number format for production
const isValidIndianPhoneNumber = (phone: string): boolean => {
  // Remove any non-digit characters, spaces, and +91 prefix
  const cleanNumber = phone.replace(/^\+91/, '').replace(/\D/g, '');
  
  // Indian mobile number validation rules:
  // 1. Must be exactly 10 digits
  // 2. First digit must be 6-9 (as per TRAI regulations)
  // 3. Should not have all same digits (likely fake)
  // 4. Should not be a sequential number (likely fake)
  
  if (cleanNumber.length !== 10) {
    return false;
  }

  // Check first digit (6-9)
  const firstDigit = parseInt(cleanNumber[0]);
  if (firstDigit < 6 || firstDigit > 9) {
    return false;
  }

  // Check for all same digits (e.g., 9999999999)
  if (new Set(cleanNumber).size === 1) {
    return false;
  }

  // Check for sequential numbers (e.g., 9876543210, 1234567890)
  let isSequential = true;
  let isReverseSequential = true;
  for (let i = 1; i < cleanNumber.length; i++) {
    if (parseInt(cleanNumber[i]) !== parseInt(cleanNumber[i - 1]) + 1) {
      isSequential = false;
    }
    if (parseInt(cleanNumber[i]) !== parseInt(cleanNumber[i - 1]) - 1) {
      isReverseSequential = false;
    }
    if (!isSequential && !isReverseSequential) break;
  }
  if (isSequential || isReverseSequential) {
    return false;
  }

  return true;
};

// Format phone number to E.164 format for India
const formatIndianPhoneNumber = (phone: string): string => {
  // Remove all non-digits and any existing +91 prefix
  const cleanNumber = phone.replace(/^\+91/, '').replace(/\D/g, '');
  
  // Remove leading 0 if present
  const number = cleanNumber.replace(/^0/, '');
  
  // Number should be exactly 10 digits
  if (number.length !== 10) {
    throw new Error('Phone number must be exactly 10 digits');
  }
  
  // First digit should be 6-9
  const firstDigit = parseInt(number[0]);
  if (firstDigit < 6 || firstDigit > 9) {
    throw new Error('Indian mobile numbers must start with 6, 7, 8, or 9');
  }
  
  // Add +91 prefix
  return `+91${number}`;
};

// Send phone verification code
const startPhoneAuth = async (phoneNumber: string, buttonId: string): Promise<void> => {
  try {
    // Validate Indian phone number
    if (!isValidIndianPhoneNumber(phoneNumber)) {
      throw new Error('Please enter a valid 10-digit Indian mobile number (should start with 6, 7, 8, or 9)');
    }

    // Format the phone number to E.164 format
    const formattedNumber = formatIndianPhoneNumber(phoneNumber);

    // Initialize reCAPTCHA if not already done
    const appVerifier = initializeRecaptcha(buttonId);
    if (!appVerifier) {
      throw new Error('Failed to initialize reCAPTCHA');
    }

    try {
      // Send verification code
      const confirmationResult = await signInWithPhoneNumber(auth, formattedNumber, appVerifier);
      window.confirmationResult = confirmationResult;
    } catch (error) {
      console.error('Error sending SMS:', error);
      // Reset reCAPTCHA on error
      resetRecaptcha();
      throw error;
    }
  } catch (error) {
    console.error('Error in phone authentication:', error);
    throw error;
  }
};

// Verify phone code and sign in user
const verifyPhoneCode = async (code: string): Promise<User> => {
  if (!window.confirmationResult) {
    throw new Error('No verification code was sent. Please request a new code.');
  }

  try {
    // Verify the code
    const result = await window.confirmationResult.confirm(code);
    const user = result.user;

    // Create or update guest profile
    if (user && !user.displayName) {
      try {
        const guestName = `Guest_${user.uid.slice(0, 6)}`;
        await updateProfile(user, {
          displayName: guestName,
        });
      } catch (error) {
        console.error('Error updating guest profile:', error);
        // Continue even if profile update fails
      }
    }

    return user;
  } catch (error) {
    console.error('Error verifying code:', error);
    throw error;
  } finally {
    // Clean up
    window.confirmationResult = undefined;
    cleanupRecaptcha();
  }
};

// Send email verification
const sendVerificationEmail = async (user: User): Promise<void> => {
  if (user.email && !user.emailVerified) {
    try {
      await sendEmailVerification(user);
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw error;
    }
  }
};

// Verify email with action code
const verifyEmail = async (actionCode: string): Promise<void> => {
  try {
    await applyActionCode(auth, actionCode);
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
};

// Email link authentication settings
const actionCodeSettings: ActionCodeSettings = {
  url: window.location.origin + '/verify-email',
  handleCodeInApp: true,
};

// Send email OTP (passwordless sign-in link)
const sendEmailOTP = async (email: string): Promise<void> => {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    // Save email for verification
    window.localStorage.setItem('emailForSignIn', email);
  } catch (error) {
    console.error('Error sending email link:', error);
    throw error;
  }
};

// Verify email OTP (passwordless sign-in)
const verifyEmailOTP = async (email: string): Promise<User | null> => {
  try {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let emailForSignIn = email;
      
      // If no email provided, try to get from localStorage
      if (!emailForSignIn) {
        emailForSignIn = window.localStorage.getItem('emailForSignIn') || '';
      }

      if (!emailForSignIn) {
        throw new Error('Please provide your email to complete sign in.');
      }

      const result = await signInWithEmailLink(auth, emailForSignIn, window.location.href);
      
      // Clear email from storage
      window.localStorage.removeItem('emailForSignIn');
      
      return result.user;
    }
    return null;
  } catch (error) {
    console.error('Error completing email sign in:', error);
    throw error;
  }
};

export type { User, ConfirmationResult, ActionCodeSettings };

export {
  auth,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  initializeRecaptcha,
  resetRecaptcha,
  cleanupRecaptcha,
  startPhoneAuth,
  verifyPhoneCode,
  isValidIndianPhoneNumber,
  formatIndianPhoneNumber,
  sendVerificationEmail,
  verifyEmail,
  sendEmailOTP,
  verifyEmailOTP,
  isSignInWithEmailLink,
  updateProfile,
};
