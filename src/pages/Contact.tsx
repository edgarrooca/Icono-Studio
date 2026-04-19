import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, Mail, MessageSquare, Send, CheckCircle2, 
  ArrowRight, ArrowUpRight, Globe, ShieldCheck, Clock, MapPin,
  X, Menu
} from 'lucide-react';
import { mainNavLinks } from '../data/navigation';
import Footer from '../components/Footer';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        alert('Hubo un error. Por favor, inténtalo de nuevo.');
        setFormStatus('idle');
      }
    } catch (error) {
      alert('Error de conexión.');
      setFormStatus('idle');
    }
  };

  const contactMethods = [
    {
      icon: MessageSquare,
      label: 'WhatsApp Directo',
      value: '+34 623 783 129',
      href: 'https://wa.me/34623783129',
      tag: 'Inmediato'
    },
    {
      icon: Phone,
      label: 'Llamada Técnica',
      value: '623 783 129',
      href: 'tel:623783129',
      tag: '9:00 - 19:00'
    },
    {
      icon: Mail,
      label: 'Consultas Generales',
      value: 'holaiconostudio@gmail.com',
      href: 'mailto:holaiconostudio@gmail.com',
      tag: 'Respuesta < 24h'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-brand-lime selection:text-zinc-950 font-sans overflow-x-hidden">
      
      {/* 1. Header frosted/dark strategy */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-full px-8 py-4 shadow-2xl">
            <a href="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
              <img src="/icono-studio-logo.png" alt="Icono Studio" className="h-8 w-auto brightness-0 invert" />
            </a>
            
            <div className="hidden md:flex items-center gap-10">
              {mainNavLinks.slice(0, -1).map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-brand-lime transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-zinc-950 pt-32 px-10 flex flex-col gap-8 lg:hidden"
          >
            {mainNavLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-5xl uppercase tracking-tighter hover:text-brand-lime transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative pt-44 pb-32">
        {/* Background Gradients & Blueprint Overlay */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-brand-lime/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] bg-blueprint pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            
            {/* Left Content: The Message */}
            <div className="lg:col-span-5 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-lime font-black text-[10px] uppercase tracking-[0.2em] mb-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse" />
                  Próximo lanzamiento
                </div>
                <h1 className="font-display text-7xl sm:text-8xl xl:text-9xl uppercase tracking-tight leading-[0.85] mb-10">
                  <span className="block">Demos</span>
                  <span className="block text-brand-blue italic">forma</span>
                  <span className="block italic">al mañana</span>
                </h1>
                <p className="text-xl text-zinc-400 font-medium leading-relaxed max-w-md">
                  Estamos aquí para elevar tu presencia digital. Escríbenos o utiliza un canal directo para una respuesta inmediata.
                </p>
              </motion.div>

              <div className="space-y-4">
                {contactMethods.map((method, i) => (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 + (i * 0.1) }}
                    className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-2xl shadow-brand-blue/20">
                        <method.icon size={22} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">{method.label}</p>
                        <p className="text-lg font-bold group-hover:text-brand-lime transition-colors">{method.value}</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/5 text-[9px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                      {method.tag}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right: The Form UI */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[4rem] p-8 md:p-16 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-lime/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                
                <AnimatePresence mode="wait">
                  {formStatus === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center py-20 space-y-8"
                    >
                      <div className="w-24 h-24 bg-brand-lime text-zinc-950 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-brand-lime/20">
                        <CheckCircle2 size={48} strokeWidth={2.5} />
                      </div>
                      <div className="space-y-4">
                        <h2 className="font-display text-4xl uppercase tracking-tight">Recibido correctamente</h2>
                        <p className="text-zinc-400 max-w-sm mx-auto">Nuestro equipo técnico revisará tu propuesta y se pondrá en contacto contigo en las próximas horas.</p>
                      </div>
                      <button 
                        onClick={() => setFormStatus('idle')}
                        className="text-brand-lime font-black uppercase tracking-[0.2em] text-[10px] border-b-2 border-brand-lime/30 pb-2 hover:border-brand-lime transition-all"
                      >
                        Enviar otra solicitud
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="relative z-10 space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                        <div className="relative group">
                          <input 
                            type="text" 
                            name="nombre" 
                            required 
                            className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-brand-lime transition-all text-xl font-medium peer"
                            placeholder=" "
                          />
                          <label className="absolute left-0 top-4 text-zinc-500 font-bold uppercase tracking-widest text-[10px] transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-brand-lime peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-brand-lime">
                            Tu Nombre
                          </label>
                        </div>
                        <div className="relative group">
                          <input 
                            type="email" 
                            name="email" 
                            required 
                            className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-brand-lime transition-all text-xl font-medium peer"
                            placeholder=" "
                          />
                          <label className="absolute left-0 top-4 text-zinc-500 font-bold uppercase tracking-widest text-[10px] transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-brand-lime peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-brand-lime">
                            Tu Email
                          </label>
                        </div>
                      </div>

                      <div className="relative">
                        <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mb-6">Tipo de servicio</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {['Web Profesional', 'E-commerce', 'Mantenimiento', 'SEO', 'Consultoría'].map((service) => (
                            <label key={service} className="relative cursor-pointer group">
                              <input type="radio" name="servicio" value={service} className="sr-only peer" />
                              <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-center peer-checked:bg-white peer-checked:text-zinc-950 peer-checked:border-white group-hover:border-white/20 transition-all">
                                {service}
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="relative group">
                        <textarea 
                          name="mensaje" 
                          required 
                          rows={4}
                          className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-brand-lime transition-all text-xl font-medium resize-none peer"
                          placeholder=" "
                        />
                        <label className="absolute left-0 top-4 text-zinc-500 font-bold uppercase tracking-widest text-[10px] transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-brand-lime peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-brand-lime">
                          Sobre el proyecto
                        </label>
                      </div>

                      <div className="pt-6">
                        <motion.button 
                          type="submit"
                          disabled={formStatus === 'submitting'}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-brand-blue text-white py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 hover:bg-white hover:text-brand-dark transition-all shadow-2xl shadow-brand-blue/20 disabled:opacity-50"
                        >
                          {formStatus === 'submitting' ? 'Enviando trámite...' : (
                            <>Enviar solicitud <ArrowRight size={18} /></>
                          )}
                        </motion.button>
                        <p className="text-[9px] text-zinc-600 text-center mt-6 uppercase tracking-widest font-bold">Respuesta en menos de 24h laborables</p>
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
