import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Cpu, 
  Users, 
  ClipboardCheck, 
  LogOut,
  ChevronRight,
  FileText,
  Settings,
  ShieldCheck,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Courses', icon: BookOpen, path: '/courses' },
    { name: 'GATE Prep', icon: Cpu, path: '/gate' },
    { name: 'IT Interview', icon: Users, path: '/interview' },
    { name: 'Mock Exam', icon: ClipboardCheck, path: '/mock-tests' },
    { name: 'Study Notes', icon: FileText, path: '/notes' },
  ];

  if (user?.role === 'ADMIN') {
    menuItems.push({ name: 'Admin Panel', icon: Settings, path: '/admin-dashboard' });
  }

  const handleLogout = () => {
    if (window.confirm("Ready to pause your study journey? Your progress is saved.")) {
      logout();
      navigate('/login');
    }
  };

  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-72 bg-white/95 dark:bg-slate-900/95 border-r border-slate-200 dark:border-white/5 z-[110] flex flex-col p-6 backdrop-blur-3xl transition-colors"
    >
      <div className="flex items-center gap-3 mb-10 px-2 group cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-10 h-10 p-1.5 rounded-xl bg-primary/20 border border-slate-200/20 dark:border-white/10 shadow-lg group-hover:scale-110 transition-transform">
          <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
        <span className="text-xl font-black text-slate-800 dark:text-white italic tracking-tighter uppercase">Smart Revise</span>
      </div>

      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-8 p-4 rounded-[2rem] bg-slate-900/5 dark:bg-white/5 border border-slate-200/10 dark:border-white/5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-indigo-500/20 flex items-center justify-center text-primary border border-primary/20 shadow-xl">
            <span className="text-xl font-black uppercase italic">{user?.username?.[0]}</span>
        </div>
        <div>
            <h3 className="font-black text-slate-800 dark:text-white leading-none mb-1 text-sm italic uppercase tracking-tighter">{user?.username}</h3>
            <span className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Pro Scholar</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow space-y-2 overflow-y-auto pr-2 custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center justify-between p-4 rounded-2xl transition-all group
                ${isActive 
                  ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5 hover:text-primary dark:hover:text-white'}
              `}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-4">
                    <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span className="font-black tracking-widest text-[9px] uppercase italic">{item.name}</span>
                  </div>
                  <ChevronRight className={`w-3 h-3 transition-all ${isActive ? 'translate-x-1 opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="pt-6 border-t border-slate-200/10 dark:border-white/5 mt-auto">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all font-black group"
        >
          <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-[0.3em] text-[9px] italic">Log Out</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
