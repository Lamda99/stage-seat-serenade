
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { testConnection } from '@/lib/api';

const ConnectionStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkConnection = async () => {
    setIsLoading(true);
    const connected = await testConnection();
    setIsConnected(connected);
    setIsLoading(false);
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="h-4 w-4 animate-spin" />;
    if (isConnected === null) return <Loader2 className="h-4 w-4 animate-spin" />;
    return isConnected ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    );
  };

  const getStatusText = () => {
    if (isLoading) return 'Testing connection...';
    if (isConnected === null) return 'Checking connection...';
    return isConnected ? 'Backend Connected' : 'Backend Disconnected';
  };

  const getStatusColor = () => {
    if (isLoading || isConnected === null) return 'border-yellow-200 bg-yellow-50';
    return isConnected ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50';
  };

  return (
    <Card className={`p-4 ${getStatusColor()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-sm font-medium">{getStatusText()}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={checkConnection}
          disabled={isLoading}
        >
          {isLoading ? 'Testing...' : 'Test Connection'}
        </Button>
      </div>
      {!isConnected && isConnected !== null && (
        <div className="mt-2 text-xs text-red-600">
          Make sure the backend server is running on http://localhost:3001
        </div>
      )}
    </Card>
  );
};

export default ConnectionStatus;
