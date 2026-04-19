import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, Mail, MessageSquare, Send, CheckCircle2, 
  ArrowRight, Globe, ShieldCheck, Clock, MapPin, 
  Linkedin, Instagram, Twitter
} from 'lucide-react';
import Navbar from '../components/Navbar'; // I'll check if I should use Navbar or inline it
import Footer from '../components/Footer';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate submission to Formspree
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
        alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
        setFormStatus('idle');
      }
    } catch (error) {
      alert('Hubo un error al conectar con el servidor.');
      setFormStatus('idle');
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Llámanos',
      value: '623 783 129',
      href: 'tel:623783129',
      desc: 'Lunes a Viernes, 9:00 - 19:00',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      value: 'Escríbenos ahora',
      href: 'https://wa.me/34623783129',
      desc: 'Respuesta inmediata garantizada',
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'holaiconostudio@gmail.com',
      href: 'mailto:holaiconostudio@gmail.com',
      desc: 'Te responderemos en menos de 24h',
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-brand-lime selection:text-brand-dark font-sans overflow-x-hidden">
      
      {/* 1. Navbar - We use a simple version here or the global one */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 bg-brand-dark/95 backdrop-blur-md shadow-lg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-center bg-white/5 rounded-full px-6 py-3 border border-white/10">
              <a href="/" className="flex items-center gap-2">
                <img src="/icono-studio-logo.png" alt="Icono Studio" className="h-8 w-auto" />
              </a>
              <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest">
                 <a href="/" className="hover:text-brand-lime transition-colors">Inicio</a>
                 <a href="/#servicios" className="hover:text-brand-lime transition-colors">Servicios</a>
                 <a href="/blog" className="hover:text-brand-lime transition-colors">Blog</a>
              </div>
           </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Hero Section */}
          <div className="max-w-4xl mb-20">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-brand-blue font-black uppercase tracking-[0.3em] text-[10px] mb-4"
            >
              Contacto
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl sm:text-7xl lg:text-8xl text-brand-dark uppercase tracking-tighter leading-[0.9] mb-8"
            >
              Hablemos de tu <span className="text-brand-blue italic underline decoration-brand-lime/30 underline-offset-4">proyecto</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-500 max-w-2xl leading-relaxed"
            >
              Estamos listos para transformar tu negocio. Cuéntanos qué necesitas y te daremos una solución estratégica a medida.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
            
            {/* Left Column: Contact Methods & Trust Info */}
            <div className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {contactMethods.map((method, i) => (
                  <motion.a
                    href={method.href}
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="group p-8 rounded-[2.5rem] bg-zinc-50 border border-gray-100 hover:border-brand-blue/30 transition-all hover:shadow-xl hover:shadow-gray-100 flex items-start gap-6"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${method.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                      <method.icon size={26} strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{method.title}</p>
                      <h3 className="text-xl font-bold text-brand-dark mb-2">{method.value}</h3>
                      <p className="text-sm text-gray-500">{method.desc}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Trust Badges */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="p-10 rounded-[3rem] bg-brand-dark text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-lime/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <h4 className="font-display text-2xl uppercase mb-8 relative z-10">Por qué elegir a <span className="text-brand-lime">Icono Studio</span></h4>
                <div className="space-y-6 relative z-10">
                   <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"><ShieldCheck className="text-brand-lime" size={20} /></div>
                      <div>
                        <p className="font-bold text-sm">Garantía de calidad</p>
                        <p className="text-xs text-gray-400">Código limpio y diseño impecable.</p>
                      </div>
                   </div>
                   <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"><Clock className="text-brand-lime" size={20} /></div>
                      <div>
                        <p className="font-bold text-sm">Entrega puntual</p>
                        <p className="text-xs text-gray-400">Cumplimos los plazos sin sorpresas.</p>
                      </div>
                   </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Form */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-[3rem] p-8 sm:p-12 border border-gray-100 shadow-2xl shadow-gray-100 relative"
            >
              {formStatus === 'success' ? (
                <div className="py-20 text-center space-y-6">
                   <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={40} />
                   </div>
                   <h2 className="font-display text-3xl uppercase text-brand-dark">¡Mensaje enviado!</h2>
                   <p className="text-gray-500 max-w-sm mx-auto">Gracias por contactar con nosotros. Te responderemos en menos de 24 horas laborables.</p>
                   <button 
                    onClick={() => setFormStatus('idle')}
                    className="inline-flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-xs border-b-2 border-brand-lime pb-1 hover:text-brand-dark transition-colors"
                   >
                     Enviar otro mensaje
                   </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Tu nombre</label>
                       <input 
                        type="text" 
                        name="nombre" 
                        required 
                        placeholder="Edgar..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all text-brand-dark font-medium"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Tu Email</label>
                       <input 
                        type="email" 
                        name="email" 
                        required 
                        placeholder="tu@email.com"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all text-brand-dark font-medium"
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Tipo de proyecto</label>
                    <select 
                      name="servicio" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all text-brand-dark font-medium appearance-none cursor-pointer"
                    >
                      <option>Página Web Profesional</option>
                      <option>Tienda Online (E-commerce)</option>
                      <option>SEO y Posicionamiento</option>
                      <option>Mantenimiento Web</option>
                      <option>Otro trámite</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Cuéntanos más</label>
                    <textarea 
                      name="mensaje" 
                      required 
                      rows={5}
                      placeholder="Háblanos de tu negocio y objetivos..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all text-brand-dark font-medium resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-brand-dark text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-brand-blue hover:transform hover:-translate-y-1 transition-all shadow-xl shadow-brand-blue/10 disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? 'Enviando...' : (
                      <>Enviar solicitud <Send size={16} /></>
                    )}
                  </button>

                  <p className="text-[10px] text-gray-400 text-center">Al enviar aceptas nuestra política de privacidad y protección de datos.</p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
