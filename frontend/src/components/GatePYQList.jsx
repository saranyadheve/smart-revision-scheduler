import React from 'react';
import { FileText, Eye, Download, Database } from 'lucide-react';

const GatePYQList = ({ branch, pyqs = [] }) => {
  if (pyqs.length === 0) {
    return (
      <div className="bg-white rounded-[32px] p-12 border border-[#DAD7CD]/30 flex flex-col items-center justify-center text-center py-20">
        <Database className="w-16 h-16 text-[#A3B18A] mb-6 opacity-20" />
        <h3 className="text-[20px] font-bold text-[#2F3E46] font-poppins mb-2">Archive Expanding</h3>
        <p className="text-[#6B7A7A] max-w-sm text-[14px]">
          Previous Year Questions for {branch.toUpperCase()} are currently being indexed. Check back soon for the full archive.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {pyqs.map((pyq, idx) => (
        <div key={idx} className="bg-white p-6 rounded-[24px] border border-[#DAD7CD]/30 hover:border-[#588157]/40 transition-all flex items-center justify-between group shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F4F7F5] flex items-center justify-center text-[#588157]">
              <FileText size={20} />
            </div>
            <div>
               <h4 className="text-[15px] font-bold text-[#2F3E46]">GATE {branch.toUpperCase()} {pyq.year}</h4>
               <p className="text-[11px] font-medium text-[#6B7A7A] uppercase tracking-wider">Official Question Paper</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              className="p-3 rounded-xl bg-[#F4F7F5] text-[#6B7A7A] hover:bg-[#588157] hover:text-white transition-all shadow-sm"
              title="View PDF"
              onClick={() => window.open(`/pyq/gate/${branch.toLowerCase()}/${pyq.filename}`, '_blank')}
            >
              <Eye size={16} />
            </button>
            <a 
              href={`/pyq/gate/${branch.toLowerCase()}/${pyq.filename}`} 
              download 
              className="p-3 rounded-xl bg-[#F4F7F5] text-[#6B7A7A] hover:bg-[#2F3E46] hover:text-white transition-all shadow-sm"
              title="Download PDF"
            >
              <Download size={16} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GatePYQList;
