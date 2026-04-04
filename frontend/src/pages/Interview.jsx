import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  Workflow, 
  Database, 
  Code2, 
  Layout, 
  Server, 
  Cloud,
  Layers,
  Search,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Brain,
  MessageSquare,
  Zap,
  Star,
  ArrowRight
} from 'lucide-react';
import VisualEngine from '../components/VisualEngine';
import interviewData from '../data/interviewData.json';

const DomainCard = ({ title, explanation, icon: Icon, color, active, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
    className={`p-10 rounded-[4rem] border-2 cursor-pointer transition-all flex flex-col gap-8 relative overflow-hidden group h-full ${
        active 
        ? 'bg-primary border-primary shadow-2xl shadow-primary/30' 
        : 'glass border-slate-200/20 dark:border-white/5 bg-white/40 dark:bg-white/5 hover:border-primary/40'
    }`}
  >
    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${color} blur-[100px] -mr-10 -mt-10 opacity-10 group-hover:opacity-40 transition-opacity`} />
    <div className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center text-white bg-gradient-to-br ${color} shadow-2xl transition-transform group-hover:scale-110 ${active ? 'bg-white text-primary' : ''}`}>
        <Icon className="w-9 h-9" />
    </div>
    <div className="flex-grow">
        <h3 className={`text-2xl font-black italic uppercase tracking-tighter mb-3 ${active ? 'text-white' : 'text-slate-800 dark:text-white'}`}>{title}</h3>
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${active ? 'text-white/70' : 'text-slate-500'}`}>{explanation}</p>
    </div>
    <div className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] transition-all ${active ? 'text-white' : 'text-primary opacity-0 group-hover:opacity-100'}`}>
        Analyze Pattern
        <ChevronRight className="w-4 h-4" />
    </div>
  </motion.div>
);

const Interview = () => {
    const [selectedDomain, setSelectedDomain] = useState('System Design');

    const iconMap = {
        'System Design': Layers,
        'Coding Strategy': Code2,
        'Cloud & Devops': Cloud,
        'Behavioral Intel': Brain
    };

    const colorMap = [
        'from-blue-500 to-indigo-500',
        'from-emerald-500 to-teal-500',
        'from-purple-500 to-pink-500',
        'from-orange-500 to-red-500'
    ];

    const activeDomainData = Object.values(interviewData.domains).find(d => d.title === selectedDomain);

    return (
        <div className="relative w-full min-h-screen pt-24 pb-12 px-6 md:px-12 bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
            <VisualEngine />
            
            <header className="max-w-7xl mx-auto text-center relative z-10 mb-24">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-block px-10 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-8"
                >
                    Strategic Career Engineering
                </motion.div>
                <h1 className="text-7xl md:text-9xl font-black text-slate-800 dark:text-white italic tracking-tighter uppercase leading-none mb-6">
                    IT <span className="text-primary italic">INTEL.</span>
                </h1>
                <p className="text-slate-500 font-bold uppercase tracking-[0.5em] text-[10px]">Cracking the code of elite technical placement.</p>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10 mb-24">
                {Object.values(interviewData.domains).map((d, i) => (
                    <DomainCard 
                        key={d.title} 
                        {...d} 
                        active={selectedDomain === d.title} 
                        onClick={() => setSelectedDomain(d.title)} 
                        icon={iconMap[d.title] || Zap}
                        color={colorMap[i % colorMap.length]}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 mb-24">
                {/* Details Section */}
                <div className="lg:col-span-8 space-y-12">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-xl">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter">Strategic Deep-Dive: {selectedDomain}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {(activeDomainData.concepts || activeDomainData.topics).map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass p-10 rounded-[3rem] border-slate-200/20 dark:border-white/5 bg-white/40 dark:bg-white/5 backdrop-blur-3xl group cursor-pointer border-2 border-transparent hover:border-primary/20 transition-all flex justify-between items-center h-full"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="p-3 rounded-2xl bg-primary/5 text-primary">
                                        <CheckCircle2 className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <span className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">{t}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-all" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Coding Patterns (Visible for DSA Pro) */}
                    {selectedDomain === 'Coding Strategy' && (
                        <div className="pt-12">
                            <div className="flex items-center gap-6 mb-12">
                                <Code2 className="w-8 h-8 text-emerald-500" />
                                <h3 className="text-3xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter">Execution Patterns</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {interviewData.patterns.map((p, i) => (
                                    <div key={i} className="p-8 rounded-[3rem] bg-slate-900/5 dark:bg-white/5 border border-white/5 hover:border-emerald-500/20 transition-all group">
                                        <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-2">{p.name}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-4">{p.use}</p>
                                        <div className="text-[9px] font-black text-slate-400 italic">E.g. {p.example}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Simulation & Tips */}
                <div className="lg:col-span-4 flex flex-col gap-10">
                    <div className="glass p-12 rounded-[4rem] border-slate-200/10 dark:border-white/5 bg-primary/5 h-full">
                        <div className="flex items-center gap-6 mb-12">
                            <Star className="w-8 h-8 text-amber-500" />
                            <h2 className="text-3xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter">Round Strategy</h2>
                        </div>
                        <div className="space-y-10">
                            {interviewData.mcqs.slice(0, 3).map((mcq, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex gap-4">
                                        <span className="text-primary font-black italic text-sm">IQ.{i+1}</span>
                                        <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-relaxed">{mcq.question}</h4>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3 ml-8">
                                        {mcq.options.slice(0, 2).map((opt, idx) => (
                                            <div key={idx} className="px-5 py-3 rounded-2xl bg-white/40 dark:bg-white/10 border border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                                                {opt}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-6 bg-slate-700 dark:bg-white/5 hover:bg-amber-500 hover:text-white text-slate-300 rounded-[2.5rem] border border-white/10 font-black uppercase tracking-[0.4em] text-[10px] transition-all shadow-xl flex items-center justify-center gap-4">
                                Recruit Simulator <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Behavioral Tips */}
                    <div className="glass p-12 rounded-[4rem] border-slate-200/10 dark:border-white/5">
                        <h3 className="text-xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter mb-8 flex items-center gap-4">
                            <MessageSquare className="w-5 h-5 text-indigo-500" />
                            Soft Intel
                        </h3>
                        {interviewData.behavioral.map((b, i) => (
                            <div key={i} className="mb-6 last:mb-0">
                                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block mb-2">{b.scenario}</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium italic">{b.advice}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Interview;
