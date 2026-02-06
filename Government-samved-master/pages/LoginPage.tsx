import React, { useState } from 'react';
import { ShieldCheck, User, Fingerprint, Cpu, Globe, ArrowRight, Shield, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('admin_sharma');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Light Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/grid.png')]"></div>
      </div>

      <div className="max-w-xl w-full relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Branding Header */}
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-white border border-slate-200 rounded-3xl text-indigo-600 shadow-xl mb-2">
            <Cpu size={40} />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Mission Control</h1>
            <p className="text-indigo-600/60 font-black text-[10px] uppercase tracking-[0.4em]">Solapur District Health Intelligence</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-slate-200 overflow-hidden relative">
          <div className="p-12 md:p-16">
            <div className="flex items-center justify-center space-x-3 mb-10 py-3 px-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-700">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Healthcare Gateway</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Operator ID</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 focus:bg-white outline-none transition-all text-slate-900 font-bold text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Secure Passkey</label>
                  <div className="relative">
                    <Fingerprint className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 focus:bg-white outline-none transition-all text-slate-900 font-bold text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 bg-slate-100 border border-slate-200 rounded-lg checked:bg-indigo-600" defaultChecked />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Persistent Link</span>
                </label>
                <button type="button" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Emergency Reset</button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-6 rounded-[1.5rem] bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.4em] shadow-xl shadow-slate-300 hover:bg-indigo-600 transition-all flex items-center justify-center space-x-4 group"
              >
                {isLoading ? (
                  <span>Initializing Link...</span>
                ) : (
                  <>
                    <Globe size={18} className="text-indigo-400 group-hover:rotate-90 transition-transform" />
                    <span>Authorize Command Access</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100 text-center flex items-center justify-center space-x-3 text-slate-400">
             <AlertCircle size={14} className="text-slate-300" />
             <p className="text-[9px] uppercase font-black tracking-[0.2em]">Authorized Government Personnel Only</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;