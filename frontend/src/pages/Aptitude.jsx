import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Calculator, 
  Brain, 
  MessageSquare, 
  BarChart, 
  PieChart, 
  LineChart, 
  HelpCircle,
  Lightbulb,
  ChevronRight,
  TrendingUp,
  Activity,
  Target
} from 'lucide-react';
import VisualEngine from '../components/VisualEngine';

const AptitudeCard = ({ title, explanation, topics, color, icon: Icon }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="glass rounded-[3rem] p-10 border-slate-200/20 dark:border-white/5 relative overflow-hidden group hover:scale-[1.02] transition-all shadow-2xl bg-white/40 dark:bg-white/5 backdrop-blur-3xl h-full border-2 border-transparent hover:border-primary/20 flex flex-col"
    >
      <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${color} blur-[100px] -mr-10 -mt-10 opacity-20`} />
      <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-4 flex items-center gap-4 italic uppercase tracking-tighter">
          <Icon className="w-7 h-7 text-primary" />
          {title}
      </h3>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8 leading-relaxed flex-grow">{explanation}</p>
      <div className="space-y-4 relative z-10">
          {topics.map((t, i) => (
              <div 
                key={i} 
                className="p-4 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/10 dark:border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all flex items-center justify-between cursor-pointer group/item"
                onClick={() => navigate(`/courses/aptitude/${t.id || t.name.toLowerCase().replace(/ /g, '-')}`)}
              >
                  <span className="text-xs text-slate-700 dark:text-slate-200 font-bold italic">{t.name}</span>
                  <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
              </div>
          ))}
      </div>
    </motion.div>
  );
};

const Aptitude = () => {
    const sections = [
        {
          title: 'Quantitative Aptitude',
          explanation: 'Master numbers, formulas, and high-speed calculations for analytical dominance.',
          topics: [
            { name: 'Percentages', id: 'percentages' },
            { name: 'Ratio', id: 'ratio' },
            { name: 'Profit & Loss', id: 'profit-and-loss' },
            { name: 'Time & Work', id: 'time-and-work' },
            { name: 'Time Speed Distance', id: 'time-speed-distance' }
          ],
          icon: Calculator,
          color: 'from-blue-500 to-indigo-500'
        },
        {
          title: 'Logical Reasoning',
          explanation: 'Unravel complex patterns, puzzles, and structural arguments to build mental agility.',
          topics: [{ name: 'Syllogisms & Logic'}, { name: 'Blood Relations'}, { name: 'Seating Arrangements'}, { name: 'Data Sufficiency'}],
          icon: Brain,
          color: 'from-emerald-500 to-teal-500'
        },
        {
          title: 'Verbal Ability',
          explanation: 'Command language and comprehension to decode textual information swiftly.',
          topics: [{ name: 'Reading Comprehension'}, { name: 'Sentence Correction'}, { name: 'Para Jumbles'}, { name: 'Vocabulary & Analogies'}],
          icon: MessageSquare,
          color: 'from-purple-500 to-pink-500'
        },
        {
          title: 'Data Interpretation',
          explanation: 'Extract absolute truth from raw charts, graphs, and structured datasets.',
          topics: [{ name: 'Bar Graphs & Pie Charts'}, { name: 'Line Graphs'}, { name: 'Tabular Data'}, { name: 'Logical DI Sets'}],
          icon: BarChart,
          color: 'from-orange-500 to-red-500'
        }
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
                    Cognitive Conditioning Hub
                </motion.div>
                <h1 className="text-7xl md:text-9xl font-black text-slate-800 dark:text-white tracking-tighter uppercase italic leading-none mb-6">
                    Aptitude <span className="text-primary italic">CORE.</span>
                </h1>
                <p className="text-slate-500 font-bold uppercase tracking-[0.5em] text-[10px]">
                    Speed, Accuracy, Logic. The fundamental building blocks of all exams.
                </p>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 relative z-10 mb-20">
                {sections.map((s, i) => (
                    <AptitudeCard key={s.title} {...s} />
                ))}
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 mb-24">
                {/* Speed Math Section */}
                <div className="lg:col-span-4 space-y-12">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-500">
                            <Activity className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter text-shadow">Speed Drills</h2>
                    </div>

                    <div className="glass rounded-[3.5rem] p-10 border-slate-200/10 dark:border-white/5 bg-slate-900/5 dark:bg-white/5 backdrop-blur-3xl space-y-8 relative overflow-hidden h-full">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                        {[ {drill: "Square Roots < 100", target: "Under 2s"}, {drill: "1/x Percentages", target: "Instant"}, {drill: "2x2 Multiplication", target: "Under 5s"}].map((drill, i) => (
                            <div key={i} className="p-6 rounded-[2rem] bg-white/40 dark:bg-white/5 border border-white/5 hover:border-emerald-500/20 transition-all flex justify-between items-center group cursor-pointer">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">{drill.drill}</span>
                                    <span className="text-lg font-black text-slate-800 dark:text-white italic uppercase tracking-tighter">{drill.target}</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <Target className="w-4 h-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Assessment Preview */}
                <div className="lg:col-span-8 space-y-12">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-xl">
                            <HelpCircle className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter">Mini-Assessment</h2>
                    </div>

                    <div className="glass rounded-[3.5rem] p-12 border-slate-200/10 dark:border-white/5 bg-primary/5 h-full flex flex-col justify-center items-center text-center space-y-8">
                        <Lightbulb className="w-16 h-16 text-primary mb-4 animate-pulse" />
                        <h3 className="text-4xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter">Ready to test your limits?</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
                            Dive into our timed aptitude simulator. Encounter real-world exam pressure combined with AI-driven analytics that identify your weakest links instantly.
                        </p>
                        
                        <button 
                            onClick={() => navigate('/mock-tests')}
                            className="mt-8 px-12 py-6 bg-primary text-white rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-4"
                        >
                            Enter Arena <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aptitude;
