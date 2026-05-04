import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText, Download, Eye, ExternalLink } from 'lucide-react';

const Syllabus = ({ group, data }) => {
  // Use syllabusFiles from updated JSON structure
  const files = data?.syllabusFiles || [];

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-dashed border-[#DAD7CD] text-center">
        <ScrollText size={48} className="text-[#A3B18A] mb-4 opacity-20" />
        <h3 className="text-[16px] font-bold text-[#2F3E46] mb-1">No Syllabus Available</h3>
        <p className="text-[13px] text-[#6B7A7A]">Official syllabi for this group are being updated. Check back soon.</p>
      </div>
    );
  }

  const handleView = (filePath) => {
    window.open(filePath, "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {files.map((fileName, index) => {
          // Construct path exactly as requested: /syllabus/tnpsc/{group}/{fileName}
          const filePath = `/syllabus/tnpsc/${group}/${fileName}`;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-5 rounded-2xl border border-[#DAD7CD]/30 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F4F7F5] flex items-center justify-center text-[#A3B18A] group-hover:bg-[#A3B18A] group-hover:text-white transition-all">
                    <ScrollText size={24} />
                  </div>
                  <div className="flex-grow pt-1">
                    <h3 className="text-[14px] font-bold text-[#2F3E46] leading-snug line-clamp-2" title={fileName}>
                      {fileName}
                    </h3>
                    <p className="text-[11px] text-[#6B7A7A] mt-1 uppercase tracking-wider font-medium">Official Exam Syllabus</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-[#F4F7F5]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleView(filePath)}
                      className="flex-grow flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#A3B18A]/20 text-[#588157] text-[12px] font-bold hover:bg-[#A3B18A] hover:text-white transition-all active:scale-95"
                    >
                      <Eye size={16} /> View
                    </button>
                    <a
                      href={filePath}
                      download={fileName}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#F4F7F5] text-[#A3B18A] text-[12px] font-bold hover:bg-[#EAF0EA] transition-all active:scale-95"
                    >
                      <Download size={16} /> Download
                    </a>
                  </div>
                  <button 
                    onClick={() => window.location.hash = '/learning-hub'}
                    className="w-full py-2.5 bg-[#2F3E46] text-white rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all shadow-md mt-1"
                  >
                    <Sparkles size={14} className="text-[#A3B18A]" /> AI Concept Master
                  </button>

                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Syllabus;
