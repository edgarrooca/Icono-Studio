import type { Project } from './projects';

export type ProjectSummary = Pick<
  Project,
  'id' | 'title' | 'subtitle' | 'description' | 'category' | 'img' | 'imgReto'
>;

export const projectSummaries: ProjectSummary[] = [
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
    img: 'https://i.postimg.cc/2jv2pspR/Captura-de-pantalla-2026-04-06-a-las-9-37-13.png',
    imgReto: 'https://i.postimg.cc/Xv4dnspR/75f8a067-0a12-4e0c-a18f-5b9215cacb62.png',
    description:
      'Diseño y desarrollo de una plataforma integral para una ONG dedicada a la protección de animales callejeros. El objetivo es concienciar sobre la situación de abandono, facilitar las donaciones con total transparencia y ofrecer un portal de noticias del mundo animal.',
  },
  {
    id: 'libreria-garcia-lorca',
    title: 'Librería García Lorca',
    subtitle: 'Transformación digital con impacto social',
    category: 'Diseño Web / Social',
    img: 'https://i.postimg.cc/9FYX7F4v/Captura-de-pantalla-2026-03-30-a-las-14-48-30.png',
    imgReto: 'https://i.postimg.cc/43d8z7r4/6ab66894-28c4-4dd0-bb55-51aabdcb384a.png',
    description:
      'Conceptualización, diseño UX/UI y desarrollo de una plataforma digital integral para una iniciativa solidaria en Madrid. El objetivo central era digitalizar, democratizar y optimizar el proceso de donación de libros a nivel local mediante una interfaz accesible, persuasiva y profundamente humana. Buscábamos transformar un proceso analógico y a menudo tedioso en una experiencia digital gratificante que fomentara la economía circular y el acceso a la cultura.',
  },
  {
    id: 'flesh-fest-videojuego-indie',
    title: 'Flesh Fest',
    subtitle: 'Dirección de arte y desarrollo web para un título indie',
    category: 'Experiencia Digital',
    img: 'https://i.postimg.cc/43W1XfBQ/Captura_de_pantalla_2026_01_30_172754.png',
    imgReto: 'https://i.postimg.cc/43dc8zf9/4361bd7b-1f8f-4232-901f-3039f20c7252.png',
    description:
      'Diseño y desarrollo de una experiencia web inmersiva para el lanzamiento de un esperado videojuego de terror 2D. El proyecto exigía trasladar la atmósfera opresiva, la narrativa visual y el arte artesanal del juego a un entorno digital interactivo. No se trataba solo de informar, sino de crear una antesala jugable que preparara psicológicamente al usuario para el universo de Flesh Fest antes incluso de descargar el título.',
  },
  {
    id: 'cuidados-paliativos-hospital-cuautitlan',
    title: 'Cuidados Paliativos',
    subtitle: 'Diseño empático para el sector salud',
    category: 'UX/UI / Salud',
    img: 'https://i.postimg.cc/nhr2DrRz/Captura-de-pantalla-2026-03-30-a-las-14-41-52.png',
    imgReto: 'https://i.postimg.cc/9FMQ5HgB/2fa94748-dccf-4df4-9fd4-9f75d83390cd.png',
    description:
      'Creación de un entorno digital sereno, claro y profundamente accesible para el Hospital de Cuautitlán. Una plataforma diseñada específicamente desde la empatía para reducir la carga cognitiva de pacientes y familiares en momentos de extrema vulnerabilidad emocional. El proyecto abarcó desde la reestructuración completa de la arquitectura de la información hasta el diseño de la interfaz y el desarrollo frontend.',
  },
  {
    id: 'gameshelf-app',
    title: 'Gameshelf',
    subtitle: 'Arquitectura de datos y diseño de producto',
    category: 'Diseño de Producto / App',
    img: 'https://i.postimg.cc/fbLW8MTc/IMG_0479.jpg',
    imgReto: 'https://i.postimg.cc/N03hRtyB/IMG_5051.jpg',
    description:
      'Diseño de producto y desarrollo end-to-end de un ecosistema digital avanzado para la gestión, descubrimiento y catalogación de colecciones de videojuegos. Una herramienta robusta y escalable construida sobre una arquitectura de micro-interacciones fluidas, pensada para satisfacer las necesidades de los coleccionistas más exigentes que manejan bibliotecas de miles de títulos en múltiples plataformas.',
  },
];
