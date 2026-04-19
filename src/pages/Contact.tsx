import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, Mail, MessageSquare, Send, CheckCircle2, 
  ArrowRight, Globe, ShieldCheck, Clock, MapPin
} from 'lucide-react';
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
      const response = await fetch('https://formspree.io/f/holaiconostudio@gmail.com', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
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
        <section className="w-full xl:w-[45%] bg-brand-dark text-white pt-40 pb-20 px-6 sm:px-12 lg:px-16 flex flex-col justify-between relative overflow-hidden shrink-0 min-h-[60vh] xl:min-h-screen">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-lime/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 space-y-8 lg:space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-4 backdrop-blur-sm"
            >
              Start a project
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="font-display text-7xl sm:text-8xl lg:text-[7rem] leading-[0.85] tracking-tighter uppercase"
            >
              Let's <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 italic">Talk</span>
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
            className="relative z-10 mt-20 xl:mt-0 space-y-10"
          >
            {/* Quick Contact Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
              <div className="space-y-4">
                 <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">General Inquiries</p>
                 <a href="mailto:holaiconostudio@gmail.com" className="flex flex-col gap-1 group">
                   <span className="text-white font-medium group-hover:text-brand-lime transition-colors">holaiconostudio@gmail.com</span>
                   <span className="text-white/40 group-hover:text-white/80 transition-colors uppercase text-[10px] tracking-widest font-bold">Email Us</span>
                 </a>
              </div>
              <div className="space-y-4">
                 <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">Direct Line</p>
                 <a href="https://wa.me/34623783129" className="flex flex-col gap-1 group">
                   <span className="text-white font-medium group-hover:text-brand-lime transition-colors">+34 623 783 129</span>
                   <span className="text-white/40 group-hover:text-white/80 transition-colors uppercase text-[10px] tracking-widest font-bold">WhatsApp / Tel</span>
                 </a>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex items-center justify-between">
               <p className="text-[10px] uppercase tracking-widest font-black text-white/30">Valencia, ES</p>
               <div className="flex items-center gap-4 text-white/50">
                  <a href="#" className="hover:text-white transition-colors"><Globe size={18} /></a>
                  <a href="#" className="hover:text-white transition-colors"><MapPin size={18} /></a>
               </div>
            </div>
          </motion.div>
        </section>


        {/* =========================================
            RIGHT COLUMN: PRISTINE WHITE FORM 
        ============================================= */}
        <section className="w-full xl:w-[55%] bg-white pt-24 pb-20 px-6 sm:px-12 lg:px-20 xl:px-32 flex flex-col justify-center shrink-0 min-h-screen">
            
            <div className="max-w-2xl w-full mx-auto">
              <div className="mb-14">
                <h2 className="text-3xl sm:text-4xl font-display uppercase text-brand-dark tracking-tight">Datos del Proyecto</h2>
                <p className="text-gray-400 mt-4 font-medium text-sm sm:text-base leading-relaxed">
                  Completa este formulario. Tratamos toda la información con máxima confidencialidad. Te daremos una respuesta humana en menos de 24 horas.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 bg-white text-center"
                  >
                    <div className="w-24 h-24 bg-brand-dark text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brand-dark/20">
                      <CheckCircle2 size={40} className="text-brand-lime" />
                    </div>
                    <h3 className="text-4xl font-display uppercase tracking-tight text-brand-dark mb-4">Solicitud Recibida</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-10 leading-relaxed font-medium">Extraordinario. Nuestro equipo está revisando tu propuesta y nos pondremos en contacto contigo increíblemente rápido.</p>
                    
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="inline-flex items-center justify-center px-10 py-4 font-black uppercase tracking-widest text-[10px] text-brand-dark border-b-2 border-brand-dark hover:text-brand-lime hover:border-brand-lime transition-all duration-300"
                    >
                      Enviar nueva solicitud
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-12">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Minimalist Input: Name */}
                        <div className="relative group/input">
                           <input 
                            type="text" 
                            name="nombre" 
                            required 
                            id="nombre"
                            className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-brand-dark placeholder-transparent outline-none focus:border-brand-dark transition-colors font-medium text-lg rounded-none"
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
                            className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-brand-dark placeholder-transparent outline-none focus:border-brand-dark transition-colors font-medium text-lg rounded-none"
                            placeholder="Correo Electrónico"
                           />
                           <label htmlFor="email" className="absolute left-0 -top-3.5 text-[10px] font-black uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-black peer-focus:uppercase peer-focus:text-brand-dark cursor-text">
                             Correo Electrónico
                           </label>
                        </div>
                     </div>

                     {/* Minimalist Select */}
                     <div className="relative group/input pt-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark block mb-3">Principal Área de Interés</label>
                        <div className="relative">
                          <select name="servicio" className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-brand-dark font-medium text-lg outline-none focus:border-brand-dark transition-colors appearance-none cursor-pointer rounded-none">
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
                           className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 text-brand-dark placeholder-transparent outline-none focus:border-brand-dark transition-colors font-medium resize-none min-h-[120px] rounded-none text-lg leading-relaxed"
                           placeholder="Cuéntanos un poco sobre el proyecto..."
                        />
                        <label htmlFor="mensaje" className="absolute left-0 -top-3.5 text-[10px] font-black uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-black peer-focus:uppercase peer-focus:text-brand-dark cursor-text">
                           Detalles sobre tu objetivo o visión
                        </label>
                     </div>

                     <div className="pt-8 flex flex-col sm:flex-row items-center gap-8 justify-between">
                       <button 
                        type="submit" 
                        disabled={formStatus === 'submitting'}
                        className="w-full sm:w-auto bg-brand-dark text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-brand-lime hover:text-brand-dark transition-all duration-300 disabled:opacity-50 overflow-hidden relative group"
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
                )}
              </AnimatePresence>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
