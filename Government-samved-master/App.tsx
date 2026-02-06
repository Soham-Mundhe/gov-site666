import React, { useState, useEffect } from 'react';
import {
  Bell, ChevronDown, FileText, LayoutDashboard,
  Map as MapIcon, AlertTriangle, LogOut, Settings,
  User as UserIcon, CheckCircle2, X, Hospital,
  Menu, Cpu, ShieldCheck
} from 'lucide-react';
import OverviewPage from './pages/OverviewPage';
import MapPage from './pages/MapPage';
import CityDashboard from './pages/CityDashboard';
import HospitalsPage from './pages/HospitalsPage';
import HospitalDetailPage from './pages/HospitalDetailPage';
import AlertsPage from './pages/AlertsPage';
import ReportsPage from './pages/ReportsPage';
import LoginPage from './pages/LoginPage';

export type PageType = 'overview' | 'map' | 'city' | 'hospitals' | 'hospital-detail' | 'alerts' | 'reports';

interface ToastState {
  message: string;
  type: 'success' | 'info' | 'error';
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('overview');
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const navigateToCity = (cityId: string) => {
    setSelectedCityId(cityId);
    setCurrentPage('city');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHospital = (hospitalId: string) => {
    setSelectedHospitalId(hospitalId);
    setCurrentPage('hospital-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const navItems = [
    { id: 'overview', label: 'COMMAND', icon: LayoutDashboard },
    { id: 'map', label: 'SURVEILLANCE', icon: MapIcon },
    { id: 'hospitals', label: 'INFRASTRUCTURE', icon: Hospital },
    { id: 'alerts', label: 'CRISIS FEED', icon: AlertTriangle },
    { id: 'reports', label: 'INTELLIGENCE', icon: FileText }
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <OverviewPage
          onNavigateToMap={() => handlePageChange('map')}
          onNavigateToCity={navigateToCity}
          onNavigateToAlerts={() => handlePageChange('alerts')}
          onNavigateToReports={() => handlePageChange('reports')}
        />;
      case 'map': return <MapPage onSelectCity={navigateToCity} />;
      case 'city': return <CityDashboard cityId={selectedCityId || 'solapur-city'} onBack={() => handlePageChange('map')} />;
      case 'hospitals': return <HospitalsPage onViewDetails={navigateToHospital} />;
      case 'hospital-detail': return <HospitalDetailPage hospitalId={selectedHospitalId || 'h1'} onBack={() => handlePageChange('hospitals')} />;
      case 'alerts': return <AlertsPage onAction={(m) => showToast(m, 'success')} />;
      case 'reports': return <ReportsPage onAction={(m, t) => showToast(m, t === 'info' ? 'info' : 'success')} />;
      default: return <OverviewPage onNavigateToMap={() => handlePageChange('map')} onNavigateToCity={navigateToCity} onNavigateToAlerts={() => handlePageChange('alerts')} onNavigateToReports={() => handlePageChange('reports')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Sidebar / Mobile Command Drawer */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`absolute top-0 left-0 bottom-0 w-80 bg-white shadow-2xl transition-transform duration-500 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white">
                <Cpu size={20} />
              </div>
              <span className="font-black text-sm uppercase tracking-widest">Command Menu</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="px-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id || (item.id === 'map' && currentPage === 'city') || (item.id === 'hospitals' && currentPage === 'hospital-detail');
                return (
                  <button
                    key={item.id}
                    onClick={() => handlePageChange(item.id as PageType)}
                    className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${isActive ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'
                      }`}
                  >
                    <Icon size={20} strokeWidth={isActive ? 3 : 2} />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="p-8 border-t border-slate-100">
            <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl bg-rose-50 text-rose-600 font-black text-[11px] uppercase tracking-widest">
              <LogOut size={18} />
              <span>Terminate Access</span>
            </button>
          </div>
        </div>
      </div>

      {/* Background Ambience (Light) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-[0.05]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/5 rounded-full blur-[160px]"></div>
      </div>

      {/* Header (Light) */}
      <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-2xl border-b border-slate-200/60 h-16 shadow-lg shadow-slate-200/50' : 'bg-transparent h-24'
        }`}>
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 h-full flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => handlePageChange('overview')}>
              <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-xl shadow-indigo-600/20 group-hover:rotate-[360deg] transition-transform duration-700">
                <Cpu size={22} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-black tracking-tight text-slate-900 uppercase leading-none">Solapur Health</h1>
                <p className="text-[9px] text-indigo-600 font-black tracking-[0.4em] uppercase mt-2">Mission Control</p>
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id || (item.id === 'map' && currentPage === 'city') || (item.id === 'hospitals' && currentPage === 'hospital-detail');
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id as PageType)}
                  className={`flex items-center space-x-2.5 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative py-2 ${isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                  <Icon size={16} strokeWidth={isActive ? 3 : 2.5} />
                  <span>{item.label}</span>
                  {isActive && <div className="absolute -bottom-2 left-0 right-0 h-1 bg-indigo-600 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.4)]"></div>}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="relative p-2.5 text-slate-400 hover:text-indigo-600 transition-colors bg-white border border-slate-100 rounded-2xl shadow-sm">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="relative">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-3 p-1 rounded-2xl hover:bg-slate-50 transition-all">
                <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center font-black text-xs text-indigo-600 shadow-sm">
                  AS
                </div>
                <ChevronDown size={14} className={`hidden sm:block text-slate-400 transition-transform duration-500 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-6 w-64 bg-white border border-slate-200 rounded-3xl shadow-2xl py-2 z-[70] overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-[11px] font-black text-slate-900 leading-none uppercase tracking-widest">Dr. A. Sharma</p>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.25em] mt-1.5">Chief Intelligence Officer</p>
                  </div>
                  <button className="w-full text-left px-6 py-4 text-[10px] font-black text-slate-600 hover:bg-slate-50 flex items-center space-x-3 uppercase tracking-widest">
                    <UserIcon size={14} /> <span>Security Profile</span>
                  </button>
                  <button className="w-full text-left px-6 py-4 text-[10px] font-black text-slate-600 hover:bg-slate-50 flex items-center space-x-3 uppercase tracking-widest">
                    <Settings size={14} /> <span>System Terminal</span>
                  </button>
                  <button className="w-full text-left px-6 py-4 text-[10px] font-black text-rose-600 hover:bg-rose-50 flex items-center space-x-3 uppercase tracking-widest" onClick={() => setIsLoggedIn(false)}>
                    <LogOut size={14} /> <span>Terminate Access</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-screen-2xl mx-auto px-6 sm:px-10 pt-32 pb-24 relative z-10">
        {toast && (
          <div className="fixed top-28 right-6 sm:right-10 z-[100] animate-in slide-in-from-right duration-500">
            <div className={`flex items-center space-x-4 px-8 py-5 rounded-2xl shadow-2xl text-white font-black text-xs border border-white/10 backdrop-blur-2xl ${toast.type === 'success' ? 'bg-emerald-600' : toast.type === 'error' ? 'bg-rose-600' : 'bg-indigo-600'
              }`}>
              <CheckCircle2 size={18} />
              <span className="uppercase tracking-widest">{toast.message}</span>
              <button onClick={() => setToast(null)} className="ml-2 opacity-50 hover:opacity-100">
                <X size={16} />
              </button>
            </div>
          </div>
        )}
        {renderPage()}
      </main>
    </div>
  );
};

export default App;