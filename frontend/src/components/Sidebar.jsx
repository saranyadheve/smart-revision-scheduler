import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Home,
  BookOpen, 
  ClipboardCheck, 
  FileText, 
  CheckSquare,
  LogOut,
  ChevronDown,
  ChevronRight,
  User,
  Settings,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarItem = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      className={`
        flex items-center justify-between p-3.5 rounded-[12px] transition-all duration-300 group mb-1
        ${isActive 
          ? 'bg-[#EAF0EA] text-[#588157] font-medium' 
          : 'text-[#6B7A7A] hover:bg-[#F4F7F5] hover:text-[#588157]'}
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-3.5">
        <Icon size={20} strokeWidth={isActive ? 2 : 1.5} className="transition-transform group-hover:scale-105" />
        <span className="text-[14px]">{item.name}</span>
      </div>
      {!item.isDropdown && isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#588157]" />}
    </NavLink>
  );
};

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  const courses = [
    { name: 'UPSC', path: '/courses/upsc' },
    { name: 'TNPSC', path: '/courses/tnpsc' },
    { name: 'GATE', path: '/courses/gate' },
    { name: 'IT Interview', path: '/courses/interview' },
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      navigate('/login');
    }
  };

  const isCourseActive = location.pathname.startsWith('/courses/');
  const isNotesActive = location.pathname.startsWith('/notes');

  return (
    <motion.aside 
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-[#DAD7CD]/30 z-[110] flex flex-col p-5 shadow-[4px_0_12px_rgba(0,0,0,0.02)]"
    >
      {/* Brand */}
      <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-9 h-9 flex items-center justify-center bg-[#A3B18A] rounded-[10px] text-white">
          <BookOpen size={20} strokeWidth={2} />
        </div>
        <span className="text-[18px] font-semibold text-[#2F3E46] tracking-tight font-poppins">Smart Revise</span>
      </div>

      {/* Navigation */}
      <nav className="flex-grow space-y-1 overflow-y-auto pr-1">
        <SidebarItem item={{ name: 'Strategic Dashboard', icon: LayoutDashboard, path: '/dashboard' }} isActive={location.pathname === '/dashboard'} />
        <SidebarItem item={{ name: 'AI Study Room', icon: Sparkles, path: '/ai-study-room' }} isActive={location.pathname === '/ai-study-room'} />
        
        {/* Prep Tracks Dropdown */}
        <div>
          <button
            onClick={() => setCoursesOpen(!coursesOpen)}
            className={`
              w-full flex items-center justify-between p-3.5 rounded-[12px] transition-all duration-300 group mb-1
              ${isCourseActive || location.pathname.includes('/notes/') ? 'bg-[#EAF0EA] text-[#588157]' : 'text-[#6B7A7A] hover:bg-[#F4F7F5] hover:text-[#588157]'}
            `}
          >
            <div className="flex items-center gap-3.5">
              <BookOpen size={20} strokeWidth={isCourseActive ? 2 : 1.5} />
              <span className="text-[14px]">Preparation Tracks</span>
            </div>
            <ChevronDown size={14} className={`transition-transform duration-300 ${coursesOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {(coursesOpen || isCourseActive || location.pathname.includes('/notes/')) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-[#F4F7F5]/50 rounded-[12px] mb-2"
              >
                {[
                  { name: 'UPSC Hub', path: '/notes/upsc' },
                  { name: 'TNPSC Hub', path: '/notes/tnpsc' },
                  { name: 'GATE Preparation Hub', path: '/notes/gate' },
                  { name: 'IT Interview Intel', path: '/notes/it-interview' },
                ].map((track) => (
                  <NavLink
                    key={track.path}
                    to={track.path}
                    className={({ isActive }) => `
                      flex items-center gap-3 pl-12 py-2.5 text-[13px] transition-all
                      ${isActive ? 'text-[#588157] font-medium' : 'text-[#6B7A7A] hover:text-[#588157]'}
                    `}
                  >
                    {track.name}
                  </NavLink>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <SidebarItem item={{ name: 'Aptitude CORE', icon: LayoutDashboard, path: '/aptitude' }} isActive={location.pathname === '/aptitude'} />
        <SidebarItem item={{ name: 'Practice Tests', icon: ClipboardCheck, path: '/practice-tests' }} isActive={location.pathname.startsWith('/practice-tests')} />
        <SidebarItem item={{ name: 'Study Planner', icon: Settings, path: '/notes/plan-generator/launch' }} isActive={location.pathname.includes('/plan-generator')} />
        <SidebarItem item={{ name: 'Focus Tracker (To-Do)', icon: CheckSquare, path: '/todo' }} isActive={location.pathname === '/todo'} />
        
        <div className="my-6 border-t border-[#DAD7CD]/20" />
        

        <SidebarItem item={{ name: 'Personal Notes', icon: FileText, path: '/notes' }} isActive={location.pathname === '/notes'} />

        {user?.role === 'ADMIN' && (
          <SidebarItem item={{ name: 'Admin Control', icon: User, path: '/admin-dashboard' }} isActive={location.pathname === '/admin-dashboard'} />
        )}
      </nav>

      {/* User & Logout */}
      <div className="pt-5 border-t border-[#DAD7CD]/30 mt-auto">
        <div className="flex items-center gap-3 px-2 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#EAF0EA] flex items-center justify-center text-[#588157]">
            <User size={20} strokeWidth={1.5} />
          </div>
          <div className="overflow-hidden">
            <p className="text-[14px] font-semibold text-[#2F3E46] truncate">{user?.username}</p>
            <p className="text-[10px] text-[#6B7A7A] uppercase tracking-wider font-medium">Pro Student</p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 p-3.5 rounded-[12px] text-[#6B7A7A] hover:text-red-500 hover:bg-red-50/50 transition-all group"
        >
          <LogOut size={20} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-1" />
          <span className="text-[14px]">Log Out</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
