import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { verifyEmail } from '../services/api';
import VisualEngine from '../components/VisualEngine';

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await verifyEmail(token);
                setStatus('success');
                const msg = response.data?.message || response.data;
                setMessage(typeof msg === 'string' ? msg : 'Email verified successfully!');
            } catch (error) {
                setStatus('error');
                const errMsg = error.response?.data?.message || error.response?.data;
                setMessage(typeof errMsg === 'string' ? errMsg : 'Invalid or expired verification link.');
            }
        };

        if (token) {
            verify();
        } else {
            setStatus('error');
            setMessage('No verification token provided.');
        }
    }, [token]);

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center p-4">
            <VisualEngine />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-slate-200 dark:border-white/10 shadow-2xl relative z-10 text-center"
            >
                {status === 'verifying' && (
                    <>
                        <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Verifying Email</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Please wait while we activate your account...</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20 shadow-xl shadow-green-500/10">
                            <CheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 italic">Verification Successful!</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed font-medium">
                            {message}
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/login')}
                            className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                        >
                            Log In Now
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20 shadow-xl shadow-red-500/10">
                            <XCircle className="w-10 h-10 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Verification Failed</h2>
                        <p className="text-red-500/80 text-sm mb-8 font-bold uppercase tracking-widest leading-relaxed">
                            {message}
                        </p>
                        <Link 
                            to="/signup" 
                            className="text-primary font-black hover:underline italic flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
                        >
                            Try Signing Up Again
                        </Link>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default VerifyEmail;
