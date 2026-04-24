import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, ArrowRight, ShieldCheck, ChevronDown, Mail, Phone
} from 'lucide-react';

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    document.title = 'Contacto | Icono Studio - Diseño Web Profesional';
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/holaiconostudio@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(data))
      });
      
      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        alert('Lo sentimos, hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.');
        setFormStatus('idle');
      }
    } catch (error) {
      alert('Error de conexión. Revisa tu internet e inténtalo de nuevo.');
      setFormStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-lime selection:text-brand-dark overflow-x-hidden relative">
      
      {/* 
        NAVBAR FIX:
        Placed inside an absolute wrapper so it floats gracefully over both 
        the dark and light split sections without pushing content downward.
      */}
      <div className="absolute top-0 w-full z-50">
        <Navbar initialTheme="dark" />
      </div>

      <main className="flex flex-col xl:flex-row min-h-screen w-full relative z-10">
        
        {/* =========================================
            LEFT COLUMN: THE DARK EDITORIAL HERO 
        ============================================= */}
        <section className="w-full xl:w-[45%] bg-brand-dark text-white py-32 px-6 sm:px-12 lg:px-16 flex flex-col justify-center relative overflow-hidden shrink-0 min-h-screen">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-lime/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-16 lg:gap-20 max-w-xl mx-auto w-full">
            <div className="space-y-8 lg:space-y-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 text-white font-bold text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm"
              >
                Inicia tu proyecto
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tighter uppercase"
              >
                Hablemos
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-white/60 text-lg sm:text-xl font-medium max-w-md leading-relaxed"
              >
                Construimos ecosistemas digitales que transforman audiencias en clientes.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="space-y-4 pt-4"
            >
              {/* WhatsApp Row */}
              <a href="https://wa.me/34623783129" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                    <WhatsAppIcon size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-base sm:text-xl md:text-2xl mb-1 group-hover:text-[#25D366] transition-colors">+34 623 783 129</h3>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-white/40">WhatsApp</p>
                  </div>
                </div>
                <ArrowRight size={24} className="text-white/20 group-hover:text-[#25D366] group-hover:-rotate-45 transition-all hidden sm:block" />
              </a>

              {/* Phone Row */}
              <a href="tel:+34623783129" className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-brand-lime/20 flex items-center justify-center text-brand-lime group-hover:scale-110 transition-transform">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-base sm:text-xl md:text-2xl mb-1 group-hover:text-brand-lime transition-colors">+34 623 783 129</h3>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-white/40">Llamada Directa</p>
                  </div>
                </div>
                <ArrowRight size={24} className="text-white/20 group-hover:text-brand-lime group-hover:-rotate-45 transition-all hidden sm:block" />
              </a>

              {/* Email Row */}
              <a href="mailto:holaiconostudio@gmail.com" className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-white font-medium text-base sm:text-xl md:text-2xl mb-1 group-hover:text-white transition-colors truncate" title="holaiconostudio@gmail.com">holaiconostudio@gmail.com</h3>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-white/40">Correo Electrónico</p>
                  </div>
                </div>
                <ArrowRight size={24} className="text-white/20 group-hover:text-white group-hover:-rotate-45 transition-all hidden sm:block" />
              </a>
            </motion.div>
          </div>
        </section>


        {/* =========================================
            RIGHT COLUMN: PRISTINE WHITE FORM 
        ============================================= */}
        <section className="w-full xl:w-[55%] bg-white pt-24 pb-20 px-6 sm:px-12 lg:px-20 xl:px-32 flex flex-col justify-center shrink-0 min-h-screen">
            
            <div className="max-w-2xl w-full mx-auto">
              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 bg-white text-center flex flex-col items-center justify-center min-h-[400px]"
                  >
                    <div className="w-24 h-24 bg-brand-dark text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-brand-dark/20">
                      <CheckCircle2 size={40} className="text-brand-lime" />
                    </div>
                    <h3 className="text-4xl font-display uppercase tracking-tight text-brand-dark mb-4">Solicitud Recibida</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-10 leading-relaxed font-medium text-lg">Nuestro equipo está revisando tu propuesta. Nos pondremos en contacto contigo en un plazo de 24 horas.</p>
                    
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="inline-flex items-center justify-center px-10 py-4 font-black uppercase tracking-widest text-[10px] text-brand-dark border-b-2 border-brand-dark hover:text-brand-lime hover:border-brand-lime transition-all duration-300"
                    >
                      Enviar nueva solicitud
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-14">
                      <h2 className="text-3xl sm:text-4xl font-display uppercase text-brand-dark tracking-tight">Datos del Proyecto</h2>
                      <p className="text-gray-400 mt-4 font-medium text-sm sm:text-base leading-relaxed">
                        Completa este formulario. Tratamos toda la información con máxima confidencialidad. Te daremos una respuesta humana en menos de 24 horas.
                      </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-10">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Minimalist Input: Name */}
                        <div className="relative group/input">
                           <input 
                            type="text" 
                            name="nombre" 
                            required 
                            id="nombre"
                            className="peer w-full bg-transparent border-b-2 border-gray-200 py-2.5 text-brand-dark placeholder-transparent outline-none focus:border-brand-dark transition-colors font-medium text-base rounded-none"
                            placeholder="Nombre Completo"
                           />
                           <label htmlFor="nombre" className="absolute left-0 -top-3.5 text-[10px] font-black uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-black peer-focus:uppercase peer-focus:text-brand-dark cursor-text">
                             Tu Nombre Completo
                           </label>
                        </div>
                        
                        {/* Minimalist Input: Email */}
                        <div className="relative group/input">
                           <input 
                            type="email" 
                            name="email" 
                            required 
                            id="email"
                            className="peer w-full bg-transparent border-b-2 border-gray-200 py-2.5 text-brand-dark placeholder-transparent outline-none focus:border-brand-dark transition-colors font-medium text-base rounded-none"
                            placeholder="Correo Electrónico"
                           />
                           <label htmlFor="email" className="absolute left-0 -top-3.5 text-[10px] font-black uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-black peer-focus:uppercase peer-focus:text-brand-dark cursor-text">
                             Correo Electrónico
                           </label>
                        </div>
                     </div>

                     {/* Minimalist Select */}
                     <div className="relative group/input pt-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark block mb-2">Principal Área de Interés</label>
                        <div className="relative">
                          <select name="servicio" className="w-full bg-transparent border-b-2 border-gray-200 py-2.5 text-brand-dark font-medium text-base outline-none focus:border-brand-dark transition-colors appearance-none cursor-pointer rounded-none">
                             <option value="" disabled selected hidden>Selecciona una opción...</option>
                             <option>Desarrollo Web / Landing Page</option>
                             <option>E-commerce / Tienda Online</option>
                             <option>Mantenimiento Técnico Avanzado</option>
                             <option>Auditoría SEO & Rendimiento</option>
                             <option>Proyecto 100% a medida</option>
                          </select>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-brand-dark -mt-1">
                            <ChevronDown size={20} />
                          </div>
                        </div>
                     </div>

                     {/* Minimalist Textarea */}
                     <div className="relative group/input pt-6">
                        <textarea 
                           name="mensaje" 
                           required 
                           id="mensaje"
                           rows={3}
                           className="peer w-full bg-transparent border-b-2 border-gray-200 py-2.5 text-brand-dark placeholder-transparent outline-none focus:border-brand-dark transition-colors font-medium resize-none min-h-[100px] rounded-none text-base leading-relaxed"
                           placeholder="Cuéntanos un poco sobre el proyecto..."
                        />
                        <label htmlFor="mensaje" className="absolute left-0 -top-3.5 text-[10px] font-black uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-black peer-focus:uppercase peer-focus:text-brand-dark cursor-text">
                           Detalles sobre tu objetivo o visión
                        </label>
                     </div>

                     <div className="pt-6 flex flex-col sm:flex-row items-center gap-6 justify-between">
                       <button 
                        type="submit" 
                        disabled={formStatus === 'submitting'}
                        className="w-full sm:w-auto bg-brand-dark text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-brand-lime hover:text-brand-dark transition-all duration-300 disabled:opacity-50 overflow-hidden relative group"
                       >
                         <span className="relative z-10 flex items-center gap-3">
                           {formStatus === 'submitting' ? 'Procesando...' : (
                             <>Solicitar Presupuesto <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></>
                           )}
                         </span>
                       </button>
                       <p className="text-[10px] text-gray-400 font-bold max-w-xs text-center sm:text-right leading-relaxed uppercase tracking-widest">
                         <ShieldCheck size={14} className="inline mr-1 -mt-0.5" /> 100% Confidencial
                       </p>
                     </div>
                  </form>
                </>
                )}
              </AnimatePresence>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
