
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import EnhancedHeader from '@/components/layout/EnhancedHeader';
import ShowList from '@/components/admin/ShowList';
import ShowForm from '@/components/admin/ShowForm';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('shows');
  const [showForm, setShowForm] = useState(false);
  const [editingShow, setEditingShow] = useState<any>(null);

  const handleCreateShow = () => {
    setEditingShow(null);
    setShowForm(true);
  };

  const handleEditShow = (show: any) => {
    setEditingShow(show);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingShow(null);
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <EnhancedHeader />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-red-600 mb-6"
            onClick={handleFormClose}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Admin Panel
          </Button>
          
          <ShowForm 
            show={editingShow} 
            onSave={handleFormClose}
            onCancel={handleFormClose}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/">
              <Button variant="ghost" className="text-gray-600 hover:text-red-600 mb-4">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
            <p className="text-gray-600">Manage shows, venues, and seat layouts</p>
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Theater Management
              <Button onClick={handleCreateShow} className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Show
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="shows">Shows</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="shows" className="mt-6">
                <ShowList onEditShow={handleEditShow} />
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-6">
                <div className="text-center py-8 text-gray-500">
                  Analytics dashboard coming soon...
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
