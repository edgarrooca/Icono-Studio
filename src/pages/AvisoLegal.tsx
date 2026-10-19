import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import { siteConfig } from '../lib/site';

export default function AvisoLegal() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#0B1B63] selection:bg-[#9ED6F1]/40 selection:text-[#0B1B63]">
      <SeoHead
        title="Aviso Legal | Icono Studio"
        description="Información legal provisional de Icono Studio para la web icono.studio."
        path="/aviso-legal"
        robots="noindex,nofollow"
      />

      <Navbar initialTheme="light" />

      <main>
        <section className="relative overflow-hidden bg-[#F7F7F7] px-5 pb-12 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-8 lg:pb-16">
          <div className="pointer-events-none absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-[#D8ECFB] blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-44 left-[-6%] h-[22rem] w-[22rem] rounded-full bg-[#EAF5FA] blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="inline-block rounded-full bg-[#E6F4FB] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B1B63]">
              Información legal
            </div>
            <h1 className="mt-5 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#0B1B63] sm:text-[2.6rem]">Aviso legal</h1>
            <p className="mx-auto mt-5 max-w-2xl font-sans text-[1rem] font-medium leading-[1.68] text-[#425776] sm:text-[1.05rem]">
              Documento informativo provisional publicado para sustituir enlaces rotos y facilitar los datos básicos de contacto.
              Antes de su publicación definitiva conviene completar los datos fiscales y revisarlo jurídicamente.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20 px-5 sm:px-6 lg:px-8">
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
