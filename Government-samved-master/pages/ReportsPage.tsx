import React, { useState } from 'react';
import { 
  FileText, Download, CheckCircle, Clock, AlertCircle, 
  Search, Send, FileCheck, Database
} from 'lucide-react';
import { HOSPITALS } from '../mockData';

interface ReportsPageProps {
  onAction?: (msg: string, type?: 'success' | 'info') => void;
}

const ReportsPage: React.FC<ReportsPageProps> = ({ onAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [filterType, setFilterType] = useState<'ALL' | 'DELINQUENT'>('ALL');

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      if (onAction) onAction('District Health Summary PDF generated and downloaded.', 'info');
    }, 1500);
  };

  const handleSendReminder = (hosp: string) => {
    if (onAction) onAction(`Registry reminder dispatched to ${hosp} administration.`, 'success');
  };

  const filteredHospitals = HOSPITALS.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'ALL' || h.reportingStatus !== 'Submitted';
    return matchesSearch && matchesFilter;
  });

  // Calculate compliance statistics
  const submittedCount = HOSPITALS.filter(h => h.reportingStatus === 'Submitted').length;
  const complianceRate = Math.round((submittedCount / HOSPITALS.length) * 100);
  const avgFreshness = Math.round(HOSPITALS.reduce((acc, h) => acc + h.dataFreshness, 0) / HOSPITALS.length);

  return (
    <div className="space-y-8 pb-10 max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-indigo-600 mb-1">
            <Database size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Governance Module</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Intelligence Center</h2>
          <p className="text-slate-500 text-sm font-medium italic">Compliance auditing and data integrity management.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center space-x-3 bg-indigo-600 text-white px-8 py-3.5 rounded-2xl hover:bg-indigo-700 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 disabled:opacity-50"
          >
            {isExporting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Download size={18} />
            )}
            <span>{isExporting ? 'Processing Bundle...' : 'Export intelligence Dataset'}</span>
          </button>
        </div>
      </div>

      {/* Real-time Compliance KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-emerald-200 transition-all">
           <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                 <CheckCircle size={24} />
              </div>
              <span className="text-3xl font-black text-slate-900">{complianceRate}%</span>
           </div>
           <div>
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Registry Compliance</h4>
              <p className="text-xs font-bold text-slate-600">{submittedCount} of {HOSPITALS.length} Nodes Reporting</p>
           </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-indigo-200 transition-all">
           <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:scale-110 transition-transform">
                 <Clock size={24} />
              </div>
              <span className="text-3xl font-black text-slate-900">{avgFreshness}%</span>
           </div>
           <div>
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Dataset Freshness</h4>
              <p className="text-xs font-bold text-slate-600">Avg synchronization latency: 42m</p>
           </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-rose-200 transition-all">
           <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl group-hover:scale-110 transition-transform">
                 <AlertCircle size={24} />
              </div>
              <span className="text-3xl font-black text-slate-900">{HOSPITALS.length - submittedCount}</span>
           </div>
           <div>
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending Syncs</h4>
              <button 
                onClick={() => handleSendReminder('all delinquency nodes')}
                className="text-[10px] font-black text-rose-600 hover:text-rose-800 uppercase tracking-widest flex items-center mt-2 group/btn"
              >
                Dispatch Reminders <Send size={12} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </div>

      {/* Granular Master Registry Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-slate-50/30">
           <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase italic">Intelligence audit</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">District wide node auditing</p>
           </div>
           <div className="flex items-center space-x-3">
              <div className="relative group">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Identify node..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-6 py-3 border border-slate-200 rounded-2xl bg-white text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all w-64 shadow-sm" 
                />
              </div>
              <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
                <button 
                  onClick={() => setFilterType('ALL')}
                  className={`px-4 py-2 text-[10px] font-black rounded-xl transition-all ${filterType === 'ALL' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  ALL
                </button>
                <button 
                  onClick={() => setFilterType('DELINQUENT')}
                  className={`px-4 py-2 text-[10px] font-black rounded-xl transition-all ${filterType === 'DELINQUENT' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  DELINQUENT
                </button>
              </div>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Medical Entity</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Registry Status</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Data Integrity %</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Last Verified</th>
                <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {filteredHospitals.map((hospital) => (
                <tr key={hospital.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-900 text-sm group-hover:text-indigo-600 transition-colors uppercase italic">{hospital.name}</span>
                      <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest mt-0.5">District ID: {hospital.id.toUpperCase()}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                        {hospital.reportingStatus === 'Submitted' ? (
                          <CheckCircle size={14} className="text-emerald-500" />
                        ) : hospital.reportingStatus === 'Pending' ? (
                          <Clock size={14} className="text-amber-500" />
                        ) : (
                          <AlertCircle size={14} className="text-rose-500" />
                        )}
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                          hospital.reportingStatus === 'Submitted' ? 'text-emerald-600' : 
                          hospital.reportingStatus === 'Pending' ? 'text-amber-600' : 'text-rose-600'
                        }`}>
                          {hospital.reportingStatus}
                        </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                          <div className={`h-full rounded-full transition-all duration-1000 ${hospital.dataFreshness > 90 ? 'bg-indigo-600' : 'bg-amber-500'}`} style={{ width: `${hospital.dataFreshness}%` }}></div>
                        </div>
                        <span className="text-xs font-black text-slate-700">{hospital.dataFreshness}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className="text-xs font-bold text-slate-400 uppercase">{hospital.lastUpdated}</span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-right">
                    {hospital.reportingStatus !== 'Submitted' ? (
                      <button 
                        onClick={() => handleSendReminder(hospital.name)}
                        className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest border border-indigo-100"
                      >
                        Send Alert
                      </button>
                    ) : (
                      <div className="flex items-center justify-end text-emerald-500">
                        <FileCheck size={18} />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;