import React from 'react';
import { FileText, Eye, Download, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PYQComponent = ({ type }) => {
  // Mapping of files based on previous directory listings
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
    { name: "IFSM 2025 - Agriculture II", year: "2025", path: "/pyq/upsc/mains/PYQ-mains/QP-IFSM-25-AGRICULTURE-PAPER-II-241125.pdf" }
  ];

  const files = type === 'prelims' ? prelimsFiles : mainsFiles;

  const handleDownload = (path, name) => {
    const link = document.createElement('a');
    link.href = path;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[18px] font-semibold text-[#2F3E46] font-poppins flex items-center gap-3">
          <FileText size={20} className="text-[#A3B18A]" />
          Previous Year Questions ({type === 'prelims' ? 'Prelims' : 'Mains'})
        </h3>
      </div>

      <div className="bg-white rounded-[24px] border border-[#DAD7CD]/30 overflow-hidden shadow-sm">
        <div className="divide-y divide-[#DAD7CD]/20">
          {files.map((file, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-5 flex items-center justify-between hover:bg-[#F4F7F5]/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4F7F5] flex items-center justify-center text-[#A3B18A] border border-[#DAD7CD]/20 group-hover:scale-105 transition-transform">
                  <span className="text-[10px] font-bold">{file.year}</span>
                </div>
                <div>
                  <h4 className="text-[14px] font-semibold text-[#2F3E46] group-hover:text-[#588157] transition-colors">{file.name}</h4>
                  <p className="text-[11px] text-[#6B7A7A] uppercase tracking-widest font-medium">UPSC / {type.toUpperCase()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a 
                  href={file.path} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg text-[#6B7A7A] hover:text-[#588157] hover:bg-white border border-transparent hover:border-[#DAD7CD]/30 transition-all"
                  title="View"
                >
                  <Eye size={18} />
                </a>
                <button 
                  onClick={() => handleDownload(file.path, file.name)}
                  className="p-2.5 rounded-lg text-[#6B7A7A] hover:text-[#588157] hover:bg-white border border-transparent hover:border-[#DAD7CD]/30 transition-all"
                  title="Download"
                >
                  <Download size={18} />
                </button>
                <ChevronRight size={16} className="text-[#DAD7CD] ml-1 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PYQComponent;
