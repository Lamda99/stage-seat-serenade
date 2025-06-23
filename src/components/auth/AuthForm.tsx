import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import {
  auth,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  startPhoneAuth,
  verifyPhoneCode,
  cleanupRecaptcha,
  sendEmailOTP,
  verifyEmailOTP,
  isValidIndianPhoneNumber,
  isSignInWithEmailLink,
  sendVerificationEmail,
  updateProfile,
  type User
} from '@/lib/firebase';

interface AuthFormProps {
  onSuccess?: (user: User) => void;
  onError?: (error: Error) => void;
}

const AuthForm = ({ onSuccess, onError }: AuthFormProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [needsEmailVerification, setNeedsEmailVerification] = useState(false);
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [isEmailOTP, setIsEmailOTP] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Cleanup reCAPTCHA on unmount and tab change
  useEffect(() => {
    return () => {
      cleanupRecaptcha();
    };
  }, [activeTab]);

  const handleAuthSuccess = useCallback((user: User) => {
    toast({
      title: "Welcome!",
      description: "Successfully signed in",
    });
    if (onSuccess) {
      onSuccess(user);
    }
    // Navigate after a short delay to ensure auth state is updated
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 100);
  }, [onSuccess, toast, navigate]);

  const handleAuthError = useCallback((error: Error) => {
    console.error('Authentication error:', error);
    let errorMessage = 'Authentication failed. Please try again.';
    
    if (error.message.includes('auth/invalid-phone-number')) {
      errorMessage = 'Please enter a valid Indian phone number (10 digits starting with 6-9)';
    } else if (error.message.includes('auth/code-expired')) {
      errorMessage = 'The verification code has expired. Please request a new one.';
    } else if (error.message.includes('auth/invalid-verification-code')) {
      errorMessage = 'Invalid verification code. Please try again.';
    } else if (error.message.includes('auth/billing-not-enabled')) {
      errorMessage = 'Phone authentication is temporarily unavailable. Please try email login.';
    }

    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });

    if (onError) {
      onError(error);
    }
  }, [onError, toast]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      handleAuthSuccess(result.user);
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in with Google';
      toast({
        title: "Sign-in Failed",
        description: errorMessage,
        variant: "destructive",
      });
      if (onError && error instanceof Error) onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (isSignUp: boolean = false) => {
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { user } = isSignUp
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);

      if (isSignUp) {
        await sendVerificationEmail(user);
        setNeedsEmailVerification(true);
        toast({
          title: "Verification Email Sent",
          description: "Please check your email to verify your account.",
        });
        return;
      }

      if (!user.emailVerified) {
        setNeedsEmailVerification(true);
        await sendVerificationEmail(user);
        toast({
          title: "Email Not Verified",
          description: "Please check your email to verify your account.",
        });
        return;
      }

      handleAuthSuccess(user);
    } catch (error) {
      console.error('Email auth failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      toast({
        title: "Authentication Failed",
        description: errorMessage,
        variant: "destructive",
      });
      if (onError && error instanceof Error) onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }

    // Validate Indian phone number
    if (!isValidIndianPhoneNumber(phone)) {
      toast({
        title: "Error",
        description: "Please enter a valid Indian phone number (10 digits starting with 6-9)",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      if (!codeSent) {
        // Format phone number to include +91
        const formattedNumber = phone.startsWith('+91') ? phone : `+91${phone.replace(/^0/, '')}`;
        await startPhoneAuth(formattedNumber, "phone-sign-in-button");
        setCodeSent(true);
        toast({
          title: "Success",
          description: "OTP sent to your phone",
        });
      } else {
        if (!verificationCode) {
          toast({
            title: "Error",
            description: "Please enter the verification code",
            variant: "destructive",
          });
          return;
        }

        const user = await verifyPhoneCode(verificationCode);
        handleAuthSuccess(user);
      }
    } catch (error) {
      handleAuthError(error as Error);
      if (error instanceof Error && error.message.includes('auth/billing-not-enabled')) {
        // Reset phone verification state
        setCodeSent(false);
        setPhone('');
        setVerificationCode('');
        // Switch to email tab
        setActiveTab('email');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      toast({
        title: "Missing Code",
        description: "Please enter the verification code sent to your phone",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const user = await verifyPhoneCode(verificationCode);
      handleAuthSuccess(user);
      cleanupRecaptcha(); // Clean up after successful verification
    } catch (error) {
      console.error('Code verification failed:', error);
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Invalid verification code. Please try again.",
        variant: "destructive",
      });
      if (onError && error instanceof Error) onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailOTPSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      await sendEmailOTP(email);
      toast({
        title: "Success",
        description: "Check your email for the login link",
      });
      setCodeSent(true);
    } catch (error) {
      handleAuthError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailOTPVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const user = await verifyEmailOTP(email);
      handleAuthSuccess(user);
    } catch (error) {
      handleAuthError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check for email sign-in link on mount
  useEffect(() => {
    const checkEmailLink = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        const savedEmail = window.localStorage.getItem('emailForSignIn');
        if (savedEmail) {
          try {
            setIsLoading(true);
            const user = await verifyEmailOTP(savedEmail);
            handleAuthSuccess(user);
          } catch (error) {
            handleAuthError(error as Error);
          } finally {
            setIsLoading(false);
          }
        } else {
          setEmail('');
          setIsEmailOTP(true);
          setActiveTab('email-otp');
        }
      }
    };
    checkEmailLink();
  }, [handleAuthSuccess, handleAuthError]);


  // Handle phone number input with validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  // Validate phone number on blur
  const handlePhoneBlur = () => {
    if (phone && !isValidIndianPhoneNumber(phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9",
        variant: "destructive",
      });
    }
  };

  if (needsEmailVerification) {
    return (
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Verify Your Email</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTitle>Check your email</AlertTitle>
            <AlertDescription>
              We've sent a verification link to {email}. Please click the link to verify your account.
              You can close this window after verifying.
            </AlertDescription>
          </Alert>
          <Button
            className="w-full mt-4"
            onClick={() => setNeedsEmailVerification(false)}
          >
            Back to Sign In
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In / Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email">Email/Password</TabsTrigger>
            <TabsTrigger value="email-otp">Email OTP</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>

          {/* Email/Password Tab */}
          <TabsContent value="email">
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="w-full"
                onClick={() => handleEmailSignIn(false)}
                disabled={isLoading}
              >
                {isLoading ? "Please wait..." : "Sign In"}
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleEmailSignIn(true)}
                disabled={isLoading}
              >
                {isLoading ? "Please wait..." : "Sign Up"}
              </Button>
            </div>
          </TabsContent>

          {/* Email OTP Tab */}
          <TabsContent value="email-otp">
            <form onSubmit={codeSent ? handleEmailOTPVerify : handleEmailOTPSend}>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading || codeSent}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Processing..."
                    : codeSent
                    ? "Verify Email Link"
                    : "Send Login Link"}
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* Phone Tab */}
          <TabsContent value="phone">
            <form onSubmit={handlePhoneSignIn}>
              <div className="space-y-4">
                <div>
                  {/* Phone input with country code */}
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                      +91
                    </span>
                    <Input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={phone}
                      onChange={handlePhoneChange}
                      onBlur={handlePhoneBlur}
                      className="rounded-l-none"
                      maxLength={10}
                      pattern="[6-9][0-9]{9}"
                      title="Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9"
                      disabled={isLoading || codeSent}
                      required
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter a 10-digit mobile number starting with 6, 7, 8, or 9
                  </p>
                </div>

                {/* Hidden reCAPTCHA container */}
                <div id="phone-sign-in-button"></div>
                
                {/* OTP input */}
                {codeSent && (
                  <div>
                    <Input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      maxLength={6}
                      pattern="\d{6}"
                      title="Please enter the 6-digit OTP"
                      disabled={isLoading}
                      required
                    />
                    <div className="mt-1 flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        Enter the 6-digit OTP sent to your phone
                      </p>
                      <Button
                        type="button"
                        variant="link"
                        disabled={isLoading}
                        onClick={(e) => {
                          e.preventDefault();
                          setCodeSent(false);
                          setVerificationCode('');
                        }}
                      >
                        Request New Code
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Submit button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || (phone.length !== 10 && !codeSent)}
                  id="phone-sign-in-button"
                >
                  {isLoading
                    ? "Processing..."
                    : codeSent
                    ? "Verify OTP"
                    : "Send OTP"}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Exports
export default AuthForm;
