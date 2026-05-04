import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getStats } from '../services/api';
import { getActivity, getAccuracy, getStreak } from '../services/activityTracker';
import { 
  Zap, 
  Activity, 
  TrendingUp,
  CheckCircle2,
  Clock,
  Layout,
  Brain,
  MessageSquare,
  BookOpen
} from 'lucide-react';
import QuotesPanel from '../components/QuotesPanel';

const ProgressCard = ({ icon: Icon, value, label, color, subValue }) => (
  <div className="bg-white p-6 rounded-[20px] shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-transparent hover:border-[#A3B18A]/30 transition-all flex flex-col relative overflow-hidden group">
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
      <Icon size={22} className="text-white" />
    </div>
    <h3 className="text-[24px] font-bold text-[#2F3E46] mb-1 font-poppins">{value}</h3>
    <p className="text-[14px] text-[#6B7A7A] font-medium uppercase tracking-wider">{label}</p>
    {subValue && <span className="text-[11px] text-[#A3B18A] mt-2 font-bold">{subValue}</span>}
    <div className={`absolute -right-4 -bottom-4 w-16 h-16 ${color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform`} />
  </div>
);

const ActivityCalendar = ({ sessions }) => {
  const today = new Date();
  const days = [...Array(35)].map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (34 - i));
    const dateStr = d.toISOString().split('T')[0];
    const isActive = sessions.includes(dateStr);
    return { date: dateStr, isActive };
  });

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day, i) => (
        <div 
          key={i} 
          className={`h-4 rounded-[4px] transition-all hover:scale-125 cursor-help ${
            day.isActive 
              ? 'bg-[#588157] shadow-[0_0_8px_rgba(88,129,87,0.4)]' 
              : 'bg-[#DAD7CD]/40'
          }`}
          title={day.date + (day.isActive ? ' (Active)' : ' (No activity)')}
        />
      ))}
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ 
    fatigueScore: 0, 
    nextRevision: 'Today', 
    streak: 0, 
    accuracy: 0,
    testsTaken: 0,
    topicsCovered: 0,
    aiInteractions: 0
  });
  const [activity, setActivity] = useState(getActivity());
  const [loading, setLoading] = useState(true);

  const fetchData = React.useCallback(async () => {
    try {
      const res = await getStats(user.id);
      const localActivity = getActivity();
      setActivity(localActivity);
      
      const currentStreak = getStreak(localActivity);
      
      setStats({
        fatigueScore: res.data ? Math.round((res.data.fatigueScore || 0) * 100) : 0,
        nextRevision: res.data?.revisionDate ? 'Scheduled' : 'Today',
        streak: currentStreak,
        accuracy: localActivity ? getAccuracy(localActivity) : 0,
        testsTaken: localActivity.testsTaken || 0,
        topicsCovered: localActivity.topicsCovered?.length || 0,
        aiInteractions: localActivity.aiInteractionsCount || 0
      });
    } catch (error) {
      console.error("Dashboard data fetch error", error);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const progressPercent = Math.min(100, (stats.accuracy * 0.6) + (stats.streak * 2));

  return (
    <div className="p-6 md:p-10 pt-24 min-h-screen bg-[#F4F7F5] transition-all">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Welcome Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-2 justify-center md:justify-start"
            >
              <div className="w-8 h-px bg-[#A3B18A]" />
              <span className="text-[12px] font-black text-[#A3B18A] uppercase tracking-[0.3em]">Operational Dashboard</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[36px] font-bold text-[#2F3E46] font-poppins tracking-tight"
            >
              Welcome, {user?.username}
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-[#DAD7CD]/30 backdrop-blur-md"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-[#A3B18A] uppercase tracking-widest">Neural Status</span>
              <span className="text-[14px] font-bold text-[#588157]">Optimized Engine</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center relative">
               <Cpu size={20} className="animate-spin-slow" />
               <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
            </div>
          </motion.div>
        </header>

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProgressCard 
            icon={Zap} 
            value={`${stats.streak} Days`} 
            label="Current Streak" 
            color="bg-orange-500" 
            subValue={stats.streak > 0 ? "🔥 ON FIRE" : "START STUDYING TODAY"}
          />
          <ProgressCard 
            icon={BookOpen} 
            value={stats.topicsCovered} 
            label="Topics Mastered" 
            color="bg-blue-500" 
          />
          <ProgressCard 
            icon={CheckCircle2} 
            value={stats.testsTaken} 
            label="Practice Tests" 
            color="bg-emerald-500" 
          />
          <ProgressCard 
            icon={MessageSquare} 
            value={stats.aiInteractions} 
            label="AI Interactions" 
            color="bg-purple-500" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Visual: Activity Map & Progress */}
          <div className="lg:col-span-2 space-y-10">
            <section className="bg-white p-8 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white relative overflow-hidden">
              <div className="flex items-center justify-between mb-10 relative z-10">
                <div>
                  <h2 className="text-[22px] font-bold text-[#2F3E46] font-poppins flex items-center gap-3">
                    <Activity size={24} className="text-[#A3B18A]" />
                    Learning Activity
                  </h2>
                  <p className="text-[13px] text-[#6B7A7A] mt-1">Your consistency over the last 30 days.</p>
                </div>
                <div className="px-4 py-2 bg-[#F4F7F5] rounded-xl text-[11px] font-bold text-[#588157] uppercase tracking-wider">
                   {activity.sessions?.length || 0} Active Days
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
                <div className="flex-grow w-full">
                   <ActivityCalendar sessions={activity.sessions || []} />
                   <div className="flex justify-between mt-4 text-[10px] text-[#6B7A7A] font-bold uppercase tracking-widest px-1">
                      <span>30 Days Ago</span>
                      <span>Yesterday</span>
                      <span>Today</span>
                   </div>
                </div>
                
                <div className="w-px h-24 bg-[#DAD7CD]/20 hidden md:block" />

                <div className="flex flex-col items-center">
                   <div className="text-[42px] font-black text-[#2F3E46] leading-none">{Math.round(progressPercent)}%</div>
                   <div className="text-[11px] font-bold text-[#A3B18A] uppercase tracking-[0.2em] mt-2">Overall Power</div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-[#DAD7CD]/20">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[14px] font-semibold text-[#6B7A7A]">Syllabus Progress</span>
                  <span className="text-[14px] font-bold text-[#588157]">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-3 bg-[#F4F7F5] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#A3B18A] to-[#588157] shadow-inner"
                  />
                </div>
              </div>
              
              <Brain size={180} className="absolute -bottom-10 -right-10 text-[#588157] opacity-[0.03] rotate-12" />
            </section>

            <QuotesPanel />
          </div>

          {/* Right Column: Focus & Accuracy */}
          <div className="space-y-10">
            <section className="bg-white p-8 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white">
              <h3 className="text-[20px] font-bold text-[#2F3E46] mb-8 font-poppins flex items-center gap-3">
                <TrendingUp size={22} className="text-[#A3B18A]" />
                Neural Precision
              </h3>
              
              <div className="relative w-40 h-40 mx-auto mb-8">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#F4F7F5" 
                    strokeWidth="8" 
                  />
                  <motion.circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#588157" 
                    strokeWidth="8" 
                    strokeDasharray="283"
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: 283 - (283 * stats.accuracy) / 100 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(88,129,87,0.3)]"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[32px] font-black text-[#2F3E46]">{stats.accuracy}%</span>
                  <span className="text-[9px] font-bold text-[#6B7A7A] uppercase tracking-tighter">Avg Score</span>
                </div>
              </div>

              <div className="space-y-4">
                {activity?.topicsCovered?.length > 0 ? (
                  activity.topicsCovered.slice(0, 3).map(topic => (
                    <div key={topic} className="flex items-center justify-between p-4 rounded-2xl bg-[#F4F7F5]/50 border border-[#DAD7CD]/30 hover:scale-[1.02] transition-transform cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#588157] shadow-sm border border-[#DAD7CD]/20">
                           <Layout size={14} />
                        </div>
                        <span className="text-[13px] font-bold text-[#2F3E46] tracking-tight">{topic}</span>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-[#588157]" />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-[11px] font-bold text-[#6B7A7A] uppercase tracking-widest opacity-60 italic">No Recent Focus Detected</p>
                  </div>
                )}
              </div>
            </section>

            <motion.section 
              whileHover={{ y: -5 }}
              className="bg-[#2F3E46] p-8 rounded-[32px] text-white shadow-2xl overflow-hidden relative group cursor-pointer"
              onClick={() => window.location.href = '/#/ai-study-room'}
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                      <Zap size={20} className="text-[#A3B18A]" />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A3B18A]">Flash Active</span>
                </div>
                <h3 className="text-[24px] font-bold mb-3 font-poppins leading-tight">Enter AI Study Room</h3>
                <p className="text-[13px] opacity-70 mb-8 leading-relaxed font-medium">Continue your UPSC, GATE or IT prep with our strict persona assistant.</p>
                <div className="flex items-center gap-3 font-black text-[11px] uppercase tracking-widest text-[#A3B18A]">
                   Explore Room <Clock size={14} className="animate-pulse" />
                </div>
              </div>
              <Activity className="absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.05] group-hover:scale-110 transition-transform pointer-events-none" />
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cpu = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
    <rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/>
    <line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/>
    <line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/>
    <line x1="20" y1="15" x2="23" y2="15"/>
    <line x1="1" y1="9" x2="4" y2="9"/>
    <line x1="1" y1="15" x2="4" y2="15"/>
  </svg>
);

export default Dashboard;
