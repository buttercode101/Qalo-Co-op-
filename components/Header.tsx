
import React from 'react';
import { Sun, Moon, Share2, Award } from 'lucide-react';

interface Props {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<Props> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-50 w-full glass-effect bg-white/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple to-brand-green rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center text-white shadow-xl shadow-brand-purple/30">
              <span className="font-display font-black text-xl">Q</span>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold font-display tracking-tight text-slate-900 dark:text-white leading-none">
              Qalo <span className="text-brand-purple">Co-op</span>
            </h1>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold">Wealth Suite</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-500 dark:text-slate-400">
            <Award size={12} className="text-brand-gold" />
            100% COMMUNITY TRUSTED
          </div>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            className="p-2.5 rounded-xl bg-brand-purple text-white hover:bg-brand-purpleDark shadow-lg shadow-brand-purple/20 transition-all flex items-center gap-2"
          >
            <Share2 size={18} />
            <span className="hidden sm:inline text-sm font-semibold">Invite Members</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
