import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { verifyEmail } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const oobCode = searchParams.get('oobCode');

  useEffect(() => {
    const verify = async () => {
      if (!oobCode) {
        toast({
          title: "Verification Failed",
          description: "Invalid verification link.",
          variant: "destructive",
        });
        setIsVerifying(false);
        return;
      }

      try {
        await verifyEmail(oobCode);
        toast({
          title: "Success",
          description: "Your email has been verified. You can now sign in.",
        });
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      } catch (error) {
        console.error('Verification failed:', error);
        toast({
          title: "Verification Failed",
          description: error instanceof Error ? error.message : "Failed to verify email.",
          variant: "destructive",
        });
        setIsVerifying(false);
      }
    };

    verify();
  }, [oobCode, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
        </CardHeader>
        <CardContent>
          {isVerifying ? (
            <p className="text-center">Verifying your email...</p>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-red-600">
                Verification failed. Please try again or request a new verification link.
              </p>
              <Button
                className="w-full"
                onClick={() => navigate('/login')}
              >
                Back to Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
