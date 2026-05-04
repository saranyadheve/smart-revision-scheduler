import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Calculator, 
  Brain, 
  MessageSquare, 
  BarChart, 
  HelpCircle,
  Lightbulb,
  ChevronRight,
  Activity,
  Target
} from 'lucide-react';
import VisualEngine from '../components/VisualEngine';

  const AptitudeCard = ({ id, title, explanation, topics, icon: Icon }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-[24px] border border-[#DAD7CD]/30 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_24px_rgba(163,177,138,0.12)] transition-all flex flex-col group h-full"
    >
      <div className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center bg-[#F4F7F5] text-[#A3B18A] group-hover:bg-[#A3B18A] group-hover:text-white transition-colors">
        <Icon size={24} />
      </div>
      <h3 className="text-[20px] font-semibold text-[#2F3E46] font-poppins mb-3 tracking-tight">{title}</h3>
      <p className="text-[13px] text-[#6B7A7A] mb-8 leading-relaxed font-inter">{explanation}</p>
      
      <div className="space-y-3 mt-auto">
          {topics.map((t, i) => (
              <div 
                key={i} 
                className="p-3.5 rounded-xl bg-[#F4F7F5]/50 border border-[#DAD7CD]/20 hover:border-[#A3B18A]/30 hover:bg-white transition-all flex items-center justify-between cursor-pointer group/item shadow-sm"
                onClick={() => navigate(`/aptitude/practice/${id}/${t.id || t.name.toLowerCase().replace(/ /g, '-')}`)}
              >
                  <span className="text-[13px] text-[#2F3E46] font-medium">{t.name}</span>
                  <ChevronRight size={14} className="text-[#A3B18A] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
              </div>
          ))}
      </div>
    </motion.div>
  );
};

const Aptitude = () => {
    const navigate = useNavigate();
    const sections = [
        {
          id: 'quantitative-aptitude',
          title: 'Quantitative Aptitude',
          explanation: 'Master numbers, formulas, and high-speed calculations for analytical dominance.',
          topics: [
            { name: 'Percentages', id: 'percentages' },
            { name: 'Ratio', id: 'ratio' },
            { name: 'Profit & Loss', id: 'profit-and-loss' },
            { name: 'Time & Work', id: 'time-and-work' }
          ],
          icon: Calculator,
        },
        {
          id: 'logical-reasoning',
          title: 'Logical Reasoning',
          explanation: 'Unravel complex patterns, puzzles, and structural arguments to build mental agility.',
          topics: [
            { name: 'Number Series', id: 'number-series' }, 
            { name: 'Blood Relations', id: 'blood-relations' }, 
            { name: 'Coding-Decoding', id: 'coding-decoding' }, 
            { name: 'Direction Sense', id: 'direction-sense' }
          ],
          icon: Brain,
        },
        {
          id: 'verbal-ability',
          title: 'Verbal Ability',
          explanation: 'Command language and comprehension to decode textual information swiftly.',
          topics: [
            { name: 'Synonyms', id: 'synonyms' }, 
            { name: 'Antonyms', id: 'antonyms' }, 
            { name: 'Error Spotting', id: 'error-spotting' }, 
            { name: 'Sentence Correction', id: 'sentence-correction' }
          ],
          icon: MessageSquare,
        },
        {
          id: 'data-interpretation',
          title: 'Data Interpretation',
          explanation: 'Extract absolute truth from raw charts, graphs, and structured datasets.',
          topics: [
            { name: 'Tables', id: 'tables' }, 
            { name: 'Pie Charts', id: 'pie-charts' }, 
            { name: 'Bar Graphs', id: 'bar-graphs' }, 
            { name: 'Caselets', id: 'caselets' }
          ],
          icon: BarChart,
        }
    ];

    return (
        <div className="relative w-full min-h-screen pt-24 pb-12 px-6 md:px-12 bg-[#F4F7F5] transition-colors">
            <VisualEngine />
            
            <header className="max-w-6xl mx-auto text-center relative z-10 mb-20 px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-block px-5 py-2 rounded-full bg-[#A3B18A]/10 border border-[#A3B18A]/20 text-[#588157] text-[10px] font-semibold uppercase tracking-[0.3em] mb-6"
                >
                    Cognitive Conditioning Hub
                </motion.div>
                <h1 className="text-5xl md:text-6xl font-semibold text-[#2F3E46] font-poppins tracking-tight leading-tight mb-4">
                    Aptitude <span className="text-[#A3B18A]">CORE.</span>
                </h1>
                <p className="text-[#6B7A7A] text-[13px] font-medium uppercase tracking-[0.4em]">Speed, Accuracy, Logic. Essential pillars of mastery.</p>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 mb-24">
                {sections.map((s) => (
                    <AptitudeCard key={s.title} {...s} />
                ))}
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 mb-24">
                {/* Speed Math Section */}
                <div className="lg:col-span-4 space-y-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white border border-[#DAD7CD]/30 rounded-2xl flex items-center justify-center text-[#588157] shadow-sm">
                            <Activity size={24} />
                        </div>
                        <h2 className="text-[22px] font-semibold text-[#2F3E46] font-poppins">Speed Drills</h2>
                    </div>

                    <div className="bg-white p-8 rounded-[32px] border border-[#DAD7CD]/30 shadow-sm space-y-4">
                        {[ {drill: "Square Roots < 100", target: "Under 2s"}, {drill: "1/x Percentages", target: "Instant"}, {drill: "2x2 Multiplication", target: "Under 5s"}].map((drill, i) => (
                            <div key={i} className="p-5 rounded-2xl bg-[#F4F7F5]/50 border border-[#DAD7CD]/20 hover:border-[#A3B18A]/30 hover:bg-white transition-all flex justify-between items-center group cursor-pointer shadow-sm">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-semibold text-[#A3B18A] uppercase tracking-widest mb-1">{drill.drill}</span>
                                    <span className="text-[16px] font-semibold text-[#2F3E46]">{drill.target}</span>
                                </div>
                                <div className="p-2.5 rounded-lg bg-[#A3B18A]/10 text-[#A3B18A] group-hover:bg-[#A3B18A] group-hover:text-white transition-colors">
                                    <Target size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Assessment Preview */}
                <div className="lg:col-span-8 space-y-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#588157] text-white rounded-2xl flex items-center justify-center shadow-lg">
                            <HelpCircle size={24} />
                        </div>
                        <h2 className="text-[22px] font-semibold text-[#2F3E46] font-poppins">Practice Assessment</h2>
                    </div>

                    <div className="bg-[#A3B18A]/5 p-12 rounded-[32px] border border-[#A3B18A]/20 h-full flex flex-col justify-center items-center text-center space-y-6 relative overflow-hidden group">
                        <Lightbulb size={48} className="text-[#A3B18A] mb-2 animate-pulse" />
                        <h3 className="text-[28px] font-semibold text-[#2F3E46] font-poppins">Ready to test your limits?</h3>
                        <p className="text-[#6B7A7A] max-w-md mx-auto text-[14px] leading-relaxed">
                            Dive into our timed aptitude simulator. Encounter real-world exam pressure combined with AI-driven analytics that identify your weakest links instantly.
                        </p>
                        
                        <button 
                            onClick={() => navigate('/practice')}
                            className="btn-primary"
                        >
                            Enter Arena <ChevronRight size={18} />
                        </button>
                        <Calculator className="absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.03] group-hover:scale-110 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aptitude;
