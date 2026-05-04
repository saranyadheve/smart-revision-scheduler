import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  BookOpen, 
  GraduationCap, 
  ChevronDown, 
  Calendar, 
  CheckCircle2, 
  Lightbulb,
  ArrowRight,
  Library,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { upscData } from '../data/upscStructuredData';

const SectionHeader = ({ title, desc, icon: Icon }) => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-[16px] bg-[#EAF0EA] flex items-center justify-center text-[#588157]">
        <Icon size={24} />
      </div>
      <div>
        <h2 className="text-[24px] font-semibold text-[#2F3E46] font-poppins">{title}</h2>
        <p className="text-[14px] text-[#6B7A7A]">{desc}</p>
      </div>
    </div>
  </div>
);

const SyllabusCard = ({ subject }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-[16px] border border-[#DAD7CD]/30 overflow-hidden mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#A3B18A]/30 transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-[#F4F7F5]/30 transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-8 rounded-full bg-[#A3B18A]/30" />
          <span className="text-[15px] font-semibold text-[#2F3E46]">{subject.title}</span>
        </div>
        <ChevronDown size={18} className={`text-[#6B7A7A] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-[#F4F7F5]/20">
            <div className="p-4 pt-0 space-y-2">
              {subject.topics.map((topic, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-[10px] bg-white/60 border border-[#DAD7CD]/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A3B18A] mt-1.5" />
                  <div>
                    <p className="text-[13px] font-medium text-[#2F3E46]">{topic.name}</p>
                    {topic.detail && <p className="text-[11px] text-[#6B7A7A] mt-0.5">{topic.detail}</p>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StudyPlanGenerator = ({ activeTab }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState(null);
  const [days, setDays] = useState(30);

  const getStageLabel = () => {
    if (activeTab === 'prelims') return 'Prelims';
    if (activeTab === 'mains') return 'Mains';
    return 'Interview';
  };

  const generatePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let generatedTasks = [];
      const d = parseInt(days) || 30;
      if (activeTab === 'prelims') {
        generatedTasks = [
          { time: '07:00 AM', task: 'Rapid GS Revision' },
          { time: '10:00 AM', task: 'Mock Test' }
        ];
      } else {
        generatedTasks = [
          { time: '08:00 AM', task: 'Answer Writing' }
        ];
      }
      setPlan(generatedTasks);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="bg-white p-8 rounded-[32px] border border-[#A3B18A]/20 shadow-[0_8px_32px_rgba(163,177,138,0.08)] mb-10 overflow-hidden relative group">
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="text-[20px] font-semibold text-[#2F3E46] mb-1 font-poppins flex items-center gap-2">
              <Calendar size={22} className="text-[#A3B18A]" />
              {getStageLabel()} Study Plan Generator
            </h3>
            <p className="text-[13px] text-[#6B7A7A]">Schedule tailored to your timeline.</p>
          </div>
          {!plan && (
            <div className="flex items-center gap-3">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-[#6B7A7A]">Days:</label>
              <input type="number" value={days} onChange={(e) => setDays(e.target.value)} className="w-20 bg-[#F4F7F5] border border-[#DAD7CD]/30 rounded-xl py-2 px-3 focus:outline-none" />
            </div>
          )}
        </div>
        {plan ? (
          <div className="space-y-3 mb-8">
            {plan.map((item, i) => (
              <div key={i} className="flex items-center gap-5 p-4 rounded-2xl bg-[#F4F7F5]/50 border border-[#DAD7CD]/20">
                <div className="w-24 text-[11px] font-bold text-[#588157] bg-white py-1 px-3 rounded-lg border shadow-sm">
                  {item.time}
                </div>
                <span className="text-[14px] font-medium text-[#2F3E46]">{item.task}</span>
              </div>
            ))}
          </div>
        ) : (
          <button onClick={generatePlan} disabled={isGenerating} className="w-full bg-[#588157] text-white py-4 rounded-2xl font-bold uppercase tracking-widest">
            {isGenerating ? "Analyzing..." : `Generate ${getStageLabel()} Plan`}
          </button>
        )}
      </div>
    </div>
  );
};

const UPSC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('prelims');
  const currentData = upscData[activeTab];

  return (
    <div className="p-6 md:p-10 pt-24 min-h-screen bg-[#F4F7F5]">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
             <Target size={20} className="text-[#A3B18A]" />
             <span className="text-[12px] font-semibold text-[#588157] uppercase tracking-widest">Advanced Curriculum</span>
          </div>
          <h1 className="text-[36px] font-semibold text-[#2F3E46] font-poppins">UPSC Master <span className="text-[#A3B18A]">Guide.</span></h1>
        </header>

        <div className="flex items-center gap-2 mb-12 bg-[#DAD7CD]/20 p-1.5 rounded-[16px] w-fit">
          {[
            { id: 'prelims', label: 'Prelims', icon: Target },
            { id: 'mains', label: 'Mains', icon: BookOpen },
            { id: 'interview', label: 'Interview', icon: GraduationCap }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-8 py-3 rounded-[12px] text-[14px] font-medium transition-all ${activeTab === tab.id ? 'bg-white text-[#588157] shadow-sm' : 'text-[#6B7A7A] hover:text-[#2F3E46]'}`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <SectionHeader title={currentData.title} desc={currentData.description} icon={activeTab === 'prelims' ? Target : (activeTab === 'mains' ? BookOpen : GraduationCap)} />
            <StudyPlanGenerator activeTab={activeTab} />
            <div className="mb-12">
              <h3 className="text-[18px] font-semibold text-[#2F3E46] mb-6 font-poppins">Deep-Dive Syllabus</h3>
              {activeTab === 'interview' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentData.areas.map((area, i) => (
                    <div key={i} className="bg-white p-5 rounded-[16px] border border-[#DAD7CD]/30">
                      <h4 className="text-[16px] font-semibold text-[#2F3E46] mb-2">{area.title}</h4>
                      <p className="text-[13px] text-[#6B7A7A] mb-4">{area.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                currentData.subjects.map((sub, i) => <SyllabusCard key={i} subject={sub} />)
              )}
            </div>
            <div className="bg-[#588157] p-8 rounded-[20px] text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-[11px] font-semibold uppercase tracking-widest opacity-80 mb-2">Ready to test?</p>
                <h3 className="text-[22px] font-semibold font-poppins">UPSC Practice Session</h3>
              </div>
              <button onClick={() => navigate('/practice')} className="px-8 py-3.5 bg-white text-[#588157] rounded-[12px] font-semibold shadow-xl z-10 relative">Launch Session</button>
              <Target className="absolute -bottom-8 -right-8 w-48 h-48 opacity-[0.08]" />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <section className="bg-white p-6 rounded-[20px] border border-[#DAD7CD]/30">
              <h3 className="text-[18px] font-semibold text-[#2F3E46] mb-6 font-poppins flex items-center gap-3">
                <Library size={18} className="text-[#A3B18A]" /> Recommended
              </h3>
              <div className="space-y-4">
                {upscData.books.map((book, i) => (
                  <div key={i}>
                    <p className="text-[10px] font-bold text-[#A3B18A] uppercase tracking-widest">{book.subject}</p>
                    <h4 className="text-[13px] font-semibold text-[#2F3E46]">{book.title}</h4>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="bg-white p-10 rounded-[40px] border border-[#DAD7CD]/30 shadow-sm hover:shadow-xl transition-all cursor-pointer group" onClick={() => navigate('/notes/upsc')}>
               <div className="w-16 h-16 rounded-2xl bg-[#F4F7F5] flex items-center justify-center text-[#588157] mb-8 group-hover:bg-[#588157] group-hover:text-white transition-all">
                  <FileText size={32} />
               </div>
               <h3 className="text-[22px] font-bold text-[#2F3E46] mb-3">Notes & PYQ Archive</h3>
               <p className="text-[#6B7A7A] leading-relaxed">Access full study material and historical question papers.</p>
               <div className="mt-8 flex items-center gap-2 text-[12px] font-black text-[#588157] uppercase tracking-widest">
                  Open Archive <ArrowRight size={14} />
               </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UPSC;
