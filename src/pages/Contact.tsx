import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Check, Send, Clock, FileText, Heart
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import { debugLeadFormButtonClick, debugLeadFormInvalid, debugLeadFormSubmitCapture, redirectToLeadThankYouPage, submitLeadForm } from '../lib/analytics';
import { siteConfig } from '../lib/site';

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    email: '',
    negocio: '',
    ciudad: '',
    necesidad: '',
    presupuesto: '',
    mensaje: '',
    privacidad: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": `Contacto | ${siteConfig.name}`,
    "url": `${siteConfig.url}/contacto`,
    "about": {
      "@type": "Organization",
      "name": siteConfig.name,
      "email": siteConfig.email,
      "telephone": siteConfig.phoneDisplay,
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await submitLeadForm('contact_page_main', formData);
      
      if (response.ok) {
        redirectToLeadThankYouPage('contact_page_main');
        return;
      } else {
        alert(response.data?.message || 'Hubo un error al enviar. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      alert('Error de conexión.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark font-sans selection:bg-brand-lime selection:text-brand-dark overflow-x-hidden relative">
      <SeoHead
        title="Presupuesto Web en Valencia | Contacto | Icono Studio"
        description="Cuéntanos tu proyecto y te responderemos con una propuesta clara para crear una web profesional, rápida y preparada para captar clientes."
        path="/contacto"
        type="service"
        schema={contactSchema}
      />
      
      <div className="absolute top-0 w-full z-50">
        <Navbar initialTheme="dark" />
      </div>

      <main className="pt-24 pb-12">
        <section id="vlc-form" className="py-16 sm:py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="vlc-form-grid grid lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Copied exactly from Valencia */}
              <div className="lg:sticky lg:top-32">
                <div className="flex items-center gap-3 mb-4">
                  <span className="ui-eyebrow text-brand-lime">
                    TU PRÓXIMO PASO
                  </span>
                </div>
                <div className="ui-divider mb-6"></div>
                <h1 className="ui-section-title text-white mb-8">
                  TU NUEVA WEB <br/>
                  <span className="text-brand-lime italic font-normal">EMPIEZA AQUÍ</span>
                </h1>
                <p className="ui-section-copy text-white/70 mb-8 max-w-sm">
                  Cuéntanos qué necesitas y te responderemos con una orientación clara para crear una web profesional, cuidada y preparada para captar clientes.
                </p>
                
                <div className="grid grid-cols-1 gap-4 mb-8 pt-6 border-t border-white/10">
                  {[
                    { t: "Respuesta en menos de 24h", i: Clock },
                    { t: "Precio definido antes de empezar", i: FileText },
                    { t: "Atención personalizada", i: Heart }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-bold text-white/90">
                      <div className="w-6 h-6 rounded-lg bg-brand-lime/10 flex items-center justify-center text-brand-lime">
                        <item.i size={14} />
                      </div>
                      {item.t}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: The Form Card */}
              <div className="bg-white/5 border border-white/10 p-5 md:p-7 rounded-[2.5rem] backdrop-blur-md shadow-2xl relative">
                {isSubmitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-brand-lime rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(204,255,0,0.2)]">
                      <Check size={32} className="text-brand-dark" />
                    </div>
                    <h3 className="font-display text-2xl uppercase mb-3 text-white italic">Solicitud enviada</h3>
                    <p className="text-white/60 text-base mb-6 leading-relaxed">
                      Gracias por contarnos tu proyecto. Te responderemos lo antes posible.
                    </p>
                    <a 
                      href="https://wa.me/34623783129" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex bg-brand-lime text-brand-dark px-8 py-4 rounded-full font-black uppercase tracking-widest text-[11px] hover:scale-105 transition-all items-center gap-3 shadow-xl"
                    >
                      Hablar por WhatsApp <Send size={14} />
                    </a>
                  </div>
                ) : (
                  <>
                  <div className="mb-6">
                    <h3 className="font-display text-xl sm:text-2xl uppercase text-white italic tracking-tight leading-none mb-2">Pide tu presupuesto web</h3>
                    <p className="text-sm text-white/70 font-medium">Te responderemos con una propuesta clara y sin compromiso.</p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    onSubmitCapture={() => debugLeadFormSubmitCapture('contact_page_main')}
                    onInvalidCapture={(event) => {
                      const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
                      debugLeadFormInvalid('contact_page_main', target.name, target.validationMessage);
                    }}
                    className="space-y-3.5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="ui-form-label text-white/40 ml-1">Nombre</label>
                        <input 
                          type="text" 
                          name="nombre"
                          required
                          value={formData.nombre}
                          onChange={handleInputChange}
                          placeholder="Tu nombre" 
                          className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-white/40 focus:border-brand-lime focus:outline-none transition-all" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="ui-form-label text-white/40 ml-1">Negocio / Marca</label>
                        <input 
                          type="text" 
                          name="negocio"
                          required
                          value={formData.negocio}
                          onChange={handleInputChange}
                          placeholder="Nombre de tu empresa" 
                          className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-white/40 focus:border-brand-lime focus:outline-none transition-all" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="ui-form-label text-white/40 ml-1">WhatsApp / Teléfono</label>
                        <input 
                          type="tel" 
                          name="whatsapp"
                          required
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          placeholder="600 000 000" 
                          className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-white/40 focus:border-brand-lime focus:outline-none transition-all" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="ui-form-label text-white/40 ml-1">Email</label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="hola@tuweb.com" 
                          className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-white/40 focus:border-brand-lime focus:outline-none transition-all" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="ui-form-label text-white/40 ml-1">Tipo de web</label>
                        <select 
                          name="necesidad"
                          required
                          value={formData.necesidad}
                          onChange={handleInputChange}
                          className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:border-brand-lime focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-brand-dark">Selecciona una opción</option>
                          <option value="corporativa" className="bg-brand-dark">Web corporativa</option>
                          <option value="landing" className="bg-brand-dark">Landing page</option>
                          <option value="portfolio" className="bg-brand-dark">Portfolio</option>
                          <option value="tienda" className="bg-brand-dark">Tienda online</option>
                          <option value="rediseño" className="bg-brand-dark">Rediseño web</option>
                          <option value="no-claro" className="bg-brand-dark">No lo tengo claro</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="ui-form-label text-white/40 ml-1">Presupuesto aproximado</label>
                        <select 
                          name="presupuesto"
                          required
                          value={formData.presupuesto}
                          onChange={handleInputChange}
                          className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:border-brand-lime focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-brand-dark">Selecciona un rango</option>
                          <option value="350-500" className="bg-brand-dark">350 € – 500 €</option>
                          <option value="500-800" className="bg-brand-dark">500 € – 800 €</option>
                          <option value="800-1200" className="bg-brand-dark">800 € – 1.200 €</option>
                          <option value="1200+" className="bg-brand-dark">Más de 1.200 €</option>
                          <option value="orientacion" className="bg-brand-dark">Necesito orientación</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="ui-form-label text-white/40 ml-1">Cuéntanos qué necesitas</label>
                      <textarea 
                        name="mensaje"
                        required
                        rows={2} 
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        placeholder="Ej: necesito una web para mi clínica, con imagen profesional, contacto por WhatsApp y preparada para captar clientes." 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-brand-lime focus:outline-none transition-all resize-none"
                      ></textarea>
                    </div>

                    <div className="flex items-start gap-3 py-1">
                      <input 
                        type="checkbox" 
                        name="privacidad"
                        id="privacidad"
                        required
                        checked={formData.privacidad}
                        onChange={handleInputChange}
                        className="mt-1 accent-brand-lime" 
                      />
                      <label htmlFor="privacidad" className="text-[11px] text-white/55 leading-relaxed">
                        Acepto la{' '}
                        <RouterLink to="/politica-de-privacidad" className="text-brand-lime hover:text-white underline underline-offset-4">
                          política de privacidad
                        </RouterLink>{' '}
                        y autorizo a Icono Studio a contactar conmigo.
                      </label>
                    </div>

                    <button 
                      type="submit" 
                      onClick={() => debugLeadFormButtonClick('contact_page_main')}
                      className="w-full bg-brand-lime text-brand-dark h-12 rounded-xl font-black uppercase tracking-[0.2em] text-[11px] hover:scale-[1.02] transition-all shadow-xl shadow-brand-lime/20 mt-2 flex items-center justify-center gap-3"
                    >
                      Pedir presupuesto gratis <Send size={14} />
                    </button>
                  </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer hideCTA={true} />
    </div>
  );
}
