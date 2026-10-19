import type { Project } from './projects';

export type ProjectSummary = Pick<
  Project,
  'id' | 'title' | 'subtitle' | 'description' | 'category' | 'img' | 'imgReto'
>;

export const projectSummaries: ProjectSummary[] = [
  {
    id: 'inktime-tattoo',
    title: 'Ink Time',
    subtitle: 'Estudio de tatuaje y piercing en València',
    category: 'Negocio local / Servicios',
    img: '/projects/inktime-tattoo/studio.webp',
    imgReto: '/projects/inktime-tattoo/studio-3.webp',
    description:
      'Diseño y desarrollo de una web para un estudio de tatuaje y piercing especializado en fine line, realismo, blackwork y piercings.',
  },
  {
    id: 'somnis-d-angels',
    title: 'Somnis d’Àngels',
    subtitle: 'Diseño floral para bodas y eventos',
    category: 'Marca / Bodas y eventos',
    img: '/projects/somnis-d-angels/hero.webp',
    imgReto: '/projects/somnis-d-angels/full-page.webp',
    description:
      'Diseño web para una marca floral especializada en bodas, ramos de novia, flores secas y decoración en Girona y Barcelona.',
  },
  {
    id: 'autocustomgt',
    title: 'AutoCustomGT',
    subtitle: 'Tienda online de recambios y accesorios para automóviles',
    category: 'E-commerce / Automoción',
    img: '/projects/autocustomgt/hero.webp',
    imgReto: '/projects/autocustomgt/storefront.webp',
    description:
      'Diseño y desarrollo de una tienda online de recambios, repuestos y accesorios para vehículos, con catálogo organizado por categorías.',
  },
  {
    id: 'lorenzo-secades-fotografia',
    title: 'Lorenzo Secades Fotografía',
    subtitle: 'Galería fotográfica de paisaje, retrato y trabajos documentales',
    category: 'Portfolio / Fotografía',
    img: '/projects/lorenzo-secades-fotografia/home.webp',
    imgReto: '/projects/lorenzo-secades-fotografia/home-full.webp',
    description:
      'Diseño y desarrollo de una galería fotográfica para series de paisaje, retrato, noche y trabajos documentales.',
  },
  {
    id: 'tescar-luxury-green',
    title: 'Tescar Luxury Green',
    subtitle: 'Alquiler de vehículos de lujo con conductor en Madrid',
    category: 'Diseño Corporativo / SEO',
    img: '/projects/tescar/desktop.webp',
    imgReto: '/projects/tescar/desktop-full.webp',
    description:
      'Diseño corporativo y desarrollo web premium para Tescar Luxury Green, empresa especializada en el transporte de pasajeros en coches de alta gama en Madrid. La web refleja la exclusividad, elegancia y profesionalidad del servicio, optimizada estratégicamente para posicionamiento SEO en términos clave como "alquiler de coches de lujo con conductor en Madrid".',
  },
  {
    id: 'mudanzas-la-pompa',
    title: 'Mudanzas La Pompa',
    subtitle: 'Presupuestador interactivo para empresa de mudanzas en Valencia',
    category: 'Diseño Web / App',
    img: '/projects/lapompa/desktop.webp',
    imgReto: '/projects/lapompa/desktop-full.webp',
    description:
      'Diseño y desarrollo web a medida para Mudanzas La Pompa, una empresa líder en mudanzas en Valencia. Creamos una plataforma digital optimizada para SEO local, integrando un avanzado cotizador interactivo. Esta herramienta permite a los clientes calcular el precio de su mudanza en tiempo real seleccionando el volumen de sus muebles, fechas y servicios adicionales, mejorando radicalmente la tasa de conversión y la captación de leads cualificados.',
  },
  {
    id: 'instalaciones-torrijos-fontaneria',
    title: 'Instalaciones Torrijos',
    subtitle: 'Especialistas en fontanería, gas y calefacción',
    category: 'Diseño Web / Negocios',
    img: '/projects/torrijos/main.webp',
    imgReto: '/projects/torrijos/reto.webp',
    description:
      'Instalaciones, reparaciones y mantenimiento con un servicio cercano, rápido y bien resuelto desde el primer contacto.',
  },
  {
    id: 'dogcat',
    title: 'Dogcat',
    subtitle: 'Concienciación y plataforma digital para el rescate animal',
    category: 'ONG / Impacto Social',
    img: '/projects/dogcat/img.webp',
    imgReto: '/projects/dogcat/imgReto.webp',
    description:
      'Diseño y desarrollo de una plataforma integral para una ONG dedicada a la protección de animales callejeros. El objetivo es concienciar sobre la situación de abandono, facilitar las donaciones con total transparencia y ofrecer un portal de noticias del mundo animal.',
  },
  {
    id: 'libreria-garcia-lorca',
    title: 'Librería García Lorca',
    subtitle: 'Transformación digital con impacto social',
    category: 'Diseño Web / Social',
    img: '/projects/libreria-garcia-lorca/img.webp',
    imgReto: '/projects/libreria-garcia-lorca/imgReto.webp',
    description:
      'Conceptualización, diseño UX/UI y desarrollo de una plataforma digital integral para una iniciativa solidaria en Madrid. El objetivo central era digitalizar, democratizar y optimizar el proceso de donación de libros a nivel local mediante una interfaz accesible, persuasiva y profundamente humana. Buscábamos transformar un proceso analógico y a menudo tedioso en una experiencia digital gratificante que fomentara la economía circular y el acceso a la cultura.',
  },
  {
    id: 'flesh-fest-videojuego-indie',
    title: 'Flesh Fest',
    subtitle: 'Dirección de arte y desarrollo web para un título indie',
    category: 'Experiencia Digital',
    img: '/projects/flesh-fest-videojuego-indie/img.webp',
    imgReto: '/projects/flesh-fest-videojuego-indie/imgReto.webp',
    description:
      'Diseño y desarrollo de una experiencia web inmersiva para el lanzamiento de un esperado videojuego de terror 2D. El proyecto exigía trasladar la atmósfera opresiva, la narrativa visual y el arte artesanal del juego a un entorno digital interactivo. No se trataba solo de informar, sino de crear una antesala jugable que preparara psicológicamente al usuario para el universo de Flesh Fest antes incluso de descargar el título.',
  },
  {
    id: 'cuidados-paliativos-hospital-cuautitlan',
    title: 'Cuidados Paliativos',
    subtitle: 'Diseño empático para el sector salud',
    category: 'UX/UI / Salud',
    img: '/projects/cuidados-paliativos-hospital-cuautitlan/img.webp',
    imgReto: '/projects/cuidados-paliativos-hospital-cuautitlan/imgReto.webp',
    description:
      'Creación de un entorno digital sereno, claro y profundamente accesible para el Hospital de Cuautitlán. Una plataforma diseñada específicamente desde la empatía para reducir la carga cognitiva de pacientes y familiares en momentos de extrema vulnerabilidad emocional. El proyecto abarcó desde la reestructuración completa de la arquitectura de la información hasta el diseño de la interfaz y el desarrollo frontend.',
  },
  {
    id: 'gameshelf-app',
    title: 'Gameshelf',
    subtitle: 'Arquitectura de datos y diseño de producto',
    category: 'Diseño de Producto / App',
    img: '/projects/gameshelf-app/img.webp',
    imgReto: '/projects/gameshelf-app/imgReto.webp',
    description:
      'Diseño de producto y desarrollo end-to-end de un ecosistema digital avanzado para la gestión, descubrimiento y catalogación de colecciones de videojuegos. Una herramienta robusta y escalable construida sobre una arquitectura de micro-interacciones fluidas, pensada para satisfacer las necesidades de los coleccionistas más exigentes que manejan bibliotecas de miles de títulos en múltiples plataformas.',
  },
];
