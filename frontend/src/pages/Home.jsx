import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Sparkles, BookOpen, Brain, Terminal } from 'lucide-react';
import VisualEngine from '../components/VisualEngine';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCTA = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center p-4">
      <VisualEngine />

      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl glass rounded-[3rem] p-12 md:p-16 text-center border-slate-200/20 dark:border-white/5 shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
        
        <div className="flex justify-center mb-8">
            <div className="w-20 h-20 p-2 rounded-3xl bg-primary/20 border border-primary/20 shadow-2xl animate-bounce-slow">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
        </div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-6"
        >
            The Future of Learning
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-white dark:to-white/60 tracking-tighter leading-none italic">
          Master Your <br/> Revision.
        </h1>
        
        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl mb-12 leading-relaxed font-light max-w-lg mx-auto">
          Experience the world's first AI-powered <span className="text-primary font-bold">Smart Revise</span> environment tailored to your unique cognitive rhythm.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCTA}
            className="flex items-center justify-center gap-3 px-10 py-5 bg-primary hover:bg-primary-dark text-white rounded-2xl font-black uppercase tracking-widest transition-all group shadow-2xl shadow-primary/20"
          >
            {user ? 'Go to Dashboard' : 'Get Started'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <div className="flex items-center gap-8 md:ml-4">
            <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-500" />
                    </div>
                ))}
            </div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">+2.5k preparing</span>
          </div>
        </div>

        {/* Feature badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Brain className="w-3 h-3" />
                AI Logic
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Terminal className="w-3 h-3" />
                Real-time
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <BookOpen className="w-3 h-3" />
                Adaptive
            </div>
        </div>
      </motion.div>

      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
    </div>
  );
};

// Simple User icon as fallback
const User = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export default Home;
