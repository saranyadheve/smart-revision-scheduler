import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  TrendingUp, 
  Zap, 
  Target, 
  ArrowRight,
  BookOpen,
  PlayCircle,
  Activity,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getStats, getUserTodos } from '../services/api';
import { getActivity, getAccuracy, getConsistencyScore } from '../services/activityTracker';
import VisualEngine from '../components/VisualEngine';
import QuotesPanel from '../components/QuotesPanel';

const PrepDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({ fatigueScore: 15, nextRevision: 'Today', streak: 0 });
    const [activity, setActivity] = useState(null);
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(null);

    const [progress, setProgress] = useState({
        UPSC: 0,
        TNPSC: 0,
        GATE: 0,
        INTERVIEW: 0
    });

    const fetchData = React.useCallback(async () => {
        console.log("[PrepDashboard] fetchData called. Current loading state:", loading);
        try {
            // Use Promise.allSettled to not fail entirely if one fails
            const [statsRes, todosRes] = await Promise.allSettled([
                getStats(user.id),
                getUserTodos(user.id)
            ]);

            let hasError = false;

            if (statsRes.status === 'fulfilled' && statsRes.value?.data) {
                setStats(prev => {
                    const newFatigue = Math.round((statsRes.value.data.fatigueScore || 0) * 100);
                    const newNextRevision = statsRes.value.data.revisionDate ? 'Scheduled' : 'Today';
                    const newStreak = statsRes.value.data.streak || 0;
                    
                    if (prev.fatigueScore === newFatigue && prev.nextRevision === newNextRevision && prev.streak === newStreak) {
                        return prev; // Prevent unnecessary re-render
                    }
                    return { ...prev, fatigueScore: newFatigue, nextRevision: newNextRevision, streak: newStreak };
                });
            } else {
                hasError = true;
            }

            if (todosRes.status === 'fulfilled' && todosRes.value?.data) {
                setTodos(prev => {
                    // Avoid unnecessary re-render if data is the same
                    const newTodos = todosRes.value.data.slice(0, 5);
                    if (JSON.stringify(prev) === JSON.stringify(newTodos)) return prev;
                    return newTodos;
                });
            } else {
                hasError = true;
                // Fallback dummy UI data
                setTodos([{ id: 'fb', title: 'Network Disconnected: Showing Offline Task', category: 'Offline', completed: false }]);
            }

            if (hasError) setApiError("We couldn't reach the server. Showing offline data.");
        } catch (error) {
            console.error("Dashboard data fetch error", error);
            setApiError("A critical network error occurred.");
        } finally {
            setLoading(false);
        }
    }, [user.id]);

    useEffect(() => {
        console.log("[PrepDashboard] Component mounted. Running setup effect.");
        const data = getActivity();
        if (data) {
            setActivity(data);
            
            // Dynamic Syllabus Progress from activity tracked
            const prog = { UPSC: 0, TNPSC: 0, GATE: 0, INTERVIEW: 0 };
            data.topicsCovered?.forEach(t => {
                if (prog.hasOwnProperty(t)) prog[t] = Math.min(100, prog[t] + 20); // Each topic +20% for demo
            });
            setProgress(prev => (JSON.stringify(prev) !== JSON.stringify(prog) ? prog : prev));
        }

        // Only call fetchData on mount
        fetchData();
    }, [fetchData]);

    // ── Metric Formulas ──────────────────────────────────────────────────────

    // 1. Completion Rate
    const completionRate = todos.length > 0 
        ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100) 
        : 0;

    // 2. Learning Consistency (Last 7 Days)
    const consistency = activity ? getConsistencyScore(activity) : 0;

    // 3. Adaptive Today's Target
    // Formula: (Remaining Effort / Days) adjusted by consistency
    const calculateTarget = () => {
        const totalTopics = 50;
        const remaining = totalTopics - (activity?.topicsCovered.length || 0);
        const daysToExam = 30; // 1 month fallback
        let base = Math.ceil(remaining / daysToExam);
        if (consistency > 80) base += 1; // Level up
        if (consistency < 30) base = Math.max(1, base - 1); // Ease off
        return base;
    };

    const displayStats = [
        { label: "Completion rate", value: completionRate > 0 ? `${completionRate}%` : "No tasks yet", sub: "Avg per week", icon: BarChart3 },
        { label: "Study Streak", value: stats.streak > 0 ? `${stats.streak} Days` : "Start Streak", sub: "Personal Best: 24", icon: TrendingUp },
        { label: "Tasks Completed", value: todos.filter(t => t.completed).length || "0", sub: "Total this month", icon: CheckCircle2 }
    ];

    return (
        <div className="p-6 md:p-10 pt-24 min-h-screen bg-[#F4F7F5] selection:bg-[#A3B18A]/30 font-poppins relative overflow-hidden">
            <VisualEngine />
            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-[36px] font-bold text-[#2F3E46] tracking-tight">Welcome back, {user?.name?.split(' ')[0] || 'Scholar'}.</h1>
                        <p className="text-[#6B7A7A] mt-2 font-medium opacity-80 italic">"The secret of getting ahead is getting started."</p>
                        {apiError && (
                            <div className="mt-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-[13px] flex items-center gap-2">
                                <Activity size={16} />
                                {apiError} (Offline Mode)
                            </div>
                        )}
                    </div>
                    
                    {/* Adaptive Target Card */}
                    <div className="bg-white px-8 py-5 rounded-[32px] border border-[#A3B18A]/40 shadow-sm flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-[#588157] text-white flex items-center justify-center">
                            <Target size={24} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A3B18A]">Today's Target</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-[24px] font-bold text-[#2F3E46]">{calculateTarget()}</span>
                                <span className="text-[12px] text-[#6B7A7A] font-medium">New Topics</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Column 8: Primary Content */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* 1. Overall Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {displayStats.map((s, i) => (
                                <div key={i} className="bg-white p-6 rounded-[32px] border border-[#DAD7CD]/30 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-[#F4F7F5] rounded-2xl text-[#588157]">
                                            <s.icon size={22} />
                                        </div>
                                    </div>
                                    <h4 className="text-[12px] font-black uppercase tracking-widest text-[#6B7A7A] mb-1">{s.label}</h4>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-[28px] font-bold text-[#2F3E46]">{s.value}</span>
                                        <span className="text-[11px] text-[#588157] font-semibold">{s.sub}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 1.5 Learning Consistency Heatmap */}
                        <div className="bg-white p-8 rounded-[40px] border border-[#DAD7CD]/30 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-[18px] font-bold text-[#2F3E46] flex items-center gap-3">
                                    <Activity size={22} className="text-[#A3B18A]" />
                                    Learning Consistency
                                </h2>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] text-[#6B7A7A] font-black uppercase tracking-[0.2em]">Activity Map</span>
                                    <div className="px-3 py-1 bg-[#588157]/10 text-[#588157] rounded-lg text-[10px] font-bold">
                                        {consistency}% Consistency
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-7 sm:grid-cols-14 md:grid-cols-28 gap-2">
                                {[...Array(28)].map((_, i) => {
                                    const d = new Date();
                                    d.setDate(d.getDate() - (27 - i));
                                    const dateKey = d.toISOString().split('T')[0];
                                    const isActive = activity?.sessions?.includes(dateKey);
                                    
                                    return (
                                        <div 
                                            key={i} 
                                            className={`h-6 rounded-md ${isActive ? 'bg-[#A3B18A]' : 'bg-[#DAD7CD]/30'} transition-all hover:scale-110 cursor-help shadow-sm aspect-square`}
                                            title={`${dateKey}: ${isActive ? 'Studied' : 'Gap'}`}
                                        />
                                    );
                                })}
                            </div>
                            <div className="flex justify-between items-center mt-6">
                                <p className="text-[12px] text-[#6B7A7A] italic opacity-70">"Consistency is the companion of success."</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-sm bg-[#DAD7CD]/30" />
                                        <span className="text-[10px] font-bold text-[#6B7A7A] uppercase tracking-wider">Gap</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-sm bg-[#A3B18A]" />
                                        <span className="text-[10px] font-bold text-[#6B7A7A] uppercase tracking-wider">Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Today's Plan */}
                        <div className="bg-white p-8 rounded-[40px] border border-[#DAD7CD]/30 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <Calendar size={24} className="text-[#588157]" />
                                    <h3 className="text-[22px] font-bold text-[#2F3E46]">Today's Targeted Tasks</h3>
                                </div>
                                <button onClick={() => navigate('/todo')} className="text-[12px] font-bold text-[#588157] hover:underline flex items-center gap-1">
                                    View Full Track <ArrowRight size={14} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {todos.length > 0 ? todos.map((t) => (
                                    <div key={t.id} className={`flex items-center justify-between p-5 rounded-[24px] border ${t.completed ? 'bg-[#F4F7F5]/50 border-transparent' : 'bg-white border-[#DAD7CD]/20'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`p-1 rounded-full ${t.completed ? 'text-[#588157] bg-[#EAF0EA]' : 'text-[#DAD7CD]'}`}>
                                                {t.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                            </div>
                                            <div>
                                                <h4 className={`text-[15px] font-bold ${t.completed ? 'line-through text-[#6B7A7A]/70 font-medium' : 'text-[#2F3E46]'}`}>{t.text || t.title}</h4>
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${t.completed ? 'opacity-40' : 'text-[#A3B18A]'}`}>{t.category || t.course || 'Learning'}</span>
                                            </div>
                                        </div>
                                        {!t.completed && (
                                            <button 
                                                onClick={() => navigate('/todo')}
                                                className="text-[11px] font-black uppercase tracking-widest text-[#588157] bg-[#588157]/5 px-4 py-2 rounded-xl hover:bg-[#588157] hover:text-white transition-all"
                                            >
                                                Start
                                            </button>
                                        )}
                                    </div>
                                )) : (
                                    <div className="p-10 text-center bg-[#F4F7F5]/30 rounded-[32px] border border-dashed border-[#DAD7CD]">
                                        <Target size={40} className="mx-auto text-[#DAD7CD] mb-4 opacity-40" />
                                        <h4 className="text-[#2F3E46] font-bold">Start your first study session</h4>
                                        <p className="text-[#6B7A7A] text-[12px] mt-1">Visit Focus Tracker to set your daily goals.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 3. Domain Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div onClick={() => navigate('/notes/courses')} className="bg-[#2F3E46] p-8 rounded-[40px] text-white cursor-pointer group relative overflow-hidden h-[240px]">
                                <PlayCircle size={80} className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform" />
                                <h3 className="text-[24px] font-bold mb-2">Explore Courses</h3>
                                <p className="text-[#A3B18A] text-[13px] font-medium leading-relaxed max-w-[200px]">Structured video lectures and practice materials.</p>
                                <div className="absolute bottom-6 left-8 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest">
                                    Start Learning <ArrowRight size={14} />
                                </div>
                            </div>
                            <div onClick={() => navigate('/notes/plan-generator/launch')} className="bg-[#A3B18A] p-8 rounded-[40px] text-white cursor-pointer group relative overflow-hidden h-[240px]">
                                <Calendar size={80} className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform" />
                                <h3 className="text-[24px] font-bold mb-2">Study Planner</h3>
                                <p className="text-white/80 text-[13px] font-medium leading-relaxed max-w-[200px]">Generate a smart day-based schedule for your targets.</p>
                                <div className="absolute bottom-6 left-8 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest">
                                    Generate Plan <ArrowRight size={14} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Sidebar Recommendations */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        <div className="bg-white p-8 rounded-[40px] border border-[#DAD7CD]/30 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <Zap size={22} className="text-[#588157]" />
                                <h3 className="text-[18px] font-bold text-[#2F3E46]">Next Steps</h3>
                            </div>
                            <div className="space-y-6">
                                {[
                                  { id: 1, title: "Take a Mock Test", desc: "Test your speed in GATE CS subjects.", icon: Target, color: "text-blue-500", bg: "bg-blue-50", path: "/practice/gate/operating-systems" },
                                  { id: 2, title: "Aptitude Drill", desc: "Solve 10 Profit & Loss PYQs today.", icon: Zap, color: "text-amber-500", bg: "bg-amber-50", path: "/aptitude" },
                                  { id: 3, title: "PYQ Marathon", desc: "Practice UPSC 2022 Prelims GS questions.", icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-50", path: "/mock-exam" }
                                ].map((action) => (
                                    <div key={action.id} className="relative pl-6 border-l-2 border-dashed border-[#DAD7CD]">
                                        <div className={`absolute -left-[13px] top-0 p-1.5 rounded-full ${action.bg} ${action.color}`}>
                                            <action.icon size={14} />
                                        </div>
                                        <h4 className="text-[14px] font-bold text-[#2F3E46] leading-tight">{action.title}</h4>
                                        <p className="text-[12px] text-[#6B7A7A] mt-1 leading-relaxed">{action.desc}</p>
                                        <button 
                                            onClick={() => navigate(action.path)} 
                                            className="mt-3 text-[10px] font-black uppercase tracking-widest text-[#588157] flex items-center gap-1 group"
                                        >
                                            Execute <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#588157] p-8 rounded-[40px] text-white relative overflow-hidden">
                             <TrendingUp size={100} className="absolute -bottom-6 -right-6 opacity-10" />
                             <h4 className="text-[18px] font-bold mb-4">Syllabus Overview</h4>
                             <div className="space-y-5">
                                {Object.entries(progress).map(([key, val]) => (
                                    <div key={key}>
                                        <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest mb-2 opacity-80 italic">
                                            <span>{key} Prep</span>
                                            <span>{val}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${val}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className="h-full bg-white rounded-full" 
                                            />
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>

                        <QuotesPanel />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrepDashboard;
