import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import { siteConfig } from '../lib/site';

export default function AvisoLegal() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-dark selection:bg-brand-lime selection:text-brand-dark">
      <SeoHead
        title="Aviso Legal | Icono Studio"
        description="Información legal provisional de Icono Studio para la web icono.studio."
        path="/aviso-legal"
        robots="noindex,nofollow"
      />

      <Navbar initialTheme="dark" />

      <main>
        <section className="relative pt-32 pb-18 sm:pt-36 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-brand-dark text-white rounded-b-[2.5rem] md:rounded-b-[4rem]">
          <div className="absolute inset-0 opacity-20 bg-blueprint"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <p className="ui-eyebrow text-brand-lime mb-4">Información Legal</p>
            <h1 className="ui-section-title text-white mb-6">Aviso legal</h1>
            <p className="ui-section-copy text-white/75 max-w-2xl mx-auto">
              Documento informativo provisional publicado para sustituir enlaces rotos y facilitar los datos básicos de contacto.
              Antes de su publicación definitiva conviene completar los datos fiscales y revisarlo jurídicamente.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto legal-content bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-10">
            <h2>Datos del sitio</h2>
            <p>
              Titular del sitio web: <strong>{siteConfig.legalName}</strong>
            </p>
            <p>
              Dominio: <strong>{siteConfig.url.replace('https://', '')}</strong>
            </p>
            <p>
              Correo de contacto: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
            <p>
              Teléfono de contacto: <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
            </p>
            <p>
              Actividad: diseño web, desarrollo web, soporte técnico, mantenimiento y servicios digitales.
            </p>

            <h2>Condiciones de uso</h2>
            <p>
              El acceso a esta web implica la aceptación del uso responsable de sus contenidos y funcionalidades. No está permitido
              utilizar la web con fines ilícitos, dañar su funcionamiento o vulnerar derechos de terceros.
            </p>

            <h2>Propiedad intelectual</h2>
            <p>
              Los textos, diseños, código, identidad visual e imágenes de esta web pertenecen a Icono Studio o a sus respectivos
              titulares y no pueden reutilizarse sin autorización previa, salvo que se indique expresamente lo contrario.
            </p>

            <h2>Responsabilidad</h2>
            <p>
              Icono Studio no garantiza la ausencia total de errores puntuales, interrupciones o incidencias técnicas, aunque trabaja
              para mantener la información actualizada y el servicio en correcto funcionamiento.
            </p>

            <h2>Contacto</h2>
            <p>
              Si necesitas información adicional sobre este sitio, puedes escribir a <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
          </div>
        </section>
      </main>

      <Footer hideCTA />
    </div>
  );
}
