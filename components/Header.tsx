
import React from 'react';
import { Link } from 'react-router-dom';

const IAMELogo = ({ className = "h-12" }) => (
  <div className={`flex items-center ${className} select-none`}>
    <svg viewBox="0 0 400 150" className="h-full w-auto drop-shadow-lg">
      {/* Llama de Gas estilizada */}
      <path d="M40,110 C30,90 20,60 45,20 C50,50 65,65 55,90 C70,60 85,30 90,60 C95,90 70,110 55,120 Z" fill="url(#flameGradient)" />
      <path d="M45,40 C48,30 52,25 55,20 C53,30 50,40 48,50 Z" fill="#3b82f6" opacity="0.8" />
      
      {/* Texto I.A.M.E. */}
      <text x="60" y="115" fontFamily="Inter, sans-serif" fontWeight="900" fontStyle="italic" fontSize="90" fill="#D2261F" letterSpacing="-4">
        I.A.M.E.
      </text>
      
      {/* Barra inferior Institucional */}
      <rect x="30" y="125" width="360" height="20" fill="black" transform="skewX(-5)" />
      <text x="45" y="140" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="11" fill="white" letterSpacing="0.5">
        INSTITUTO AUTÓNOMO MUNICIPAL DE LA ENERGÍA
      </text>

      <defs>
        <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" style={{stopColor:'#f59e0b', stopOpacity:1}} />
          <stop offset="60%" style={{stopColor:'#fbbf24', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#3b82f6', stopOpacity:0.8}} />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 md:px-20 py-2 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95">
          <IAMELogo className="h-14 md:h-20" />
        </Link>

        <nav className="flex items-center gap-4 md:gap-10">
          <Link to="/" className="hidden sm:block text-[10px] md:text-xs font-black text-slate-300 hover:text-[#D2261F] transition-colors uppercase tracking-widest italic">Inicio</Link>
          <Link to="/guia" className="hidden sm:block text-[10px] md:text-xs font-black text-slate-300 hover:text-[#D2261F] transition-colors uppercase tracking-widest italic">Seguridad</Link>
          <Link to="/admin" className="text-[10px] md:text-xs font-black text-cyan-400 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1.5 border border-cyan-400/30 px-3 py-2 md:px-4 md:py-2.5 rounded-xl bg-cyan-400/5 shadow-lg shadow-cyan-900/10">
            <span className="material-symbols-outlined text-sm md:text-base">admin_panel_settings</span>
            <span className="hidden xs:inline">Panel Técnico</span>
            <span className="xs:hidden">Admin</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
