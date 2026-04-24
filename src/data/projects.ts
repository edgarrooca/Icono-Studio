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
  },
  {
    id: 'flesh-fest-videojuego-indie',
    title: 'Flesh Fest',
    subtitle: 'Dirección de arte y desarrollo web para un título indie',
    description: 'Diseño y desarrollo de una experiencia web inmersiva para el lanzamiento de un esperado videojuego de terror 2D. El proyecto exigía trasladar la atmósfera opresiva, la narrativa visual y el arte artesanal del juego a un entorno digital interactivo. No se trataba solo de informar, sino de crear una antesala jugable que preparara psicológicamente al usuario para el universo de Flesh Fest antes incluso de descargar el título.',
    category: 'Digital Experience',
    img: 'https://i.postimg.cc/43W1XfBQ/Captura_de_pantalla_2026_01_30_172754.png',
    imgPc1: 'https://i.postimg.cc/ZKG659LW/Captura_de_pantalla_2026_03_30_a_las_12_35_56.png',
    imgReto: 'https://i.postimg.cc/43dc8zf9/4361bd7b-1f8f-4232-901f-3039f20c7252.png',
    imgMobile1: 'https://i.postimg.cc/jd90STkq/Captura_de_pantalla_2026_01_30_175230.png',
    imgMobile2: 'https://i.postimg.cc/05HbNNSv/Captura-de-pantalla-2026-03-30-a-las-14-45-12.png',
    imgMobile3: 'https://i.postimg.cc/8knjCCvD/Captura-de-pantalla-2026-03-30-a-las-14-45-22.png',
    imgMobile4: 'https://i.postimg.cc/wxb7BBNg/Captura-de-pantalla-2026-03-30-a-las-14-45-32.png',
    clientDescription: 'Flesh Fest es un título indie de terror 2D que desafía las convenciones del género mediante un apartado visual íntegramente ilustrado a mano. El estudio detrás de la obra buscaba no solo una página promocional, sino una extensión de la propia experiencia de juego. Necesitaban un portal digital que capturara la esencia macabra, la tensión psicológica y la riqueza artística de su universo, sirviendo como el primer punto de contacto real entre el jugador y la pesadilla que les aguarda.',
    challenge: 'El desafío principal radicaba en la traducción de un estilo artístico puramente analógico y tradicional (hand-drawn) a una interfaz web moderna, interactiva y responsive, sin que en el proceso se perdiera la esencia cruda, orgánica y perturbadora que define la identidad del juego.\n\nPor un lado, nos enfrentábamos a la necesidad de utilizar assets visuales de altísima resolución y animaciones complejas para mantener la fidelidad del arte original. Por otro lado, la experiencia web exigía un rendimiento técnico impecable: tiempos de carga casi instantáneos y una navegación fluida en cualquier dispositivo, ya que cualquier latencia o salto en la interfaz rompería inmediatamente la inmersión psicológica del usuario.',
    objectives: [
      'Diseñar una experiencia de usuario (UX) que actúe como prólogo narrativo del juego.',
      'Optimizar la carga de assets visuales de alta resolución para garantizar fluidez.',
      'Alcanzar la excelencia técnica: 100/100 en Lighthouse (Rendimiento, Accesibilidad, SEO).'
    ],
    concept: 'La web no es solo un canal de información corporativa, sino el primer nivel del juego. Utilizamos el arte original para construir un portal oscuro y laberíntico que sumerge al usuario desde el primer clic. A través de micro-interacciones inquietantes, diseño sonoro sutil y transiciones fluidas, la página web respira y reacciona al comportamiento del visitante, convirtiendo la exploración en una experiencia narrativa por sí misma.',
    philosophy: 'Creemos firmemente que el diseño promocional en la industria del videojuego debe ser una extensión coherente de la obra original, respetando su tono sin sacrificar la usabilidad. Una landing page de un juego no debe parecer una plantilla de marketing corporativo, sino un artefacto digital que pertenezca al mismo universo de ficción que el producto que promociona.',
    technicalDetails: 'Arquitectura frontend altamente optimizada utilizando HTML5 semántico, CSS3 avanzado con variables dinámicas y JavaScript vanilla para orquestar animaciones de bajo consumo de recursos. Se implementó una estrategia de lazy loading agresiva y compresión de arte 2D de última generación (WebP/AVIF) para mantener el peso de la página al mínimo, logrando un rendimiento de 100/100 en Lighthouse sin comprometer la fidelidad visual.',
    link: 'https://edgarroca-cei.github.io/'
  },
  {
    id: 'cuidados-paliativos-hospital-cuautitlan',
    title: 'Cuidados Paliativos',
    subtitle: 'Diseño empático para el sector salud',
    description: 'Creación de un entorno digital sereno, claro y profundamente accesible para el Hospital de Cuautitlán. Una plataforma diseñada específicamente desde la empatía para reducir la carga cognitiva de pacientes y familiares en momentos de extrema vulnerabilidad emocional. El proyecto abarcó desde la reestructuración completa de la arquitectura de la información hasta el diseño de la interfaz y el desarrollo frontend.',
    category: 'UX/UI / Healthcare',
    img: 'https://i.postimg.cc/nhr2DrRz/Captura-de-pantalla-2026-03-30-a-las-14-41-52.png',
    imgPc1: 'https://i.postimg.cc/t4kzGNdF/IMG_0476.jpg',
    imgReto: 'https://i.postimg.cc/9FMQ5HgB/2fa94748-dccf-4df4-9fd4-9f75d83390cd.png',
    imgMobile1: 'https://i.postimg.cc/3R4zC9tC/Captura-de-pantalla-2026-03-30-a-las-14-38-37.png',
    imgMobile2: 'https://i.postimg.cc/4d7jbwW1/Captura-de-pantalla-2026-03-30-a-las-14-36-57.png',
    imgMobile3: 'https://i.postimg.cc/tTZ8tDBN/Captura-de-pantalla-2026-03-30-a-las-14-38-03.png',
    imgMobile4: 'https://i.postimg.cc/ydg2XnLh/Captura-de-pantalla-2026-03-30-a-las-14-38-48.png',
    clientDescription: 'El Hospital de Cuautitlán, a través de su unidad especializada, ofrece un servicio integral de cuidados paliativos enfocado en el acompañamiento, la dignidad y la calidad de vida de pacientes terminales y sus familias. Su labor trasciende lo puramente médico, adentrándose en el apoyo psicológico, emocional y espiritual durante una de las etapas más vulnerables y complejas de la vida humana.',
    challenge: 'El reto de diseño y comunicación era doble y sumamente delicado. Por un lado, debíamos estructurar y comunicar información médica compleja, protocolos de actuación y servicios sensibles de forma cristalina, asegurando que las familias pudieran encontrar respuestas rápidas en momentos de crisis.\n\nPor otro lado, y quizás el desafío más importante, era diseñar una interfaz que transmitiera paz, contención emocional, empatía y profunda profesionalidad. Teníamos que evitar a toda costa la frialdad clínica, el alarmismo visual o la sobrecarga de datos que caracteriza a muchos portales de salud tradicionales, los cuales a menudo aumentan la ansiedad del usuario.',
    objectives: [
      'Establecer una jerarquía visual que priorice el acceso rápido a recursos de apoyo.',
      'Implementar una paleta cromática y tipográfica fundamentada en la psicología del color para entornos de salud.',
      'Garantizar la máxima accesibilidad web para usuarios de edad avanzada.'
    ],
    concept: 'El "Diseño como Refugio". Cada elemento de la interfaz, desde el espaciado hasta la microcopia, fue concebido para transmitir calma y seguridad. Utilizamos espacios en blanco generosos para dar respiro a la lectura, una navegación predecible que no requiere aprendizaje, y un lenguaje visual que abraza al usuario, guiándolo hacia los recursos de apoyo, guías médicas y vías de contacto de la forma más suave posible.',
    philosophy: 'En el sector salud, el buen diseño no solo informa, sino que cuida y acompaña. Priorizamos la empatía digital y la reducción absoluta del estrés cognitivo por encima de cualquier tendencia estética. Creemos que una interfaz médica debe ser invisible, permitiendo que la humanidad del servicio y la claridad de la información sean los verdaderos protagonistas.',
    technicalDetails: 'Desarrollo frontend robusto en React con Tailwind CSS, priorizando la semántica HTML y la compatibilidad con lectores de pantalla. Se realizó una optimización exhaustiva de la arquitectura de información y una estrategia SEO técnica avanzada para asegurar que los recursos críticos y las guías de apoyo aparezcan en los primeros resultados de búsqueda cuando las familias más lo necesitan, manteniendo tiempos de carga inferiores a 1 segundo.',
    link: 'https://hcuautitlancuidadospaliativos.com/'
  },
  {
    id: 'dogcat-madrid-veterinaria',
    title: 'Dogcat Madrid',
    subtitle: 'Transformación digital y optimización de la experiencia para el cuidado animal',
    description: 'Rediseño estratégico enfocado en la conversión de servicios veterinarios y la fidelización de clientes a través de una interfaz moderna y accesible.',
    category: 'Web Corporativa',
    img: 'https://i.postimg.cc/2jv2pspR/Captura-de-pantalla-2026-04-06-a-las-9-37-13.png',
    imgPc1: 'https://i.postimg.cc/qRD6hM6S/Captura-de-pantalla-2026-04-06-a-las-9-29-13.png',
    imgReto: 'https://i.postimg.cc/Xv4dnspR/75f8a067-0a12-4e0c-a18f-5b9215cacb62.png',
    imgMobile1: 'https://i.postimg.cc/BQBLHgF9/Captura-de-pantalla-2026-04-06-a-las-9-30-58.png',
    imgMobile2: 'https://i.postimg.cc/KvDkBNTh/Captura-de-pantalla-2026-04-06-a-las-9-31-16.png',
    imgMobile3: 'https://i.postimg.cc/SNf2Cr9p/Captura-de-pantalla-2026-04-06-a-las-9-31-35.png',
    imgMobile4: 'https://i.postimg.cc/Hs9cX2MG/Captura-de-pantalla-2026-04-06-a-las-9-32-05.png',
    clientDescription: "Dogcat Madrid es un centro especializado en bienestar animal integral que ofrece servicios de veterinaria avanzada.",
    challenge: "El cliente operaba con una web obsoleta que no permitía la gestión de citas online ni reflejaba la excelencia de sus instalaciones, lo que generaba fricción en el proceso de reserva y una imagen de marca desactualizada frente a su competencia directa.",
    objectives: [
      "Implementación de un sistema de reservas en tiempo real para optimizar la gestión de citas.",
      "Mejora del posicionamiento SEO local para captar tráfico cualificado en la Comunidad de Madrid.",
      "Desarrollo de un diseño 'responsive' orientado a facilitar el acceso rápido desde dispositivos móviles."
    ],
    concept: "Diseño enfocado en la funcionalidad y la confianza veterinaria.",
    philosophy: "Sistemas claros para dueños preocupados.",
    technicalDetails: "Arquitectura frontend reactiva e integración de citas.",
    link: "https://dogcat-madrid-rescate.onrender.com/"
  }
];
