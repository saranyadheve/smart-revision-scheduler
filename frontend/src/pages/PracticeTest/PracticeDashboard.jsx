import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Award, Monitor, Users, ArrowRight } from 'lucide-react';
import VisualEngine from '../../components/VisualEngine';

const TRACKS = [
  { id: 'UPSC', title: 'UPSC Civil Services', icon: BookOpen, desc: 'Assess History, Polity, Economy, Environment & more.', color: 'bg-indigo-50 text-indigo-600', border: 'border-indigo-100 hover:border-indigo-300' },
  { id: 'TNPSC', title: 'TNPSC Group Exams', icon: Award, desc: 'Targeting Group 1/2/4, Tamil basics, Aptitude & Local History.', color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100 hover:border-emerald-300' },
  { id: 'GATE', title: 'GATE (CSE)', icon: Monitor, desc: 'Data Structures, Operating Systems, Algorithms, Networks.', color: 'bg-amber-50 text-amber-600', border: 'border-amber-100 hover:border-amber-300' },
  { id: 'IT INTERVIEW', title: 'IT Interviews', icon: Users, desc: 'DSA, System Design, Core Subjects, Web Dev, HR prep.', color: 'bg-blue-50 text-blue-600', border: 'border-blue-100 hover:border-blue-300' }
];

const PracticeDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen pt-24 pb-12 px-6 flex flex-col items-center bg-[#F4F7F5] overflow-hidden">
      <VisualEngine />
      <div className="max-w-5xl w-full relative z-10">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2F3E46] font-poppins mb-3">Practice Test Tracks</h1>
          <p className="text-[#6B7A7A] text-[15px] max-w-2xl">
            Timed 30-minute assessments matching real test patterns to improve your speed and accuracy. Select your target prep track below.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TRACKS.map((track, i) => {
            const Icon = track.icon;
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(`/practice-tests/${encodeURIComponent(track.id)}`)}
                className={`bg-white rounded-2xl p-6 border ${track.border} shadow-sm hover:shadow-md cursor-pointer transition-all group flex flex-col`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${track.color}`}>
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#F4F7F5] flex items-center justify-center text-[#6B7A7A] group-hover:bg-[#588157] group-hover:text-white transition-colors">
                    <ArrowRight size={16} />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-[#2F3E46] mb-2">{track.title}</h3>
                <p className="text-[14px] text-[#6B7A7A] leading-relaxed mb-6 flex-grow">{track.desc}</p>
                
                <div className="flex items-center gap-4 text-[12px] font-medium text-[#2F3E46]/60 border-t border-[#DAD7CD]/30 pt-4">
                  <span>30 Questions</span>
                  <div className="w-1 h-1 rounded-full bg-[#DAD7CD]" />
                  <span>30 Mins</span>
                  <div className="w-1 h-1 rounded-full bg-[#DAD7CD]" />
                  <span>Topic-wise & Mixed</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PracticeDashboard;
