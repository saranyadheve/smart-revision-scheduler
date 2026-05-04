import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Zap, 
  Radio, 
  Settings, 
  PencilRuler,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import PreparationTrackLayout from '../components/PreparationTrackLayout';
import { pyqData } from '../data/pyqData';
import PYQViewer from '../components/PYQViewer';

const GateHub = () => {
  const navigate = useNavigate();

  const branches = [
    { 
      id: 'cse', 
      name: 'Computer Science', 
      desc: 'Algorithms, OS, DBMS, Networks, and Computer Architecture.', 
      icon: Cpu, 
      color: 'bg-indigo-600',
      path: '/notes/gate/cse' 
    },
    { 
      id: 'eee', 
      name: 'Electrical Engineering', 
      desc: 'Power Systems, Control Systems, and Electrical Machines.', 
      icon: Zap, 
      color: 'bg-amber-500',
      path: '/notes/gate/eee' 
    },
    { 
      id: 'ece', 
      name: 'Electronics & Comm.', 
      desc: 'Signals & Systems, Communication, and Embedded Systems.', 
      icon: Radio, 
      color: 'bg-rose-500',
      path: '/notes/gate/ece' 
    },
    { 
      id: 'mech', 
      name: 'Mechanical Engineering', 
      desc: 'Thermodynamics, Fluid Mechanics, and Manufacturing Tech.', 
      icon: Settings, 
      color: 'bg-slate-700',
      path: '/notes/gate/mech' 
    },
    { 
      id: 'civil', 
      name: 'Civil Engineering', 
      desc: 'Structural Analysis, Geotechnical, and Environmental Eng.', 
      icon: PencilRuler, 
      color: 'bg-emerald-600',
      path: '/notes/gate/civil' 
    }
  ];

  return (
    <PreparationTrackLayout
      title="GATE"
      subtitle="Hub."
      description="Select your engineering branch to access specialized syllabus, subject-wise resources, and previous year question archives."
      headerBadge="Engineering Selection"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {branches.map((branch, index) => (
          <motion.div
            key={branch.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(branch.path)}
            className="group relative bg-white p-8 rounded-[32px] border border-[#DAD7CD]/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
          >
            <div className="relative z-10">
              <div className={`w-14 h-14 rounded-2xl ${branch.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                 <branch.icon size={28} />
              </div>
              <h3 className="text-[22px] font-bold text-[#2F3E46] mb-3 font-poppins tracking-tight">{branch.name}</h3>
              <p className="text-[13px] text-[#6B7A7A] leading-relaxed mb-6">
                {branch.desc}
              </p>
              <div className="flex items-center gap-2 text-[12px] font-extrabold text-[#588157] uppercase tracking-widest">
                Access Module <ChevronRight size={14} />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#F4F7F5] rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
          </motion.div>
        ))}

      </div>

      {/* PYQ Archive Section */}
      <div className="mt-20 pt-16 border-t border-[#DAD7CD]/30">
        <h2 className="text-[28px] font-bold text-[#2F3E46] mb-4 font-poppins">Year-wise PYQ Library</h2>
        <p className="text-[#6B7A7A] mb-10 max-w-2xl">Access complete question papers for previous GATE sessions to understand pattern shifts and difficulty trends.</p>
        <PYQViewer pyqs={pyqData.gate} />
      </div>
    </PreparationTrackLayout>
  );
};

export default GateHub;
