import React from 'react';
import { 
  FileText, 
  Eye, 
  Download, 
  ExternalLink 
} from 'lucide-react';
import { motion } from 'framer-motion';

const PYQViewer = ({ title, pyqs, emptyMessage = "No PYQs available for this section." }) => {
  if (!pyqs || pyqs.length === 0) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-[#DAD7CD]/30 text-center">
        <p className="text-[#6B7A7A] italic text-[14px]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <h3 className="text-[20px] font-bold text-[#2F3E46] font-poppins mb-6">
          {title}
        </h3>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pyqs.map((pdf, index) => (
          <motion.div 
            key={pdf.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-white p-5 rounded-2xl border border-[#DAD7CD]/30 hover:border-[#A3B18A] hover:shadow-xl transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4 overflow-hidden">
              <div className="w-12 h-12 bg-[#F4F7F5] rounded-xl flex items-center justify-center text-[#A3B18A] group-hover:bg-[#A3B18A] group-hover:text-white transition-all shrink-0">
                <FileText size={22} />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-[14px] font-bold text-[#2F3E46] truncate pr-2 group-hover:text-[#588157] transition-colors" title={pdf.title}>
                  {pdf.title}
                </h4>
                <p className="text-[10px] font-black text-[#A3B18A] uppercase tracking-widest mt-1">Official PDF Document</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a 
                href={pdf.path} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 text-[#6B7A7A] hover:text-[#588157] hover:bg-[#F4F7F5] rounded-lg transition-all"
                title="Open in new tab"
              >
                <Eye size={18} />
              </a>
              <a 
                href={pdf.path} 
                download={pdf.title + ".pdf"}
                className="p-2.5 text-[#6B7A7A] hover:text-[#588157] hover:bg-[#F4F7F5] rounded-lg transition-all"
                title="Download"
              >
                <Download size={18} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PYQViewer;
