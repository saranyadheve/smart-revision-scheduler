import React, { useState } from 'react';
import { Target, BookOpen, FileText, Eye, Download, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PYQHub = () => {
  const [activeSubTab, setActiveSubTab] = useState('prelims');

  const prelimsFiles = [
    { name: "CGSPE 2026 - GenStud I", year: "2026", path: "/pyq/upsc/prelims/PYQ-prelims/QP_CGSPE26_GenStud_I_09022026.pdf" },
    { name: "CGSPE 2026 - Chem II", year: "2026", path: "/pyq/upsc/prelims/PYQ-prelims/QP_CGSPE26_Chem_II_09022026.pdf" },
    { name: "CGSPE 2026 - Geol-Hydrogeo II", year: "2026", path: "/pyq/upsc/prelims/PYQ-prelims/QP_CGSPE26_Geol-Hydrogeo_II_09022026.pdf" },
    { name: "CGSPE 2026 - Geophy II", year: "2026", path: "/pyq/upsc/prelims/PYQ-prelims/QP_CGSPE26_Geophy_II_09022026.pdf" },
    { name: "ESPE 2026 - CivilEngg II", year: "2026", path: "/pyq/upsc/prelims/PYQ-prelims/QP_ESPE26_CivilEngg_II_09022026.pdf" },
    { name: "ESPE 2026 - GenStud EnggAptit I", year: "2026", path: "/pyq/upsc/prelims/PYQ-prelims/QP_ESPE26_GenStud_EnggAptit_I_09022026.pdf" },
    { name: "Electrical Engineering", year: "2025", path: "/pyq/upsc/prelims/PYQ-prelims/electrical engineering.pdf" }
  ];

  const mainsFiles = [
    { name: "CSM 2025 - Essay", year: "2025", path: "/pyq/upsc/mains/PYQ-mains/ESSAY-QP-CSM-25-010925.pdf" },
    { name: "CSM 2025 - GS Paper I", year: "2025", path: "/pyq/upsc/mains/PYQ-mains/GENERAL-STUDIES-PAPER I-QP-CSM-25-010925.pdf" },
    { name: "CSM 2025 - GS Paper II", year: "2025", path: "/pyq/upsc/mains/PYQ-mains/GENERAL-STUDIES-PAPER-II-QP-CSM-25-010925.pdf" },
    { name: "CSM 2025 - GS Paper III", year: "2025", path: "/pyq/upsc/mains/PYQ-mains/GENERAL-STUDIES-PAPER-III-QP-CSM-25-010925.pdf" },
    { name: "CSM 2025 - GS Paper IV", year: "2025", path: "/pyq/upsc/mains/PYQ-mains/GENERAL-STUDIES-PAPER-IV-QP-CSM-25-010925.pdf" },
    { name: "IFSM 2025 - Agriculture I", year: "2025", path: "/pyq/upsc/mains/PYQ-mains/QP-IFSM-25-AGRICULTURE-PAPER-I-241125.pdf" },
    { name: "IFSM 2025 - Agriculture II", year: "2025", path: "/pyq/upsc/mains/PYQ-mains/QP-IFSM-25-AGRICULTURE-PAPER-II-241125.pdf" },
    { name: "IFSM 2025 - Botany (Set-1)", year: "2025", path: "/pyq/upsc/mains/PYQ-mains/QP-IFSM-25-BOTANY-PAPER-I-241125.pdf" },
    { name: "IFSM 2025 - Botany (Set-2)", year: "2025", path: "/pyq/upsc/mains/PYQ-mains/QP-IFSM-25-BOTANY-PAPER-I-241125 (1).pdf" }
  ];

  const files = activeSubTab === 'prelims' ? prelimsFiles : mainsFiles;

  const handleDownload = (path, name) => {
    const link = document.createElement('a');
    link.href = path;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animation-fade-in">
      <div className="mb-8">
        <h3 className="text-[20px] font-semibold text-[#2F3E46] mb-2 font-poppins flex items-center gap-3">
          <FileText size={22} className="text-[#A3B18A]" />
          Previous Year Questions
        </h3>
        <p className="text-[13px] text-[#6B7A7A]">Access year-wise exam archives for effective preparation.</p>
      </div>

      {/* Sub-toggle for Prelims/Mains */}
      <div className="flex bg-[#F4F7F5] p-1.5 rounded-2xl w-fit mb-8 border border-[#DAD7CD]/30">
        <button
          onClick={() => setActiveSubTab('prelims')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
            activeSubTab === 'prelims' 
            ? 'bg-white text-[#588157] shadow-sm' 
            : 'text-[#6B7A7A] hover:text-[#2F3E46]'
          }`}
        >
          <Target size={16} /> Prelims
        </button>
        <button
          onClick={() => setActiveSubTab('mains')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
            activeSubTab === 'mains' 
            ? 'bg-white text-[#588157] shadow-sm' 
            : 'text-[#6B7A7A] hover:text-[#2F3E46]'
          }`}
        >
          <BookOpen size={16} /> Mains
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeSubTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="bg-white rounded-[32px] border border-[#DAD7CD]/30 overflow-hidden shadow-sm"
        >
          <div className="divide-y divide-[#DAD7CD]/10">
            {files.map((file, index) => (
              <div 
                key={index}
                className="p-5 flex items-center justify-between hover:bg-[#F4F7F5]/30 transition-all group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F4F7F5] flex items-center justify-center text-[#A3B18A] border border-[#DAD7CD]/20 group-hover:bg-white group-hover:border-[#A3B18A]/50 transition-all">
                    <span className="text-[11px] font-black uppercase">{file.year}</span>
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-[#2F3E46] group-hover:text-[#588157] transition-colors">{file.name}</h4>
                    <p className="text-[11px] text-[#6B7A7A] uppercase tracking-widest font-bold font-inter mt-0.5">UPSC Strategic Archives</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-3 pr-2">
                  <div className="flex items-center gap-3">
                    <a 
                      href={file.path} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[11px] font-bold text-[#A3B18A] uppercase tracking-widest hover:text-[#588157] transition-colors border border-[#A3B18A]/30 px-4 py-2 rounded-xl bg-white hover:bg-[#A3B18A]/10 group/btn"
                    >
                      <Eye size={14} className="group-hover/btn:scale-110 transition-transform" /> View
                    </a>
                    <button 
                      onClick={() => handleDownload(file.path, file.name)}
                      className="flex items-center gap-2 text-[11px] font-bold text-[#6B7A7A] uppercase tracking-widest hover:text-[#588157] transition-colors border border-[#DAD7CD]/50 px-4 py-2 rounded-xl bg-white hover:bg-[#F4F7F5] group/btn"
                    >
                      <Download size={14} className="group-hover/btn:scale-110 transition-transform" /> Download
                    </button>
                  </div>
                  <button 
                    onClick={() => window.location.hash = '/learning-hub'}
                    className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest bg-[#2F3E46] px-4 py-2 rounded-xl hover:bg-black transition-all shadow-md"
                  >
                    <Sparkles size={12} className="text-[#A3B18A]" /> AI Deep Dive
                  </button>

                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PYQHub;
