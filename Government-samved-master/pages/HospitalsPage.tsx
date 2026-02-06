import React, { useState } from 'react';
import { 
  Search, Filter, ChevronRight, Activity, 
  Building2, ShieldAlert, Globe, Cpu, MapPin, Check
} from 'lucide-react';
import { HOSPITALS, CITIES } from '../mockData';
import { RiskLevel } from '../types';

interface HospitalsPageProps {
  onViewDetails: (id: string) => void;
}

const HospitalsPage: React.FC<HospitalsPageProps> = ({ onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<RiskLevel | 'All'>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const filteredHospitals = HOSPITALS.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'All' || h.risk === filterRisk;
    return matchesSearch && matchesRisk;
  });

  const riskOptions: (RiskLevel | 'All')[] = ['All', 'High', 'Moderate', 'Low', 'Normal'];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-indigo-600">
            <Building2 size={20} />
            <span className="text-[11px] font-black uppercase tracking-[0.5em]">Infrastructure Audit</span>
          </div>
          <h2 className="text-6xl font-black text-slate-900 tracking-tighter italic uppercase">Health Entities</h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest max-w-xl italic">Capacity and resource management matrix.</p>
        </div>
        
        <div className="flex items-center space-x-4 relative">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search facility name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-14 pr-8 py-5 bg-white border border-slate-200 rounded-[2rem] outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all w-full sm:w-96 text-sm font-black uppercase tracking-widest text-slate-900 shadow-sm"
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center space-x-3 px-8 py-5 border rounded-[2rem] transition-all font-black text-[10px] uppercase tracking-[0.3em] shadow-sm ${
                isFilterOpen || filterRisk !== 'All' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 hover:text-indigo-600 border-slate-200'
              }`}
            >
              <Filter size={18} />
              <span>{filterRisk === 'All' ? 'Filter' : filterRisk}</span>
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-4 w-56 bg-white border border-slate-200 rounded-3xl shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2">
                <p className="px-6 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Filter by Risk</p>
                {riskOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      setFilterRisk(option);
                      setIsFilterOpen(false);
                    }}
                    className="w-full text-left px-6 py-3 text-[10px] font-black text-slate-600 hover:bg-slate-50 flex items-center justify-between uppercase tracking-widest"
                  >
                    <span>{option}</span>
                    {filterRisk === option && <Check size={14} className="text-indigo-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[4rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-10 py-8 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Node Entity</th>
                <th className="px-10 py-8 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Load Index</th>
                <th className="px-10 py-8 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Resource Units</th>
                <th className="px-10 py-8 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">ICU Tier</th>
                <th className="px-10 py-8 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Command</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredHospitals.length > 0 ? filteredHospitals.map((hospital) => {
                const occupancyPct = (hospital.occupiedBeds / hospital.totalBeds) * 100;
                const city = CITIES.find(c => c.id === hospital.cityId);

                return (
                  <tr key={hospital.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-10 py-8 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-black text-slate-900 text-base group-hover:text-indigo-600 transition-colors uppercase italic">{hospital.name}</span>
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center mt-2 italic">
                          <MapPin size={12} className="mr-2 text-indigo-600" /> {city?.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-8 whitespace-nowrap">
                      <div className="flex items-center space-x-5">
                         <span className="text-base font-black text-slate-900 italic">{Math.round(occupancyPct)}%</span>
                         <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${occupancyPct > 90 ? 'bg-rose-500' : occupancyPct > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${occupancyPct}%` }}></div>
                         </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 whitespace-nowrap">
                      <span className="text-sm font-black text-slate-900 uppercase italic">{hospital.totalBeds} Units</span>
                    </td>
                    <td className="px-10 py-8 whitespace-nowrap">
                      <div className={`inline-flex items-center px-4 py-2 rounded-xl border font-black text-[10px] uppercase tracking-widest ${hospital.icuOccupied / hospital.icuTotal > 0.9 ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                         <Cpu size={12} className="mr-2" />
                         {hospital.icuOccupied} / {hospital.icuTotal} ICU
                      </div>
                    </td>
                    <td className="px-10 py-8 whitespace-nowrap text-right">
                      <button onClick={() => onViewDetails(hospital.id)} className="px-6 py-3 rounded-2xl bg-slate-900 text-white hover:bg-indigo-600 transition-all font-black text-[10px] uppercase tracking-[0.4em] flex items-center ml-auto group/btn">
                        Interface
                        <ChevronRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={5} className="px-10 py-20 text-center text-slate-400 font-black uppercase tracking-widest text-xs italic">
                    No infrastructure nodes matching current security criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HospitalsPage;