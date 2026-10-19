import { m, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './HomeProcess.css';

const steps = [
  {
    title: 'Escuchamos',
    description: 'Conocemos tu negocio, tus objetivos y lo que necesitas. Tu idea es nuestro punto de partida.',
    image: '/como-hacemos-webs/3d3f9319-a842-404b-a088-261511424004 (1).webp',
  },
  {
    title: 'Planificamos',
    description: 'Ordenamos las ideas y definimos la estructura, el enfoque y los contenidos de tu web.',
    image: '/como-hacemos-webs/3d3f9319-a842-404b-a088-261511424004 (1) copia.webp',
  },
  {
    title: 'Diseñamos y desarrollamos',
    description: 'Damos forma a una web clara, cuidada y adaptada a tu negocio, tanto en ordenador como en móvil.',
    image: '/como-hacemos-webs/3d3f9319-a842-404b-a088-261511424004 (1) copia 3.webp',
  },
  {
    title: 'Lanzamos y acompañamos',
    description: 'Publicamos tu web y te ayudamos con los primeros pasos para que no tengas que hacerlo solo.',
    image: '/como-hacemos-webs/3d3f9319-a842-404b-a088-261511424004 (1) copia 2.webp',
  },
];

export default function HomeProcess() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="proceso" className="home-process" aria-labelledby="process-heading">
      <div className="home-process__layout">
        <div className="home-process__intro">
          <h2 id="process-heading" className="font-display">
            Cómo trabajamos <span>tu proyecto</span>
          </h2>
          <p>
            De la primera conversación al lanzamiento, con las ideas claras y un siguiente paso en cada momento.
          </p>
          <img
            className="home-process__illustration"
            src="/como-hacemos-webs/imagen1.webp"
            alt="El personaje de Icono Studio dando forma a las ideas de un proyecto web"
            width={1431}
            height={803}
            loading="lazy"
            decoding="async"
          />
        </div>

        <ol className="home-process__journey" aria-label="Cómo avanza tu proyecto">
          {steps.map((step, index) => (
            <m.li
              key={step.title}
              className="home-process__step"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="home-process__node" aria-hidden="true">
                <img src={step.image} alt="" width={64} height={64} loading="lazy" decoding="async" />
                <span className="home-process__number font-display">{index + 1}</span>
              </span>
              <div className="home-process__step-content">
                <div className="home-process__copy">
                  <h3 className="font-display">{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            </m.li>
          ))}
        </ol>

        <div className="home-process__footer">
          <Link
            to="/contacto"
            onClick={() => (window as any).dataLayer?.push({
              event: 'nav_click',
              nav_item: 'Cuéntanos tu proyecto (proceso)',
              page_path: window.location.pathname,
            })}
            className="brand-button brand-button--outline inline-flex min-h-12 items-center justify-center gap-3 px-6 py-3.5 font-semibold"
          >
            Cuéntanos tu proyecto <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
