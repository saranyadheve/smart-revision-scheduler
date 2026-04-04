import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import UPSC from './pages/UPSC';
import IPS from './pages/IPS';
import Aptitude from './pages/Aptitude';
import AptitudeTopic from './pages/AptitudeTopic';
import Courses from './pages/Courses';
import GATE from './pages/GATE';
import Interview from './pages/Interview';
import MockExam from './pages/MockExam';
import StudyNotes from './pages/StudyNotes';
import AdminDashboard from './pages/AdminDashboard';
import MouseParallax from './components/MouseParallax';
import MockTests from './pages/MockTests';
import UPSCMockTest from './pages/UPSCMockTest';
import MockTest from './pages/MockTest';
import NotFound from './pages/NotFound';

const ProtectedLayout = () => (
  <div className="flex w-full min-h-screen transition-colors duration-500">
    <Sidebar />
    <main className="flex-grow pl-72 w-full">
      <Outlet />
    </main>
  </div>
);

const AdminRoute = () => {
    const { user } = useAuth();
    return user?.role === 'ADMIN' ? <Outlet /> : <Navigate to="/dashboard" />;
};

function App() {
  React.useEffect(() => {
    if (window.location.pathname.startsWith('/verify/')) {
      const token = window.location.pathname.replace('/verify/', '');
      // Redirect to the hash-based route for verification
      window.location.replace(`/#/verify/${token}`);
    }
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <MouseParallax>
          <Router>
            <div className="App w-full min-h-screen text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 font-sans selection:bg-primary/30 transition-colors duration-500">
              <ErrorBoundary>
                <Routes>
                  {/* Public Routes - with Top Navbar */}
                  <Route element={<><Navbar /><Outlet /></>}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/verify/:token" element={<VerifyEmail />} />
                  </Route>
                  
                  {/* Protected Routes - with Sidebar Layout */}
                  <Route element={<ProtectedRoute />}>
                    <Route element={<ProtectedLayout />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/courses" element={<Courses />} />
                      <Route path="/courses/upsc" element={<UPSC />} />
                      <Route path="/courses/ips" element={<IPS />} />
                      <Route path="/courses/aptitude" element={<Aptitude />} />
                      <Route path="/courses/aptitude/:topicId" element={<AptitudeTopic />} />
                      <Route path="/gate" element={<GATE />} />
                      <Route path="/interview" element={<Interview />} />
                      <Route path="/mock-tests" element={<MockTests />} />
                      <Route path="/mock/upsc" element={<UPSCMockTest />} />
                      <Route path="/mock/test" element={<MockTest />} />
                      <Route path="/mock/exam" element={<MockExam />} />
                      <Route path="/notes" element={<StudyNotes />} />
                      
                      {/* Admin Only */}
                      <Route element={<AdminRoute />}>
                          <Route path="/admin-dashboard" element={<AdminDashboard />} />
                      </Route>
                    </Route>
                  </Route>

                  {/* 404 Fallback */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ErrorBoundary>
            </div>
          </Router>
        </MouseParallax>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
