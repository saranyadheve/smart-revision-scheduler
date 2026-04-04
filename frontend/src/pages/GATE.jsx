import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Binary, 
  Layout, 
  Container, 
  Github, 
  Terminal, 
  Codepen, 
  ArrowRight,
  Zap,
  Target,
  FileText,
  Clock,
  CheckCircle2,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import VisualEngine from '../components/VisualEngine';
import gateData from '../data/gateData.json';

const TechnicalModule = ({ title, explanation, topics, color, icon: Icon }) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.02 }}
    className="glass p-10 rounded-[3rem] border-slate-200/20 dark:border-white/5 bg-white/40 dark:bg-white/5 backdrop-blur-3xl relative overflow-hidden group border-2 border-transparent hover:border-primary/20 transition-all h-full"
  >
    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${color} blur-[100px] -mr-10 -mt-10 opacity-10 group-hover:opacity-30 transition-opacity`} />
    <div className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center text-white bg-gradient-to-br ${color} shadow-2xl transition-transform group-hover:scale-110`}>
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-2xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter mb-4">{title}</h3>
    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-8 leading-relaxed uppercase tracking-widest">{explanation}</p>
    
    <div className="space-y-4">
        {topics.map((t, i) => (
            <div key={i} className="flex items-center gap-4 text-[10px] font-black text-slate-400 group-hover:text-primary transition-colors uppercase tracking-widest">
                <Terminal className="w-3 h-3 opacity-50" />
                {t}
            </div>
        ))}
    </div>

    <div className="mt-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        Initialize Core Module
        <ArrowRight className="w-4 h-4" />
    </div>
  </motion.div>
);

const GATE = () => {
    const iconMap = {
        'Data Structures': Binary,
        'Algorithms': Terminal,
        'Operating Systems': Layout,
        'DBMS': Github,
        'Computer Networks': Globe,
        'Architecture (COA)': Cpu
    };

    const colorMap = [
        'from-blue-500 to-indigo-600',
        'from-emerald-500 to-teal-600',
        'from-orange-500 to-red-600',
        'from-purple-500 to-pink-600',
        'from-amber-500 to-orange-600',
        'from-indigo-500 to-purple-600'
    ];

    return (
        <div className="relative w-full min-h-screen pt-24 pb-12 px-6 md:px-12 bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
            <VisualEngine />
            
            <header className="max-w-7xl mx-auto text-center relative z-10 mb-24">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-block px-10 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-8 shadow-2xl shadow-primary/5"
                >
                    Engineering Intelligence Hub
                </motion.div>
                <h1 className="text-7xl md:text-9xl font-black text-slate-800 dark:text-white italic tracking-tighter uppercase leading-none mb-6">
                    GATE <span className="text-primary italic">TEK.</span>
                </h1>
                <p className="text-slate-500 font-bold uppercase tracking-[0.5em] text-[10px]">Technical mastery through computational strategy.</p>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10 mb-24">
                {Object.keys(gateData.subjects).map((key, idx) => {
                    const subject = gateData.subjects[key];
                    const Icon = iconMap[subject.title] || Cpu;
                    return (
                        <TechnicalModule 
                            key={key} 
                            title={subject.title}
                            explanation={subject.explanation}
                            topics={subject.topics}
                            color={colorMap[idx % colorMap.length]}
                            icon={Icon}
                        />
                    );
                })}
            </div>

            {/* Formula & MCQ Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 mb-24">
                {/* Core Formulas */}
                <div className="glass p-12 rounded-[4rem] border-slate-200/10 dark:border-white/5">
                    <div className="flex items-center gap-6 mb-12">
                        <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter">Core Formula Bank</h2>
                    </div>
                    <div className="space-y-6">
                        {gateData.formulas.map((f, i) => (
                            <div key={i} className="p-8 rounded-[2.5rem] bg-white/40 dark:bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group">
                                <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-3 italic">{f.title}</h4>
                                <code className="text-sm font-bold text-slate-600 dark:text-slate-300 block bg-slate-950/5 dark:bg-white/5 p-4 rounded-xl leading-relaxed">
                                    {f.content}
                                </code>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MCQ Assessment */}
                <div className="glass p-12 rounded-[4rem] border-slate-200/10 dark:border-white/5 bg-primary/5">
                    <div className="flex items-center gap-6 mb-12">
                        <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary">
                            <HelpCircle className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter">Technical MCQ Prep</h2>
                    </div>
                    <div className="space-y-10">
                        {gateData.mcqs.slice(0, 3).map((mcq, i) => (
                            <div key={i} className="space-y-5">
                                <div className="flex gap-4">
                                    <span className="text-primary font-black italic">Q{i+1}.</span>
                                    <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-relaxed">{mcq.question}</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-4 ml-8">
                                    {mcq.options.map((opt, idx) => (
                                        <div key={idx} className="px-5 py-3 rounded-2xl bg-white/40 dark:bg-white/10 border border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                                            {String.fromCharCode(65 + idx)}. {opt}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button 
                            onClick={() => window.location.href = '#/mock-tests'}
                            className="w-full py-6 bg-slate-900 dark:bg-white/5 hover:bg-primary hover:text-white text-slate-600 dark:text-slate-300 rounded-[2.5rem] border border-white/10 font-black uppercase tracking-[0.4em] text-[10px] transition-all shadow-2xl flex items-center justify-center gap-4 group"
                        >
                            Launch Full Simulator <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Archives Section */}
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex items-center gap-6 mb-12">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter">Reference Library</h2>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1">Standard Textbooks & Technical Papers</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {gateData.library.map((p, i) => (
                        <div key={i} className="glass p-10 rounded-[3rem] border-slate-200/20 dark:border-white/5 bg-white/40 dark:bg-white/5 backdrop-blur-3xl flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-all h-full">
                            <div className="flex items-center gap-6">
                                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 font-black italic text-xs shadow-xl">{p.subject}</div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-800 dark:text-white uppercase tracking-tight">{p.book}</span>
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{p.author}</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/20 dark:border-white/5 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Fallback icon
const Globe = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);

export default GATE;
