import React from 'react';
import PYQComponent from './PYQComponent';
import { Book, Edit3, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PrelimsNotes = () => {
  const importantTopics = [
    { title: "Fundamental Rights", desc: "Art 12-35, basic structure doctrine, key amendments." },
    { title: "Modern India", desc: "Revolt of 1857, early nationalism, phase of mass struggle." },
    { title: "Economic Survey", desc: "Fiscal deficit, GDP projections, sectoral growth analysis." },
    { title: "Environment Laws", desc: "WPA 1972, EPA 1986, biodiversity hotspots in India." }
  ];

  const studyMaterials = [
    { title: "Laxmikanth - Polity Summary", size: "2.4 MB", type: "PDF" },
    { title: "Spectrum - Modern History Micro-Notes", size: "1.8 MB", type: "PDF" },
    { title: "Economy Foundation Concepts", size: "3.2 MB", type: "PDF" }
  ];

  const shortNotes = "Prelims requires a focus on factual accuracy mixed with conceptual clarity. Prioritize Polity, Economy, and Modern History for maximum ROI. Current Affairs coverage should be at least 15 months deep.";

  return (
    <div className="space-y-12 animation-fade-in">
      {/* Important Topics */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Book size={20} className="text-[#A3B18A]" />
          <h3 className="text-[18px] font-semibold text-[#2F3E46] font-poppins capitalize">Critical Focus Areas</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {importantTopics.map((topic, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -2 }}
              className="p-5 rounded-2xl bg-white border border-[#DAD7CD]/30 hover:border-[#A3B18A]/50 transition-all shadow-sm"
            >
              <h4 className="text-[14px] font-semibold text-[#2F3E46] mb-1">{topic.title}</h4>
              <p className="text-[12px] text-[#6B7A7A] leading-relaxed">{topic.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Study Materials */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck size={20} className="text-[#588157]" />
          <h3 className="text-[18px] font-semibold text-[#2F3E46] font-poppins capitalize">Premium Courseware</h3>
        </div>
        <div className="bg-white rounded-[24px] border border-[#DAD7CD]/30 overflow-hidden divide-y divide-[#DAD7CD]/10">
          {studyMaterials.map((mat, i) => (
            <div key={i} className="p-4 flex items-center justify-between group hover:bg-[#F4F7F5]/30 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-[#A3B18A]/10 text-[#588157]">
                   <Book size={18} />
                </div>
                <span className="text-[14px] font-medium text-[#2F3E46] group-hover:text-[#588157] tracking-tight">{mat.title}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold text-[#6B7A7A] bg-[#F4F7F5] px-2 py-1 rounded-md">{mat.size}</span>
                <ChevronRight size={16} className="text-[#DAD7CD] group-hover:text-[#A3B18A] transition-all transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Short Notes */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Edit3 size={20} className="text-[#A3B18A]" />
          <h3 className="text-[18px] font-semibold text-[#2F3E46] font-poppins capitalize">Preparation Strategy</h3>
        </div>
        <div className="bg-[#A3B18A]/5 border border-dashed border-[#A3B18A]/30 p-6 rounded-[24px]">
          <p className="text-[14px] text-[#2F3E46] font-inter leading-[1.6] italic">
            "{shortNotes}"
          </p>
        </div>
      </section>

      {/* PYQs Component */}
      <PYQComponent type="prelims" />
    </div>
  );
};

export default PrelimsNotes;
