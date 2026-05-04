import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import VisualEngine from '../components/VisualEngine';

const PlanLauncher = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        track: '',
        subtype: '',
        totalDays: '',
        dailyHours: '4',
        level: 'Intermediate'
    });

    const tracks = [
        { id: 'UPSC', icon: GraduationCap, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { id: 'TNPSC', icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { id: 'GATE', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
        { id: 'Interview', icon: Target, color: 'text-blue-500', bg: 'bg-blue-50' }
    ];

    const subtypes = {
        UPSC: ['Prelims', 'Mains', 'Interview'],
        TNPSC: ['Group 1', 'Group 2 & 2A', 'Group 4'],
        GATE: ['CSE (Computer Science)', 'Other'],
        Interview: ['Frontend', 'Backend', 'Full Stack']
    };

    const levels = ['Beginner', 'Intermediate', 'Advanced'];

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const generatePlan = () => {
        // Logic to generate and save plan will be handled in PlanDashboard or via helper
        localStorage.setItem('sr_plan_config', JSON.stringify(formData));
        navigate('/notes/plan-generator/dashboard');
    };

    return (
        <div className="p-6 md:p-10 pt-24 min-h-screen bg-[#F4F7F5] flex items-center justify-center font-poppins relative overflow-hidden">
            <VisualEngine />
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full bg-white rounded-[48px] shadow-2xl border border-[#DAD7CD]/30 overflow-hidden relative z-10"
            >
                {/* Stepper Header */}
                <div className="bg-[#2F3E46] p-10 text-white relative">
                    <Sparkles className="absolute top-8 right-8 text-[#A3B18A] opacity-20" size={60} />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-[#A3B18A]">Step {step} of 4</span>
                        </div>
                        <h1 className="text-[28px] font-bold">Plan Your Victory.</h1>
                        <p className="text-[#A3B18A] text-[14px]">Let's build a day-by-day roadmap tailored to your goals.</p>
                    </div>
                </div>

                <div className="p-10">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <label className="text-[12px] font-black uppercase tracking-[0.2em] text-[#6B7A7A] mb-6 block">Select Examination Track</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {tracks.map((t) => (
                                        <div 
                                            key={t.id}
                                            onClick={() => { setFormData({...formData, track: t.id}); handleNext(); }}
                                            className={`p-8 rounded-[32px] border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-4 ${formData.track === t.id ? 'border-[#588157] bg-[#F4F7F5]' : 'border-[#F4F7F5] hover:border-[#DAD7CD]'}`}
                                        >
                                            <div className={`p-4 rounded-2xl ${t.bg} ${t.color}`}>
                                                <t.icon size={24} />
                                            </div>
                                            <span className="font-bold text-[#2F3E46]">{t.id}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <label className="text-[12px] font-black uppercase tracking-[0.2em] text-[#6B7A7A] mb-6 block">Refine Sub-Track</label>
                                <div className="space-y-3">
                                    {subtypes[formData.track]?.map((s) => (
                                        <div 
                                            key={s}
                                            onClick={() => { setFormData({...formData, subtype: s}); handleNext(); }}
                                            className="p-5 rounded-[24px] bg-[#F4F7F5] hover:bg-[#588157] hover:text-white cursor-pointer transition-all flex items-center justify-between font-bold"
                                        >
                                            <span>{s}</span>
                                            <ChevronRight size={18} />
                                        </div>
                                    ))}
                                </div>
                                <button onClick={handleBack} className="mt-8 text-[12px] font-bold text-[#6B7A7A] flex items-center gap-2">
                                    <ChevronLeft size={16} /> Back
                                </button>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <label className="text-[12px] font-black uppercase tracking-[0.2em] text-[#6B7A7A] mb-6 block">Time Horizon</label>
                                <div className="space-y-6">
                                    <div>
                                        <span className="text-[13px] font-bold text-[#2F3E46] mb-3 block">Total Days for Preparation</span>
                                        <input 
                                            type="number" 
                                            min="1"
                                            placeholder="e.g. 30"
                                            className="w-full bg-[#F4F7F5] border-transparent p-5 rounded-2xl outline-none focus:ring-2 focus:ring-[#588157]/20 font-bold !text-[#2F3E46]"
                                            onChange={(e) => setFormData({...formData, totalDays: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <span className="text-[13px] font-bold text-[#2F3E46] mb-3 block">Daily Hours (Estimated)</span>
                                        <div className="flex gap-2">
                                            {['2', '4', '6', '8+'].map(h => (
                                                <button 
                                                    key={h}
                                                    onClick={() => setFormData({...formData, dailyHours: h})}
                                                    className={`flex-grow py-4 rounded-xl font-bold transition-all ${formData.dailyHours === h ? 'bg-[#588157] text-white' : 'bg-[#F4F7F5] text-[#6B7A7A]'}`}
                                                >
                                                    {h}h
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-10">
                                    <button onClick={handleBack} className="text-[12px] font-bold text-[#6B7A7A] flex items-center gap-2">
                                        <ChevronLeft size={16} /> Back
                                    </button>
                                    <button 
                                        disabled={!formData.totalDays || parseInt(formData.totalDays) <= 0}
                                        onClick={handleNext}
                                        className="bg-[#588157] text-white disabled:opacity-50 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-[#588157]/20"
                                    >
                                        Next Component <ArrowRight size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <label className="text-[12px] font-black uppercase tracking-[0.2em] text-[#6B7A7A] mb-6 block">Current Proficiency</label>
                                <div className="space-y-4">
                                    {levels.map((l) => (
                                        <div 
                                            key={l}
                                            onClick={() => setFormData({...formData, level: l})}
                                            className={`p-6 rounded-[28px] border-2 cursor-pointer transition-all flex items-center gap-4 ${formData.level === l ? 'border-[#588157] bg-[#F4F7F5]' : 'border-transparent bg-[#F4F7F5]/50'}`}
                                        >
                                            <div className={`p-2 rounded-lg ${formData.level === l ? 'bg-[#588157] text-white' : 'bg-white text-[#DAD7CD]'}`}>
                                                <TrendingUp size={18} />
                                            </div>
                                            <span className="font-bold text-[#2F3E46]">{l}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-10">
                                    <button onClick={handleBack} className="text-[12px] font-bold text-[#6B7A7A] flex items-center gap-2">
                                        <ChevronLeft size={16} /> Back
                                    </button>
                                    <button 
                                        onClick={generatePlan}
                                        className="bg-[#2F3E46] text-white px-10 py-5 rounded-3xl font-bold flex items-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all"
                                    >
                                        <CheckCircle2 size={24} className="text-[#A3B18A]" /> Generate My Plan
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default PlanLauncher;
