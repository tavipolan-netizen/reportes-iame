
import React from 'react';
import { Link } from 'react-router-dom';

const IAMELogo = ({ className = "h-12" }) => (
  <div className={`flex items-center ${className} select-none`}>
    <svg viewBox="0 0 400 150" className="h-full w-auto">
      <path d="M40,110 C30,90 20,60 45,20 C50,50 65,65 55,90 C70,60 85,30 90,60 C95,90 70,110 55,120 Z" fill="url(#flameGradientFooter)" />
      <path d="M45,40 C48,30 52,25 55,20 C53,30 50,40 48,50 Z" fill="#3b82f6" opacity="0.8" />
      <text x="60" y="115" fontFamily="Inter, sans-serif" fontWeight="900" fontStyle="italic" fontSize="90" fill="#D2261F" letterSpacing="-4">
        I.A.M.E.
      </text>
      <rect x="30" y="125" width="360" height="20" fill="black" transform="skewX(-5)" />
      <text x="45" y="140" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="11" fill="white" letterSpacing="0.5">
        INSTITUTO AUTÓNOMO MUNICIPAL DE LA ENERGÍA
      </text>
      <defs>
        <linearGradient id="flameGradientFooter" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" style={{stopColor:'#f59e0b', stopOpacity:1}} />
          <stop offset="60%" style={{stopColor:'#fbbf24', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#3b82f6', stopOpacity:0.8}} />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 px-4 md:px-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="bg-white p-2 rounded-2xl inline-block shadow-[0_0_30px_rgba(255,255,255,0.1)]">
             <IAMELogo className="h-16" />
          </div>
          <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm italic">
            "Energía segura para cada hogar venezolano. Gestión técnica de excelencia bajo la central de mando municipal."
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="font-black text-white uppercase text-xs tracking-widest border-l-4 border-[#D2261F] pl-3">Emergencias</h4>
          <div className="bg-slate-900 p-6 rounded-2xl shadow-inner border border-slate-800">
             <p className="text-[10px] font-black text-slate-500 mb-1 tracking-widest uppercase">Central de Enlace</p>
             <p className="text-xl font-black text-white tracking-tighter">tavipolan@gmail.com</p>
             <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 italic">Red Activa 24H</span>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em]">
          © 2024 I.A.M.E. - SISTEMA INTEGRAL DE GAS VENEZUELA.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
