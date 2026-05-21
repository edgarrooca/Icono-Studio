import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import { siteConfig } from '../lib/site';

export default function CondicionesWebExpress() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-brand-dark selection:bg-brand-lime selection:text-brand-dark">
      <SeoHead
        title="Condiciones del servicio Web Express | Icono Studio"
        description="Condiciones del servicio Web Express de Icono Studio."
        path="/condiciones-web-express"
        robots="noindex,nofollow"
      />

      <Navbar initialTheme="dark" />

      <main>
        <section className="relative overflow-hidden rounded-b-[2.5rem] bg-brand-dark px-4 pb-18 pt-32 text-white sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 md:rounded-b-[4rem]">
          <div className="absolute inset-0 opacity-20 bg-blueprint" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <p className="ui-eyebrow text-brand-lime mb-4">Web Express</p>
            <h1 className="ui-section-title text-white mb-6">Condiciones del servicio</h1>
            <p className="ui-section-copy text-white/75 max-w-2xl mx-auto">
              Resumen de las condiciones aplicables a la contratación de Web Express para que el alcance del servicio quede claro antes del pago.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto legal-content bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-10">
            <h2>Qué incluye Web Express</h2>
            <p>
              Web Express es un servicio alojado y gestionado por <strong>{siteConfig.legalName}</strong> pensado para negocios que necesitan una presencia online clara, profesional y rápida de activar.
            </p>
            <ul>
              <li>Una página web de una sola página basada en una estructura profesional.</li>
              <li>Adaptación visual de logo, colores y estilo general.</li>
              <li>Versión móvil, hosting y certificado SSL.</li>
              <li>Contacto directo mediante formulario, llamada o WhatsApp según el planteamiento final.</li>
            </ul>

            <h2>Modelo de servicio</h2>
            <p>
              Web Express funciona como un servicio alojado y gestionado por Icono Studio. La web permanece activa mientras el plan contratado siga vigente.
            </p>

            <h2>Renovaciones y pagos</h2>
            <p>
              El cliente puede contratar el servicio en modalidad mensual o anual según la opción disponible en el checkout. El plan anual se cobra por anualidades completas. El plan mensual se cobra mes a mes.
            </p>

            <h2>Primer cobro</h2>
            <p>
              El primer cobro incluye el plan seleccionado y, en su caso, los extras añadidos durante la contratación. Si el cliente contrata el plan mensual con gestión de dominio, el primer cobro incluye también la gestión anual del dominio, por lo que los siguientes cobros mensuales serán inferiores al inicial.
            </p>
            <p>
              Si el cliente solicita el extra de logo básico, este importe también se añade al primer cobro.
            </p>

            <h2>Dominio</h2>
            <p>
              Si el cliente solicita gestión de dominio, Icono Studio se encarga del registro, renovación y conexión técnica del dominio indicado, siempre que esté disponible y entre dentro de extensiones estándar.
            </p>

            <h2>Propiedad de contenidos</h2>
            <p>
              Los textos, imágenes, logotipo y dominio del proyecto pertenecen al cliente. El diseño, la estructura técnica y la publicación dentro del servicio Web Express se prestan bajo el modelo de servicio activo mientras exista contratación.
            </p>

            <h2>Qué no incluye</h2>
            <p>
              Web Express no incluye, salvo acuerdo adicional, tienda online, blog, panel editable, migración a otro proveedor, entrega del código fuente o desarrollos a medida fuera del alcance cerrado del servicio.
            </p>

            <h2>Cancelación</h2>
            <p>
              En la modalidad mensual, el cliente puede cancelar el servicio según las condiciones de la suscripción. Si el servicio deja de estar activo, la web dejará de estar publicada.
            </p>

            <h2>Contacto</h2>
            <p>
              Para cualquier duda relacionada con estas condiciones puedes escribir a <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
          </div>
        </section>
      </main>

      <Footer hideCTA />
    </div>
  );
}
