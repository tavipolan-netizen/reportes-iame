
import React from 'react';

const WarningBanner: React.FC = () => {
  return (
    <div className="bg-[#f1c40f] text-slate-900 py-2.5 px-4 text-center text-sm font-bold flex items-center justify-center gap-2">
      <span className="material-symbols-outlined text-xl">warning</span>
      <span>¿PELIGRO INMEDIATO? Si huele a gas o escucha un silbido fuerte, evacue y llame a emergencias de inmediato.</span>
    </div>
  );
};

export default WarningBanner;
