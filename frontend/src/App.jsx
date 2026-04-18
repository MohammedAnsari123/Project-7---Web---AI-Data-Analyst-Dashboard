import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Datasets from './pages/Datasets';
import DatasetDetail from './pages/DatasetDetail';
import Analyze from './pages/Analyze';
import Reports from './pages/Reports';
import ReportDetail from './pages/ReportDetail';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Layout from './components/Layout';

const ProtectedRoute = ({ children, title }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#FDFCFB]">
      <div className="w-12 h-12 border-4 border-[#E6D5B8] border-t-[#C5A059] rounded-full animate-spin"></div>
    </div>
  );
  
  if (!user) return <Navigate to="/login" />;
  
  return <Layout title={title}>{children}</Layout>;
};

const AppRoutes = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-[#E6D5B8]/30">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute title="Overview"><Dashboard /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute title="Injection Vector"><Upload /></ProtectedRoute>} />
        <Route path="/datasets" element={<ProtectedRoute title="Data Assets"><Datasets /></ProtectedRoute>} />
        <Route path="/datasets/:datasetId" element={<ProtectedRoute title="Asset Intelligence"><DatasetDetail /></ProtectedRoute>} />
        <Route path="/analyze/:datasetId" element={<ProtectedRoute title="Neural Analysis"><Analyze /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute title="Report Archives"><Reports /></ProtectedRoute>} />
        <Route path="/reports/:reportId" element={<ProtectedRoute title="Report Intelligence"><ReportDetail /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute title="My Profile"><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute title="Preferences"><Settings /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
