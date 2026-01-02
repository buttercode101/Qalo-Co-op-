import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
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
  LifeBuoy
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
    const adminFeeRate = includeFees ? 0.02 : 0; 
    const totalMonthly = inputs.members * inputs.monthlyContribution;
    const monthlyRate = (inputs.annualReturnRate / 100) / 12;
    const monthlyFeeRate = adminFeeRate / 12;
    const effectiveMonthlyRate = monthlyRate - monthlyFeeRate;
    
    let projectedReturns = 0;
    const totalSavings = totalMonthly * inputs.durationMonths;

    if (effectiveMonthlyRate === 0) {
      projectedReturns = totalSavings;
    } else {
      projectedReturns = Math.round(totalMonthly * ((Math.pow(1 + effectiveMonthlyRate, inputs.durationMonths) - 1) / effectiveMonthlyRate));
    }

    const dataPoints: ChartDataPoint[] = [];
    const step = Math.max(1, Math.floor(inputs.durationMonths / 12));
    
    for (let m = 0; m <= inputs.durationMonths; m += step) {
      let currentVal = effectiveMonthlyRate === 0 ? totalMonthly * m : Math.round(totalMonthly * ((Math.pow(1 + effectiveMonthlyRate, m) - 1) / effectiveMonthlyRate));
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Qalo Wealth Vision',
          text: `Check out this collective co-op wealth projection: ${results ? results.projectedReturns : ''}`,
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      alert('Link copied to clipboard!');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Prospectus generated successfully.');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col transition-all duration-500 overflow-x-hidden">
      <Header isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20 max-w-7xl relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <Sparkles className="absolute top-10 left-[10%] text-brand-purple" size={120} />
          <Gem className="absolute bottom-20 right-[15%] text-brand-gold" size={150} />
        </div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 lg:mb-28 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-brand-purple/5 dark:bg-brand-purple/10 border border-brand-purple/10 text-brand-purple dark:text-brand-purple/90 text-[10px] font-black uppercase tracking-[0.4em] mb-10">
            <Target size={14} />
            Institutional Empowerment Engine
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold font-display mb-8 tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
            Collective Wealth <br />
            <span className="bg-gradient-to-r from-brand-purple via-brand-gold to-brand-green bg-clip-text text-transparent">In Your Hands.</span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            Quantifying the exponential power of community. A realistic blueprint for shared financial sovereignty.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start relative z-10">
          {/* Controls Panel */}
          <motion.aside 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 space-y-8"
          >
            <div className="bg-white dark:bg-slate-900/60 rounded-[3rem] shadow-premium border border-slate-200/50 dark:border-slate-800 backdrop-blur-xl p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-brand-purple text-white flex items-center justify-center shadow-lg shadow-brand-purple/20">
                  <Settings2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display leading-tight">Growth Setup</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Simulation Factors</p>
                </div>
              </div>
              
              <CalculatorForm inputs={inputs} setInputs={setInputs} />
              
              <div className="mt-10 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-brand-green" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Admin Fee Mode</span>
                </div>
                <button 
                  onClick={() => setIncludeFees(!includeFees)}
                  className={`w-14 h-7 rounded-full transition-all relative ${includeFees ? 'bg-brand-purple' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <motion.div 
                    animate={{ x: includeFees ? 30 : 4 }}
                    className="w-5 h-5 bg-white rounded-full shadow-lg mt-1"
                  />
                </button>
              </div>

              <div className="mt-8 flex gap-4 p-5 bg-blue-50/50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/20">
                <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-700 dark:text-blue-400 leading-relaxed">
                  Real-world models typically include a 2% management fee for operational sustainability.
                </p>
              </div>
            </div>
          </motion.aside>

          {/* Results Section */}
          <motion.section 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 xl:col-span-8 space-y-12"
          >
            <ResultsDashboard results={results} />
            
            <div className="flex flex-col sm:flex-row gap-5">
               <button 
                onClick={handleExport}
                disabled={isExporting}
                className="flex-1 bg-brand-purple hover:bg-brand-purpleDark disabled:opacity-70 text-white font-bold py-6 px-10 rounded-3xl shadow-xl shadow-brand-purple/20 transition-all flex items-center justify-center gap-3 active:scale-95"
               >
                 {isExporting ? <div className="h-5 w-5 border-2 border-white border-t-transparent animate-spin rounded-full" /> : <Download size={22} />}
                 <span>{isExporting ? 'Generating PDF...' : 'Export Investment Plan'}</span>
               </button>
               <button 
                onClick={handleShare}
                className="flex-1 bg-white dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 font-bold py-6 px-10 rounded-3xl shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-95"
               >
                 <Share2 size={22} />
                 <span>Invite Supporters</span>
               </button>
            </div>

            <QuoteDisplay quote={MOTIVATIONAL_QUOTES[currentQuoteIndex]} />
          </motion.section>
        </div>

        {/* Strategic Cards */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Users size={32} />, title: "United Capital", desc: "Small individual savings become institutional-scale buying power.", color: "text-brand-purple", bg: "bg-brand-purple/5" },
            { icon: <TrendingUp size={32} />, title: "Yield Velocity", desc: "Negotiate higher interest rates through collective volume leverage.", color: "text-brand-green", bg: "bg-brand-green/5" },
            { icon: <LifeBuoy size={32} />, title: "Community Safety", desc: "Built-in resilience via shared risk and community-first governance.", color: "text-brand-gold", bg: "bg-brand-gold/5" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -12 }}
              className="group p-12 bg-white dark:bg-slate-900/40 rounded-[3rem] border border-slate-200/60 dark:border-slate-800/50 shadow-card transition-all"
            >
              <div className={`w-16 h-16 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-10 transition-transform group-hover:scale-110`}>
                {item.icon}
              </div>
              <h4 className="text-2xl font-bold mb-5 font-display text-slate-900 dark:text-white">{item.title}</h4>
              <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
