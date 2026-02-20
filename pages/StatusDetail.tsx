
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Report {
  id: string;
  nombre: string;
  apellido: string;
  parroquia: string;
  comunidad: string;
  detalles: string;
  fecha: string;
  status: string;
  fotos?: string[];
}

const StatusDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    const reports = JSON.parse(localStorage.getItem('iame_reports') || '[]');
    const found = reports.find((r: Report) => r.id === id);
    if (found) {
      setReport(found);
    }
  }, [id]);

  if (!report) {
    return (
      <div className="max-w-2xl mx-auto py-40 px-4 text-center space-y-6">
        <span className="material-symbols-outlined text-slate-700 text-8xl">error</span>
        <h1 className="text-2xl font-black text-white uppercase italic">Reporte no encontrado</h1>
        <Link to="/" className="inline-block bg-[#D2261F] text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest italic">Volver al Inicio</Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDIENTE': return 'bg-red-500 text-white';
      case 'PROGRESO': return 'bg-[#F7B500] text-black';
      case 'RESUELTO': return 'bg-green-500 text-white';
      default: return 'bg-slate-700 text-white';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDIENTE': return 'Pendiente de Revisión';
      case 'PROGRESO': return 'Cuadrilla en Camino';
      case 'RESUELTO': return 'Incidencia Resuelta';
      default: return status;
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <div className="bg-slate-900 p-8 md:p-12 rounded-[3rem] border border-slate-800 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.5)] space-y-10 relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Identificador de Reporte</p>
            <h1 className="text-3xl font-black text-white italic tracking-tighter">{id}</h1>
          </div>
          <span className={`px-6 py-2 text-[10px] font-black rounded-full uppercase tracking-widest shadow-xl ${getStatusColor(report.status)}`}>
            {getStatusLabel(report.status)}
          </span>
        </div>
        
        <div className="relative pl-8 space-y-10 border-l-2 border-slate-800 relative z-10">
           {report.status === 'RESUELTO' && (
             <div className="relative">
                <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full border-4 border-slate-900 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
                <p className="text-[10px] font-black text-slate-500 mb-1 uppercase tracking-widest">Finalizado</p>
                <p className="text-sm font-bold italic text-white">El caso ha sido cerrado con éxito.</p>
             </div>
           )}
           <div className="relative">
              <div className={`absolute -left-[41px] top-1.5 w-4 h-4 rounded-full border-4 border-slate-900 ${report.status === 'PENDIENTE' ? 'bg-[#D2261F] animate-pulse' : 'bg-slate-700'}`}></div>
              <p className="text-[10px] font-black text-slate-500 mb-1 uppercase tracking-widest">{report.fecha}</p>
              <p className={`text-sm font-bold italic ${report.status === 'PENDIENTE' ? 'text-white' : 'text-slate-400'}`}>Reporte validado en Central IAME.</p>
           </div>
        </div>

        {/* EVIDENCIA REPORTADA */}
        {report.fotos && report.fotos.length > 0 && (
          <div className="space-y-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Evidencia Adjunta:</p>
            <div className="grid grid-cols-3 gap-3">
              {report.fotos.map((foto, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                  <img src={foto} alt="Evidencia reporte" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-inner relative z-10">
          <p className="text-sm font-bold text-slate-300 italic uppercase tracking-tight">
            {report.comunidad}, PARROQUIA {report.parroquia}
          </p>
          <div className="mt-4 pt-4 border-t border-slate-900">
             <p className="text-xs text-slate-400 italic font-medium">"{report.detalles}"</p>
          </div>
        </div>

        <Link to="/" className="block w-full text-center py-4 text-[10px] font-black text-slate-400 border-2 border-slate-800 rounded-2xl hover:bg-slate-800 hover:text-white transition-all uppercase tracking-[0.2em] italic">
          Nueva consulta
        </Link>
      </div>
    </div>
  );
};

export default StatusDetail;
