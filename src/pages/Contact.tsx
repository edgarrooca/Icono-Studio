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
    <div className="min-h-screen bg-white text-brand-dark selection:bg-brand-lime selection:text-brand-dark font-sans overflow-x-hidden">
      
      <Navbar initialTheme="dark" />

      <main className="pt-32 pb-24">
        {/* Simple Page Header */}
        <section className="bg-brand-dark text-white pt-20 pb-24 rounded-b-[3rem] sm:rounded-b-[4rem] relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-blue/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
           
           <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-lime font-bold text-[10px] uppercase tracking-widest mb-8"
              >
                ¿Hablamos?
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.95]"
              >
                Cuéntanos tu <br />
                <span className="text-brand-lime italic">proyecto</span>
              </motion.h1>
           </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Info Card */}
            <div className="lg:col-span-5 space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-brand-blue/5 border border-gray-100"
              >
                <h2 className="font-display text-3xl uppercase mb-8 text-brand-dark">Canales directos</h2>
                <div className="space-y-6">
                   <a href="https://wa.me/34623783129" className="flex items-center gap-6 p-6 rounded-2xl bg-emerald-50 text-emerald-700 hover:scale-[1.02] transition-transform group">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                        <MessageSquare size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">WhatsApp Directo</p>
                        <p className="text-lg font-bold">Escríbenos ahora</p>
                      </div>
                   </a>

                   <a href="tel:623783129" className="flex items-center gap-6 p-6 rounded-2xl bg-blue-50 text-brand-blue hover:scale-[1.02] transition-transform group">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Llámanos</p>
                        <p className="text-lg font-bold">623 783 129</p>
                      </div>
                   </a>

                   <a href="mailto:holaiconostudio@gmail.com" className="flex items-center gap-6 p-6 rounded-2xl bg-zinc-50 text-zinc-600 hover:scale-[1.02] transition-transform group">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:bg-zinc-800 group-hover:text-white transition-colors duration-300">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Correo electrónico</p>
                        <p className="text-base font-bold">holaiconostudio@gmail.com</p>
                      </div>
                   </a>
                </div>

                <div className="mt-12 pt-10 border-t border-gray-100 grid grid-cols-2 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-full bg-brand-lime/10 flex items-center justify-center mx-auto text-brand-blue"><Clock size={20} /></div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Respuesta</p>
                    <p className="text-sm font-bold">Menos de 24h</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto text-brand-blue"><ShieldCheck size={20} /></div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Servicio</p>
                    <p className="text-sm font-bold">100% Personalizado</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Modern Form Card */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-8 md:p-14 rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-gray-100"
              >
                <div className="mb-10">
                   <h2 className="text-3xl font-display uppercase text-brand-dark mb-4">¿En qué podemos ayudarte?</h2>
                   <p className="text-gray-500 font-medium">Rellena este breve formulario y nos pondremos en contacto contigo lo antes posible para hablar de tu idea.</p>
                </div>

                <AnimatePresence mode="wait">
                  {formStatus === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="py-16 text-center"
                    >
                      <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 uppercase">¡Mensaje recibido!</h3>
                      <p className="text-gray-500 max-w-sm mx-auto mb-8">Gracias por confiar en Icono Studio. Ya estamos analizando tu solicitud.</p>
                      <button 
                        onClick={() => setFormStatus('idle')}
                        className="text-brand-blue font-bold uppercase tracking-widest text-[10px] border-b-2 border-brand-lime pb-1"
                      >
                        Enviar otro mensaje
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nombre Completo</label>
                             <input 
                              type="text" 
                              name="nombre" 
                              required 
                              placeholder="Ej. Edgar Roca" 
                              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all font-medium text-brand-dark"
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Correo Electrónico</label>
                             <input 
                              type="email" 
                              name="email" 
                              required 
                              placeholder="tu@email.com" 
                              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all font-medium text-brand-dark"
                             />
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">¿Qué necesitas?</label>
                          <select name="servicio" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all font-medium text-brand-dark appearance-none cursor-pointer">
                             <option>Diseño Web Profesional</option>
                             <option>E-commerce / Tienda Online</option>
                             <option>Mantenimiento y Hosting</option>
                             <option>SEO y Auditoría Digital</option>
                             <option>Otros servicios</option>
                          </select>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Mensaje o Detalles del proyecto</label>
                          <textarea 
                             name="mensaje" 
                             required 
                             rows={4}
                             placeholder="Cuéntanos brevemente cuáles son tus objetivos..."
                             className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all font-medium text-brand-dark resize-none"
                          />
                       </div>

                       <button 
                        type="submit" 
                        disabled={formStatus === 'submitting'}
                        className="w-full bg-brand-dark text-white py-6 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-brand-blue transition-all disabled:opacity-50 shadow-xl shadow-brand-blue/10"
                       >
                         {formStatus === 'submitting' ? 'Enviando...' : (
                           <>Enviar Solicitud <ArrowRight size={18} /></>
                         )}
                       </button>

                       <p className="text-center text-[10px] text-gray-400 font-medium">Al enviar este formulario, aceptas nuestra política de privacidad.</p>
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
