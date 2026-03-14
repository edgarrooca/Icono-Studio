import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Check, Menu, X, Star, TrendingUp, Users, Zap } from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Casos de éxito', href: '#casos' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Blog', href: '#blog' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-dark selection:bg-brand-lime selection:text-brand-dark overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex justify-between items-center rounded-full px-6 py-3 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/90 backdrop-blur-md shadow-lg text-white' : 'bg-transparent text-white'}`}>
            
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-2 z-50">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isScrolled ? 'bg-brand-lime' : 'bg-white'}`}>
                <span className="text-brand-dark font-display text-xl leading-none pt-1">i</span>
              </div>
              <span className="font-display text-xl tracking-wide uppercase hidden sm:block">Icono Studio</span>
            </a>
            
            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="hover:text-brand-lime transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
            
            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4 z-50">
              <a href="#pricing" className={`hidden md:flex px-6 py-2.5 rounded-full font-bold text-sm items-center gap-2 transition-transform hover:scale-105 ${isScrolled ? 'bg-brand-lime text-brand-dark' : 'bg-white text-brand-blue'}`}>
                Presupuesto <ArrowRight size={16} />
              </a>
              <button 
                className="lg:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} className={isScrolled ? 'text-white' : 'text-white'} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-0 left-0 right-0 h-screen bg-brand-dark text-white pt-32 px-6 flex flex-col gap-6 lg:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-4xl uppercase hover:text-brand-lime transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* 1. HERO SECTION */}
      <section id="inicio" className="relative min-h-[95vh] pt-32 pb-20 px-6 flex flex-col items-center justify-center overflow-hidden bg-brand-blue text-white rounded-b-[3rem] md:rounded-b-[4rem] shadow-2xl z-10">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-20 bg-blueprint"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse"></span>
            Agencia Creativa Digital en Valencia
          </motion.div>
          
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="font-display text-[14vw] md:text-[9vw] leading-[0.85] tracking-tighter uppercase mb-6"
          >
            Hacemos webs <br/>
            <span className="text-brand-lime italic">que venden</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="text-xl md:text-3xl max-w-3xl text-white/80 font-medium mb-12"
          >
            Elevamos marcas a través de diseño estratégico y desarrollo de alto rendimiento.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a href="#pricing" className="bg-brand-lime text-brand-dark px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 w-full sm:w-auto">
              Pedir presupuesto <ArrowRight size={20} />
            </a>
            <a href="#proyectos" className="bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-dark transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
              Ver proyectos
            </a>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="flex overflow-hidden bg-brand-dark text-brand-lime py-6 border-y border-white/10 -mt-10 relative z-0 pt-16">
        <div className="flex whitespace-nowrap font-display text-4xl md:text-6xl uppercase tracking-wider animate-marquee">
          <span className="mx-4">DISEÑO WEB</span> • 
          <span className="mx-4">E-COMMERCE</span> • 
          <span className="mx-4">BRANDING</span> • 
          <span className="mx-4">SEO</span> • 
          <span className="mx-4">DISEÑO WEB</span> • 
          <span className="mx-4">E-COMMERCE</span> • 
          <span className="mx-4">BRANDING</span> • 
          <span className="mx-4">SEO</span> • 
          <span className="mx-4">DISEÑO WEB</span> • 
          <span className="mx-4">E-COMMERCE</span> • 
          <span className="mx-4">BRANDING</span> • 
          <span className="mx-4">SEO</span> • 
        </div>
      </div>

      {/* 2. NOSOTROS (Bento Grid) */}
      <section id="nosotros" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          <div className="md:col-span-2 bg-gray-200 rounded-[2rem] p-10 flex flex-col justify-center">
            <h2 className="font-display text-4xl md:text-5xl uppercase leading-tight mb-6">
              No somos una <br/><span className="text-brand-blue">agencia tradicional</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-xl">
              Somos un equipo de diseñadores y desarrolladores obsesionados con la conversión, la estética y el rendimiento.
            </p>
          </div>
          <div className="bg-brand-blue text-white rounded-[2rem] p-10 flex flex-col justify-center items-center text-center">
            <span className="font-display text-8xl text-brand-lime">10+</span>
            <span className="font-bold uppercase tracking-widest text-sm mt-2">Años de Exp.</span>
          </div>
          <div className="bg-brand-dark text-white rounded-[2rem] p-10 flex flex-col justify-center items-center text-center">
            <span className="font-display text-8xl text-brand-lime">150</span>
            <span className="font-bold uppercase tracking-widest text-sm mt-2">Proyectos</span>
          </div>
          <div className="md:col-span-2 rounded-[2rem] overflow-hidden relative">
            <img src="https://picsum.photos/seed/agency/1000/600" alt="Equipo Icono Studio" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-brand-blue/20 mix-blend-multiply"></div>
          </div>
        </div>
      </section>

      {/* 3. PROYECTOS */}
      <section id="proyectos" className="py-24 px-6 bg-brand-dark text-white rounded-[3rem] md:rounded-[4rem] mx-4 md:mx-8 my-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 border-b border-white/20 pb-12">
            <h2 className="font-display text-6xl md:text-8xl uppercase leading-none">
              Nuestros <br/><span className="text-brand-lime">Trabajos</span>
            </h2>
            <a href="#" className="flex items-center gap-2 font-bold text-xl hover:text-brand-lime transition-colors">
              Ver todos <ArrowRight size={24} />
            </a>
          </div>

          <div className="space-y-12">
            {[
              { name: 'Fintech App', category: 'UI/UX & Desarrollo', img: 'https://picsum.photos/seed/fintech/1200/800' },
              { name: 'Eco Store', category: 'E-commerce', img: 'https://picsum.photos/seed/eco/1200/800' },
              { name: 'SaaS Platform', category: 'Web App', img: 'https://picsum.photos/seed/saas/1200/800' }
            ].map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-[2rem] cursor-pointer"
              >
                <img src={project.img} alt={project.name} className="w-full aspect-[16/9] md:aspect-[21/9] object-cover transform group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex justify-between items-end">
                  <div>
                    <span className="text-brand-lime font-mono text-sm uppercase tracking-widest mb-4 block">{project.category}</span>
                    <h3 className="font-display text-4xl md:text-6xl uppercase">{project.name}</h3>
                  </div>
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <ArrowUpRight className="text-brand-dark" size={32} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICIOS */}
      <section id="servicios" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="font-display text-6xl md:text-8xl uppercase mb-16">Servicios</h2>
        <div className="border-t-2 border-brand-dark">
          {[
            { title: 'Diseño UI/UX', desc: 'Interfaces intuitivas y atractivas diseñadas para maximizar la retención y conversión.' },
            { title: 'Desarrollo Web', desc: 'Arquitecturas modernas, rápidas y seguras usando React, Next.js y Tailwind.' },
            { title: 'E-Commerce', desc: 'Tiendas online optimizadas para vender más, con integraciones a medida.' },
            { title: 'SEO & Performance', desc: 'Optimización técnica para dominar los resultados de búsqueda de Google.' }
          ].map((srv, i) => (
            <div key={i} className="group border-b-2 border-brand-dark py-10 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer hover:bg-brand-lime transition-colors duration-300 px-6 -mx-6">
              <h3 className="font-display text-4xl md:text-6xl uppercase group-hover:text-brand-dark transition-colors mb-4 md:mb-0 w-full md:w-1/2">
                {srv.title}
              </h3>
              <div className="w-full md:w-1/2 flex justify-between items-center">
                <p className="text-gray-600 group-hover:text-brand-dark font-medium max-w-sm text-lg transition-colors">{srv.desc}</p>
                <ArrowUpRight className="w-12 h-12 text-brand-dark opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0 hidden sm:block" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CASOS DE ÉXITO */}
      <section id="casos" className="py-24 px-6 bg-brand-blue text-white rounded-[3rem] md:rounded-[4rem] mx-4 md:mx-8 my-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-display text-6xl md:text-8xl uppercase mb-6">El <span className="text-brand-lime">Impacto</span></h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">Resultados medibles que transforman negocios.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { metric: '+300%', label: 'Conversión', client: 'SaaS Platform' },
              { metric: '0.8s', label: 'Carga', client: 'E-commerce' },
              { metric: '1M+', label: 'Visitas', client: 'Blog Corporativo' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="border border-white/20 rounded-[2rem] p-12 flex flex-col items-center text-center hover:bg-white/5 transition-colors"
              >
                <h3 className="font-display text-7xl md:text-8xl text-brand-lime mb-4">{stat.metric}</h3>
                <p className="font-bold text-2xl mb-4">{stat.label}</p>
                <p className="text-sm text-white/50 font-mono uppercase tracking-widest">{stat.client}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRICING */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-display text-6xl md:text-8xl uppercase mb-6">Precios</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Inversión transparente para proyectos ambiciosos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tier 1 */}
          <div className="bg-gray-50 p-10 rounded-[2rem] border border-gray-200 flex flex-col">
            <h3 className="font-display text-3xl uppercase mb-2">Landing Page</h3>
            <p className="text-gray-500 mb-8">Para validar ideas rápido.</p>
            <div className="mb-8">
              <span className="text-6xl font-display">€950</span>
            </div>
            <ul className="space-y-4 mb-12 flex-grow">
              {['Diseño a medida (1 pág)', 'Copywriting', 'Responsive', 'Formulario'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 font-medium">
                  <Check size={20} className="text-brand-blue" /> {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-5 rounded-full border-2 border-brand-dark font-bold text-lg hover:bg-brand-dark hover:text-white transition-colors">
              Solicitar
            </button>
          </div>

          {/* Tier 2 */}
          <div className="bg-brand-dark text-white p-10 rounded-[2rem] relative transform md:-translate-y-4 shadow-2xl flex flex-col">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-lime text-brand-dark font-bold text-sm uppercase tracking-widest px-6 py-2 rounded-full">
              Recomendado
            </div>
            <h3 className="font-display text-3xl uppercase mb-2">Corporativa</h3>
            <p className="text-gray-400 mb-8">Presencia digital completa.</p>
            <div className="mb-8">
              <span className="text-6xl font-display">€2.500</span>
            </div>
            <ul className="space-y-4 mb-12 flex-grow">
              {['Hasta 6 páginas', 'CMS autogestionable', 'SEO Básico', 'Animaciones', 'Analítica'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 font-medium">
                  <Check size={20} className="text-brand-lime" /> {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-5 rounded-full bg-brand-lime text-brand-dark font-bold text-lg hover:scale-105 transition-transform">
              Solicitar
            </button>
          </div>

          {/* Tier 3 */}
          <div className="bg-gray-50 p-10 rounded-[2rem] border border-gray-200 flex flex-col">
            <h3 className="font-display text-3xl uppercase mb-2">E-commerce</h3>
            <p className="text-gray-500 mb-8">Tiendas online de alto rendimiento.</p>
            <div className="mb-8">
              <span className="text-6xl font-display">A medida</span>
            </div>
            <ul className="space-y-4 mb-12 flex-grow">
              {['UX/UI Avanzado', 'Pasarelas de pago', 'Panel de control', 'Integraciones ERP'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 font-medium">
                  <Check size={20} className="text-brand-blue" /> {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-5 rounded-full border-2 border-brand-dark font-bold text-lg hover:bg-brand-dark hover:text-white transition-colors">
              Contactar
            </button>
          </div>
        </div>
      </section>

      {/* 7. BLOG */}
      <section id="blog" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b-2 border-brand-dark pb-8">
          <h2 className="font-display text-6xl md:text-8xl uppercase">Blog</h2>
          <a href="#" className="hidden md:flex items-center gap-2 font-bold text-xl hover:text-brand-blue transition-colors">
            Ver todos <ArrowRight size={24} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Tendencias de Diseño Web para 2026', tag: 'Diseño', date: '12 Mar 2026', img: 'https://picsum.photos/seed/blog1/800/800' },
            { title: 'Por qué tu web necesita ser más rápida', tag: 'Desarrollo', date: '05 Mar 2026', img: 'https://picsum.photos/seed/blog2/800/800' },
            { title: 'Guía básica de SEO para empresas locales', tag: 'Marketing', date: '28 Feb 2026', img: 'https://picsum.photos/seed/blog3/800/800' }
          ].map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="overflow-hidden rounded-[2rem] mb-6 relative">
                <img src={post.img} alt={post.title} className="w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 bg-white text-brand-dark text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                  {post.tag}
                </div>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm text-gray-500 font-mono">{post.date}</span>
              </div>
              <h3 className="font-display text-2xl uppercase leading-tight group-hover:text-brand-blue transition-colors">{post.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FOOTER / BIG CTA */}
      <footer className="bg-brand-dark text-white pt-32 pb-12 px-6 rounded-t-[3rem] md:rounded-t-[4rem] mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-24">
            <h2 className="font-display text-[16vw] md:text-[14vw] leading-[0.8] uppercase tracking-tighter mb-12 text-brand-lime">
              ¿Hablamos?
            </h2>
            <a href="mailto:hola@iconostudio.com" className="inline-flex items-center justify-center gap-4 bg-white text-brand-dark px-12 py-6 rounded-full font-display text-2xl uppercase hover:bg-brand-lime transition-colors">
              Pedir Presupuesto <ArrowUpRight size={28} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/20 pt-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-brand-lime rounded-full flex items-center justify-center">
                  <span className="text-brand-dark font-display text-2xl leading-none pt-1">i</span>
                </div>
                <span className="font-display text-3xl tracking-wide uppercase">Icono Studio</span>
              </div>
              <p className="text-white/60 max-w-sm text-lg">
                Agencia de diseño y desarrollo web en Valencia. Creando experiencias digitales que marcan la diferencia.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-6 text-brand-lime">Navegación</h4>
              <ul className="space-y-4 text-white/70 font-medium">
                {navLinks.map(link => (
                  <li key={link.name}><a href={link.href} className="hover:text-white transition-colors">{link.name}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider mb-6 text-brand-lime">Social</h4>
              <ul className="space-y-4 text-white/70 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter / X</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dribbble</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/20 pt-8 mt-12 text-sm text-white/50 font-mono">
            <p>© 2026 Icono Studio. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
