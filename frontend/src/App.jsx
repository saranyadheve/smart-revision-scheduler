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
import AptitudePracticeSession from './pages/AptitudePracticeSession';
import Courses from './pages/Courses';
import GateHub from './pages/GATE';
import GateBranchDetail from './pages/GateBranchDetail';
import AIStudyRoom from './pages/AIStudyRoom';
import Interview from './pages/Interview';
import StudyNotes from './pages/StudyNotes';
import AdminDashboard from './pages/AdminDashboard';
import MouseParallax from './components/MouseParallax';
import PersonalNotes from './pages/PersonalNotes';
import SubtopicTodo from './pages/SubtopicTodo';
import NotFound from './pages/NotFound';

// Practice Test Module
import PracticeDashboard from './pages/PracticeTest/PracticeDashboard';
import PracticeTrackConfig from './pages/PracticeTest/PracticeTrackConfig';
import PracticeTestRunner from './pages/PracticeTest/PracticeTestRunner';
import PracticeTestResult from './pages/PracticeTest/PracticeTestResult';
import PracticeTestReview from './pages/PracticeTest/PracticeTestReview';
import UPSCNotes from './pages/UPSCNotes/UPSCNotes';
import PrelimsNotes from './pages/UPSCNotes/PrelimsNotes';
import MainsNotes from './pages/UPSCNotes/MainsNotes';
import PYQComponent from './pages/UPSCNotes/PYQComponent';
import TNPSCNotes from './pages/TNPSCNotes/TNPSCNotes';
import Group1 from './pages/TNPSCNotes/Group1';
import Group2And2A from './pages/TNPSCNotes/Group2And2A';
import Group4 from './pages/TNPSCNotes/Group4';
import StudyMaterial from './pages/TNPSCNotes/StudyMaterial';
import PrepDashboard from './pages/PrepDashboard';
import CourseDashboard from './pages/CourseDashboard';
import CourseSubjectView from './pages/CourseSubjectView';
import PlanLauncher from './pages/PlanLauncher';
import PlanDashboard from './pages/PlanDashboard';

const ProtectedLayout = () => (
  <div className="flex w-full min-h-screen bg-[#F4F7F5]">
    <Sidebar />
    <main className="flex-grow pl-64 w-full">
      <Outlet />
    </main>
  </div>
);

const AdminRoute = () => {
    const { user } = useAuth();
    return user?.role === 'ADMIN' ? <Outlet /> : <Navigate to="/dashboard" />;
};

import LearningHubView from './pages/LearningHubView';
import TopicListView from './pages/TopicListView';
import TopicContentView from './pages/TopicContentView';

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
                      <Route path="/dashboard" element={<PrepDashboard />} />
                      <Route path="/todo" element={<SubtopicTodo />} />
                      <Route path="/aptitude" element={<Aptitude />} />
                      <Route path="/aptitude/practice/:module/:subtopicId" element={<AptitudePracticeSession />} />
                      <Route path="/practice-tests" element={<PracticeDashboard />} />
                      <Route path="/practice-tests/:track" element={<PracticeTrackConfig />} />
                      <Route path="/practice-tests/:track/run" element={<PracticeTestRunner />} />
                      <Route path="/practice-tests/:track/result" element={<PracticeTestResult />} />
                      <Route path="/practice-tests/:track/review" element={<PracticeTestReview />} />
                      <Route path="/ips" element={<IPS />} />
                      <Route path="/study-notes" element={<StudyNotes />} />
                      
                      {/* Unified Platform Routes */}
                      <Route path="/notes" element={<PersonalNotes />} />
                      <Route path="/notes/upsc" element={<UPSCNotes />} />
                      <Route path="/notes/tnpsc" element={<TNPSCNotes />} />
                      <Route path="/notes/tnpsc/group1/:tab?" element={<Group1 />} />
                      <Route path="/notes/tnpsc/group2and2a/:tab?" element={<Group2And2A />} />
                      <Route path="/notes/tnpsc/group4/:tab?" element={<Group4 />} />
                      <Route path="/notes/tnpsc/study-material" element={<StudyMaterial />} />
                      
                      {/* GATE Preparation Track */}
                      <Route path="/notes/gate" element={<GateHub />} />
                      <Route path="/notes/gate/:branch" element={<GateBranchDetail />} />
                      
                      {/* IT Interview Track */}
                      <Route path="/notes/it-interview" element={<Interview />} />
                      
                      {/* Global AI Study Room */}
                      <Route path="/ai-study-room" element={<AIStudyRoom />} />
                      
                      {/* Courses Module */}
                      <Route path="/notes/courses" element={<CourseDashboard />} />
                      <Route path="/notes/courses/:track/:subjectId" element={<CourseSubjectView />} />
                      
                      {/* Plan Generator Module */}
                      <Route path="/notes/plan-generator/launch" element={<PlanLauncher />} />
                      <Route path="/notes/plan-generator/dashboard" element={<PlanDashboard />} />
                      
                      {/* AI Learning Hub Module */}
                      <Route path="/learning-hub" element={<LearningHubView />} />
                      <Route path="/learning-hub/module/:moduleId" element={<TopicListView />} />
                      <Route path="/learning-hub/topic/:topicId" element={<TopicContentView />} />

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
