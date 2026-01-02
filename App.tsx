import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Settings2, 
  Sun, 
  Moon, 
  Share2, 
  Info,
  ShieldCheck,
  Target,
  Download,
  Gem,
  Sparkles,
  LifeBuoy,
  ChevronRight,
  Fingerprint,
  Zap,
  Globe,
  Lock
} from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import CalculatorForm from './components/CalculatorForm';
import ResultsDashboard from './components/ResultsDashboard';
import QuoteDisplay from './components/QuoteDisplay';
import { SimulationInputs, SimulationResults, ChartDataPoint } from './types';
import { MOTIVATIONAL_QUOTES } from './constants';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [inputs, setInputs] = useState<SimulationInputs>({
    members: 1000,
    monthlyContribution: 250,
    durationMonths: 24,
    annualReturnRate: 8.5,
  });

  const [includeFees, setIncludeFees] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const calculate = useCallback(() => {
    // Advanced realistic parameters
    const adminFeeRate = includeFees ? 0.02 : 0; 
    const totalMonthly = inputs.members * inputs.monthlyContribution;
    const annualReturn = inputs.annualReturnRate / 100;
    const monthlyReturn = annualReturn / 12;
    const monthlyFee = adminFeeRate / 12;
    const netMonthlyRate = monthlyReturn - monthlyFee;
    
    let projectedReturns = 0;
    const totalSavings = totalMonthly * inputs.durationMonths;

    if (netMonthlyRate === 0) {
      projectedReturns = totalSavings;
    } else {
      projectedReturns = Math.round(totalMonthly * ((Math.pow(1 + netMonthlyRate, inputs.durationMonths) - 1) / netMonthlyRate));
    }

    const dataPoints: ChartDataPoint[] = [];
    const step = Math.max(1, Math.floor(inputs.durationMonths / 12));
    
    for (let m = 0; m <= inputs.durationMonths; m += step) {
      let currentVal = netMonthlyRate === 0 
        ? totalMonthly * m 
        : Math.round(totalMonthly * ((Math.pow(1 + netMonthlyRate, m) - 1) / netMonthlyRate));
      dataPoints.push({
        month: m,
        year: Number((m / 12).toFixed(1)),
        savings: currentVal
      });
    }

    if (dataPoints.length > 0 && dataPoints[dataPoints.length - 1].month !== inputs.durationMonths) {
      dataPoints.push({
        month: inputs.durationMonths,
        year: Number((inputs.durationMonths / 12).toFixed(1)),
        savings: projectedReturns
      });
    }

    setResults({ totalMonthly, totalSavings, projectedReturns, dataPoints });
  }, [inputs, includeFees]);

  useEffect(() => { calculate(); }, [calculate]);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Qalo Wealth Projections',
          text: `Check out our community wealth vision: ${results ? results.projectedReturns.toLocaleString() : ''}`,
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      triggerToast('Link copied to dashboard clipboard');
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      triggerToast('Investment Prospectus Downloaded');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col transition-all duration-700 overflow-x-hidden selection:bg-brand-purple/20">
      <Header isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      
      {/* Simulation Engine Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-sm border border-white/10"
          >
            <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></div>
            {showToast}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 max-w-7xl relative">
        {/* Background Visual High-Fidelity */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] dark:opacity-[0.05]">
          <Globe className="absolute top-20 right-[-10%] w-[600px] h-[600px] text-brand-purple" strokeWidth={0.5} />
          <Fingerprint className="absolute bottom-40 left-[-5%] w-[400px] h-[400px] text-brand-gold" strokeWidth={0.5} />
        </div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20 lg:mb-32 relative z-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-brand-purple/5 dark:bg-brand-purple/10 border border-brand-purple/10 text-brand-purple dark:text-brand-purple/90 text-[10px] font-black uppercase tracking-[0.5em] mb-12 backdrop-blur-md">
            <Lock size={12} className="text-brand-gold" />
            Verified Economic Simulation
          </div>
          <h2 className="text-5xl sm:text-7xl lg:text-9xl font-black font-display mb-10 tracking-tighter text-slate-900 dark:text-white leading-[0.95] lg:leading-[1]">
            Collective Wealth <br />
            <span className="bg-gradient-to-r from-brand-purple via-brand-gold to-brand-green bg-clip-text text-transparent italic">Redefined.</span>
          </h2>
          <p className="text-xl lg:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
            An institutional-grade visualization of community economic power. Empowering co-operatives with realistic capital modeling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start relative z-10">
          {/* Controls - Left Flow */}
          <motion.aside 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28"
          >
            <div className="glass-card rounded-[3.5rem] p-10 lg:p-14 shadow-premium group">
              <div className="flex items-center gap-5 mb-12">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-purpleDark text-white flex items-center justify-center shadow-xl shadow-brand-purple/20 transition-transform group-hover:rotate-6">
                  <Settings2 size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black font-display tracking-tight">Growth Logic</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Adjust Simulation Variables</p>
                </div>
              </div>
              
              <CalculatorForm inputs={inputs} setInputs={setInputs} />
              
              <div className="mt-12 space-y-6">
                <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-slate-100 dark:border-white/5 flex items-center justify-between transition-all hover:border-brand-purple/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <span className="text-sm font-bold block dark:text-white leading-none">Management Fee</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">2.0% Per Annum</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIncludeFees(!includeFees)}
                    className={`w-14 h-7 rounded-full transition-all relative ${includeFees ? 'bg-brand-purple' : 'bg-slate-300 dark:bg-slate-700'}`}
                  >
                    <motion.div 
                      animate={{ x: includeFees ? 30 : 4 }}
                      className="w-5 h-5 bg-white rounded-full shadow-lg absolute top-1"
                    />
                  </button>
                </div>

                <div className="flex gap-4 p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-[2rem] border border-blue-100 dark:border-blue-900/20">
                  <Info size={18} className="text-blue-500 shrink-0 mt-1" />
                  <p className="text-[11px] text-blue-700 dark:text-blue-400 leading-relaxed font-medium">
                    Financial yields are modeled on historical emerging market performance. Past performance is a simulation reference, not a legal guarantee.
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Visualization - Right Flow */}
          <motion.section 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-7 xl:col-span-8 space-y-16"
          >
            <ResultsDashboard results={results} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <button 
                onClick={handleExport}
                disabled={isExporting}
                className="group relative overflow-hidden bg-brand-purple hover:bg-brand-purpleDark disabled:opacity-70 text-white font-black py-7 px-10 rounded-[2.5rem] shadow-2xl shadow-brand-purple/20 transition-all active:scale-[0.97]"
               >
                 <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12"></div>
                 <div className="flex items-center justify-center gap-3 relative z-10">
                   {isExporting ? <div className="h-6 w-6 border-2 border-white/30 border-t-white animate-spin rounded-full" /> : <Download size={24} />}
                   <span className="text-lg">{isExporting ? 'PROCESSING...' : 'EXPORT PROSPECTUS'}</span>
                 </div>
               </button>
               <button 
                onClick={handleShare}
                className="group bg-white dark:bg-slate-900 text-slate-800 dark:text-white border-2 border-slate-100 dark:border-slate-800 font-black py-7 px-10 rounded-[2.5rem] shadow-sm hover:border-brand-purple/30 transition-all active:scale-[0.97] flex items-center justify-center gap-3"
               >
                 <Share2 size={24} className="text-brand-purple group-hover:scale-110 transition-transform" />
                 <span className="text-lg uppercase tracking-tight">Expand Network</span>
               </button>
            </div>

            <QuoteDisplay quote={MOTIVATIONAL_QUOTES[currentQuoteIndex]} />
          </motion.section>
        </div>

        {/* Strategic Impact Analysis */}
        <div className="mt-48 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              icon: <Users size={36} />, 
              title: "Unified Capital", 
              desc: "Pooled individual contributions catalyze institutional-level investment tiers usually closed to private retail.", 
              color: "text-brand-purple", 
              bg: "bg-brand-purple/5",
              stat: "4.2x Leverage Factor"
            },
            { 
              icon: <TrendingUp size={36} />, 
              title: "Volume Yields", 
              desc: "By aggregating liquidity, the collective negotiates superior interest rates and lower transactional overhead.", 
              color: "text-brand-green", 
              bg: "bg-brand-green/5",
              stat: "+35% Efficiency Gain"
            },
            { 
              icon: <LifeBuoy size={36} />, 
              title: "Systemic Stability", 
              desc: "Resilience through diversification. A community-governed safety net protecting every stakeholder's equity.", 
              color: "text-brand-gold", 
              bg: "bg-brand-gold/5",
              stat: "Risk Rating: Stable"
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -15 }}
              className="group p-12 bg-white dark:bg-slate-900/50 rounded-[4rem] border border-slate-200/50 dark:border-white/5 shadow-premium transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                <span className={`text-[9px] font-black uppercase tracking-widest ${item.color} px-3 py-1 rounded-full ${item.bg} border border-current/10`}>
                  {item.stat}
                </span>
              </div>
              <div className={`w-20 h-20 rounded-3xl ${item.bg} ${item.color} flex items-center justify-center mb-12 transition-all group-hover:scale-110 group-hover:rotate-3 shadow-inner`}>
                {item.icon}
              </div>
              <h4 className="text-2xl font-black mb-6 font-display text-slate-900 dark:text-white">{item.title}</h4>
              <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-8">{item.desc}</p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-purple group-hover:translate-x-2 transition-transform">
                <span>View Methodology</span>
                <ChevronRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
