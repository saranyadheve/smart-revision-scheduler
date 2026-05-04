import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, FileText, ScrollText, Sparkles } from 'lucide-react';
import VisualEngine from '../../components/VisualEngine';
import UnifiedPDFList from '../../components/UnifiedPDFList';
import data from '../../data/tnpsc/group2and2a.json';

const Group2And2A = () => {
  const navigate = useNavigate();
  const { tab } = useParams();
  
  const activeTab = tab === 'pyq' ? 'pyq' : 
                    tab === 'syllabus' ? 'syllabus' : 'hub';

  const formatFiles = (files) => (files || []).map(f => ({ 
    name: f, 
    title: f.replace('.pdf', '').replace(/_/g, ' ') 
  }));

  return (
    <div className="relative w-full min-h-screen pt-24 pb-12 px-6 md:px-12 bg-[#F4F7F5] overflow-hidden">
      <VisualEngine />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
           <button 
             onClick={() => navigate('/notes/tnpsc')}
             className="flex items-center gap-2 text-[#6B7A7A] hover:text-[#2F3E46] transition-all text-[11px] font-bold uppercase tracking-[0.2em] bg-white/60 py-3 px-6 rounded-2xl border border-[#DAD7CD]/30 w-fit backdrop-blur-md shadow-sm active:scale-95"
           >
             <ChevronLeft size={16} /> TNPSC Hub
           </button>
        </div>

        <header className="mb-10">
          <div className="flex items-center gap-2 text-[10px] font-black text-[#A3B18A] uppercase tracking-[0.3em] mb-4 bg-white/40 px-4 py-1.5 rounded-full border border-[#DAD7CD]/20 w-fit">
             <Sparkles size={12} /> Combined Civil Services - II & IIA
          </div>
          <h1 className="text-[34px] md:text-[42px] font-bold text-[#2F3E46] font-poppins tracking-tighter leading-tight">
            Group 2 & 2A <span className="text-[#A3B18A]/60">Archive.</span>
          </h1>
        </header>

        <div className="flex items-center gap-2 mb-10 bg-white/40 p-2 rounded-[24px] border border-[#DAD7CD]/30 w-fit backdrop-blur-xl shadow-sm">
          {[
            { id: 'hub', name: 'Overview', icon: ScrollText, path: '/notes/tnpsc/group2and2a' },
            { id: 'pyq', name: 'PYQ Archives', icon: FileText, path: '/notes/tnpsc/group2and2a/pyq' },
            { id: 'syllabus', name: 'Syllabus', icon: ScrollText, path: '/notes/tnpsc/group2and2a/syllabus' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => navigate(t.path)}
              className={`flex items-center gap-3 px-8 py-3.5 rounded-[18px] text-[13px] font-bold transition-all ${activeTab === t.id ? 'bg-[#588157] text-white' : 'text-[#6B7A7A] hover:bg-white'}`}
            >
              <t.icon size={18} /> {t.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
            {activeTab === 'hub' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div onClick={() => navigate('/notes/tnpsc/group2and2a/pyq')} className="p-10 bg-white rounded-[40px] border border-[#DAD7CD]/30 shadow-sm hover:shadow-xl transition-all cursor-pointer group">
                    <div className="w-16 h-16 rounded-2xl bg-[#F4F7F5] flex items-center justify-center text-[#588157] mb-8 group-hover:bg-[#588157] group-hover:text-white transition-all">
                       <FileText size={32} />
                    </div>
                    <h3 className="text-[22px] font-bold text-[#2F3E46] mb-3">Previous Year Papers</h3>
                    <p className="text-[#6B7A7A] leading-relaxed">Collection of papers for Group 2 & 2A from late 2011 onwards.</p>
                 </div>
                 <div onClick={() => navigate('/notes/tnpsc/group2and2a/syllabus')} className="p-10 bg-white rounded-[40px] border border-[#DAD7CD]/30 shadow-sm hover:shadow-xl transition-all cursor-pointer group">
                    <div className="w-16 h-16 rounded-2xl bg-[#F4F7F5] flex items-center justify-center text-[#588157] mb-8 group-hover:bg-[#588157] group-hover:text-white transition-all">
                       <ScrollText size={32} />
                    </div>
                    <h3 className="text-[22px] font-bold text-[#2F3E46] mb-3">Detailed Syllabus</h3>
                    <p className="text-[#6B7A7A] leading-relaxed">Official curriculum for Prelims and Mains exams.</p>
                 </div>
              </motion.div>
            )}
            {activeTab === 'pyq' && (
                <motion.div key="pyq" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <UnifiedPDFList title="PYQ Archives" type="pyq" group="group2and2a" files={formatFiles(data.pyqFiles)} />
                </motion.div>
            )}
            {activeTab === 'syllabus' && (
                <motion.div key="syllabus" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <UnifiedPDFList title="Official Syllabus" type="syllabus" group="group2and2a" files={formatFiles(data.syllabusFiles)} />
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Group2And2A;
