import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft, Eye, Target, CheckCircle2, XCircle } from 'lucide-react';
import VisualEngine from '../../components/VisualEngine';

const PracticeTestResult = () => {
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
    const total = questions.length;
    
    let correct = 0;
    let wrong = 0;
    questions.forEach(q => {
        const userAns = answers[q.id];
        if (userAns) {
            if (userAns === q.answer) correct++;
            else wrong++;
        }
    });

    const unattempted = total - (correct + wrong);
    const accuracy = correct + wrong > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0;
    const scoreVal = correct; // 1 mark per correct

    return (
        <div className="relative w-full min-h-screen py-32 px-6 flex flex-col items-center bg-[#F4F7F5]">
            <VisualEngine />
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="max-w-3xl w-full bg-white p-10 md:p-14 rounded-[32px] border border-[#DAD7CD]/30 shadow-xl text-center relative z-10"
            >
                <div className="w-24 h-24 bg-[#EAF0EA] rounded-full flex items-center justify-center mx-auto mb-8 text-[#588157] shadow-inner">
                    <Trophy size={48} strokeWidth={1.5} />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-[#2F3E46] mb-3 font-poppins">Assessment Complete</h2>
                <p className="text-[#6B7A7A] mb-12 text-[15px]">You've successfully completed the {decodedTrack} practice drill. Here is your performance breakdown.</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="bg-[#F4F7F5] p-6 rounded-[20px] border border-[#DAD7CD]/30 flex flex-col items-center">
                        <Trophy className="text-[#A3B18A] mb-3" size={24} />
                        <p className="text-[32px] font-bold text-[#2F3E46] leading-none mb-2">{scoreVal}</p>
                        <p className="text-[11px] font-bold text-[#6B7A7A] uppercase tracking-widest">Score / {total}</p>
                    </div>
                    <div className="bg-[#EAF0EA] p-6 rounded-[20px] border border-[#588157]/20 flex flex-col items-center">
                        <CheckCircle2 className="text-[#588157] mb-3" size={24} />
                        <p className="text-[32px] font-bold text-[#588157] leading-none mb-2">{correct}</p>
                        <p className="text-[11px] font-bold text-[#588157] uppercase tracking-widest">Correct</p>
                    </div>
                    <div className="bg-red-50 p-6 rounded-[20px] border border-red-100 flex flex-col items-center">
                        <XCircle className="text-red-500 mb-3" size={24} />
                        <p className="text-[32px] font-bold text-red-600 leading-none mb-2">{wrong}</p>
                        <p className="text-[11px] font-bold text-red-600 uppercase tracking-widest">Wrong</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-[20px] border border-blue-100 flex flex-col items-center">
                        <Target className="text-blue-500 mb-3" size={24} />
                        <p className="text-[32px] font-bold text-blue-600 leading-none mb-2">{accuracy}%</p>
                        <p className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">Accuracy</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
                    <button
                        onClick={() => navigate(`/practice-tests/${encodeURIComponent(decodedTrack)}/review`)}
                        className="px-8 py-4 bg-[#588157] text-white rounded-xl font-semibold uppercase tracking-widest text-[13px] hover:bg-[#3A5A40] transition-all shadow-md shadow-[#588157]/20 flex justify-center items-center gap-3 w-full md:w-auto"
                    >
                        <Eye size={18} /> Review Answers
                    </button>
                    <button
                        onClick={() => navigate('/practice-tests')}
                        className="px-8 py-4 bg-white border border-[#DAD7CD] text-[#2F3E46] rounded-xl font-semibold uppercase tracking-widest text-[13px] hover:bg-[#F4F7F5] transition-all flex justify-center items-center gap-3 w-full md:w-auto"
                    >
                        <ArrowLeft size={18} /> Exit to Tracks
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default PracticeTestResult;
