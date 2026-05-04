import React from 'react';
import PYQComponent from './PYQComponent';
import { PenTool, Layers, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MainsNotes = () => {
  const answerStructure = [
    { step: "Introduction", detail: "Start with a definition, brief background, or contemporary context (20-30 words)." },
    { step: "Body - Core Arguments", detail: "Use bullet points for clarity. Incorporate flowcharts or diagrams where applicable." },
    { step: "Body - Diverse Perspectives", detail: "Mention socio-economic, political, and ethical dimensions. Link with Current Affairs." },
    { step: "Conclusion", detail: "Constructive summary or a forward-looking balanced opinion based on Constitutional values." }
  ];

  const keyTopics = [
    { title: "Judicial Activism vs Overreach", sub: "GS Paper 2 - Polity" },
    { title: "Inclusive Growth Challenges", sub: "GS Paper 3 - Economy" },
    { title: "Moral Philosophy: Kantian Ethics", sub: "GS Paper 4 - Ethics" },
    { title: "Indo-Pacific Strategic Shift", sub: "GS Paper 2 - IR" }
  ];

  const subjectWiseNotes = [
    { title: "GS Paper 1 - History & Social Issues", info: "Detailed notes on Art & Culture, Modern History, World History, and Social Issues." },
    { title: "GS Paper 2 - Polity & Governance", info: "In-depth analysis of Constitutional Articles, RP Act, and Welfare Schemes." },
    { title: "GS Paper 3 - Sci-Tech & Security", info: "Curated content on Internal Security, Disaster Management, and Science & Tech." },
    { title: "GS Paper 4 - Ethics & Case Studies", info: "Frameworks for ethical dilemmas and analysis of 20+ previous year case studies." }
  ];

  return (
    <div className="space-y-12 animation-fade-in">
      {/* Answer Writing Structure */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <PenTool size={20} className="text-[#A3B18A]" />
          <h3 className="text-[18px] font-semibold text-[#2F3E46] font-poppins">Strategic Answer Framework</h3>
        </div>
        <div className="bg-white rounded-[24px] border border-[#DAD7CD]/30 overflow-hidden">
          {answerStructure.map((item, i) => (
            <div key={i} className="p-5 flex items-start gap-4 border-b border-[#DAD7CD]/10 last:border-b-0 hover:bg-[#F4F7F5]/30 transition-all">
              <div className="w-8 h-8 rounded-full bg-[#EAF0EA] text-[#588157] flex items-center justify-center flex-shrink-0 text-[12px] font-bold">
                 {i + 1}
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-[#2F3E46] mb-1">{item.step}</h4>
                <p className="text-[12px] text-[#6B7A7A] leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Topics Grid */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Layers size={20} className="text-[#588157]" />
          <h3 className="text-[18px] font-semibold text-[#2F3E46] font-poppins">High-Impact Focus Topics</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyTopics.map((topic, i) => (
            <motion.div 
               key={i}
               whileHover={{ y: -2 }}
               className="p-5 bg-white border border-[#DAD7CD]/30 rounded-2xl flex items-center justify-between group cursor-default"
            >
              <div>
                <h4 className="text-[14px] font-semibold text-[#2F3E46] group-hover:text-[#588157] transition-colors">{topic.title}</h4>
                <span className="text-[10px] font-bold text-[#A3B18A] uppercase tracking-wider">{topic.sub}</span>
              </div>
              <CheckCircle2 size={16} className="text-[#DAD7CD] group-hover:text-[#A3B18A]" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Subject-Wise Notes List */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Layers size={20} className="text-[#A3B18A]" />
          <h3 className="text-[18px] font-semibold text-[#2F3E46] font-poppins">Curated Subject Repositories</h3>
        </div>
        <div className="space-y-4">
          {subjectWiseNotes.map((note, i) => (
            <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-[#F4F7F5]/50 border border-[#DAD7CD]/20 group hover:border-[#A3B18A]/30 transition-all cursor-pointer">
              <div className="flex flex-col gap-1 pr-4">
                <span className="text-[14px] font-semibold text-[#2F3E46] group-hover:text-[#588157] tracking-tight">{note.title}</span>
                <p className="text-[11px] text-[#6B7A7A] leading-relaxed">{note.info}</p>
              </div>
              <div className="flex-shrink-0">
                 <button className="text-[11px] font-bold text-[#A3B18A] uppercase tracking-widest hover:text-[#588157] flex items-center gap-1 transition-colors">
                    Access Repos <ChevronRight size={14} />
                 </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PYQs Component */}
      <PYQComponent type="mains" />
    </div>
  );
};

export default MainsNotes;
