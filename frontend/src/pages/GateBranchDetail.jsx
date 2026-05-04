import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, FileText, ExternalLink, Database } from 'lucide-react';
import PreparationTrackLayout from '../components/PreparationTrackLayout';
import GatePYQList from '../components/GatePYQList';

const GateBranchDetail = () => {
    const { branch } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('resources');
    const [branchData, setBranchData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Dynamically import the branch JSON data
                const data = await import(`../data/gate/${branch}.json`);
                setBranchData(data.default);
            } catch (err) {
                console.error("Failed to load branch data", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [branch]);

    if (loading) return null;

    if (!branchData) {
        return (
            <PreparationTrackLayout title="GATE" subtitle="Unknown.">
                <div className="text-center py-20">
                    <Database className="w-16 h-16 text-[#A3B18A] mx-auto mb-6 opacity-20" />
                    <h2 className="text-2xl font-bold text-[#2F3E46]">Branch Data Not Found</h2>
                    <button onClick={() => navigate('/notes/gate')} className="mt-4 text-[#588157] font-bold hover:underline">Return to Hub</button>
                </div>
            </PreparationTrackLayout>
        );
    }

    const tabs = [
        { id: 'resources', name: 'Resources', icon: BookOpen },
        { id: 'pyq', name: 'PYQ', icon: FileText }
    ];

    return (
        <PreparationTrackLayout
            title="GATE"
            subtitle={branch.toUpperCase() + "."}
            description={`Specialized resources and historical archives for ${branchData.branch}.`}
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            headerBadge={`${branch.toUpperCase()} Module`}
        >
            {activeTab === 'resources' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {branchData.subjects.map((subject) => (
                        <div key={subject.id} className="bg-white p-8 rounded-[32px] border border-[#DAD7CD]/30 shadow-sm hover:shadow-lg transition-all flex flex-col group h-full">
                            <h3 className="text-[20px] font-bold text-[#2F3E46] mb-3 font-poppins">{subject.title}</h3>
                            <p className="text-[13px] text-[#6B7A7A] mb-6 leading-relaxed flex-grow">
                                {subject.description}
                            </p>
                            
                            <div className="space-y-3 mb-8">
                                {subject.topics.map((t, i) => (
                                    <div key={i} className="flex items-center gap-3 text-[12px] font-medium text-[#6B7A7A]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#A3B18A]/40" />
                                        {t.name || t}
                                    </div>
                                ))}
                            </div>

                            <a 
                                href={subject.pdf} 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center justify-between w-full p-4 rounded-2xl bg-[#F4F7F5] border border-[#DAD7CD]/20 hover:border-[#588157]/40 transition-all group/btn"
                            >
                                <span className="text-[12px] font-bold text-[#588157]">Access Subject Guide</span>
                                <ExternalLink size={16} className="text-[#A3B18A] group-hover/btn:text-[#588157] transition-colors" />
                            </a>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'pyq' && (
                <GatePYQList branch={branch} pyqs={branchData.pyqs} />
            )}
        </PreparationTrackLayout>
    );
};

export default GateBranchDetail;
