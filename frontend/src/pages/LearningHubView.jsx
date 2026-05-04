import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  ChevronRight, 
  Play, 
  Shield, 
  Cpu, 
  GraduationCap, 
  Globe,
  RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';
import VisualEngine from '../components/VisualEngine';
import axios from 'axios';

const LearningHubView = () => {
    const navigate = useNavigate();
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/learning/modules');
                setModules(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch modules", error);
                setLoading(false);
            }
        };
        fetchModules();
    }, []);

    const iconMap = {
        'Sparkles': Sparkles,
        'Shield': Shield,
        'Cpu': Cpu,
        'GraduationCap': GraduationCap
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F7F5]">
            <RefreshCw className="animate-spin text-[#A3B18A]" size={40} />
        </div>
    );

    return (
        <div className="relative w-full min-h-screen pt-24 pb-12 px-6 md:px-12 bg-[#F4F7F5] transition-all overflow-hidden selection:bg-[#A3B18A]/30">
            <VisualEngine />
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Hero Header */}
                <header className="mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-12"
                    >
                        <div className="max-w-2xl">
                             <div className="flex items-center gap-2 text-[10px] font-black text-[#A3B18A] uppercase tracking-[0.4em] mb-6 bg-white/40 px-5 py-2 rounded-full border border-[#DAD7CD]/30 w-fit backdrop-blur-md">
                                <Globe size={12} className="text-[#A3B18A]" /> Unified Learning Protocol
                            </div>
                            <h1 className="text-[48px] md:text-[64px] font-semibold text-[#2F3E46] font-poppins tracking-tighter leading-[0.9] mb-8">
                                Cognitive <span className="text-[#A3B18A]/60 italic font-medium">Syntesis</span> Hub.
                            </h1>
                            <p className="text-[#6B7A7A] text-[16px] leading-relaxed font-inter max-w-lg mb-10 opacity-80">
                                Transforming static syllabi into cinematic, bilingual sensory experiences. Select your academy to access tailor-made AI productions.
                            </p>
                            <div className="flex gap-4">
                                <button className="px-8 py-4 bg-[#2F3E46] text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl hover:bg-black transition-all flex items-center gap-3 border-b-4 border-black/30">
                                    <Play size={16} className="fill-white" /> Feature Tour
                                </button>
                                <button className="px-8 py-4 bg-white text-[#588157] border border-[#DAD7CD]/30 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-sm hover:shadow-md transition-all">
                                    Documentation
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-32 h-32 bg-white/40 rounded-[32px] border border-white/60 backdrop-blur-md shadow-sm" />
                            ))}
                        </div>
                    </motion.div>
                </header>

                {/* Module Catalog */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {modules.map((module, i) => {
                        const Icon = iconMap[module.icon] || Sparkles;
                        return (
                            <motion.div
                                key={module.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => navigate(`/learning-hub/module/${module.id}`)}
                                className="group relative bg-white p-10 rounded-[48px] border border-[#DAD7CD]/30 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer overflow-hidden"
                            >
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-16 h-16 bg-[#F4F7F5] rounded-3xl flex items-center justify-center text-[#A3B18A] mb-12 shadow-inner group-hover:bg-[#A3B18A] group-hover:text-white transition-all">
                                        <Icon size={32} />
                                    </div>
                                    <h3 className="text-[24px] font-bold text-[#2F3E46] font-poppins tracking-tight mb-4 group-hover:text-[#588157] transition-colors">{module.name}</h3>
                                    <p className="text-[13px] text-[#6B7A7A] leading-relaxed mb-auto opacity-70">
                                        {module.description}
                                    </p>
                                    <div className="mt-12 flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-[#A3B18A]">
                                        <span>Enter Academy</span>
                                        <ChevronRight size={18} className="translate-x-0 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                                
                                {/* Decor */}
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#F4F7F5]/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer Section */}
                <div className="mt-24 pt-12 border-t border-[#DAD7CD]/30 flex flex-col md:flex-row items-center justify-between gap-8 opacity-60">
                    <p className="text-[12px] font-medium text-[#6B7A7A] uppercase tracking-[0.2em]">Powered by Neural Engine 4.0 & Advanced TTS</p>
                    <div className="flex gap-8">
                        <span className="text-[12px] font-bold text-[#A3B18A]">UPSC Protocol</span>
                        <span className="text-[12px] font-bold text-[#A3B18A]">GATE Core</span>
                        <span className="text-[12px] font-bold text-[#A3B18A]">TNPSC Regional</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningHubView;
