/**
 * Spintax Generator
 * Generates deterministic variations of text based on a seed string (e.g. location slug).
 * This ensures that the same city always gets the same content, but different cities get different content
 * to avoid SEO duplicate content penalties.
 */

const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export const getSpinVariation = (seed: string, variations: string[]): string => {
  if (!variations || variations.length === 0) return '';
  const index = hashCode(seed) % variations.length;
  return variations[index];
};

export const spintaxData = {
  heroTagline: [
    "Diseñamos páginas web rápidas, cuidadas y preparadas para que tu negocio transmita confianza, aparezca mejor en Google y reciba más contactos.",
    "Creamos webs profesionales de alto rendimiento. Mejora la imagen de tu negocio, posiciona en Google y convierte más visitas en clientes reales.",
    "Desarrollo web estratégico para marcas que buscan destacar. Construimos páginas rápidas, adaptadas a móviles y optimizadas para captar negocio local.",
    "Impulsa tu presencia digital con una web a medida. Diseños atractivos, veloces y pensados exclusivamente para generar confianza y aumentar tus ventas."
  ],
  problemIntro: [
    "Si tu página carga lenta, no se entiende en móvil o no guía al usuario hacia el contacto, estás perdiendo oportunidades cada día.",
    "Una web anticuada o difícil de usar en el móvil genera desconfianza y hace que tus clientes potenciales se vayan a la competencia.",
    "El 80% de los usuarios abandonan una web si tarda en cargar o no es intuitiva. No permitas que un mal diseño limite el crecimiento de tu negocio.",
    "No sirve de nada tener visitas si la web no transmite profesionalidad. Si tu página no convierte, estás perdiendo dinero."
  ],
  serviceIntro: [
    "No solo diseñamos. Te acompañamos en todo el proceso para que tu negocio transmita una imagen impecable y profesional.",
    "Cuidamos cada detalle del desarrollo. Nuestro objetivo es que tengas una herramienta digital potente que atraiga y convenza.",
    "Más que una web bonita, construimos un canal de ventas. Desde la estrategia inicial hasta el SEO y el soporte técnico continuo.",
    "Nos encargamos de todo el apartado técnico y de diseño para que tú solo tengas que preocuparte de atender a tus nuevos clientes."
  ],
  localOutro: [
    "Trabajamos desde nuestro estudio con negocios de toda España, creando páginas web que transmiten confianza y ayudan a convertir visitas en contactos.",
    "Gracias a nuestro método de trabajo 100% online, ayudamos a empresas y autónomos a potenciar su negocio digital sin importar dónde estén.",
    "Gestionamos proyectos a distancia con total cercanía. Diseñamos webs que posicionan tu marca y multiplican tus oportunidades comerciales.",
    "Damos servicio remoto de alta calidad, garantizando comunicación fluida, entregas puntuales y resultados que marcan la diferencia en tu sector."
  ]
};
