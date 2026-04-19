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
    <div className="min-h-screen bg-[#F8F9FA] text-brand-dark selection:bg-brand-lime selection:text-brand-dark font-sans overflow-x-hidden">
      
      {/* 1. Header is pushed to Z-index by Navbar component, so we just add the Navbar */}
      <Navbar initialTheme="dark" />

      <main>
        {/* --- PREMIUM HERO (Touches top) --- */}
        <section className="bg-brand-dark text-white pt-40 md:pt-48 pb-32 sm:pb-40 rounded-b-[2.5rem] md:rounded-b-[4rem] relative overflow-hidden z-10">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-lime/5 rounded-full blur-[80px] pointer-events-none"></div>
           
           <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-lime font-bold text-[10px] uppercase tracking-widest mb-8 backdrop-blur-sm"
              >
                Let's talk
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] uppercase tracking-tighter leading-[0.9]"
              >
                Hablemos de tu <br className="hidden sm:block"/>
                <span className="text-brand-lime italic font-light tracking-wide mr-1 md:mr-2">próximo</span>
                proyecto
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-white/50 text-base md:text-lg max-w-xl mx-auto mt-8 font-medium leading-relaxed"
              >
                Estamos buscando proyectos ambiciosos. Si quieres destacar en tu sector con una web que deje marca, estás en el lugar correcto.
              </motion.p>
           </div>
        </section>

        {/* --- REDESIGNED CONTACT SECTION --- */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-20 sm:-mt-24 relative z-20 pb-20 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
            
            {/* Left: Minimalist Info Pillar */}
            <div className="lg:col-span-4 lg:col-start-1 space-y-8 order-2 lg:order-1 pt-8 lg:pt-0">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="space-y-12">
                   {/* Info block 1 */}
                   <div>
                     <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-200 pb-3 inline-block">WhatsApp Directo</h3>
                     <a href="https://wa.me/34623783129" className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                          <MessageSquare size={18} />
                        </div>
                        <div>
                          <p className="text-xl font-display uppercase tracking-tight text-brand-dark group-hover:text-emerald-600 transition-colors">623 783 129</p>
                          <p className="text-xs text-gray-500 font-medium mt-1">Lunes a Viernes, 9:00 - 18:00</p>
                        </div>
                     </a>
                   </div>

                   {/* Info block 2 */}
                   <div>
                     <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-200 pb-3 inline-block">Habla con nosotros</h3>
                     <a href="tel:623783129" className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                          <Phone size={18} />
                        </div>
                        <div>
                          <p className="text-xl font-display uppercase tracking-tight text-brand-dark group-hover:text-brand-blue transition-colors">Llamada directa</p>
                          <p className="text-xs text-gray-500 font-medium mt-1">Agenda una llamada sin compromiso</p>
                        </div>
                     </a>
                   </div>

                   {/* Info block 3 */}
                   <div>
                     <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-200 pb-3 inline-block">Email General</h3>
                     <a href="mailto:holaiconostudio@gmail.com" className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-brand-dark/5 text-brand-dark flex items-center justify-center shrink-0 group-hover:bg-brand-dark group-hover:text-white transition-colors duration-300">
                          <Mail size={18} />
                        </div>
                        <div>
                          <p className="text-[15px] font-bold text-brand-dark leading-none mt-1 group-hover:underline decration-brand-dark/20 underline-offset-4">holaiconostudio@gmail.com</p>
                        </div>
                     </a>
                   </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-200 flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-brand-dark font-medium">
                    <Clock size={16} className="text-brand-lime" />
                    <span>Respuesta &lt; 24h</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Premium Form Sheet */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-white p-8 sm:p-12 md:p-16 rounded-[2rem] sm:rounded-[3rem] shadow-2xl shadow-gray-200/50"
              >
                <div className="mb-12">
                   <h2 className="text-2xl sm:text-3xl font-display uppercase text-brand-dark">Comparte tu visión</h2>
                   <p className="text-gray-500 text-sm mt-3 font-medium">Completa los campos a continuación. Toda la información será tratada de manera estrictamente confidencial.</p>
                </div>

                <AnimatePresence mode="wait">
                  {formStatus === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-16 text-center"
                    >
                      <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <CheckCircle2 size={48} />
                      </div>
                      <h3 className="text-3xl font-display uppercase tracking-tight text-brand-dark mb-4">Solicitud Recibida</h3>
                      <p className="text-gray-500 max-w-sm mx-auto mb-10 leading-relaxed font-medium">Gracias por confiar en el equipo de Icono Studio. Revisaremos tu información y te contactaremos en menos de 24 horas.</p>
                      
                      <button 
                        onClick={() => setFormStatus('idle')}
                        className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-gray-200 text-xs font-bold uppercase tracking-widest text-brand-dark hover:bg-gray-50 transition-colors"
                      >
                        Nuevo Mensaje
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-10 group">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          {/* Minimalist Input: Name */}
                          <div className="relative group/input">
                             <input 
                              type="text" 
                              name="nombre" 
                              required 
                              id="nombre"
                              className="peer w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark placeholder-transparent outline-none focus:border-brand-dark transition-colors font-medium"
                              placeholder="Nombre Completo"
                             />
                             <label htmlFor="nombre" className="absolute left-0 -top-3.5 text-[10px] font-black uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-black peer-focus:uppercase peer-focus:text-brand-dark cursor-text">
                               Nombre Completo
                             </label>
                          </div>
                          
                          {/* Minimalist Input: Email */}
                          <div className="relative group/input">
                             <input 
                              type="email" 
                              name="email" 
                              required 
                              id="email"
                              className="peer w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark placeholder-transparent outline-none focus:border-brand-dark transition-colors font-medium"
                              placeholder="Correo Electrónico"
                             />
                             <label htmlFor="email" className="absolute left-0 -top-3.5 text-[10px] font-black uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-black peer-focus:uppercase peer-focus:text-brand-dark cursor-text">
                               Correo Electrónico
                             </label>
                          </div>
                       </div>

                       {/* Minimalist Select */}
                       <div className="relative group/input pt-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark block mb-3">Interés Principal</label>
                          <div className="relative">
                            <select name="servicio" className="w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark font-medium outline-none focus:border-brand-dark transition-colors appearance-none cursor-pointer">
                               <option>Diseño Web Profesional</option>
                               <option>E-commerce / Tienda Online</option>
                               <option>Mantenimiento y Rendimiento</option>
                               <option>Estrategia y SEO</option>
                               <option>Otro Proyecto Especifico</option>
                            </select>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-brand-dark">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                          </div>
                       </div>

                       {/* Minimalist Textarea */}
                       <div className="relative group/input pt-4">
                          <textarea 
                             name="mensaje" 
                             required 
                             id="mensaje"
                             rows={1}
                             className="peer w-full bg-transparent border-b border-gray-200 py-3 text-brand-dark placeholder-transparent outline-none focus:border-brand-dark transition-colors font-medium resize-none min-h-[100px]"
                             placeholder="Cuéntanos un poco sobre el proyecto..."
                          />
                          <label htmlFor="mensaje" className="absolute left-0 -top-3.5 text-[10px] font-black uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-black peer-focus:uppercase peer-focus:text-brand-dark cursor-text">
                             Detalles del proyecto (Opcional pero recomendable)
                          </label>
                       </div>

                       <div className="pt-6 flex flex-col sm:flex-row items-center gap-6 justify-between border-t border-gray-100">
                         <p className="text-[10px] text-gray-400 font-medium max-w-xs text-center sm:text-left leading-relaxed">
                           Tus datos están seguros. Jamás compartiremos tu información con terceros, ni enviaremos spam.
                         </p>
                         <button 
                          type="submit" 
                          disabled={formStatus === 'submitting'}
                          className="w-full sm:w-auto bg-brand-dark text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-brand-lime hover:text-brand-dark transition-all duration-300 disabled:opacity-50"
                         >
                           {formStatus === 'submitting' ? 'Procesando...' : (
                             <>Iniciar Proyecto <ArrowRight size={14} /></>
                           )}
                         </button>
                       </div>
                    </form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
