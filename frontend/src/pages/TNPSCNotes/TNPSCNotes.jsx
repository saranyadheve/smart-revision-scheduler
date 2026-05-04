import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Layers, ShieldCheck, GraduationCap, Layout, CheckCircle } from 'lucide-react';
import PreparationTrackLayout from '../../components/PreparationTrackLayout';

const TNPSCNotes = () => {
  const navigate = useNavigate();

  const hubs = [
    { 
      id: 'todo', 
      name: 'Syllabus Tracker', 
      desc: 'Track your subject-wise progress and daily preparation goals.', 
      icon: CheckCircle, 
      color: 'bg-emerald-600',
      path: '/todo' 
    },
    { 
      id: 'group1', 
      name: 'Group 1', 
      desc: 'Deputy Collector, DSP, and other Class-I services.', 
      icon: ShieldCheck, 
      color: 'bg-emerald-500',
      path: '/notes/tnpsc/group1' 
    },
    { 
      id: 'group2-2a', 
      name: 'Group 2 & 2A', 
      desc: 'Sub-Registrar, Municipal Commissioner, and Assistant posts.', 
      icon: GraduationCap, 
      color: 'bg-[#A3B18A]',
      path: '/notes/tnpsc/group2and2a' 
    },
    { 
      id: 'group4', 
      name: 'Group 4', 
      desc: 'VAO, Junior Assistant, Typist, and Bill Collector.', 
      icon: Layers, 
      color: 'bg-[#588157]',
      path: '/notes/tnpsc/group4' 
    },

    { 
      id: 'study-material', 
      name: 'Archive Resources', 
      desc: 'Legacy links, "Where to Study" guide, and official tools.', 
      icon: BookOpen, 
      color: 'bg-slate-700',
      path: '/notes/tnpsc/study-material' 
    }
  ];

  return (
    <PreparationTrackLayout
      title="TNPSC Notes"
      subtitle="Hub."
      description="A comprehensive gateway to TNPSC exam resources, categorized by service groups. Access structured materials, archives, and official syllabi."
      headerBadge="Tamil Nadu Public Service"
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hubs.map((hub, index) => (
            <motion.div
              key={hub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(hub.path, hub.id === 'todo' ? { state: { activeCourse: 'TNPSC' } } : {})}
              className="group relative bg-white p-8 rounded-[32px] border border-[#DAD7CD]/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
            >
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${hub.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                   <hub.icon size={28} />
                </div>
                <h3 className="text-[22px] font-bold text-[#2F3E46] mb-3 font-poppins tracking-tight">{hub.name}</h3>
                <p className="text-[14px] text-[#6B7A7A] leading-relaxed mb-6 max-w-[240px]">
                  {hub.desc}
                </p>
                <div className="flex items-center gap-2 text-[12px] font-extrabold text-[#588157] uppercase tracking-widest">
                  Explore Module <Layout size={14} />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#F4F7F5] rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t border-[#DAD7CD]/30 text-center">
           <p className="text-[12px] text-[#6B7A7A] font-medium italic">
             "Success is the sum of small efforts, repeated day in and day out."
           </p>
        </div>
    </PreparationTrackLayout>
  );
};

export default TNPSCNotes;
