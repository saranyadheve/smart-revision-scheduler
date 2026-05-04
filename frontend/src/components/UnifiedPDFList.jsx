import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, Search, Filter, Sparkles } from 'lucide-react';

const UnifiedPDFList = ({ title, type, group, files }) => {
    const [search, setSearch] = useState('');

    const filteredFiles = files.filter(f => 
        f.name.toLowerCase().includes(search.toLowerCase()) || 
        f.title.toLowerCase().includes(search.toLowerCase())
    );

    const getPath = (fileName) => {
        // Updated to use the public/pyq root folder 
        if (group) {
            return `/pyq/tnpsc/${group}/${fileName}`;
        }
        return `/pyq/${type}/${fileName}`;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-[#DAD7CD]/30 shadow-sm">
                <div className="flex items-center gap-3 px-2">
                    <Filter size={18} className="text-[#588157]" />
                    <span className="text-[13px] font-bold text-[#2F3E46]">{title}</span>
                </div>
                <div className="relative flex-grow max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#DAD7CD]" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search files..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#F4F7F5] pl-10 pr-4 py-2.5 rounded-2xl text-[13px] outline-none focus:ring-2 focus:ring-[#588157]/20 transition-all font-medium"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFiles.map((file, i) => (
                    <motion.div 
                        key={file.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white p-6 rounded-[32px] border border-[#DAD7CD]/20 shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-[#F4F7F5] rounded-2xl text-[#588157] group-hover:bg-[#588157] group-hover:text-white transition-all">
                                <FileText size={24} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#A3B18A] px-2 py-1 bg-[#F4F7F5] rounded-lg">PDF</span>
                        </div>
                        <h4 className="text-[15px] font-bold text-[#2F3E46] mb-1 line-clamp-2">{file.title}</h4>
                        <p className="text-[11px] text-[#6B7A7A] mb-6 font-medium italic opacity-70">{file.name}</p>
                        
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <a 
                                    href={getPath(file.name)} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex-grow bg-[#588157]/10 text-[#588157] py-3 rounded-xl text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-[#588157] hover:text-white transition-all shadow-sm"
                                >
                                    <ExternalLink size={14} /> View
                                </a>
                                <a 
                                    href={getPath(file.name)} 
                                    download
                                    className="p-3 bg-[#F4F7F5] text-[#6B7A7A] rounded-xl hover:bg-[#DAD7CD] hover:text-[#2F3E46] transition-all"
                                >
                                    <Download size={14} />
                                </a>
                            </div>
                            <button 
                                onClick={() => window.location.hash = `/learning-hub`}
                                className="w-full bg-[#2F3E46] text-white py-3 rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg"
                            >
                                <Sparkles size={14} className="text-[#A3B18A]" /> AI Study Room
                            </button>

                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredFiles.length === 0 && (
                <div className="py-20 text-center bg-white rounded-[40px] border border-dashed border-[#DAD7CD]/40">
                    <Search size={48} className="mx-auto text-[#DAD7CD] mb-4 opacity-30" />
                    <p className="text-[#6B7A7A] font-bold uppercase tracking-widest text-[13px]">No files found matching "{search}"</p>
                </div>
            )}
        </div>
    );
};

export default UnifiedPDFList;
