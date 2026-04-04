import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Lightbulb, RotateCcw, ChevronRight } from 'lucide-react';

/**
 * QuestionCard — Reusable question display & interaction component.
 *
 * Props:
 * ┌─────────────────┬─────────────────────────────────────────────────────────┐
 * │ question        │ object  — A question entry from questions.js / pyqData  │
 * │ index           │ number  — Display index (1-based), optional             │
 * │ mode            │ string  — "interactive" | "review" | "readonly"         │
 * │                 │   interactive: user can select, answer revealed on pick │
 * │                 │   review: show correct answer highlighted (post-quiz)   │
 * │                 │   readonly: show question + options, no interaction     │
 * │ selectedAnswer  │ string  — Controlled selected answer (review mode)      │
 * │ onAnswer        │ fn(opt) — Called when user selects an option             │
 * │ onNext          │ fn()    — Called when "Next" button is clicked           │
 * │ showNext        │ bool    — Whether to show Next button                   │
 * │ isLast          │ bool    — Changes Next label to "Finish"                │
 * └─────────────────┴─────────────────────────────────────────────────────────┘
 */

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

const QuestionCard = ({
  question,
  index = null,
  mode = 'interactive',
  selectedAnswer = null,
  onAnswer,
  onNext,
  showNext = false,
  isLast = false,
}) => {
  // Internal state for standalone/interactive mode
  const [localSelected, setLocalSelected] = useState(null);
  const [localRevealed, setLocalRevealed] = useState(false);

  if (!question) return null;

  // Determine which answer is "selected" based on mode
  const isControlled = selectedAnswer !== null;
  const picked = isControlled ? selectedAnswer : localSelected;
  const revealed = isControlled ? true : localRevealed;

  const handleSelect = (opt) => {
    if (mode === 'readonly') return;
    if (revealed) return; // Prevent changing after reveal

    if (!isControlled) {
      setLocalSelected(opt);
      setLocalRevealed(true);
    }
    if (onAnswer) onAnswer(opt);
  };

  const handleReset = () => {
    setLocalSelected(null);
    setLocalRevealed(false);
  };

  const getOptionStyle = (opt) => {
    const isSelected = picked === opt;
    const isCorrect = opt === question.answer;

    // Read-only: no colours, just subtle hover
    if (mode === 'readonly') {
      return isSelected
        ? 'border-primary bg-primary/10 text-slate-800 dark:text-white'
        : 'border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:border-primary/40 hover:bg-primary/5 cursor-pointer';
    }

    // Not yet answered
    if (!revealed) {
      return `border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-white/5
        text-slate-600 dark:text-slate-300
        hover:border-primary/50 hover:bg-primary/5 hover:text-slate-800 dark:hover:text-white
        cursor-pointer active:scale-[0.98]`;
    }

    // Answered: highlight correct / wrong
    if (isCorrect) {
      return 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 shadow-lg shadow-emerald-500/10';
    }
    if (isSelected && !isCorrect) {
      return 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 opacity-80';
    }
    return 'border-slate-200/30 dark:border-white/5 bg-white/30 dark:bg-white/5 text-slate-400 dark:text-slate-500 opacity-40';
  };

  const isCorrectAnswer = picked === question.answer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-[2.5rem] border border-slate-200/20 dark:border-white/5 bg-white/40 dark:bg-white/5 backdrop-blur-3xl shadow-2xl overflow-hidden"
    >
      {/* ── Card Header ── */}
      <div className="px-8 pt-8 pb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {index !== null && (
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-black text-sm italic shadow-lg shadow-primary/30 flex-shrink-0">
              {index}
            </div>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            {question.course && (
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-widest">
                {question.course}
              </span>
            )}
            {question.topic && (
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 text-[9px] font-black uppercase tracking-widest">
                {question.topic.replace(/-/g, ' ')}
              </span>
            )}
            {question.difficulty && (
              <div className="flex items-center gap-0.5" title={`Difficulty: ${question.difficulty}/5`}>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i < question.difficulty ? 'bg-primary' : 'bg-slate-200 dark:bg-white/10'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reset button — only in standalone interactive mode */}
        {mode === 'interactive' && !isControlled && revealed && (
          <button
            onClick={handleReset}
            title="Try again"
            className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-primary hover:border-primary/30 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── Question Text ── */}
      <div className="px-8 pb-6">
        <p className="text-lg md:text-xl font-bold text-slate-800 dark:text-white leading-relaxed italic tracking-tight">
          {question.question}
        </p>
      </div>

      {/* ── Options Grid ── */}
      <div className="px-8 pb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {question.options.map((opt, i) => {
          const isSelected = picked === opt;
          const isCorrect = opt === question.answer;

          return (
            <motion.button
              key={opt}
              whileTap={!revealed && mode !== 'readonly' ? { scale: 0.97 } : {}}
              onClick={() => handleSelect(opt)}
              disabled={revealed && mode !== 'readonly'}
              className={`p-4 rounded-2xl border text-left flex items-center gap-4 transition-all duration-200 group ${getOptionStyle(opt)}`}
            >
              {/* Option label badge */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 transition-all ${
                revealed
                  ? isCorrect
                    ? 'bg-emerald-500 text-white'
                    : isSelected
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-200 dark:bg-white/10 text-slate-400'
                  : 'bg-slate-100 dark:bg-white/10 text-slate-500 group-hover:bg-primary/20 group-hover:text-primary'
              }`}>
                {OPTION_LABELS[i]}
              </div>

              {/* Option text */}
              <span className="flex-grow font-semibold text-sm leading-snug">{opt}</span>

              {/* Correct / wrong icons */}
              {revealed && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
              {revealed && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />}
            </motion.button>
          );
        })}
      </div>

      {/* ── Explanation (revealed after answering) ── */}
      <AnimatePresence>
        {revealed && question.explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden px-8"
          >
            <div className={`mb-6 p-5 rounded-2xl border flex items-start gap-4 ${
              isCorrectAnswer
                ? 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20'
                : 'bg-amber-50 dark:bg-amber-500/5 border-amber-200 dark:border-amber-500/20'
            }`}>
              <Lightbulb className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                isCorrectAnswer ? 'text-emerald-500' : 'text-amber-500'
              }`} />
              <div>
                <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${
                  isCorrectAnswer ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                }`}>
                  {isCorrectAnswer ? '✓ Correct!' : `✗ Correct Answer: ${question.answer}`}
                </p>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-2 border-current pl-3">
                  {question.explanation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Next Button (quiz-mode) ── */}
      {showNext && (
        <div className="px-8 pb-8 flex justify-end">
          <button
            onClick={onNext}
            disabled={!revealed && mode !== 'readonly'}
            className={`flex items-center gap-3 px-7 py-3.5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all ${
              revealed || mode === 'readonly'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:scale-105 shadow-xl'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 opacity-50 cursor-not-allowed'
            }`}
          >
            {isLast ? 'Finish' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default QuestionCard;
