import React from 'react';
import { Quote, Sparkle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  quote: string;
}

const QuoteDisplay: React.FC<Props> = ({ quote }) => {
  return (
    <div className="relative py-4">
      <div className="absolute -inset-2 bg-gradient-to-r from-brand-purple via-brand-gold to-brand-green rounded-[4rem] blur-2xl opacity-10"></div>
      
      <div className="relative bg-white dark:bg-slate-900 p-12 lg:p-16 rounded-[4rem] border border-slate-50 dark:border-slate-800 shadow-2xl text-center overflow-hidden">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
           <Sparkle className="absolute top-10 left-10 text-brand-gold/10" size={32} />
           <Sparkle className="absolute bottom-10 right-10 text-brand-purple/10" size={48} />
        </div>

        <div className="flex justify-center mb-10">
          <div className="w-16 h-16 rounded-[2rem] bg-brand-purple/5 dark:bg-brand-purple/10 flex items-center justify-center text-brand-purple">
            <Quote size={32} fill="currentColor" strokeWidth={0} />
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={quote}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.02 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="relative"
          >
            <p className="text-3xl lg:text-4xl font-display font-extrabold text-slate-900 dark:text-white leading-[1.3] mb-10 tracking-tight">
              {quote}
            </p>
          </motion.div>
        </AnimatePresence>
        
        <div className="flex flex-col items-center">
          <div className="h-1 w-16 bg-gradient-to-r from-brand-gold to-transparent rounded-full mb-4"></div>
          <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-gold mb-1">Nthabeleng Likotsi</span>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Co-operative Banking Visionary</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteDisplay;