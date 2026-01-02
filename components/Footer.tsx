import React from 'react';
import { ExternalLink, Github, Twitter, Linkedin, Mail, ShieldCheck, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: <Twitter size={18} />, href: "https://twitter.com/n_likotsi", label: "Twitter" },
    { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/nthabeleng-likotsi-65922338/", label: "LinkedIn" },
    { icon: <Github size={18} />, href: "https://github.com", label: "Github" }
  ];

  const resources = [
    { name: "Qaloya Afrika", href: "https://qaloyaafrika.co.za" },
    { name: "Young Women in Biz", href: "https://enlbank.com" },
    { name: "Co-operative Manual", href: "https://www.gov.za/documents/co-operatives-act" }
  ];

  const legal = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Use", href: "#" },
    { name: "Cookie Settings", href: "#" }
  ];

  return (
    <footer className="bg-slate-100 dark:bg-brand-navy pt-20 pb-12 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-purple/20">Q</div>
              <span className="text-2xl font-black font-display tracking-tight dark:text-white uppercase">Qalo Suite</span>
            </div>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mb-10">
              The premier interactive engine for community co-operative visualization. Reclaiming financial sovereignty through the power of the collective.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-brand-purple hover:border-brand-purple/50 flex items-center justify-center transition-all group"
                >
                  <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links Group */}
          <div className="lg:col-span-2">
            <h5 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-[0.2em] mb-8">Official Resources</h5>
            <ul className="space-y-4">
              {resources.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-500 hover:text-brand-purple flex items-center gap-2 transition-all">
                    {link.name} <ExternalLink size={14} className="opacity-40" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h5 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-[0.2em] mb-8">Governance</h5>
            <ul className="space-y-4">
              {legal.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-sm font-medium text-slate-500 hover:text-brand-purple transition-all">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h5 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-[0.2em] mb-8">Ecosystem Support</h5>
            <div className="space-y-6">
              <a href="mailto:support@qalosuite.co.za" className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between group transition-all hover:border-brand-purple/30">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-brand-purple" />
                  <span className="text-sm font-bold dark:text-white">Help Center</span>
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-brand-purple transition-all group-hover:translate-x-1" />
              </a>
              <div className="flex items-center gap-3 px-4 text-slate-500">
                <ShieldCheck size={18} className="text-brand-green" />
                <span className="text-[10px] font-black uppercase tracking-widest">Regulatory Compliant</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div className="max-w-3xl">
            <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em] mb-4">Financial Simulation Notice</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed text-left">
              The results provided by this simulator are projections based on historical data models and standard financial formulas. They do not constitute a guarantee of future earnings. All co-operative entities must be registered under the South African Co-operatives Act. Qalo Financial Technologies is not a registered financial services provider. Use this tool for strategic visualization and educational purposes only.
            </p>
          </div>
          <div className="shrink-0">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Qalo Financial Technologies. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;