import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  ArrowLeft,
  Sparkles,
  Zap,
  BookOpen,
  PieChart as PieIcon,
  BarChart,
  Clock,
  ChevronRight,
  TrendingUp,
  Download,
  Target
} from 'lucide-react';
import VisualEngine from '../components/VisualEngine';

const PlanDashboard = () => {
    const navigate = useNavigate();
    const [plan, setPlan] = useState([]);
    const [config, setConfig] = useState(null);
    const [completedDays, setCompletedDays] = useState(() => {
        const saved = localStorage.getItem('sr_completed_days');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        const savedConfig = localStorage.getItem('sr_plan_config');
        if (savedConfig) {
            const parsedConfig = JSON.parse(savedConfig);
            setConfig(parsedConfig);
            generatePlan(parsedConfig);
        } else {
            navigate('/notes/plan-generator/launch');
        }
    }, [navigate]);

    const generatePlan = (cfg) => {
        const totalDays = parseInt(cfg.totalDays);
        if (isNaN(totalDays) || totalDays <= 0) return;

        const learningDays = Math.floor(totalDays * 0.7);
        const revisionDays = Math.floor(totalDays * 0.2);
        const testDays = totalDays - learningDays - revisionDays;

        const generatedPlan = [];
        const track = cfg.track;
        const dailyHours = parseInt(cfg.dailyHours) || 4;
        
        const subjects = {
            UPSC: ["History", "Polity", "Geography", "Economy", "Environment", "Science", "Current Affairs"],
            TNPSC: ['History', 'Polity', 'Geography', 'Economy', 'Science', 'Aptitude', 'Tamil/English'],
            GATE: ['OS', 'DBMS', 'CN', 'DSA', 'Algorithms', 'Math', 'Digital Logic'],
            Interview: ['DSA Patterns', 'System Design', 'Core CS', 'Web Dev', 'Behavioural']
        }[track] || ['Subject 1', 'Subject 2'];

        for (let i = 1; i <= totalDays; i++) {
            let type = "learning";
            let tasks = [];
            
            if (i <= learningDays) {
                type = "learning";
                const subIdx = (i - 1) % subjects.length;
                const subject = subjects[subIdx];
                
                // Edge Case: Very short sprints cover 2 subjects
                if (totalDays < subjects.length) {
                    const subIdx2 = i % subjects.length;
                    tasks.push(`Core Study: ${subject} & ${subjects[subIdx2]}`);
                    tasks.push(`Integrated MCQ Drill (30 mins)`);
                } else {
                    tasks.push(`Deep Dive: ${subject} - Chapter ${Math.ceil(i/subjects.length)}`);
                    tasks.push(`Practice 20 High-Yield Questions on ${subject}`);
                }

                if (dailyHours >= 4) {
                    tasks.push(`Watch 1 Strategic Video/Lecture`);
                }
                if (dailyHours >= 6) {
                    tasks.push(`Mind-Mapping session for ${subject}`);
                }
            } else if (i <= learningDays + revisionDays) {
                type = "revision";
                const subIdx = (i - learningDays - 1) % subjects.length;
                tasks = [
                    `Intensive Revision: ${subjects[subIdx]}`,
                    `Review Weak Concepts from week ${Math.ceil(i/7)}`,
                    `Quick MCQ Drill on previous module`
                ];
                if (dailyHours < 4) tasks.pop(); // Reduce tasks for low intensity
            } else {
                type = "test";
                tasks = [
                    `Full Length Mock Test #${i - (learningDays + revisionDays)}`,
                    `Detailed Performance Analysis`,
                    `Error Documentation & Rectification`
                ];
                if (dailyHours < 4) tasks = [tasks[0], tasks[1]]; // Streamlined for low intensity
            }

            generatedPlan.push({ day: i, type, tasks });
        }
        setPlan(generatedPlan);
        localStorage.setItem('sr_generated_plan', JSON.stringify(generatedPlan));
    };

    const toggleDayComplete = (day) => {
        setCompletedDays(prev => {
            const updated = { ...prev, [day]: !prev[day] };
            localStorage.setItem('sr_completed_days', JSON.stringify(updated));
            return updated;
        });
    };

    const completionRate = Math.round((Object.values(completedDays).filter(Boolean).length / (config?.totalDays || 1)) * 100);

    const typeMeta = {
        learning: { color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100', label: 'Knowledge Build' },
        revision: { color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100', label: 'Memory Retention' },
        test: { color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100', label: 'Exam Readiness' }
    };

    const nextDayToComplete = useMemo(() => {
        const days = Object.keys(completedDays).map(Number);
        if (days.length === 0) return 1;
        for (let i = 1; i <= plan.length; i++) {
            if (!completedDays[i]) return i;
        }
        return null;
    }, [completedDays, plan]);

    if (!config) return null;

    return (
        <div className="p-6 md:p-10 pt-24 min-h-screen bg-[#F4F7F5] font-poppins relative overflow-hidden">
            <VisualEngine />
            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
                    <div className="space-y-4">
                        <button 
                            onClick={() => navigate('/notes/plan-generator/launch')}
                            className="flex items-center gap-2 text-[#6B7A7A] font-bold text-[13px] hover:text-[#588157] transition-all"
                        >
                            <ArrowLeft size={16} /> Re-configure Plan
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-[#588157] flex items-center justify-center text-white shadow-lg">
                                <Calendar size={28} />
                            </div>
                            <div>
                                <h1 className="text-[32px] font-bold text-[#2F3E46] leading-none mb-1">Your Victory Roadmap</h1>
                                <p className="text-[#6B7A7A] font-medium opacity-80">{config.track} • {config.subtype} • {config.totalDays} Day Sprint</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[32px] shadow-sm border border-[#DAD7CD]/30 min-w-[300px]">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[11px] font-black uppercase tracking-widest text-[#6B7A7A]">Plan Progress</span>
                            <span className="text-[14px] font-bold text-[#588157]">{completionRate}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#F4F7F5] rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${completionRate}%` }}
                                className="h-full bg-gradient-to-r from-[#A3B18A] to-[#588157]"
                            />
                        </div>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                     {[
                        { label: 'Learning Stage', value: `${Math.floor(config.totalDays * 0.7)} Days`, icon: BookOpen, color: 'text-blue-500' },
                        { label: 'Revision Stage', value: `${Math.floor(config.totalDays * 0.2)} Days`, icon: Zap, color: 'text-amber-500' },
                        { label: 'Exam Stage', value: `${config.totalDays - Math.floor(config.totalDays * 0.7) - Math.floor(config.totalDays * 0.2)} Days`, icon: Target, color: 'text-emerald-500' },
                        { label: 'Intensity', value: `${config.dailyHours}h / Day`, icon: Clock, color: 'text-[#2F3E46]' }
                     ].map((m, i) => (
                        <div key={i} className="bg-white p-6 rounded-[28px] border border-[#DAD7CD]/20 shadow-sm flex items-center gap-4">
                            <div className={`p-3 bg-[#F4F7F5] rounded-xl ${m.color}`}>
                                <m.icon size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7A7A]">{m.label}</p>
                                <p className="text-[18px] font-bold text-[#2F3E46]">{m.value}</p>
                            </div>
                        </div>
                     ))}
                </div>

                {/* The Plan Scroll Area */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2 px-1">
                        <TrendingUp size={22} className="text-[#588157]" />
                        <h2 className="text-[22px] font-bold text-[#2F3E46]">Daily Execution Timeline</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {plan.map((day) => (
                            <motion.div 
                                key={day.day}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`bg-white rounded-[32px] overflow-hidden border transition-all ${completedDays[day.day] ? 'opacity-60 border-transparent bg-[#F4F7F5]' : day.day === nextDayToComplete ? 'ring-2 ring-[#588157] shadow-xl border-transparent scale-[1.02]' : 'shadow-sm border-[#DAD7CD]/30'}`}
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Left Sidebar for Day */}
                                    <div className={`p-8 md:w-48 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#DAD7CD]/20 ${completedDays[day.day] ? 'bg-transparent' : 'bg-[#F4F7F5]/50'}`}>
                                        <span className="text-[11px] font-black uppercase tracking-widest text-[#6B7A7A] mb-1">Day</span>
                                        <span className="text-[42px] font-bold text-[#2F3E46] leading-none mb-4">{day.day}</span>
                                        <button 
                                            onClick={() => toggleDayComplete(day.day)}
                                            className={`p-2 rounded-full transition-all ${completedDays[day.day] ? 'bg-[#588157] text-white' : 'bg-white border border-[#DAD7CD] text-[#DAD7CD] hover:border-[#588157] hover:text-[#588157]'}`}
                                        >
                                            <CheckCircle2 size={24} />
                                        </button>
                                    </div>

                                    {/* Main Content Area */}
                                    <div className="p-8 flex-grow">
                                        <div className="flex items-center gap-2 mb-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${typeMeta[day.type].bg} ${typeMeta[day.type].color} ${typeMeta[day.type].border}`}>
                                                {typeMeta[day.type].label}
                                            </span>
                                            {day.day === 1 && (
                                                <span className="flex items-center gap-1 text-[10px] font-bold text-[#588157] bg-[#588157]/5 px-3 py-1.5 rounded-full">
                                                    <Sparkles size={12} /> Starter Goal
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            {day.tasks.map((task, idx) => (
                                                <div key={idx} className="flex items-start gap-3 group">
                                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#A3B18A] flex-shrink-0" />
                                                    <p className={`text-[15px] font-semibold leading-relaxed ${completedDays[day.day] ? 'line-through text-[#6B7A7A]' : 'text-[#2F3E46]'}`}>
                                                        {task}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Quick Actions (Col) */}
                                    <div className="p-8 md:w-56 flex flex-col justify-center items-center gap-3">
                                        <button className="w-full py-3 rounded-xl border border-[#DAD7CD]/30 text-[12px] font-bold text-[#6B7A7A] hover:bg-[#F4F7F5] transition-all flex items-center justify-center gap-2">
                                            <Download size={14} /> Guide
                                        </button>
                                        <button 
                                            className={`w-full py-3 rounded-xl text-[12px] font-bold transition-all flex items-center justify-center gap-2 ${completedDays[day.day] ? 'bg-white text-[#DAD7CD] cursor-not-allowed' : 'bg-[#2F3E46] text-white hover:bg-[#588157]'}`}
                                            onClick={() => navigate('/todo')}
                                        >
                                            Tracker <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Floating Bottom Card */}
                <div className="mt-16 bg-[#588157] p-10 rounded-[48px] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                    <Sparkles size={200} className="absolute -bottom-20 -right-20 opacity-10" />
                    <div className="relative z-10">
                        <h2 className="text-[26px] font-bold mb-2">Feeling Overwhelmed?</h2>
                        <p className="text-white/80 max-w-lg font-medium">It's okay to take a break. Our AI can readjust your plan if you fall behind. Just ask the Smart Assistant.</p>
                    </div>
                    <button className="bg-white text-[#588157] px-8 py-4 rounded-2xl text-[14px] font-bold hover:scale-105 transition-all shadow-xl">
                        Adjust My Plan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlanDashboard;
