import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  BookOpen, 
  Heart, 
  Activity, 
  FileText, 
  Scale, 
  Star, 
  Zap, 
  Plus,
  ArrowRight,
  Gavel,
  ShieldCheck,
  Target,
  HelpCircle,
  TrendingUp,
  Award,
  ChevronRight
} from 'lucide-react';
import VisualEngine from '../components/VisualEngine';
import ipsData from '../data/ipsData.json';

const LawSection = ({ title, explanation, topics, color, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="glass rounded-[3rem] p-10 border-slate-200/20 dark:border-white/5 relative overflow-hidden group hover:scale-[1.02] transition-all shadow-2xl bg-white/40 dark:bg-white/5 backdrop-blur-3xl h-full border-2 border-transparent hover:border-primary/20"
  >
    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${color} blur-[100px] -mr-10 -mt-10 opacity-20`} />
    <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-4 flex items-center gap-4 italic uppercase tracking-tighter">
        <Icon className="w-7 h-7 text-primary" />
        {title}
    </h3>
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8 leading-relaxed">{explanation}</p>
    <div className="space-y-4 relative z-10">
        {topics.map((t, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/10 dark:border-white/5 group-hover:bg-primary/5 transition-all flex items-center justify-between">
                <span className="text-xs text-slate-700 dark:text-slate-200 font-bold italic">{t}</span>
                <CheckCircle2 className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        ))}
    </div>
  </motion.div>
);

const IPS = () => {
    const navigate = useNavigate();
    const iconMap = {
        'Criminal Law (IPC/CrPC)': Gavel,
        'Internal Security': ShieldCheck,
        'Police Ethics': Award
    };

    const colorMap = [
        'from-indigo-500 to-blue-500',
        'from-red-500 to-orange-500',
        'from-emerald-500 to-teal-500'
    ];

    return (
        <div className="relative w-full min-h-screen pt-24 pb-12 px-6 md:px-12 bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
            <VisualEngine />
            
            <header className="max-w-7xl mx-auto text-center relative z-10 mb-20">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-block px-10 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-8"
                >
                    Internal Security Excellence
                </motion.div>
                <h1 className="text-7xl md:text-9xl font-black text-slate-800 dark:text-white tracking-tighter uppercase italic leading-none mb-6">
                    IPS <span className="text-primary italic">CORE.</span>
                </h1>
                <p className="text-slate-500 font-bold uppercase tracking-[0.5em] text-[10px]">
                    Duty, Honor, Country. The blue-print for leadership.
                </p>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10 mb-20">
                {Object.values(ipsData.subjects).map((s, i) => (
                    <LawSection 
                        key={s.title} 
                        {...s} 
                        icon={iconMap[s.title] || Scale} 
                        color={colorMap[i % colorMap.length]} 
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 mb-24">
                {/* Physical Readiness */}
                <div className="lg:col-span-4 space-y-12">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500">
                            <Activity className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter text-shadow">Physical Drill</h2>
                    </div>

                    <div className="glass rounded-[3.5rem] p-10 border-slate-200/10 dark:border-white/5 bg-slate-900/5 dark:bg-white/5 backdrop-blur-3xl space-y-8 relative overflow-hidden h-full">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
                        {ipsData.fitness.map((drill, i) => (
                            <div key={i} className="p-6 rounded-[2rem] bg-white/40 dark:bg-white/5 border border-white/5 hover:border-red-500/20 transition-all flex justify-between items-center group">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-1">{drill.drill}</span>
                                    <span className="text-lg font-black text-slate-800 dark:text-white italic uppercase tracking-tighter">{drill.target}</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <Zap className="w-4 h-4" />
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-5 bg-slate-800 dark:bg-white/5 hover:bg-red-500 hover:text-white text-slate-400 dark:text-slate-300 rounded-[2.5rem] border border-white/10 font-black uppercase tracking-[0.4em] text-[10px] transition-all shadow-xl">
                            Log Training Session
                        </button>
                    </div>
                </div>

                {/* Assessment Preview */}
                <div className="lg:col-span-8 space-y-12">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-xl">
                            <HelpCircle className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter">Case Assessment</h2>
                    </div>

                    <div className="glass rounded-[3.5rem] p-12 border-slate-200/10 dark:border-white/5 bg-primary/5 h-full space-y-10">
                        {ipsData.mcqs.map((mcq, i) => (
                            <div key={i} className="space-y-5">
                                <div className="flex gap-6">
                                    <span className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black italic text-xs shadow-lg">0{i+1}</span>
                                    <h4 className="text-lg font-bold text-slate-800 dark:text-white leading-relaxed tracking-tight italic">
                                        {mcq.question}
                                    </h4>
                                </div>
                                <div className="grid grid-cols-2 gap-4 ml-16">
                                    {mcq.options.map((opt, idx) => (
                                        <div key={idx} className="px-6 py-4 rounded-2xl bg-white/40 dark:bg-white/10 border border-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-primary/40 cursor-pointer transition-all">
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button 
                            onClick={() => navigate('/mock-tests')}
                            className="w-full py-6 bg-primary text-white rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-primary/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-4"
                        >
                            Enter Simulation HQ <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Fallback icon
const CheckCircle2 = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 12 14 22 4"/></svg>
);

export default IPS;
