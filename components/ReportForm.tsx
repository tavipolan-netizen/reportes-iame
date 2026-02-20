
import React, { useState } from 'react';

const ReportForm: React.FC = () => {
  const [photos, setPhotos] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reportId, setReportId] = useState('');

  const generateId = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `IAME-${year}-${random}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const saveToLocal = (data: any) => {
    try {
      const existing = JSON.parse(localStorage.getItem('iame_reports') || '[]');
      const updated = [data, ...existing];
      localStorage.setItem('iame_reports', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error("Error al guardar localmente:", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const newId = generateId();
    setReportId(newId);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const base64Photos = await Promise.all(photos.map(file => fileToBase64(file)));

    const reportData = {
      id: newId,
      nombre: String(formData.get('Nombre') || ''),
      apellido: String(formData.get('Apellido') || ''),
      telefono: String(formData.get('Telefono') || ''),
      email: String(formData.get('email') || ''),
      parroquia: String(formData.get('Parroquia') || ''),
      comunidad: String(formData.get('Comunidad') || ''),
      detalles: String(formData.get('message') || ''),
      fecha: new Date().toLocaleString('es-VE'),
      status: 'PENDIENTE',
      fotos: base64Photos
    };

    const formEndpoint = "https://formspree.io/f/tavipolan@gmail.com"; 

    try {
      await fetch(formEndpoint, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      saveToLocal(reportData);
      setSuccess(true);
      form.reset();
      setPhotos([]);
    } catch (err) {
      saveToLocal(reportData);
      setSuccess(true);
    } finally {
      setSending(false);
    }
  };

  if (success) {
    return (
      <div className="bg-slate-900 border-2 border-[#D2261F] rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-8 md:p-12 text-center space-y-6">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.3)] border border-green-500/30">
          <span className="material-symbols-outlined text-5xl md:text-6xl font-bold">mail</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-black text-white uppercase italic">¡Correo Despachado!</h2>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 inline-block px-6 md:px-8 mt-4">
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">ID del Caso</p>
            <p className="text-xl md:text-2xl font-black text-[#F7B500] tracking-tighter">{reportId}</p>
          </div>
        </div>
        <button onClick={() => setSuccess(false)} className="w-full py-4 bg-[#D2261F] hover:bg-black text-white font-black rounded-2xl transition-all uppercase text-[10px] tracking-[0.2em] shadow-xl">
          Entendido
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/95 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.5)] border border-slate-700/50 overflow-hidden lg:sticky lg:top-28">
      <div className="bg-[#D2261F] px-6 md:px-8 py-5 md:py-6 text-white relative shadow-lg">
        <h2 className="text-xl md:text-2xl font-black mb-1 uppercase tracking-tighter italic relative z-10">Reporte Directo</h2>
        <p className="text-white/80 text-[8px] md:text-[9px] font-black uppercase tracking-widest relative z-10 flex items-center gap-2 justify-center sm:justify-start">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          Central de Emergencias IAME
        </p>
      </div>

      <form className="p-6 md:p-8 space-y-4 md:space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-slate-800 pb-1">
            <span className="material-symbols-outlined text-[12px]">person</span> Datos del Reportante
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="Nombre" required type="text" placeholder="Nombre" className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-[#D2261F] outline-none text-xs font-bold text-white" />
            <input name="Apellido" required type="text" placeholder="Apellido" className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-[#D2261F] outline-none text-xs font-bold text-white" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="Telefono" required type="tel" placeholder="Teléfono" className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-[#D2261F] outline-none text-xs font-bold text-white" />
            <input name="email" required type="email" placeholder="Correo" className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-[#D2261F] outline-none text-xs font-bold text-white" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-slate-800 pb-1">
            <span className="material-symbols-outlined text-[12px]">map</span> Ubicación
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="Parroquia" required type="text" placeholder="Parroquia" className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-[#D2261F] outline-none text-xs font-bold text-white" />
            <input name="Comunidad" required type="text" placeholder="Comunidad" className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-[#D2261F] outline-none text-xs font-bold text-white" />
          </div>
        </div>

        <div className="space-y-3">
          <textarea 
            name="message" 
            required 
            rows={3} 
            placeholder="Describa la situación..." 
            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-[#D2261F] outline-none text-xs font-bold text-white resize-none"
          ></textarea>
          
          <div className="relative group border-2 border-dashed border-slate-700 rounded-2xl p-3 md:p-4 bg-slate-900 hover:bg-slate-800 hover:border-cyan-400 transition-all cursor-pointer text-center">
            <span className="material-symbols-outlined text-slate-600 group-hover:text-cyan-400 text-xl md:text-2xl mb-1">photo_camera</span>
            <p className="text-[7px] md:text-[8px] font-black text-slate-500 group-hover:text-cyan-400 uppercase tracking-widest">
              {photos.length > 0 ? `${photos.length} Fotos listas` : "Subir fotos de la incidencia"}
            </p>
            <input name="Evidencia" type="file" multiple accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
        </div>

        <button 
          disabled={sending}
          type="submit"
          className="w-full bg-[#D2261F] hover:bg-black text-white font-black py-4 rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-[0.15em] text-[10px] italic"
        >
           {sending ? <span className="animate-spin material-symbols-outlined text-sm">sync</span> : <span className="material-symbols-outlined text-sm">forward_to_inbox</span>}
           {sending ? 'Procesando...' : 'Enviar Reporte'}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
