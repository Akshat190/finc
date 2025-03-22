import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Portfolio } from './pages/Portfolio';
import { Screener } from './pages/Screener';
import { Profile } from './pages/Profile';
import { Loader2 } from 'lucide-react';
import Investments from './pages/Investments';
import Settings from './pages/Settings';
import Chat from './pages/Chat';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';


// Simple Home component
const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
    <h1 className="text-4xl font-bold text-indigo-600 mb-6">AI Investor</h1>
    <p className="text-xl text-gray-700 max-w-2xl text-center mb-8">
      Your intelligent assistant for making smarter investment decisions
    </p>
    <div className="flex gap-4">
      <a 
        href="/login" 
        className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Log In
      </a>
      <a 
        href="/register" 
        className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
      >
        Register
      </a>
    </div>
  </div>
);

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (user) {
          setAuthenticated(true);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return authenticated ? <>{children}</> : null;
};

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Navigation />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/portfolio" element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          } />
          <Route path="/screener" element={
            <ProtectedRoute>
              <Screener />
            </ProtectedRoute>
          } />
          <Route path="/investments" element={
            <ProtectedRoute>
              <Investments />
            </ProtectedRoute>
          } />
          <Route path="/chat" element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;