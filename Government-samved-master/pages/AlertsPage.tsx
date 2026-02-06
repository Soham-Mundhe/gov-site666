import React, { useState } from 'react';
import { AlertTriangle, Clock, MapPin, Search, Filter, ShieldCheck, ArrowRight, CheckCircle2, X, Activity, User, ExternalLink } from 'lucide-react';
import { ALERTS } from '../mockData';
import { AlertData } from '../types';

interface AlertsPageProps {
  onAction?: (msg: string) => void;
}

const AlertsPage: React.FC<AlertsPageProps> = ({ onAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [acknowledgedIds, setAcknowledgedIds] = useState<Set<string>>(new Set());
  const [investigatingAlert, setInvestigatingAlert] = useState<AlertData | null>(null);

  const handleAcknowledge = (id: string) => {
    setAcknowledgedIds(prev => new Set(prev).add(id));
    if (onAction) onAction('Event protocol acknowledged. Logs updated.');
  };

  const filteredAlerts = ALERTS.filter(alert => 
    alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative animate-in fade-in duration-1000">
      {/* Investigation Modal */}
      {investigatingAlert && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setInvestigatingAlert(null)}></div>
          <div className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-12 space-y-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-indigo-600 text-white rounded-2xl">
                    <Activity size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase italic">Investigating Incident</h3>
                </div>
                <button onClick={() => setInvestigatingAlert(null)} className="p-3 hover:bg-slate-100 rounded-2xl transition-colors">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Protocol Type</p>
                  <p className="text-sm font-black text-slate-900 uppercase">{investigatingAlert.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Detection Zone</p>
                  <p className="text-sm font-black text-slate-900 uppercase">{investigatingAlert.location}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Timestamp</p>
                  <p className="text-sm font-black text-slate-900 uppercase">{investigatingAlert.timestamp}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status Code</p>
                  <p className="text-sm font-black text-rose-600 uppercase italic">{investigatingAlert.status}</p>
                </div>
              </div>

              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle size={18} className="text-amber-500" />
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Root Cause Analysis</p>
                </div>
                <p className="text-sm font-bold text-slate-600 italic">"{investigatingAlert.reason}"</p>
              </div>

              <div className="flex items-center justify-between pt-6">
                <div className="flex items-center space-x-3 text-indigo-600">
                  <User size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Assigned: Dr. A. Sharma</span>
                </div>
                <button 
                  onClick={() => {
                    handleAcknowledge(investigatingAlert.id);
                    setInvestigatingAlert(null);
                  }}
                  className="px-10 py-5 bg-slate-900 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl hover:bg-indigo-600 transition-all flex items-center space-x-4"
                >
                  <ShieldCheck size={18} />
                  <span>Seal Incident Log</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Crisis Feed</h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest italic mt-2">Real-time vector triggers and automated anomalies.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Filter alerts by type or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 border border-slate-200 rounded-[1.5rem] bg-white outline-none w-64 sm:w-80 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all text-xs font-black uppercase tracking-widest shadow-sm"
            />
          </div>
          <button className="p-4 border border-slate-200 rounded-2xl bg-white hover:bg-slate-50 text-slate-600 transition-all shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm group hover:border-rose-200 transition-all">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Active Critical</p>
          <p className="text-4xl font-black text-rose-600 italic uppercase">03</p>
        </div>
        <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm group hover:border-amber-200 transition-all">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Warning Events</p>
          <p className="text-4xl font-black text-amber-600 italic uppercase">12</p>
        </div>
        <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm group hover:border-emerald-200 transition-all">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Resolved (24h)</p>
          <p className="text-4xl font-black text-emerald-600 italic uppercase">45</p>
        </div>
        <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm group hover:border-indigo-200 transition-all">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total System Logs</p>
          <p className="text-4xl font-black text-slate-900 italic uppercase">{128 - acknowledgedIds.size}</p>
        </div>
      </div>

      <div className="bg-white rounded-[4rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filteredAlerts.length > 0 ? filteredAlerts.map((alert) => {
            const isAck = acknowledgedIds.has(alert.id);
            return (
              <div key={alert.id} className={`p-10 hover:bg-slate-50/50 transition-all group relative overflow-hidden ${isAck ? 'opacity-40 grayscale-[0.5]' : ''}`}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
                  <div className="flex items-start space-x-8">
                    <div className={`p-5 rounded-[2rem] flex-shrink-0 shadow-lg ${
                      isAck ? 'bg-slate-100 text-slate-400' :
                      alert.status === 'Active' ? 'bg-rose-50 text-rose-600 shadow-rose-100' : 
                      alert.status === 'Escalated' ? 'bg-amber-50 text-amber-600 shadow-amber-100' : 'bg-emerald-50 text-emerald-600 shadow-emerald-100'
                    }`}>
                      {alert.status === 'Resolved' || isAck ? <ShieldCheck size={32} strokeWidth={2.5} /> : <AlertTriangle size={32} strokeWidth={2.5} />}
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                         <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight">{alert.type}</h3>
                         <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                           isAck ? 'bg-slate-200 text-slate-600' :
                           alert.status === 'Active' ? 'bg-rose-600 text-white' : 
                           alert.status === 'Escalated' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'
                         }`}>
                           {isAck ? 'Acknowledged' : alert.status}
                         </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                         <span className="flex items-center"><MapPin size={16} className="mr-3 text-indigo-600" /> {alert.location}</span>
                         <span className="flex items-center"><Clock size={16} className="mr-3 text-indigo-600" /> {alert.timestamp}</span>
                      </div>
                      <div className="mt-6 p-6 bg-slate-50/80 rounded-[2rem] border border-slate-100">
                         <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2 flex items-center">
                            <Activity size={12} className="mr-2 text-indigo-600" /> System Trigger Reason
                         </p>
                         <p className="text-sm font-black text-slate-900 italic tracking-tight mb-4">"{alert.reason}"</p>
                         <div className="w-full h-px bg-slate-200/50 mb-4"></div>
                         <p className="text-xs font-bold text-indigo-600 italic flex items-center">
                           <ShieldCheck size={14} className="mr-2" />
                           <span className="font-black uppercase tracking-widest text-[9px] mr-2 text-indigo-900">Protocol Initiated:</span> 
                           {alert.officerAction}
                         </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center h-full gap-5">
                     <button 
                        onClick={() => setInvestigatingAlert(alert)}
                        className="text-xs font-black text-indigo-600 hover:text-indigo-900 flex items-center group/btn uppercase tracking-widest"
                     >
                       Investigate Case <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                     </button>
                     <button 
                        disabled={isAck}
                        onClick={() => handleAcknowledge(alert.id)}
                        className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center space-x-3 ${
                          isAck 
                          ? 'bg-emerald-50 text-emerald-600 cursor-not-allowed border border-emerald-100' 
                          : 'bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 active:scale-95 shadow-sm'
                        }`}
                      >
                        {isAck ? <CheckCircle2 size={16} /> : null}
                        <span>{isAck ? 'Logged' : 'Mark as Seen'}</span>
                      </button>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="py-32 text-center text-slate-400 font-black uppercase tracking-widest italic text-sm">
              No anomalies detected in the current telemetry batch.
            </div>
          )}
        </div>
        <div className="bg-slate-50/50 p-8 text-center border-t border-slate-100 flex items-center justify-center space-x-4">
           <ExternalLink size={14} className="text-slate-400" />
           <button className="text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-[0.4em] transition-colors">Access Secure Historical Archive (2024-2025)</button>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;