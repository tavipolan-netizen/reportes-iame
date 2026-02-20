
import React from 'react';
import { Link } from 'react-router-dom';
import ReportForm from '../components/ReportForm';
import StatusChecker from '../components/StatusChecker';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-8 md:py-12 px-4 md:px-20 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-20 lg:opacity-30 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1200" 
            alt="Mantenimiento Industrial de Gas" 
            className="w-full h-full object-cover grayscale brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-900"></div>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          
          <div className="flex flex-col gap-6 md:gap-8 relative z-10">
            <div className="space-y-4 md:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-700 shadow-xl mx-auto lg:mx-0">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]"></span>
                <span className="text-cyan-400 font-black tracking-widest uppercase text-[9px] md:text-[10px]">Línea de Vida Gasífera</span>
              </div>
              <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] tracking-tight italic">
                Cuidando tu <br/>
                <span className="text-[#D2261F] drop-shadow-[0_0_20px_rgba(210,38,31,0.5)]">Seguridad</span>
              </h1>
              <p className="text-slate-400 text-sm md:text-lg font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                Reporte incidencias de gas directamente a <span className="text-slate-200">tavipolan@gmail.com</span>. Atención técnica inmediata para la protección de la familia venezolana.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="p-5 md:p-6 bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/50 flex flex-col gap-3 group hover:border-[#D2261F] transition-all cursor-default text-center sm:text-left">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-900/30 rounded-lg flex items-center justify-center border border-red-500/20 mx-auto sm:mx-0">
                  <span className="material-symbols-outlined text-[#D2261F] text-xl md:text-2xl">gas_meter</span>
                </div>
                <div>
                  <h3 className="font-black text-white uppercase text-[10px] md:text-xs">Fugas y Presión</h3>
                  <p className="text-[9px] md:text-[10px] text-slate-400 font-bold leading-relaxed">Monitoreo y reporte de fallas en tuberías y medidores.</p>
                </div>
              </div>
              <div className="p-5 md:p-6 bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/50 flex flex-col gap-3 group hover:border-[#F7B500] transition-all cursor-default text-center sm:text-left">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-900/30 rounded-lg flex items-center justify-center border border-yellow-500/20 mx-auto sm:mx-0">
                  <span className="material-symbols-outlined text-[#F7B500] text-xl md:text-2xl">engineering</span>
                </div>
                <div>
                  <h3 className="font-black text-white uppercase text-[10px] md:text-xs">Cuadrillas IAME</h3>
                  <p className="text-[9px] md:text-[10px] text-slate-400 font-bold leading-relaxed">Técnicos especializados listos para el despliegue.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-inner relative overflow-hidden">
              <h3 className="flex items-center gap-2 font-black text-white mb-6 uppercase tracking-widest text-[9px] md:text-[10px] relative z-10 justify-center lg:justify-start">
                <span className="material-symbols-outlined text-[#F7B500] text-sm">warning</span>
                Zona de Riesgo: Protocolo
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                {[
                  "No use teléfonos en el sitio.",
                  "Evacue al menos a 50 metros.",
                  "Ventile abriendo ventanas.",
                  "No encienda luz ni fuego."
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-[9px] font-black text-slate-500 uppercase tracking-tight">
                    <div className="w-5 h-5 rounded-full bg-[#D2261F] flex items-center justify-center text-[8px] text-white flex-shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <ReportForm />
          </div>

        </div>
      </section>

      {/* Status Checker Section */}
      <section className="bg-slate-950/30 py-16 md:py-24 px-4 md:px-20 border-y border-slate-800 relative">
        <StatusChecker />
      </section>

      {/* Infrastructure Section */}
      <section className="py-16 md:py-20 px-4 md:px-20 bg-slate-900/20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
           <div className="w-full lg:w-1/2 h-[300px] md:h-[450px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 md:border-8 border-slate-800 group relative">
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200" 
                alt="Obreros trabajando en tuberías de gas" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" 
              />
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-all duration-500"></div>
           </div>
           <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight italic">
                  Compromiso <br/>
                  <span className="text-[#D2261F]">Institucional I.A.M.E.</span>
                </h2>
                <div className="h-1.5 w-20 md:w-24 bg-cyan-500 rounded-full mx-auto lg:mx-0"></div>
              </div>
              <p className="text-slate-400 font-medium text-base md:text-lg leading-relaxed">
                Plataforma conectada directamente con el centro de mando municipal para la gestión de infraestructura gasífera.
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-8 pt-4">
                <div className="space-y-1">
                   <p className="text-2xl md:text-3xl font-black text-[#D2261F]">DIRECTO</p>
                   <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">Enlace al Correo</p>
                </div>
                <div className="space-y-1">
                   <p className="text-2xl md:text-3xl font-black text-cyan-400">100%</p>
                   <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">Eficiencia</p>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Admin Promo Section */}
      <section className="py-16 md:py-24 px-4 md:px-20 bg-slate-950">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="material-symbols-outlined text-cyan-400 text-5xl md:text-6xl">admin_panel_settings</span>
            <h2 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter">Portal de Gestión</h2>
            <p className="text-slate-400 font-bold text-[11px] md:text-sm italic max-w-xl mx-auto leading-relaxed">
              Exclusivo para personal técnico y directivo del I.A.M.E.
            </p>
          </div>
          <div className="relative z-10 pt-2">
            <Link to="/admin" className="inline-flex items-center gap-3 bg-white hover:bg-cyan-400 text-slate-900 px-8 py-4 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all shadow-xl italic w-full sm:w-auto justify-center">
              Acceder al Panel
              <span className="material-symbols-outlined text-sm">login</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
