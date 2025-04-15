
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Package, ShoppingBag, Users, Settings, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout, isAdmin } = useAuth();

  // Check if user is logged in and is an admin
  React.useEffect(() => {
    if (!isAdmin()) {
      toast({
        title: "Access denied",
        description: "You must be logged in as an administrator to view this page.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [isAdmin, navigate, toast]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
    });
    navigate('/login');
  };

  // If not admin, don't render the admin layout
  if (!isAdmin()) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-saree-maroon">
            <Link to="/admin" className="font-playfair font-bold text-xl text-white">
              SareeGlow Admin
            </Link>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <Link
                to="/admin"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:text-saree-maroon hover:bg-gray-50"
              >
                <Home className="mr-3 flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-saree-maroon" />
                Dashboard
              </Link>
              <Link
                to="/admin/products"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:text-saree-maroon hover:bg-gray-50"
              >
                <Package className="mr-3 flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-saree-maroon" />
                Products
              </Link>
              <Link
                to="/admin/orders"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:text-saree-maroon hover:bg-gray-50"
              >
                <ShoppingBag className="mr-3 flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-saree-maroon" />
                Orders
              </Link>
              <Link
                to="/admin/customers"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:text-saree-maroon hover:bg-gray-50"
              >
                <Users className="mr-3 flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-saree-maroon" />
                Customers
              </Link>
              <Link
                to="/admin/settings"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:text-saree-maroon hover:bg-gray-50"
              >
                <Settings className="mr-3 flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-saree-maroon" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 rounded-full bg-saree-maroon text-white">
                    <AvatarFallback>{user?.name?.charAt(0) || 'A'}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">{user?.name || 'Admin'}</p>
                    <p className="text-xs text-gray-500">{user?.email || ''}</p>
                  </div>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:text-saree-maroon"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 flex justify-between items-center border-b border-gray-200 pb-2">
          <button className="inline-flex items-center justify-center h-10 w-10 rounded-md text-gray-500 hover:text-gray-900">
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center">
            <span className="text-gray-700 text-sm font-medium mr-2">{user?.name || 'Admin'}</span>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-saree-maroon"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
