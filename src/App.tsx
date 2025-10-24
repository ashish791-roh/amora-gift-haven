import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import LoadingScreen from '@/components/LoadingScreen';
import Home from './pages/Home';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem('amora-loading-seen');
    if (hasSeenLoading) {
      setShowLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    sessionStorage.setItem('amora-loading-seen', 'true');
  };

  if (showLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
