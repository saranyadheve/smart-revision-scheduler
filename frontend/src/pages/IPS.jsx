import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Activity, 
  Scale, 
  ArrowRight,
  Gavel,
  ShieldCheck,
  HelpCircle,
  Award,
  ChevronRight,
  CheckCircle2,
  Zap
} from 'lucide-react';
import VisualEngine from '../components/VisualEngine';
import ipsData from '../data/ipsData.json';

const LawSection = ({ title, explanation, topics, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="bg-white p-8 rounded-[24px] border border-[#DAD7CD]/30 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_24px_rgba(163,177,138,0.12)] transition-all flex flex-col h-full group"
  >
    <div className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center bg-[#F4F7F5] text-[#588157] group-hover:bg-[#588157] group-hover:text-white transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="text-[20px] font-semibold text-[#2F3E46] font-poppins mb-3 tracking-tight">{title}</h3>
    <p className="text-[13px] text-[#6B7A7A] mb-8 leading-relaxed font-inter">{explanation}</p>
    <div className="space-y-3 mt-auto">
        {topics.map((t, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-[#F4F7F5]/50 border border-[#DAD7CD]/20 flex items-center justify-between group/item">
                <span className="text-[13px] text-[#2F3E46] font-medium">{t}</span>
                <CheckCircle2 size={14} className="text-[#A3B18A] opacity-0 group-hover/item:opacity-100 transition-opacity" />
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

    return (
        <div className="relative w-full min-h-screen pt-24 pb-12 px-6 md:px-12 bg-[#F4F7F5] transition-colors">
            <VisualEngine />
            
            <header className="max-w-6xl mx-auto text-center relative z-10 mb-20 px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-block px-5 py-2 rounded-full bg-[#588157]/10 border border-[#588157]/20 text-[#588157] text-[10px] font-semibold uppercase tracking-[0.3em] mb-6"
                >
                    Internal Security Excellence
                </motion.div>
                <h1 className="text-5xl md:text-6xl font-semibold text-[#2F3E46] font-poppins tracking-tight leading-tight mb-4">
                    IPS <span className="text-[#588157]">CORE.</span>
                </h1>
                <p className="text-[#6B7A7A] text-[13px] font-medium uppercase tracking-[0.4em]">
                    Duty, Honor, Country. The blueprint for leadership.
                </p>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 mb-24">
                {Object.values(ipsData.subjects).map((s) => (
                    <LawSection 
                        key={s.title} 
                        {...s} 
                        icon={iconMap[s.title] || Scale} 
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 mb-24">
                {/* Physical Readiness */}
                <div className="lg:col-span-4 space-y-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white border border-[#DAD7CD]/30 rounded-2xl flex items-center justify-center text-[#588157] shadow-sm">
                            <Activity size={24} />
                        </div>
                        <h2 className="text-[22px] font-semibold text-[#2F3E46] font-poppins">Physical Drill</h2>
                    </div>

                    <div className="bg-white p-8 rounded-[32px] border border-[#DAD7CD]/30 shadow-sm space-y-4">
                        {ipsData.fitness.map((drill, i) => (
                            <div key={i} className="p-5 rounded-2xl bg-[#F4F7F5]/50 border border-[#DAD7CD]/20 hover:border-[#A3B18A]/30 hover:bg-white transition-all flex justify-between items-center group shadow-sm">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-semibold text-[#A3B18A] uppercase tracking-widest mb-1">{drill.drill}</span>
                                    <span className="text-[16px] font-semibold text-[#2F3E46]">{drill.target}</span>
                                </div>
                                <div className="p-2.5 rounded-lg bg-[#A3B18A]/10 text-[#A3B18A] group-hover:bg-[#A3B18A] group-hover:text-white transition-colors">
                                    <Zap size={16} />
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-4 bg-[#F4F7F5] border border-[#DAD7CD]/30 hover:bg-[#588157] hover:text-white text-[12px] font-semibold uppercase tracking-wider rounded-xl transition-all mt-4">
                            Log Training Session
                        </button>
                    </div>
                </div>

                {/* Case Assessment Preview */}
                <div className="lg:col-span-8 space-y-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#588157] text-white rounded-2xl flex items-center justify-center shadow-lg">
                            <HelpCircle size={24} />
                        </div>
                        <h2 className="text-[22px] font-semibold text-[#2F3E46] font-poppins">Case Assessment</h2>
                    </div>

                    <div className="bg-[#A3B18A]/5 p-12 rounded-[32px] border border-[#A3B18A]/20 h-full space-y-8 relative overflow-hidden group">
                        {ipsData.mcqs.slice(0,2).map((mcq, i) => (
                            <div key={i} className="space-y-4">
                                <div className="flex gap-4">
                                    <span className="w-8 h-8 rounded-lg bg-[#588157] text-white flex items-center justify-center font-semibold text-[13px] shadow-md">0{i+1}</span>
                                    <h4 className="text-[15px] font-medium text-[#2F3E46] leading-relaxed font-poppins">
                                        {mcq.question}
                                    </h4>
                                </div>
                                <div className="grid grid-cols-2 gap-3 ml-12">
                                    {mcq.options.map((opt, idx) => (
                                        <div key={idx} className="px-4 py-3 rounded-xl bg-white border border-[#DAD7CD]/50 text-[12px] font-medium text-[#6B7A7A] hover:border-[#A3B18A] cursor-pointer transition-all shadow-sm">
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button 
                            onClick={() => navigate('/practice')}
                            className="btn-primary"
                        >
                            Enter Practice Session <ChevronRight size={18} />
                        </button>
                        <Shield size={180} className="absolute -bottom-20 -right-20 opacity-[0.03] text-[#588157] group-hover:scale-110 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IPS;
