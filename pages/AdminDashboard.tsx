
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Report {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  parroquia: string;
  comunidad: string;
  detalles: string;
  fecha: string;
  status: string;
  fotos?: string[];
}

const IAMELogo = ({ className = "h-12" }) => (
  <div className={`flex items-center ${className} select-none`}>
    <svg viewBox="0 0 400 150" className="h-full w-auto">
      <path d="M40,110 C30,90 20,60 45,20 C50,50 65,65 55,90 C70,60 85,30 90,60 C95,90 70,110 55,120 Z" fill="url(#flameGradientDash)" />
      <path d="M45,40 C48,30 52,25 55,20 C53,30 50,40 48,50 Z" fill="#3b82f6" opacity="0.8" />
      <text x="60" y="115" fontFamily="Inter, sans-serif" fontWeight="900" fontStyle="italic" fontSize="90" fill="#D2261F" letterSpacing="-4">
        I.A.M.E.
      </text>
      <rect x="30" y="125" width="360" height="20" fill="black" transform="skewX(-5)" />
      <text x="45" y="140" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="11" fill="white" letterSpacing="0.5">
        INSTITUTO AUTÓNOMO MUNICIPAL DE LA ENERGÍA
      </text>
      <defs>
        <linearGradient id="flameGradientDash" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" style={{stopColor:'#f59e0b', stopOpacity:1}} />
          <stop offset="60%" style={{stopColor:'#fbbf24', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#3b82f6', stopOpacity:0.8}} />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const AdminDashboard: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const navigate = useNavigate();

  const loadReports = () => {
    try {
      const data = JSON.parse(localStorage.getItem('iame_reports') || '[]');
      setReports(data);
    } catch (e) {
      console.error("Error al cargar reportes", e);
    }
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('iame_auth');
    if (!isAuth) {
      navigate('/admin');
      return;
    }
    loadReports();
    window.addEventListener('storage', loadReports);
    return () => window.removeEventListener('storage', loadReports);
  }, [navigate]);

  const updateStatus = (id: string, newStatus: string) => {
    const data = JSON.parse(localStorage.getItem('iame_reports') || '[]');
    const updated = data.map((r: Report) => r.id === id ? { ...r, status: newStatus } : r);
    setReports(updated);
    localStorage.setItem('iame_reports', JSON.stringify(updated));
    if (selectedReport?.id === id) {
      setSelectedReport({ ...selectedReport, status: newStatus });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('iame_auth');
    navigate('/admin');
  };

  return (
    <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 md:px-20 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 md:mb-12">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="bg-white p-2 rounded-xl flex items-center justify-center shadow-xl border border-slate-200 flex-shrink-0">
             <IAMELogo className="h-12 md:h-16" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter leading-none">Mando Central</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <p className="text-slate-500 font-bold uppercase text-[7px] md:text-[8px] tracking-[0.3em]">Operador Activo</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <button onClick={loadReports} className="flex-1 md:flex-none p-3 md:p-4 bg-slate-800 text-cyan-400 rounded-xl md:rounded-2xl border border-slate-700 flex items-center justify-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
             <span className="material-symbols-outlined text-sm">sync</span> Sincronizar
           </button>
           <button onClick={handleLogout} className="flex-1 md:flex-none text-[9px] md:text-[10px] font-black text-white bg-red-600/20 border border-red-600/40 px-5 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl uppercase tracking-widest italic">
            Salir
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="bg-slate-950 px-6 md:px-8 py-4 md:py-5 border-b border-slate-800 flex justify-between items-center">
               <h3 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Incidencias en tiempo real</h3>
               <span className="bg-[#D2261F] text-white text-[8px] md:text-[9px] font-black px-3 md:px-4 py-1.5 rounded-full uppercase italic">
                 {reports.length} Casos
               </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px] lg:min-w-0">
                <thead className="bg-slate-900/50 text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800">
                  <tr>
                    <th className="px-6 md:px-8 py-4 md:py-5">Código / Fecha</th>
                    <th className="px-6 md:px-8 py-4 md:py-5">Ciudadano</th>
                    <th className="px-6 md:px-8 py-4 md:py-5">Estatus</th>
                    <th className="px-6 md:px-8 py-4 md:py-5 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/30">
                  {reports.map((report) => (
                    <tr 
                      key={report.id} 
                      className={`hover:bg-slate-800/40 transition-all group cursor-pointer ${selectedReport?.id === report.id ? 'bg-cyan-400/5' : ''}`} 
                      onClick={() => setSelectedReport(report)}
                    >
                      <td className="px-6 md:px-8 py-4 md:py-6">
                        <div className={`font-black text-xs ${selectedReport?.id === report.id ? 'text-cyan-400' : 'text-white'}`}>{report.id}</div>
                        <div className="text-[7px] md:text-[8px] text-slate-500 font-bold uppercase mt-1 italic">{report.fecha}</div>
                      </td>
                      <td className="px-6 md:px-8 py-4 md:py-6">
                        <div className="font-bold text-slate-300 text-xs">{report.nombre}</div>
                        <div className="text-[8px] text-[#F7B500] font-black uppercase italic tracking-tight">{report.parroquia}</div>
                      </td>
                      <td className="px-6 md:px-8 py-4 md:py-6">
                        <span className={`text-[7px] md:text-[8px] font-black px-2 md:px-3 py-1 rounded-lg uppercase border ${
                          report.status === 'PENDIENTE' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                          report.status === 'PROGRESO' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                          'bg-green-500/10 text-green-500 border-green-500/20'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 md:px-8 py-4 md:py-6 text-right">
                        <span className="material-symbols-outlined text-slate-600 group-hover:text-cyan-400 transition-all">chevron_right</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 order-1 lg:order-2">
          {selectedReport ? (
            <div className="bg-slate-900 border-2 border-slate-800 rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 shadow-2xl lg:sticky lg:top-28 space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Detalle Técnico</p>
                  <h2 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase">{selectedReport.id}</h2>
                </div>
                <button onClick={() => setSelectedReport(null)} className="text-slate-500 hover:text-white"><span className="material-symbols-outlined">close</span></button>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 md:p-5 rounded-2xl border border-slate-800">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Afectado</p>
                  <p className="text-xs md:text-sm font-black text-white italic">{selectedReport.nombre} {selectedReport.apellido}</p>
                  <p className="text-[9px] md:text-[10px] text-slate-400 font-bold mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px] md:text-[12px]">call</span> {selectedReport.telefono}
                  </p>
                </div>

                {selectedReport.fotos && selectedReport.fotos.length > 0 && (
                  <div className="bg-slate-950 p-4 md:p-5 rounded-2xl border border-slate-800">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-3">Evidencia Capturada</p>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedReport.fotos.slice(0, 4).map((foto, idx) => (
                        <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-slate-800">
                           <img src={foto} alt="Evidencia" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-slate-950 p-4 md:p-5 rounded-2xl border border-slate-800">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Descripción</p>
                  <p className="text-[11px] font-bold text-slate-400 italic leading-relaxed">"{selectedReport.detalles}"</p>
                </div>

                <div className="pt-2 space-y-3">
                  <div className="flex flex-col gap-2">
                    <button onClick={() => updateStatus(selectedReport.id, 'PENDIENTE')} className={`py-3 rounded-xl text-[9px] font-black uppercase transition-all ${selectedReport.status === 'PENDIENTE' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-500'}`}>Pendiente</button>
                    <button onClick={() => updateStatus(selectedReport.id, 'PROGRESO')} className={`py-3 rounded-xl text-[9px] font-black uppercase transition-all ${selectedReport.status === 'PROGRESO' ? 'bg-yellow-600 text-white' : 'bg-slate-800 text-slate-500'}`}>En Camino</button>
                    <button onClick={() => updateStatus(selectedReport.id, 'RESUELTO')} className={`py-3 rounded-xl text-[9px] font-black uppercase transition-all ${selectedReport.status === 'RESUELTO' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-500'}`}>Resuelto</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex bg-slate-900/40 border-2 border-dashed border-slate-800 rounded-[3rem] p-12 text-center h-[500px] flex-col items-center justify-center space-y-4">
               <span className="material-symbols-outlined text-slate-800 text-8xl mb-4">analytics</span>
               <p className="text-slate-600 font-black uppercase text-[10px] tracking-[0.4em] max-w-[200px] mx-auto">Seleccione una incidencia para visualizar el reporte técnico</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
