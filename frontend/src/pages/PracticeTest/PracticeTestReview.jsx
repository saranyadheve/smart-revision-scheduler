import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import VisualEngine from '../../components/VisualEngine';

const PracticeTestReview = () => {
    const { track } = useParams();
    const navigate = useNavigate();
    const decodedTrack = track ? decodeURIComponent(track) : '';

    const [result, setResult] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem(`practice_result_${decodedTrack}`);
        if (data) {
            setResult(JSON.parse(data));
        } else {
            navigate('/practice-tests');
        }
    }, [decodedTrack, navigate]);

    if (!result) return null;

    const { questions, answers } = result;

    return (
        <div className="relative w-full min-h-screen pt-24 pb-12 px-6 flex flex-col items-center bg-[#F4F7F5]">
            <VisualEngine />
            <div className="max-w-4xl w-full relative z-10">
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-6 rounded-2xl border border-[#DAD7CD]/30 shadow-sm">
                    <div>
                        <h1 className="text-2xl font-bold text-[#2F3E46] font-poppins mb-1">Detailed Review</h1>
                        <p className="text-[14px] text-[#6B7A7A]">Review your attempted answers vs the correct solutions.</p>
                    </div>
                    <button
                        onClick={() => navigate(`/practice-tests/${encodeURIComponent(decodedTrack)}/result`)}
                        className="px-6 py-3 bg-[#EAF0EA] text-[#588157] rounded-xl font-semibold uppercase tracking-widest text-[12px] hover:bg-[#588157] hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={16} /> Back to Score
                    </button>
                </header>

                <div className="space-y-6">
                    {questions.map((q, i) => {
                        const userAns = answers[q.id];
                        const isAttempted = !!userAns;
                        const isCorrect = userAns === q.answer;

                        return (
                            <div key={i} className="bg-white p-6 md:p-8 rounded-2xl border border-[#DAD7CD]/30 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-[12px] font-bold text-[#fff] bg-[#2F3E46] px-3 py-1 rounded-md uppercase tracking-wider">
                                        Q {i + 1}
                                    </span>
                                    {isAttempted ? (
                                        isCorrect ? (
                                            <span className="flex items-center gap-1.5 text-[12px] font-bold text-[#588157] bg-[#EAF0EA] px-3 py-1 rounded-md uppercase tracking-wider">
                                                <CheckCircle2 size={14} /> Correct
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 text-[12px] font-bold text-red-600 bg-red-50 px-3 py-1 rounded-md uppercase tracking-wider">
                                                <XCircle size={14} /> Incorrect
                                            </span>
                                        )
                                    ) : (
                                        <span className="flex items-center gap-1.5 text-[12px] font-bold text-[#6B7A7A] bg-[#F4F7F5] px-3 py-1 rounded-md uppercase tracking-wider">
                                            Not Attempted
                                        </span>
                                    )}
                                </div>
                                
                                <h3 className="text-lg font-semibold text-[#2F3E46] mb-6 leading-relaxed bg-[#F4F7F5]/50 p-4 rounded-xl">
                                    {q.question}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {q.options.map((opt, idx) => {
                                        const isActualCorrect = opt === q.answer;
                                        const isUserSelected = opt === userAns;
                                        
                                        let styleClass = "border-[#DAD7CD]/40 text-[#6B7A7A] bg-[#F4F7F5]/30";
                                        
                                        if (isActualCorrect) {
                                            styleClass = "border-[#588157] bg-[#EAF0EA] text-[#588157] font-semibold ring-1 ring-[#588157]";
                                        } else if (isUserSelected && !isActualCorrect) {
                                            styleClass = "border-red-300 bg-red-50 text-red-600 font-medium";
                                        }

                                        return (
                                            <div key={idx} className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${styleClass}`}>
                                                <div className="mt-0.5">
                                                    {isActualCorrect ? <CheckCircle2 size={18} className="text-[#588157]" /> : isUserSelected ? <XCircle size={18} className="text-red-500" /> : <div className="w-[18px] h-[18px] border-2 border-current rounded-full opacity-30" />}
                                                </div>
                                                <span className="text-[14px] leading-relaxed">{opt}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {q.explanation && (
                                    <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-5 text-[14px] text-amber-900/80 leading-relaxed">
                                        <span className="font-semibold text-amber-600 uppercase text-[11px] tracking-widest block mb-2">Explanation</span>
                                        {q.explanation}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PracticeTestReview;
