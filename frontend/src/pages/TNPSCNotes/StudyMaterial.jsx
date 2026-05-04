import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Link, ArrowRight, ExternalLink, Library, BellRing, Sparkles } from 'lucide-react';
import data from '../../data/tnpsc/study-material.json';

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
    <div className="space-y-16 py-4">
      {/* 1. Notification Hub */}
      <section>
        <SectionHeader 
          icon={BellRing} 
          title="Notification Hub" 
          subtitle="Direct links to official TNPSC exam dashboards and annual planners."
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
              className="group flex items-center justify-between p-5 bg-white border border-[#DAD7CD]/40 rounded-[20px] hover:border-[#588157]/40 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="flex flex-col gap-1 pointer-events-none">
                <span className="text-[14px] font-bold text-[#2F3E46]">{item.name}</span>
                <span className="text-[10px] text-[#A3B18A] font-black uppercase tracking-widest">tnpsc.gov.in</span>
              </div>
              <div className="p-2 rounded-lg bg-[#F4F7F5] text-[#6B7A7A] group-hover:text-[#588157] transition-all pointer-events-none">
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
          title="Where to Study" 
          subtitle="Curated list of trusted preparation sources and fundamental textbooks."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-0 md:ml-[52px]">
          {data.whereToStudy.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="block bg-white p-7 rounded-[24px] border border-[#DAD7CD]/30 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden active:scale-[0.98]"
            >
              <div className="relative z-10 pointer-events-none">
                <h3 className="text-[18px] font-bold text-[#2F3E46] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#A3B18A] rounded-full" />
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#6B7A7A] leading-relaxed mb-6 italic">"{item.description}"</p>
                <div className="inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-[#588157] group-hover:gap-4 transition-all">
                  Access Resource <ArrowRight size={14} />
                </div>
              </div>
              <BookOpen className="absolute -bottom-4 -right-4 w-24 h-24 opacity-[0.03] group-hover:scale-110 transition-transform pointer-events-none" />
            </motion.a>
          ))}
        </div>
      </section>

      {/* 3. Important Links */}
      <section>
        <SectionHeader 
          icon={Link} 
          title="Important Links" 
          subtitle="Official portals and administrative gateways for candidates."
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
              className="flex flex-col gap-4 p-6 bg-[#F4F7F5]/50 border border-[#DAD7CD]/20 rounded-[24px] hover:bg-white hover:shadow-lg hover:border-[#588157]/20 transition-all border-b-4 border-b-[#DAD7CD]/40 hover:border-b-[#588157]/40"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#A3B18A] shadow-sm">
                 <Sparkles size={18} />
              </div>
              <span className="text-[15px] font-bold text-[#2F3E46] leading-tight">{item.name}</span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <div className="ml-0 md:ml-[52px] mt-12 p-8 bg-[#2F3E46] rounded-[32px] text-white relative overflow-hidden group shadow-2xl">
         <div className="relative z-10 max-w-xl">
            <h3 className="text-[22px] font-bold mb-3 font-poppins">Official Compliance</h3>
            <p className="text-[14px] opacity-80 mb-6 leading-relaxed">
              We recommend users always cross-verify notifications on the official TNPSC portal. These links are provided for easier access to public information.
            </p>
            <div className="flex gap-4">
               <button 
                 onClick={() => window.open('https://www.tnpsc.gov.in', '_blank')}
                 className="bg-emerald-500 px-8 py-3 rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg active:scale-95"
               >
                  Official Portal
               </button>
            </div>
         </div>
         <ShieldCheck className="absolute top-1/2 -translate-y-1/2 -right-12 w-64 h-64 opacity-5 group-hover:rotate-12 transition-transform" />
      </div>
    </div>
  );
};

const ShieldCheck = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export default StudyMaterial;
