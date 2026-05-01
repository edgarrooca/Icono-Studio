import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import { siteConfig } from '../lib/site';

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-dark selection:bg-brand-lime selection:text-brand-dark">
      <SeoHead
        title="Política de Privacidad | Icono Studio"
        description="Información provisional sobre el tratamiento de datos personales en icono.studio."
        path="/politica-de-privacidad"
        robots="noindex,nofollow"
      />

      <Navbar initialTheme="dark" />

      <main>
        <section className="relative pt-32 pb-18 sm:pt-36 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-brand-dark text-white rounded-b-[2.5rem] md:rounded-b-[4rem]">
          <div className="absolute inset-0 opacity-20 bg-blueprint"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <p className="ui-eyebrow text-brand-lime mb-4">Privacidad</p>
            <h1 className="ui-section-title text-white mb-6">Política de privacidad</h1>
            <p className="ui-section-copy text-white/75 max-w-2xl mx-auto">
              Resumen provisional del tratamiento de datos en la web. Está pensado para dejar la información accesible y enlazada
              mientras se completa una revisión legal final ajustada al negocio.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto legal-content bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-10">
            <h2>Responsable del tratamiento</h2>
            <p>
              Responsable: <strong>{siteConfig.legalName}</strong>
            </p>
            <p>
              Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
            <p>
              Teléfono: <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
            </p>

            <h2>Qué datos se recogen</h2>
            <p>
              A través de los formularios de la web pueden recogerse datos como nombre, email, teléfono, empresa, tipo de proyecto,
              presupuesto aproximado y cualquier información que el usuario incluya voluntariamente en su mensaje.
            </p>

            <h2>Finalidad</h2>
            <ul>
              <li>Responder a solicitudes de contacto y presupuestos.</li>
              <li>Gestionar conversaciones comerciales o técnicas iniciadas por el usuario.</li>
              <li>Analizar el rendimiento general de la web y de las campañas.</li>
            </ul>

            <h2>Base legitimadora</h2>
            <p>
              La base legal principal es el consentimiento del usuario al enviar formularios o contactar por canales habilitados en la web.
            </p>

            <h2>Conservación</h2>
            <p>
              Los datos se conservarán el tiempo necesario para atender la solicitud, mantener seguimiento comercial razonable o cumplir
              con obligaciones legales cuando proceda.
            </p>

            <h2>Terceros y herramientas</h2>
            <p>
              La web utiliza herramientas técnicas y de medición para recibir formularios y analizar el uso del sitio. Si necesitas el
              detalle exacto de proveedores y plazos, solicita la versión final de esta política en <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>

            <h2>Derechos</h2>
            <p>
              Puedes solicitar acceso, rectificación, supresión, limitación u oposición sobre tus datos personales escribiendo a{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>

            <h2>Nota importante</h2>
            <p>
              Esta página deja la información accesible y enlazada para la operativa de la web, pero debe completarse con los datos
              jurídicos finales antes de considerarse versión definitiva.
            </p>

            <p>
              Para volver al formulario de contacto puedes ir a <Link to="/contacto">Contacto</Link>.
            </p>
          </div>
        </section>
      </main>

      <Footer hideCTA />
    </div>
  );
}
