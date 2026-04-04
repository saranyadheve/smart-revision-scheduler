import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardCheck, 
  Timer, 
  Target, 
  Trophy, 
  Users, 
  ChevronRight,
  Zap,
  Activity
} from 'lucide-react';
import VisualEngine from '../components/VisualEngine';

import { useNavigate } from 'react-router-dom';

const TestCard = ({ title, category, duration, questions, difficulty, path }) => {
  const navigate = useNavigate();
  return (
  <motion.div
    whileHover={{ y: -5, opacity: 1 }}
    initial={{ opacity: 0.8 }}
    className="glass p-8 rounded-[2.5rem] border-white/5 flex flex-col gap-6 group transition-all bg-white/5 dark:bg-white/5 backdrop-blur-3xl"
  >
    <div className="flex justify-between items-start">
        <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-lg group-hover:scale-110 transition-transform">
            <ClipboardCheck className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Difficulty</span>
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < difficulty ? 'bg-primary shadow-sm shadow-primary/50' : 'bg-slate-300 dark:bg-white/10'}`} />
                ))}
            </div>
        </div>
    </div>
    
    <div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 italic tracking-tight">{title}</h3>
        <span className="text-xs font-medium text-slate-500 uppercase tracking-[0.2em]">{category}</span>
    </div>

    <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-200/20 dark:border-white/5">
        <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{duration} Min</span>
        </div>
        <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{questions} Questions</span>
        </div>
    </div>

    <button 
        onClick={() => path && navigate(path)}
        className="w-full py-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 hover:bg-primary hover:border-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all font-black uppercase tracking-widest text-[10px] text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2 group/btn shadow-sm hover:shadow-xl hover:scale-[1.02]"
    >
        Start Exam
        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
    </button>
  </motion.div>
)};

const MockTests = () => {
    const tests = [
        { title: "UPSC Prelims Mock #1", category: "General Studies", duration: 30, questions: 5, difficulty: 5, path: "/mock/upsc" },
        { title: "General Mock Test", category: "Mixed Questions", duration: 30, questions: 20, difficulty: 3, path: "/mock/test" },
        { title: "GATE CS - Operating Systems", category: "Technical", duration: 60, questions: 30, difficulty: 4, path: "/mock/gate" },
        { title: "IPS Foundations - IPC", category: "Law & Ethics", duration: 90, questions: 50, difficulty: 3, path: "/mock/ips" },
        { title: "HR Interview Simulation", category: "Soft Skills", duration: 30, questions: 20, difficulty: 2, path: "/mock/interview" },
    ];

    const stats = [
        { label: "Tests Taken", value: "12", icon: ClipboardCheck, color: "text-blue-400" },
        { label: "Avg Score", value: "78%", icon: Target, color: "text-indigo-400" },
        { label: "Time Spent", value: "15h", icon: Timer, color: "text-emerald-400" },
        { label: "Global Rank", value: "#42", icon: Trophy, color: "text-amber-400" },
    ];

    return (
        <div className="relative w-full min-h-screen pt-24 pb-12 px-6 md:px-12 flex flex-col items-center bg-slate-50 dark:bg-slate-950 transition-colors">
            <VisualEngine />
            
            <header className="max-w-4xl w-full text-center relative z-10 mb-20 px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center mb-8"
                >
                    <div className="px-5 py-2 rounded-full glass border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                        <Zap className="w-3 h-3 fill-primary" />
                        Live Assessment Platform
                        <Zap className="w-3 h-3 fill-primary" />
                    </div>
                </motion.div>
                <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none mb-6 italic">
                    Mock Tests
                </h1>
                <p className="text-slate-400 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                    Challenge your limits with high-fidelity simulations of India's toughest competitive exams.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                    {stats.map((s, i) => (
                        <div key={i} className="glass p-6 rounded-3xl border-white/5 flex flex-col items-center gap-2">
                            <s.icon className={`w-5 h-5 ${s.color}`} />
                            <span className="text-xl font-black text-white">{s.value}</span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</span>
                        </div>
                    ))}
                </div>
            </header>

            <div className="max-w-7xl w-full relative z-10">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic flex items-center gap-4 tracking-tighter">
                        <Activity className="text-primary animate-pulse" />
                        Available Exams
                    </h2>
                    <div className="hidden md:block flex-grow h-0.5 bg-white/5 mx-10" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {tests.map((test, i) => (
                        <TestCard key={i} {...test} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MockTests;
