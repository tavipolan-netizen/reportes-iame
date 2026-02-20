
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StatusChecker: React.FC = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);

    if (!query.trim()) return;

    const reports = JSON.parse(localStorage.getItem('iame_reports') || '[]');
    const found = reports.find((r: any) => r.id.toLowerCase() === query.trim().toLowerCase());

    if (found) {
      navigate(`/status/${found.id}`);
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-10">
      <div className="space-y-3">
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight italic uppercase">Rastreo Municipal</h2>
        <div className="flex items-center justify-center gap-3 md:gap-4">
          <div className="h-px w-8 md:w-12 bg-slate-800"></div>
          <p className="text-slate-500 font-bold uppercase text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em]">Seguimiento de Ticket de Gas</p>
          <div className="h-px w-8 md:w-12 bg-slate-800"></div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 md:gap-3 p-2 md:p-3 bg-slate-900/80 backdrop-blur-md rounded-2xl md:rounded-[2rem] shadow-2xl border border-slate-700">
          <div className="flex-1 flex items-center px-4 md:px-6">
             <span className="material-symbols-outlined text-slate-500 mr-2 md:mr-3">search</span>
             <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Código (IAME-2024-0000)" 
                className="w-full py-3 md:py-4 bg-transparent border-none outline-none text-sm md:text-lg font-bold text-white placeholder:text-slate-600"
              />
          </div>
          <button type="submit" className="bg-[#D2261F] hover:bg-red-700 text-white font-black px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl transition-all shadow-xl shadow-red-900/20 uppercase text-[10px] md:text-xs tracking-widest italic">
            Consultar
          </button>
        </form>
        
        {error && (
          <p className="mt-4 text-red-500 font-black uppercase text-[9px] tracking-widest animate-bounce">
            ⚠️ Código no encontrado en registro
          </p>
        )}
      </div>
    </div>
  );
};

export default StatusChecker;
