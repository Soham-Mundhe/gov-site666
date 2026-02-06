import React from 'react';
import { 
  Activity, AlertTriangle, TrendingUp, 
  Map as MapIcon, ChevronRight, Globe, 
  Clock, Target, ShieldCheck
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import SummaryCard from '../components/SummaryCard';
import { DISTRICT_TRENDS, ALERTS, CITIES, HOSPITALS } from '../mockData';

interface OverviewPageProps {
  onNavigateToMap: () => void;
  onNavigateToCity: (id: string) => void;
  onNavigateToAlerts: () => void;
  onNavigateToReports: () => void;
}

const OverviewPage: React.FC<OverviewPageProps> = ({ 
  onNavigateToMap, 
  onNavigateToCity, 
  onNavigateToAlerts, 
  onNavigateToReports 
}) => {
  const activeAlerts = ALERTS.filter(a => a.status === 'Active' || a.status === 'Escalated');
  const totalCases = CITIES.reduce((sum, city) => sum + city.totalCases, 0);
  const totalBeds = HOSPITALS.reduce((sum, h) => sum + h.totalBeds, 0);
  const occupiedBeds = HOSPITALS.reduce((sum, h) => sum + h.occupiedBeds, 0);
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-indigo-600">
            <ShieldCheck size={20} />
            <span className="text-[11px] font-black uppercase tracking-[0.5em]">District Intelligence Matrix</span>
          </div>
          <h2 className="text-6xl font-black text-slate-900 tracking-tighter italic uppercase">Command Terminal</h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest max-w-xl italic">District wide health vector surveillance protocols.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-white border border-slate-200 px-8 py-5 rounded-3xl flex items-center space-x-8 shadow-sm">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Epoch Status</span>
              <span className="text-xs font-black text-slate-900 mt-1.5 uppercase tracking-widest">20 Nov 2026 • 14:30</span>
            </div>
            <div className="w-px h-10 bg-slate-100"></div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Link Integrity</span>
              <span className="text-xs font-black text-emerald-600 mt-1.5 flex items-center uppercase tracking-widest">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2.5 shadow-[0_0_8px_#10b981]"></div>
                Optimal
              </span>
            </div>
          </div>
          <button 
            onClick={onNavigateToMap}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-3xl font-black text-[12px] uppercase tracking-[0.3em] shadow-xl shadow-indigo-200 flex items-center group"
          >
            <Globe size={20} className="mr-4" />
            Strategic View
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <SummaryCard title="District Load" value={totalCases.toLocaleString()} trend={{ value: 14.8, isUp: true }} icon={Activity} color="indigo" />
        <SummaryCard title="Inpatient Flux" value={`${occupancyRate}%`} subtitle="8.2% surge detected" icon={ShieldCheck} color="red" />
        <SummaryCard title="Vector Index" value="0.91" trend={{ value: 4.2, isUp: true }} icon={Target} color="green" />
        <SummaryCard title="Active Alarms" value={activeAlerts.length} subtitle="3 priority triggers" icon={AlertTriangle} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Chart Section */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[4rem] border border-slate-200 shadow-2xl shadow-slate-200/50 p-12 flex flex-col h-full relative overflow-hidden group">
            <div className="flex justify-between items-center mb-16 relative z-10">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 flex items-center uppercase italic">
                  <TrendingUp size={28} className="mr-5 text-indigo-600" /> Epidemiological Flow
                </h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Temporal Incident Analysis</p>
              </div>
            </div>
            
            <div className="flex-1 min-h-[480px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DISTRICT_TRENDS}>
                  <defs>
                    <linearGradient id="colorFever" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 900}} dy={20} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 900}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 20px 50px -12px rgba(0,0,0,0.1)', padding: '20px' }}
                    itemStyle={{ fontWeight: 900, fontSize: '12px', color: '#1E293B', textTransform: 'uppercase' }}
                  />
                  <Legend verticalAlign="top" align="right" height={60} wrapperStyle={{ fontWeight: 900, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em' }} />
                  <Area type="monotone" dataKey="fever" name="ILI Signal" stroke="#6366F1" strokeWidth={5} fillOpacity={1} fill="url(#colorFever)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar Alerts */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-2xl shadow-slate-200/50 flex flex-col h-full">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-sm font-black text-slate-900 flex items-center uppercase tracking-[0.4em] italic">
                <Clock size={24} className="mr-5 text-indigo-600" /> Tactical Feed
              </h3>
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
            </div>
            
            <div className="space-y-10 overflow-y-auto max-h-[500px] pr-4 custom-scrollbar">
              {activeAlerts.map(alert => (
                <div key={alert.id} className="group relative pl-10 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-slate-100 before:rounded-full hover:before:bg-indigo-600 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-[13px] font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase italic">{alert.type}</h4>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{alert.timestamp.split(' ')[1]}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-4 flex items-center">
                    <MapIcon size={14} className="mr-3" /> {alert.location}
                  </p>
                  <p className="text-[13px] text-slate-600 italic bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100">"{alert.reason}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;