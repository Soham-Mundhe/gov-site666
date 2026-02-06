import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, subtitle, icon: Icon, color, trend }) => {
  const getColors = (c: string) => {
    switch (c) {
      case 'indigo': return { 
        bg: 'bg-indigo-50', 
        iconBg: 'bg-indigo-600', 
        text: 'text-indigo-600', 
        border: 'border-indigo-100',
        glow: 'shadow-indigo-200'
      };
      case 'red': return { 
        bg: 'bg-rose-50', 
        iconBg: 'bg-rose-600', 
        text: 'text-rose-600', 
        border: 'border-rose-100',
        glow: 'shadow-rose-200'
      };
      case 'orange': return { 
        bg: 'bg-amber-50', 
        iconBg: 'bg-amber-600', 
        text: 'text-amber-600', 
        border: 'border-amber-100',
        glow: 'shadow-amber-200'
      };
      case 'green': return { 
        bg: 'bg-emerald-50', 
        iconBg: 'bg-emerald-600', 
        text: 'text-emerald-600', 
        border: 'border-emerald-100',
        glow: 'shadow-emerald-200'
      };
      default: return { 
        bg: 'bg-slate-50', 
        iconBg: 'bg-slate-600', 
        text: 'text-slate-600', 
        border: 'border-slate-100',
        glow: 'shadow-slate-200'
      };
    }
  };

  const style = getColors(color);

  return (
    <div className={`bg-white rounded-[3rem] border ${style.border} p-8 flex flex-col shadow-xl shadow-slate-200/50 transition-all duration-500 group hover:-translate-y-2 relative overflow-hidden`}>
      <div className={`absolute -right-10 -top-10 w-40 h-40 ${style.bg} rounded-full blur-3xl opacity-50`}></div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className={`p-4 rounded-2xl ${style.iconBg} text-white shadow-xl ${style.glow}`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
        {trend && (
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${trend.isUp ? 'text-rose-600 bg-rose-50' : 'text-emerald-600 bg-emerald-50'}`}>
            {trend.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2 relative z-10">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">{title}</p>
        <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">{value}</h3>
        {subtitle && (
          <p className="text-[11px] font-bold text-slate-500 flex items-center pt-3 italic uppercase tracking-widest">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;