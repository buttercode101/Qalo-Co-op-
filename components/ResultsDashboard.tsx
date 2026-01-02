import React from 'react';
import { SimulationResults } from '../types';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TrendingUp, ArrowUpRight, Coins, Activity, Zap, Building2, Landmark, GraduationCap, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props { results: SimulationResults | null; }

const formatCurrency = (val: number) => new Intl.NumberFormat('en-ZA', { 
  style: 'currency', 
  currency: 'ZAR', 
  maximumFractionDigits: 0 
}).format(val);

const ResultsDashboard: React.FC<Props> = ({ results }) => {
  if (!results) return null;
  const growth = ((results.projectedReturns / results.totalSavings - 1) * 100).toFixed(1);
  const profit = results.projectedReturns - results.totalSavings;

  const milestones = [
    { label: "Community Manufacturing Hub", val: 10000000, icon: <Building2 size={18} /> },
    { label: "Co-operative Development Bank", val: 50000000, icon: <Landmark size={18} /> },
    { label: "National Prosperity Endowment", val: 150000000, icon: <GraduationCap size={18} /> },
  ];

  return (
    <div className="space-y-12">
      {/* Primary Value Display */}
      <motion.div 
        layout 
        className="relative overflow-hidden bg-slate-950 p-12 lg:p-16 rounded-[4.5rem] shadow-premium border border-white/10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/40 via-transparent to-brand-green/20 opacity-40"></div>
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-12">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="px-4 py-1.5 rounded-full bg-brand-green/20 text-brand-green text-[10px] font-black uppercase tracking-[0.3em] border border-brand-green/30 backdrop-blur-md">
                Projected Capitalization
              </span>
              <Activity size={18} className="text-white/30 animate-pulse" />
            </div>
            <div className="space-y-3">
              <span className="text-sm font-bold text-white/50 uppercase tracking-[0.4em]">Collective Asset Value</span>
              <h3 className="text-6xl sm:text-8xl font-black text-white tracking-tighter tabular-nums leading-none">
                {formatCurrency(results.projectedReturns)}
              </h3>
            </div>
            <p className="text-slate-400 text-xl font-medium flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                <Zap size={20} fill="currentColor" />
              </div>
              United vision transformed into liquid equity.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-3xl shadow-inner min-w-[240px]">
            <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Total Realized Yield</span>
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-brand-green tracking-tight">+{growth}%</span>
                <span className="text-xl font-bold text-white/80 tabular-nums">ROI</span>
              </div>
              <p className="text-sm font-bold text-slate-400">{formatCurrency(profit)} Net Gain</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-200/50 dark:border-white/5 shadow-premium flex items-center justify-between group hover:border-brand-green/30 transition-all">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Monthly System Inflow</span>
            <span className="text-4xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">{formatCurrency(results.totalMonthly)}</span>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-inner">
            <ArrowUpRight size={32} />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-200/50 dark:border-white/5 shadow-premium flex items-center justify-between group hover:border-brand-purple/30 transition-all">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Principal Contributions</span>
            <span className="text-4xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">{formatCurrency(results.totalSavings)}</span>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-inner">
            <Coins size={32} />
          </div>
        </div>
      </div>

      {/* Progress Milestones */}
      <div className="bg-white dark:bg-slate-900 p-12 rounded-[4rem] border border-slate-200/50 dark:border-white/5 shadow-premium">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center">
            <Target size={20} />
          </div>
          <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Sovereignty Readiness Milestones</h4>
        </div>
        <div className="space-y-10">
          {milestones.map((m, idx) => {
            const prog = Math.min(100, (results.projectedReturns / m.val) * 100);
            return (
              <div key={idx} className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold">
                  <div className="flex items-center gap-4 text-slate-700 dark:text-slate-200">
                    <div className={`${prog >= 100 ? 'text-brand-green bg-brand-green/10' : 'text-slate-400 bg-slate-100 dark:bg-slate-800'} p-2 rounded-xl transition-colors`}>
                      {m.icon}
                    </div>
                    {m.label}
                  </div>
                  <span className={prog >= 100 ? "text-brand-green" : "text-slate-500 font-mono tracking-tighter"}>
                    {prog >= 100 ? "UNLOCKED" : `${prog.toFixed(1)}%`}
                  </span>
                </div>
                <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${prog}%` }} 
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full rounded-full ${prog >= 100 ? 'bg-gradient-to-r from-brand-green to-emerald-400' : 'bg-gradient-to-r from-brand-purple to-fuchsia-500'}`} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-slate-900 p-12 lg:p-16 rounded-[4.5rem] border border-slate-200/50 dark:border-white/5 shadow-premium">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-8">
          <div>
            <h4 className="text-3xl font-black font-display tracking-tight dark:text-white">Capital Velocity Analysis</h4>
            <p className="text-base text-slate-400 font-medium">Visualization of asset accumulation trajectory.</p>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-white/5 p-3 rounded-2xl">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-purple"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Growth</span>
             </div>
          </div>
        </div>
        
        <div className="h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={results.dataPoints} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#800080" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#800080" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.05} />
              <XAxis 
                dataKey="year" 
                tick={{fontSize: 11, fill: '#94a3b8', fontWeight: 700}} 
                axisLine={false} 
                tickLine={false} 
                dy={15} 
              />
              <YAxis 
                tick={{fontSize: 11, fill: '#94a3b8', fontWeight: 700}} 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(v) => `R${v>=1e6?(v/1e6).toFixed(1)+'M':(v/1e3).toFixed(0)+'K'}`} 
                dx={-10}
              />
              <Tooltip 
                cursor={{ stroke: '#800080', strokeWidth: 1, strokeDasharray: '4 4' }}
                content={({active, payload, label}) => active && payload ? (
                  <div className="bg-slate-950/95 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 shadow-2xl">
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Year {label} Forecast</p>
                    <p className="text-2xl font-black text-white tabular-nums tracking-tighter">{formatCurrency(Number(payload[0].value))}</p>
                  </div>
                ) : null} 
              />
              <Area 
                type="monotone" 
                dataKey="savings" 
                stroke="#800080" 
                strokeWidth={5} 
                fill="url(#chartGrad)" 
                animationDuration={2500} 
                activeDot={{ r: 8, fill: '#800080', stroke: '#fff', strokeWidth: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default ResultsDashboard;