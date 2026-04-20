export interface Project {
  id: number | string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  img: string;
  imgPc1?: string;
  imgReto?: string;
  imgMobile1?: string;
  imgMobile2?: string;
  imgMobile3?: string;
  imgMobile4?: string;
  imgMobile5?: string;
  imgObj1?: string;
  imgObj2?: string;
  clientDescription: string;
  challenge: string;
  objectives: string[];
  concept: string;
  philosophy: string;
  technicalDetails: string;
  link?: string;
}

export const portfolioProjects: Project[] = [
  {
    id: 'instalaciones-torrijos-fontaneria',
    title: 'Instalaciones Torrijos',
    subtitle: 'Especialistas en fontanería, gas y calefacción',
    description: 'Instalaciones, reparaciones y mantenimiento con un servicio cercano, rápido y bien resuelto desde el primer contacto.',
    category: 'Web Design / Business',
    img: '/projects/torrijos/main.png',
    imgPc1: '/projects/torrijos/pc1.png',
    imgReto: '/projects/torrijos/reto.png',
    imgMobile1: '/projects/torrijos/mobile1.png',
    imgMobile2: '/projects/torrijos/mobile2.png',
    imgMobile3: '/projects/torrijos/mobile3.png',
    imgMobile4: '/projects/torrijos/mobile4.png',
    imgMobile5: '/projects/torrijos/mobile5.png',
    clientDescription: 'En Instalaciones y Soluciones Torrijos trabajan con seriedad, trato cercano y soluciones bien ejecutadas para que cada intervención quede como debe.',
    challenge: 'El desafío principal era trasladar un negocio tradicional con más de dos décadas de experiencia al mundo digital, manteniendo la esencia de confianza y cercanía que les caracteriza. Necesitaban una plataforma que no solo mostrara sus servicios, sino que facilitara la captación de nuevos clientes de forma ágil y profesional.',
    objectives: [
      'Digitalizar la captación de clientes mediante una landing page de alto impacto.',
      'Reflejar la profesionalidad y experiencia de más de 20 años en el sector.',
      'Optimizar el flujo de contacto rápido para reparaciones urgentes.'
    ],
    concept: 'Un diseño sobrio, fiable y orientado a la acción. Utilizamos una estética limpia con colores que evocan profesionalidad y limpieza, facilitando la navegación para que el usuario encuentre el servicio que necesita y pueda contactar en pocos clics.',
    philosophy: 'Transformar lo tradicional en digital sin perder la humanidad. Creemos que una web de servicios locales debe ser, ante todo, una herramienta práctica que resuelva problemas reales de forma inmediata.',
    technicalDetails: 'Desarrollada con React y Vite, la web utiliza una arquitectura optimizada para el rendimiento y SEO local. Se implementaron componentes interactivos y un diseño responsive impecable para garantizar que los usuarios puedan solicitar presupuesto desde cualquier dispositivo.',
    link: 'https://instalaciones-torrijos.vercel.app/'
  },
  {
    id: 'libreria-garcia-lorca',
    title: 'Librería García Lorca',
    subtitle: 'Transformación digital con impacto social',
    description: 'Conceptualización, diseño UX/UI y desarrollo de una plataforma digital integral para una iniciativa solidaria en Madrid. El objetivo central era digitalizar, democratizar y optimizar el proceso de donación de libros a nivel local mediante una interfaz accesible, persuasiva y profundamente humana. Buscábamos transformar un proceso analógico y a menudo tedioso en una experiencia digital gratificante que fomentara la economía circular y el acceso a la cultura.',
    category: 'Web Design / Social',
    img: 'https://i.postimg.cc/9FYX7F4v/Captura-de-pantalla-2026-03-30-a-las-14-48-30.png',
    imgPc1: 'https://i.postimg.cc/zDSnGDcg/Captura-de-pantalla-2026-03-30-a-las-12-48-22.png',
    imgReto: 'https://i.postimg.cc/43d8z7r4/6ab66894-28c4-4dd0-bb55-51aabdcb384a.png',
    imgMobile1: 'https://i.postimg.cc/BvGfRsg0/IMG_5050.jpg',
    imgMobile2: 'https://i.postimg.cc/636BV0BB/Captura-de-pantalla-2026-03-30-a-las-12-50-52.png',
    imgMobile3: 'https://i.postimg.cc/3Rr3jB3Y/Captura-de-pantalla-2026-03-30-a-las-12-51-02.png',
    clientDescription: 'La Librería García Lorca es una iniciativa cultural y solidaria arraigada en el corazón de Madrid, cuya misión principal es la democratización del acceso a la lectura y el fomento de la economía circular. A través de la recolección y redistribución de libros de segunda mano, buscan tejer una red de apoyo comunitario, ofreciendo literatura a quienes más lo necesitan y dando una segunda vida a miles de ejemplares cada año.',
    challenge: '',
    objectives: [
      'Reducir la fricción en el proceso de contacto y donación a un solo clic.',
      'Diseñar una interfaz minimalista, cálida y accesible (AA compliance).',
      'Posicionar la iniciativa a nivel local mediante una estrategia SEO técnica sólida.'
    ],
    concept: 'Un diseño que respira cultura, empatía y cercanía. Eliminamos todo el ruido visual innecesario para centrar la atención del usuario en el valor intrínseco de la donación y la historia detrás de cada libro. Utilizamos una paleta de colores cálida, tipografías que evocan la lectura tradicional y un flujo de usuario lineal que guía a la persona de la mano desde que descubre la iniciativa hasta que completa su donación.',
    philosophy: 'La tecnología con propósito. Diseñamos herramientas digitales que no solo resuelven problemas técnicos, sino que conectan comunidades, facilitan el impacto social positivo y promueven la sostenibilidad de forma intuitiva. Creemos que el buen diseño tiene el poder de movilizar a las personas hacia causas justas cuando se eliminan las fricciones del proceso.',
    technicalDetails: 'Stack tecnológico moderno y escalable basado en React, estilizado con el sistema de utilidades de Tailwind CSS para garantizar consistencia visual, y enriquecido con animaciones fluidas mediante Framer Motion para proporcionar feedback interactivo. Se implementaron rigurosos estándares de accesibilidad (WCAG 2.1 nivel AA) y una arquitectura SEO técnica impecable, resultando en un rendimiento auditado de 100/100 en Lighthouse en todas las métricas.',
    link: ''
  },
  {
    id: 'gameshelf-app',
    title: 'Gameshelf',
    subtitle: 'Arquitectura de datos y diseño de producto',
    description: 'Diseño de producto y desarrollo end-to-end de un ecosistema digital avanzado para la gestión, descubrimiento y catalogación de colecciones de videojuegos. Una herramienta robusta y escalable construida sobre una arquitectura de micro-interacciones fluidas, pensada para satisfacer las necesidades de los coleccionistas más exigentes que manejan bibliotecas de miles de títulos en múltiples plataformas.',
    category: 'Product Design / App',
    img: 'https://i.postimg.cc/fbLW8MTc/IMG_0479.jpg',
    imgPc1: 'https://i.postimg.cc/fbLW8MTc/IMG_0479.jpg',
    imgReto: 'https://i.postimg.cc/N03hRtyB/IMG_5051.jpg',
    imgMobile1: 'https://i.postimg.cc/N03hRtyB/IMG_5051.jpg',
    clientDescription: 'Gameshelf nace como un producto digital B2C premium orientado a la apasionada comunidad de coleccionistas, completistas y entusiastas del gaming. Es una plataforma SaaS diseñada para resolver el caos organizativo de quienes poseen bibliotecas masivas de videojuegos físicos y digitales distribuidas en docenas de plataformas, consolas y generaciones distintas.',
    challenge: 'El desafío técnico y de diseño de interacción (IxD) era monumental: debíamos construir un sistema capaz de manejar volúmenes masivos de datos dinámicos —incluyendo metadatos complejos, carátulas en alta resolución, fechas de lanzamiento, valoraciones y múltiples filtros cruzados— sin comprometer en absoluto la velocidad de respuesta de la interfaz.\n\nHabía que transformar una base de datos densa y potencialmente abrumadora en una experiencia de navegación visual, intuitiva y altamente personalizable. El usuario debía sentir que tenía el control total sobre miles de registros, pudiendo ordenar, filtrar y visualizar su colección en milisegundos, sin tiempos de carga perceptibles ni interfaces recargadas.\n\nAdemás, el reto estético consistía en crear una interfaz de usuario (UI) que fuera lo suficientemente "invisible" y minimalista como para ceder todo el protagonismo al arte de las carátulas de los videojuegos, pero lo suficientemente robusta y rica en micro-interacciones como para que la gestión diaria del catálogo se sintiera como una experiencia fluida, moderna y gratificante.',
    objectives: [
      'Diseñar un sistema de diseño escalable para interfaces ricas en datos.',
      'Integrar APIs externas de forma asíncrona para una experiencia sin interrupciones.',
      'Implementar un motor de búsqueda y filtrado avanzado con respuesta en tiempo real.'
    ],
    concept: 'Potencia absoluta bajo control total. Ocultamos la inmensa complejidad técnica y la densidad de datos detrás de una interfaz limpia, minimalista y centrada en el contenido (el arte de los juegos). Las micro-interacciones, las transiciones de estado y las animaciones de esqueleto guían al usuario de forma natural, proporcionando feedback constante y haciendo que la gestión del catálogo se sienta como un juego en sí mismo.',
    philosophy: 'Creemos que las herramientas de gestión de datos personales deben sentirse ligeras, ultrarrápidas y gratificantes de usar. El diseño de producto debe empoderar al usuario dándole control total sobre su información, eliminando la fricción de la entrada de datos y transformando la organización en una actividad placentera, no en una tarea administrativa.',
    technicalDetails: 'Single Page Application (SPA) de alto rendimiento construida con React. Integración compleja y asíncrona de múltiples APIs RESTful de terceros (como IGDB) para la obtención de metadatos en tiempo real. Implementación de gestión de estado global eficiente, virtualización de listas para el renderizado de miles de elementos sin caída de frames, y un motor de búsqueda y filtrado en el lado del cliente altamente optimizado.',
    link: 'https://gameshelf-dusky.vercel.app/login'
  }
];
