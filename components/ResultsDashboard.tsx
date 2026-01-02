import React from 'react';
import { SimulationResults } from '../types';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TrendingUp, ArrowUpRight, Coins, Activity, Zap, Building2, Landmark, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props { results: SimulationResults | null; }

const formatCurrency = (val: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

const ResultsDashboard: React.FC<Props> = ({ results }) => {
  if (!results) return null;
  const growth = ((results.projectedReturns / results.totalSavings - 1) * 100).toFixed(1);
  const profit = results.projectedReturns - results.totalSavings;

  const milestones = [
    { label: "Community Factory", val: 10000000, icon: <Building2 size={16} /> },
    { label: "Co-op Micro-Bank", val: 50000000, icon: <Landmark size={16} /> },
    { label: "National Endowment", val: 150000000, icon: <GraduationCap size={16} /> },
  ];

  return (
    <div className="space-y-10">
      <motion.div layout className="relative overflow-hidden bg-slate-900 dark:bg-black p-10 sm:p-14 rounded-[4rem] shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/30 via-transparent to-brand-green/20 opacity-40"></div>
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-[10px] font-black uppercase tracking-widest border border-brand-green/30">Live Simulation</span>
              <Activity size={16} className="text-white/20" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-white/50 uppercase tracking-[0.3em]">Estimated Collective Assets</span>
              <h3 className="text-5xl sm:text-7xl font-black text-white tracking-tighter tabular-nums leading-none">
                {formatCurrency(results.projectedReturns)}
              </h3>
            </div>
            <p className="text-slate-400 text-lg flex items-center gap-3">
              <Zap size={20} className="text-brand-gold fill-brand-gold" />
              Target achieved via collective commitment.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 px-8 py-6 rounded-3xl backdrop-blur-2xl">
            <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Growth Performance</span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-brand-green">+{growth}%</span>
              <span className="text-lg font-bold text-white/80">{formatCurrency(profit)}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800 shadow-sm flex items-center justify-between group">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Monthly Group Inflow</span>
            <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{formatCurrency(results.totalMonthly)}</span>
          </div>
          <div className="w-16 h-16 rounded-3xl bg-brand-green/10 text-brand-green flex items-center justify-center transition-transform group-hover:scale-110"><ArrowUpRight size={32} /></div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800 shadow-sm flex items-center justify-between group">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Principal Contributions</span>
            <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{formatCurrency(results.totalSavings)}</span>
          </div>
          <div className="w-16 h-16 rounded-3xl bg-brand-purple/10 text-brand-purple flex items-center justify-center transition-transform group-hover:scale-110"><Coins size={32} /></div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200/50 dark:border-slate-800 shadow-sm">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10">Empowerment Readiness</h4>
        <div className="space-y-8">
          {milestones.map((m, idx) => {
            const prog = Math.min(100, (results.projectedReturns / m.val) * 100);
            return (
              <div key={idx} className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">{m.icon} {m.label}</div>
                  <span className={prog >= 100 ? "text-brand-green" : "text-slate-500"}>{prog >= 100 ? "ACHIEVED" : `${prog.toFixed(0)}%`}</span>
                </div>
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${prog}%` }} className={`h-full rounded-full ${prog >= 100 ? 'bg-brand-green' : 'bg-brand-purple'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200/50 dark:border-slate-800 shadow-sm">
        <div className="mb-10"><h4 className="text-2xl font-bold font-display dark:text-white">Capital Velocity</h4><p className="text-sm text-slate-400">Projection of community equity over time</p></div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={results.dataPoints}>
              <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#800080" stopOpacity={0.2}/><stop offset="95%" stopColor="#800080" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.05} />
              <XAxis dataKey="year" tick={{fontSize:11, fill:'#94a3b8'}} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{fontSize:11, fill:'#94a3b8'}} axisLine={false} tickLine={false} tickFormatter={(v) => `R${v>=1e6?(v/1e6).toFixed(1)+'M':(v/1e3).toFixed(0)+'K'}`} />
              <Tooltip content={({active, payload, label}) => active && payload ? (<div className="bg-slate-900 p-4 rounded-2xl border border-white/10 shadow-2xl"><p className="text-[10px] text-slate-500 uppercase font-black mb-1">Year {label}</p><p className="text-xl font-bold text-white">{formatCurrency(Number(payload[0].value))}</p></div>) : null} />
              <Area type="monotone" dataKey="savings" stroke="#800080" strokeWidth={4} fill="url(#g)" animationDuration={1500} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default ResultsDashboard;