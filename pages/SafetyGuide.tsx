
import React from 'react';

const SafetyGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <div className="mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tight">Protocolos de <span className="text-[#D2261F]">Seguridad</span></h1>
        <div className="h-2 w-24 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]"></div>
        <p className="text-lg text-slate-400 font-medium">
          La prevención salva vidas. Siga estas instrucciones oficiales del I.A.M.E ante cualquier sospecha de fuga de gas.
        </p>
      </div>
      
      <div className="space-y-8">
        {[
          {
            title: "Detección Olfativa",
            content: "El gas doméstico tiene un aditivo llamado mercaptano que huele a 'sulfuro' o 'huevos podridos'. Si percibe este olor, actúe de inmediato.",
            icon: "visibility"
          },
          {
            title: "Evacuación Inmediata",
            content: "Abandone el recinto. No use interruptores, timbres ni ascensores. Cualquier chispa eléctrica puede ser detonante.",
            icon: "running_with_errors"
          },
          {
            title: "Ventilación Natural",
            content: "Si puede hacerlo rápidamente, abra ventanas y puertas. No use ventiladores eléctricos para dispersar el gas.",
            icon: "air"
          }
        ].map((item, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-6 p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl hover:border-[#D2261F] transition-all group">
            <div className="flex-shrink-0 w-16 h-16 bg-slate-800 text-[#D2261F] rounded-2xl flex items-center justify-center group-hover:bg-[#D2261F] group-hover:text-white transition-colors shadow-lg">
              <span className="material-symbols-outlined text-3xl">{item.icon}</span>
            </div>
            <div>
              <h3 className="text-xl font-black text-white mb-2 uppercase italic tracking-tight">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed font-bold text-sm italic">{item.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 p-10 bg-gradient-to-br from-red-900/20 to-slate-900 border border-red-500/30 rounded-[3rem] text-center">
        <span className="material-symbols-outlined text-5xl text-[#D2261F] mb-4">call</span>
        <h3 className="text-2xl font-black text-white mb-2 uppercase">Centro de Emergencias</h3>
        <p className="text-slate-400 font-bold mb-6 italic">Enlace técnico directo disponible 24/7</p>
        <div className="text-3xl font-black text-white tracking-tighter">tavipolan@gmail.com</div>
      </div>
    </div>
  );
};

export default SafetyGuide;
