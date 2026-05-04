import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Link, ArrowRight, ExternalLink, Library, BellRing, Sparkles, ShieldCheck } from 'lucide-react';
import data from '../../data/upsc/study-material.json';

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-xl bg-[#EAF0EA] flex items-center justify-center text-[#588157]">
        <Icon size={20} />
      </div>
      <h2 className="text-[22px] font-bold text-[#2F3E46] font-poppins tracking-tight">{title}</h2>
    </div>
    <p className="text-[13px] text-[#6B7A7A] ml-[52px] leading-relaxed">{subtitle}</p>
  </div>
);

const StudyMaterial = () => {
  return (
    <div className="space-y-16 py-4 animation-fade-in">
      {/* 1. Notification Hub */}
      <section>
        <SectionHeader 
          icon={BellRing} 
          title="UPSC Notification Hub" 
          subtitle="Official announcements, exam calendars, and active examination portals."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-0 md:ml-[52px]">
          {data.notificationHub.map((item, index) => (
            <motion.a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-5 bg-white border border-[#DAD7CD]/40 rounded-[20px] group hover:border-[#588157]/40 hover:shadow-md transition-all"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[14px] font-bold text-[#2F3E46]">{item.name}</span>
                <span className="text-[10px] text-[#A3B18A] font-black uppercase tracking-widest text-emerald-600">upsc.gov.in</span>
              </div>
              <div className="p-2 rounded-lg bg-[#F4F7F5] text-[#6B7A7A] group-hover:text-[#588157] transition-all">
                <ExternalLink size={14} />
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* 2. Where to Study */}
      <section>
        <SectionHeader 
          icon={Library} 
          title="Strategic Resources" 
          subtitle="Core textbooks and official government reports for competitive edge."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-0 md:ml-[52px]">
          {data.whereToStudy.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-7 rounded-[24px] border border-[#DAD7CD]/30 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-[18px] font-bold text-[#2F3E46] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#A3B18A] rounded-full" />
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#6B7A7A] leading-relaxed mb-6 italic">"{item.description}"</p>
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-[#588157] group-hover:gap-4 transition-all"
                >
                  Access Source <ArrowRight size={14} />
                </a>
              </div>
              <BookOpen className="absolute -bottom-4 -right-4 w-24 h-24 opacity-[0.03] group-hover:scale-110 transition-transform" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Important Links */}
      <section>
        <SectionHeader 
          icon={Link} 
          title="Important Gateways" 
          subtitle="Direct access to UPSC portals, applications, and archive systems."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-0 md:ml-[52px]">
          {data.importantLinks.map((item, index) => (
            <motion.a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col gap-4 p-6 bg-[#EAF0EA]/30 border border-[#DAD7CD]/20 rounded-[24px] hover:bg-white hover:shadow-lg hover:border-[#588157]/20 transition-all border-b-4 border-b-[#DAD7CD]/40 hover:border-b-[#588157]/40"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#A3B18A] shadow-sm">
                 <Sparkles size={18} />
              </div>
              <span className="text-[15px] font-bold text-[#2F3E46] leading-tight">{item.name}</span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* UPSC Specific Disclaimer */}
      <div className="ml-0 md:ml-[52px] mt-12 p-8 bg-[#2F3E46] rounded-[32px] text-white relative overflow-hidden group shadow-2xl">
         <div className="relative z-10 max-w-xl">
            <h3 className="text-[22px] font-bold mb-3 font-poppins text-emerald-400">Strategic Compliance</h3>
            <p className="text-[14px] opacity-80 mb-6 leading-relaxed font-inter">
              The Union Public Service Commission (UPSC) remains the definitive authority for all examination data. These resources are curated to assist your navigation through official channels.
            </p>
            <div className="flex gap-4">
               <button 
                 onClick={() => window.open('https://www.upsc.gov.in', '_blank')}
                 className="bg-[#A3B18A] px-8 py-3 rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-white hover:text-[#588157] transition-all shadow-lg active:scale-95"
               >
                  Official UPSC Portal
               </button>
            </div>
         </div>
         <ShieldCheck className="absolute top-1/2 -translate-y-1/2 -right-12 w-64 h-64 opacity-5 group-hover:rotate-12 transition-transform" />
      </div>
    </div>
  );
};

export default StudyMaterial;
