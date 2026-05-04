import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
  ArrowRight,
  Target,
  Sparkles,
  FileText,
  BookOpen
} from 'lucide-react';
import interviewData from '../data/interviewData.json';
import PreparationTrackLayout from '../components/PreparationTrackLayout';
import { pyqData } from '../data/pyqData';
import PYQViewer from '../components/PYQViewer';

const DomainCard = ({ title, explanation, icon: Icon, active, onClick, masterUrl }) => (
  <motion.div
    whileHover={{ y: -5 }}
    onClick={onClick}
    className={`p-10 rounded-[32px] border cursor-pointer transition-all flex flex-col gap-8 relative overflow-hidden group h-full ${
        active 
        ? 'bg-[#588157] border-[#588157] text-white shadow-xl shadow-[#588157]/20' 
        : 'bg-white border-[#DAD7CD]/30 text-[#2F3E46] hover:border-[#A3B18A]/50 hover:shadow-lg'
    }`}
  >
    <div className="flex justify-between items-start">
        <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center transition-transform group-hover:scale-110 ${active ? 'bg-white/20 text-white' : 'bg-[#F4F7F5] text-[#A3B18A]'}`}>
            <Icon size={32} />
        </div>
        <motion.a
            href={masterUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-xl border transition-all ${
                active 
                ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                : 'bg-white border-[#DAD7CD]/20 text-[#A3B18A] hover:text-[#588157] hover:border-[#588157]/30 shadow-sm'
            }`}
        >
            <ExternalLink size={20} />
        </motion.a>
    </div>
    <div className="flex-grow">
        <h3 className={`text-[22px] font-semibold tracking-tight mb-2 font-poppins ${active ? 'text-white' : 'text-[#2F3E46]'}`}>{title}</h3>
        <p className={`text-[13px] font-medium leading-relaxed ${active ? 'text-white/80' : 'text-[#6B7A7A]'}`}>{explanation}</p>
    </div>
    <div className={`flex items-center gap-2 text-[12px] font-semibold uppercase tracking-widest transition-all ${active ? 'text-white' : 'text-[#A3B18A] opacity-0 group-hover:opacity-100'}`}>
        Analyze Pattern
        <ChevronRight size={16} />
    </div>
  </motion.div>
);

const InterviewResources = () => {
    const navigate = useNavigate();
    const [selectedDomain, setSelectedDomain] = useState('System Design');

    const iconMap = {
        'System Design': Layers,
        'Coding Strategy': Code2,
        'Cloud & Devops': Cloud,
        'Behavioral Intel': Brain
    };

    const activeDomainData = Object.values(interviewData.domains).find(d => d.title === selectedDomain);

    return (
        <div className="space-y-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {Object.values(interviewData.domains).map((d) => (
                    <DomainCard 
                        key={d.title} 
                        {...d} 
                        active={selectedDomain === d.title} 
                        onClick={() => setSelectedDomain(d.title)} 
                        icon={iconMap[d.title] || Zap}
                        masterUrl={d.masterUrl}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
                <div className="lg:col-span-8 space-y-12">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white border border-[#DAD7CD]/30 rounded-2xl flex items-center justify-center text-[#588157] shadow-sm">
                            <TrendingUp size={24} />
                        </div>
                        <h2 className="text-[24px] font-semibold text-[#2F3E46] font-poppins">Strategic Deep-Dive: {selectedDomain}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {(activeDomainData.concepts || activeDomainData.topics).map((t, i) => {
                            const topicName = typeof t === 'string' ? t : t.name;
                            const topicUrl = typeof t === 'string' ? '#' : t.url;
                            
                            return (
                                <motion.a
                                    key={i}
                                    href={topicUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ x: 5, backgroundColor: 'rgba(88, 129, 87, 0.05)' }}
                                    className="bg-white p-8 rounded-[24px] border border-[#DAD7CD]/30 hover:border-[#A3B18A]/40 transition-all flex justify-between items-center group shadow-sm cursor-pointer"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="p-3 rounded-xl bg-[#F4F7F5] text-[#A3B18A] border border-[#DAD7CD]/10 group-hover:bg-[#588157] group-hover:text-white transition-colors">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        <span className="text-[16px] font-medium text-[#2F3E46] transition-colors group-hover:text-[#588157]">{topicName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-[#A3B18A] opacity-0 group-hover:opacity-100 transition-all uppercase tracking-tighter">Learn More</span>
                                        <ChevronRight size={16} className="text-[#DAD7CD] group-hover:text-[#588157] group-hover:translate-x-1 transition-all" />
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>

                    {activeDomainData.externalLinks && (
                        <div className="pt-12 animation-fade-in">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 rounded-xl bg-[#588157]/10 text-[#588157]">
                                    <ExternalLink size={24} />
                                </div>
                                <h3 className="text-[24px] font-semibold text-[#2F3E46] font-poppins">External Knowledge Base</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {activeDomainData.externalLinks.map((link, i) => (
                                    <motion.a
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="p-6 rounded-[24px] bg-white border border-[#DAD7CD]/30 hover:border-[#588157]/40 hover:shadow-xl transition-all group flex flex-col gap-4"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="p-3 rounded-xl bg-[#F4F7F5] text-[#A3B18A] group-hover:bg-[#588157] group-hover:text-white transition-colors">
                                                <BookOpen size={20} />
                                            </div>
                                            <ExternalLink size={16} className="text-[#DAD7CD] group-hover:text-[#588157]" />
                                        </div>
                                        <div>
                                            <h4 className="text-[15px] font-semibold text-[#2F3E46] mb-1">{link.label}</h4>
                                            <p className="text-[12px] text-[#6B7A7A]">Access premium {selectedDomain} material.</p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedDomain === 'Coding Strategy' && (
                        <div className="pt-12 animation-fade-in">
                            <div className="flex items-center gap-4 mb-10">
                                <Code2 size={28} className="text-[#A3B18A]" />
                                <h3 className="text-[24px] font-semibold text-[#2F3E46] font-poppins">Execution Patterns</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {interviewData.patterns.map((p, i) => (
                                    <div key={i} className="p-8 rounded-[24px] bg-[#588157]/5 border border-[#588157]/10 hover:bg-white hover:shadow-md transition-all group">
                                        <h4 className="text-[11px] font-semibold text-[#588157] uppercase tracking-widest mb-3">{p.name}</h4>
                                        <p className="text-[14px] text-[#2F3E46] font-medium mb-4 leading-relaxed">{p.use}</p>
                                        <div className="text-[12px] text-[#6B7A7A] italic bg-[#F4F7F5] px-4 py-2 rounded-lg border border-[#DAD7CD]/20">E.g. {p.example}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-4 flex flex-col gap-10">
                    <div className="bg-white p-10 rounded-[32px] border border-[#DAD7CD]/30 shadow-sm space-y-10 relative overflow-hidden">
                        <div className="flex items-center gap-4 relative z-10">
                            <Star size={24} className="text-[#A3B18A] fill-[#A3B18A]/20" />
                            <h2 className="text-[20px] font-semibold text-[#2F3E46] font-poppins">Round Strategy</h2>
                        </div>
                        <div className="space-y-8 relative z-10">
                            {interviewData.mcqs.slice(0, 3).map((mcq, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex gap-4">
                                        <span className="text-[#A3B18A] font-bold text-[13px]">IQ.{i+1}</span>
                                        <h4 className="text-[13px] font-medium text-[#2F3E46] leading-relaxed font-poppins">{mcq.question}</h4>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2 ml-10">
                                        {mcq.options.slice(0, 2).map((opt, idx) => (
                                            <div key={idx} className="px-4 py-2.5 rounded-xl bg-[#F4F7F5] border border-[#DAD7CD]/20 text-[11px] font-medium text-[#6B7A7A]">
                                                {opt}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button 
                                onClick={() => navigate('/practice-tests/it-interview')}
                                className="w-full py-4 bg-[#588157] text-white rounded-xl font-semibold uppercase tracking-widest text-[11px] hover:bg-[#2F3E46] transition-all shadow-lg shadow-[#588157]/20 flex items-center justify-center gap-3"
                            >
                                Start Practice Session <ArrowRight size={16} />
                            </button>
                        </div>
                        <Brain size={120} className="absolute -bottom-10 -right-10 opacity-[0.03] text-[#A3B18A]" />
                    </div>

                    <div className="bg-[#A3B18A]/10 p-10 rounded-[32px] border border-[#A3B18A]/20">
                        <h3 className="text-[18px] font-semibold text-[#2F3E46] font-poppins mb-8 flex items-center gap-3">
                            <MessageSquare size={18} className="text-[#588157]" />
                            Soft Intel
                        </h3>
                        <div className="space-y-6">
                            {interviewData.behavioral.map((b, i) => (
                                <div key={i}>
                                    <span className="text-[10px] font-bold text-[#588157] uppercase tracking-[0.2em] block mb-2">{b.scenario}</span>
                                    <p className="text-[13px] text-[#6B7A7A] leading-relaxed italic border-l-2 border-[#A3B18A]/30 pl-4">{b.advice}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Interview = () => {
    const [activeTab, setActiveTab] = useState('resources');

    const tabs = [
        { id: 'resources', name: 'Archive Resources', icon: BookOpen },
        { id: 'pyq', name: 'PYQ Archives', icon: FileText },
    ];

    return (
        <PreparationTrackLayout
            title="IT"
            subtitle="Intel."
            description="Cracking the code of elite technical placement with strategic engineering."
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            headerBadge="Strategic Career Engineering"
        >

            
            {activeTab === 'resources' && <InterviewResources />}
            
            {activeTab === 'pyq' && (
                <div className="max-w-4xl mx-auto py-12">
                    <header className="mb-12 text-center">
                        <h2 className="text-[28px] font-bold text-[#2F3E46] font-poppins mb-2">Technical Interview Archives</h2>
                        <p className="text-[#6B7A7A]">Previous year aptitude papers and numerical ability samples from leading tech giants.</p>
                    </header>
                    <PYQViewer pyqs={pyqData.it} />
                </div>
            )}
        </PreparationTrackLayout>
    );
};

export default Interview;
