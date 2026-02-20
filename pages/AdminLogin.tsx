
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IAMELogo = ({ className = "h-12" }) => (
  <div className={`flex items-center ${className} select-none`}>
    <svg viewBox="0 0 400 150" className="h-full w-auto">
      <path d="M40,110 C30,90 20,60 45,20 C50,50 65,65 55,90 C70,60 85,30 90,60 C95,90 70,110 55,120 Z" fill="url(#flameGradientLogin)" />
      <path d="M45,40 C48,30 52,25 55,20 C53,30 50,40 48,50 Z" fill="#3b82f6" opacity="0.8" />
      <text x="60" y="115" fontFamily="Inter, sans-serif" fontWeight="900" fontStyle="italic" fontSize="90" fill="#D2261F" letterSpacing="-4">
        I.A.M.E.
      </text>
      <rect x="30" y="125" width="360" height="20" fill="black" transform="skewX(-5)" />
      <text x="45" y="140" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="11" fill="white" letterSpacing="0.5">
        INSTITUTO AUTÓNOMO MUNICIPAL DE LA ENERGÍA
      </text>
      <defs>
        <linearGradient id="flameGradientLogin" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" style={{stopColor:'#f59e0b', stopOpacity:1}} />
          <stop offset="60%" style={{stopColor:'#fbbf24', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#3b82f6', stopOpacity:0.8}} />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const AdminLogin: React.FC = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === 'admin' && pass === 'iame2024') {
      localStorage.setItem('iame_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="bg-white p-3 rounded-2xl mb-6 shadow-xl">
            <IAMELogo className="h-16 md:h-20" />
          </div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Acceso de Personal</h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2 italic">Solo personal autorizado IAME</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Usuario Técnico</label>
            <input 
              type="text" 
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-white font-bold outline-none focus:border-[#D2261F] transition-all"
              placeholder="Nombre de usuario"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Clave de Seguridad</label>
            <input 
              type="password" 
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-white font-bold outline-none focus:border-[#D2261F] transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[10px] font-black text-red-500 uppercase tracking-widest text-center animate-shake">Acceso Denegado</p>
          )}

          <button className="w-full bg-[#D2261F] hover:bg-black text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-red-900/20 uppercase text-xs tracking-widest italic">
            Ingresar al Mando
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
