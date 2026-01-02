import React from 'react';
import { SimulationInputs } from '../types';
import { PRESET_SCENARIOS } from '../constants';
import { motion } from 'framer-motion';

interface Props {
  inputs: SimulationInputs;
  setInputs: (inputs: SimulationInputs) => void;
}

const CalculatorForm: React.FC<Props> = ({ inputs, setInputs }) => {
  const handleChange = (field: keyof SimulationInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const currentScenarioName = PRESET_SCENARIOS.find(s => 
    s.members === inputs.members && 
    s.monthly === inputs.monthlyContribution && 
    s.duration === inputs.durationMonths
  )?.name;

  return (
    <div className="space-y-10">
      {/* Preset Strategy Toggle */}
      <div className="space-y-4">
        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] block">Co-op Strategy Profiles</span>
        <div className="flex flex-wrap gap-2">
          {PRESET_SCENARIOS.map((scenario) => (
            <button
              key={scenario.name}
              onClick={() => {
                setInputs({
                  members: scenario.members,
                  monthlyContribution: scenario.monthly,
                  durationMonths: scenario.duration,
                  annualReturnRate: scenario.rate
                });
              }}
              className={`flex-1 min-w-[120px] text-[11px] font-black py-4 px-4 rounded-2xl border-2 transition-all duration-300 transform ${
                currentScenarioName === scenario.name
                ? 'bg-brand-gold border-brand-gold text-white shadow-lg shadow-brand-gold/20 scale-[1.05]'
                : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-brand-gold/30 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95'
              }`}
            >
              {scenario.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-12">
        {/* Members Slider */}
        <div className="space-y-4 group">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
               <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Member Density</label>
               <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-brand-purple/10 text-brand-purple uppercase">Network</span>
               </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-black text-brand-purple tabular-nums tracking-tighter transition-all group-hover:scale-105 inline-block">
                {inputs.members.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase">Members</span>
            </div>
          </div>
          <div className="relative pt-2">
            <input
              type="range" min="10" max="50000" step="10"
              value={inputs.members}
              onChange={(e) => handleChange('members', Number(e.target.value))}
              className="w-full accent-brand-purple"
              style={{
                background: `linear-gradient(to right, #800080 0%, #800080 ${(inputs.members / 50000) * 100}%, #e2e8f0 ${(inputs.members / 50000) * 100}%, #e2e8f0 100%)`
              }}
            />
          </div>
        </div>

        {/* Contribution Slider */}
        <div className="space-y-4 group">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
               <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Individual Commitment</label>
               <span className="text-[10px] font-black text-brand-green/60 uppercase block">Monthly Equity</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs font-bold text-slate-400">R</span>
              <span className="text-4xl font-black text-brand-green tabular-nums tracking-tighter transition-all group-hover:scale-105 inline-block">
                {inputs.monthlyContribution.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-slate-400">/ mo</span>
            </div>
          </div>
          <div className="relative pt-2">
            <input
              type="range" min="50" max="10000" step="50"
              value={inputs.monthlyContribution}
              onChange={(e) => handleChange('monthlyContribution', Number(e.target.value))}
              className="w-full accent-brand-green"
              style={{
                background: `linear-gradient(to right, #228B22 0%, #228B22 ${(inputs.monthlyContribution / 10000) * 100}%, #e2e8f0 ${(inputs.monthlyContribution / 10000) * 100}%, #e2e8f0 100%)`
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Duration */}
          <div className="space-y-4 group">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Maturity</label>
              <div className="flex items-baseline gap-1">
                 <span className="text-3xl font-black text-brand-purple tabular-nums">{inputs.durationMonths}</span>
                 <span className="text-[10px] font-bold text-slate-400 uppercase">Months</span>
              </div>
            </div>
            <input
              type="range" min="1" max="120" step="1"
              value={inputs.durationMonths}
              onChange={(e) => handleChange('durationMonths', Number(e.target.value))}
              className="w-full accent-brand-purple"
              style={{
                background: `linear-gradient(to right, #800080 0%, #800080 ${(inputs.durationMonths / 120) * 100}%, #e2e8f0 ${(inputs.durationMonths / 120) * 100}%, #e2e8f0 100%)`
              }}
            />
          </div>

          {/* ROI */}
          <div className="space-y-4 group">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Yield %</label>
              <div className="flex items-baseline gap-1">
                 <span className="text-3xl font-black text-brand-gold tabular-nums">{inputs.annualReturnRate}</span>
                 <span className="text-[10px] font-bold text-slate-400 uppercase">% p.a</span>
              </div>
            </div>
            <input
              type="range" min="0" max="30" step="0.5"
              value={inputs.annualReturnRate}
              onChange={(e) => handleChange('annualReturnRate', Number(e.target.value))}
              className="w-full accent-brand-gold"
              style={{
                background: `linear-gradient(to right, #DAA520 0%, #DAA520 ${(inputs.annualReturnRate / 30) * 100}%, #e2e8f0 ${(inputs.annualReturnRate / 30) * 100}%, #e2e8f0 100%)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorForm;