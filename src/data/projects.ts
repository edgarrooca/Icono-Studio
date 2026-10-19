export interface Project {
  id: number | string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  img: string;
  imgPc1?: string;
  imgReto?: string;
  imgPreview?: string;
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
    id: 'inktime-tattoo',
    title: 'Ink Time',
    subtitle: 'Estudio de tatuaje y piercing en València',
    description: 'Diseño y desarrollo de una web para un estudio de tatuaje y piercing especializado en fine line, realismo, blackwork y piercings.',
    category: 'Negocio local / Servicios',
    img: '/projects/inktime-tattoo/studio.webp',
    imgPc1: '/projects/inktime-tattoo/studio-2.webp',
    imgReto: '/projects/inktime-tattoo/studio-3.webp',
    imgPreview: '/projects/inktime-tattoo/site-full.webp',
    imgMobile1: '/projects/inktime-tattoo/tattoo-care.webp',
    imgMobile2: '/projects/inktime-tattoo/portfolio.webp',
    clientDescription: 'Ink Time es un estudio de tatuaje y piercing de València que necesitaba presentar sus estilos, trabajos y cuidados de forma clara y profesional.',
    challenge: 'El reto era combinar el carácter visual del estudio con una navegación sencilla. La web debía ayudar a descubrir los estilos, resolver dudas habituales y llevar a la persona hasta el contacto sin pasos innecesarios.',
    objectives: [
      'Presentar los servicios y estilos de tatuaje de forma visual.',
      'Transmitir confianza y profesionalidad desde la primera visita.',
      'Facilitar el contacto y la consulta de cuidados antes y después de la cita.'
    ],
    concept: 'Una experiencia directa, visual y cuidada, en la que el trabajo del estudio ocupa el centro y la información aparece justo cuando hace falta.',
    philosophy: 'En un servicio tan personal como un tatuaje, una web debe ayudar a decidir con calma. Claridad, buenas imágenes y un contacto fácil son más útiles que llenar la página de tecnicismos.',
    technicalDetails: 'Arquitectura de contenidos orientada a servicios, portfolio y preguntas frecuentes, con diseño adaptable y llamadas a la acción visibles en móvil.',
    link: 'https://inktime.es/'
  },
  {
    id: 'somnis-d-angels',
    title: 'Somnis d’Àngels',
    subtitle: 'Diseño floral para bodas y eventos',
    description: 'Diseño web para una marca floral especializada en bodas, ramos de novia, flores secas y decoración en Girona y Barcelona.',
    category: 'Marca / Bodas y eventos',
    img: '/projects/somnis-d-angels/hero.webp',
    imgPc1: '/projects/somnis-d-angels/section.webp',
    imgReto: '/projects/somnis-d-angels/full-page.webp',
    imgMobile1: '/projects/somnis-d-angels/bridal.webp',
    imgMobile2: '/projects/somnis-d-angels/events.webp',
    imgMobile3: '/projects/somnis-d-angels/dried.webp',
    imgMobile4: '/projects/somnis-d-angels/centres.webp',
    clientDescription: 'Somnis d’Àngels crea propuestas florales para bodas y eventos en Girona y Barcelona, con una mirada muy cuidada sobre cada historia y cada espacio.',
    challenge: 'La web tenía que transmitir sensibilidad y calidad sin perder claridad. El objetivo era que una pareja pudiera entender el servicio, ver ejemplos y pedir presupuesto con confianza.',
    objectives: [
      'Construir una identidad digital elegante y reconocible.',
      'Mostrar los distintos servicios florales con imágenes que ayuden a imaginar el resultado.',
      'Guiar la visita hacia el contacto y la petición de presupuesto.'
    ],
    concept: 'Una dirección visual cálida y serena, con mucho espacio para las imágenes y un recorrido sencillo desde la inspiración hasta la conversación.',
    philosophy: 'La web acompaña una decisión importante. Debe emocionar, pero también responder rápido a lo que la pareja necesita saber.',
    technicalDetails: 'Landing estructurada por propuesta de valor, servicios, portfolio, proceso y contacto, con composición responsive y recursos visuales optimizados.',
    link: 'https://somnisdangels.com/'
  },
  {
    id: 'autocustomgt',
    title: 'AutoCustomGT',
    subtitle: 'Tienda online de recambios y accesorios para automóviles',
    description: 'Diseño y desarrollo de una tienda online de recambios, repuestos y accesorios para vehículos, con catálogo organizado por categorías.',
    category: 'E-commerce / Automoción',
    img: '/projects/autocustomgt/hero.webp',
    imgPc1: '/projects/autocustomgt/category.webp',
    imgReto: '/projects/autocustomgt/storefront.webp',
    imgPreview: '/projects/autocustomgt/site-full.webp',
    clientDescription: 'AutoCustomGT reúne productos de automoción y accesorios para quienes quieren mantener, mejorar o personalizar su vehículo.',
    challenge: 'La prioridad era ordenar un catálogo amplio y hacer que encontrar un producto resultara sencillo. La experiencia debía conservar el carácter deportivo de la marca sin dificultar la compra.',
    objectives: [
      'Presentar la tienda con una identidad visual vinculada al mundo del motor.',
      'Facilitar la navegación por categorías y la consulta de productos.',
      'Crear una base clara para el carrito, la cuenta y el proceso de compra.'
    ],
    concept: 'Energía visual en la entrada y orden en el catálogo. La estética atrae, mientras que la estructura ayuda a comprar.',
    philosophy: 'Una tienda online puede tener personalidad sin hacer que el usuario se pierda. Cada decisión visual debe ayudar a encontrar, entender y elegir.',
    technicalDetails: 'Aplicación de comercio electrónico con vistas de catálogo, producto, carrito, checkout, cuenta de usuario y gestión de contenidos, planteada para crecer con el inventario.',
    link: 'https://autocustomgt.com/'
  },
  {
    id: 'lorenzo-secades-fotografia',
    title: 'Lorenzo Secades Fotografía',
    subtitle: 'Galería fotográfica de paisaje, retrato y trabajos documentales',
    description: 'Diseño y desarrollo de una galería fotográfica para series de paisaje, retrato, noche y trabajos documentales.',
    category: 'Portfolio / Fotografía',
    img: '/projects/lorenzo-secades-fotografia/home.webp',
    imgPc1: '/projects/lorenzo-secades-fotografia/home.webp',
    imgReto: '/projects/lorenzo-secades-fotografia/home-full.webp',
    imgMobile1: '/projects/lorenzo-secades-fotografia/home-mobile.webp',
    clientDescription: 'Lorenzo Secades presenta su trabajo a través de series fotográficas que recorren el paisaje, la noche, el retrato y distintas historias documentales.',
    challenge: 'El reto era crear una galería que dejara respirar a las imágenes y, al mismo tiempo, permitiera orientarse entre muchas series. El resultado debía sentirse editorial, ligero y fácil de explorar.',
    objectives: [
      'Dar protagonismo al trabajo fotográfico desde la página de entrada.',
      'Organizar las series para que la exploración sea intuitiva.',
      'Mantener una experiencia elegante y cómoda tanto en ordenador como en móvil.'
    ],
    concept: 'Una galería limpia y silenciosa, donde la tipografía y el espacio ordenan la experiencia sin competir con las fotografías.',
    philosophy: 'Cuando el contenido tiene tanta fuerza, el diseño debe saber apartarse. La mejor interfaz es la que facilita mirar y descubrir.',
    technicalDetails: 'Galería responsive con navegación por series, visor de imágenes, páginas editoriales y carga progresiva de recursos visuales.',
    link: 'https://lorenzosecades.es/'
  },
  {
    id: 'tescar-luxury-green',
    title: 'Tescar Luxury Green',
    subtitle: 'Alquiler de vehículos de lujo con conductor en Madrid',
    description: 'Diseño corporativo y desarrollo web premium para Tescar Luxury Green, empresa especializada en el transporte de pasajeros en coches de alta gama en Madrid. La web refleja la exclusividad, elegancia y profesionalidad del servicio, optimizada estratégicamente para posicionamiento SEO en términos clave como "alquiler de coches de lujo con conductor en Madrid".',
    category: 'Diseño Corporativo / SEO',
    img: '/projects/tescar/desktop.webp',
    imgPc1: '/projects/tescar/desktop-scrolled.webp',
    imgReto: '/projects/tescar/desktop-full.webp',
    imgMobile1: '/projects/tescar/mobile1.webp',
    imgMobile2: '/projects/tescar/mobile2.webp',
    imgMobile3: '/projects/tescar/mobile3.webp',
    imgMobile4: '/projects/tescar/mobile4.webp',
    imgMobile5: '/projects/tescar/mobile5.webp',
    clientDescription: 'Tescar Luxury Green ofrece servicios de transporte privado VIP, traslados exclusivos al aeropuerto, disposiciones por horas y cobertura de eventos corporativos en Madrid, utilizando una flota impecable de vehículos de lujo ecológicos. Su público objetivo exige la máxima discreción, puntualidad, lujo y confort en cada trayecto.',
    challenge: 'El reto principal consistía en transmitir digitalmente el alto estándar de calidad física de sus vehículos y chóferes. La interfaz debía ser sumamente elegante, utilizando amplios espacios negativos, tipografías refinadas y una paleta de colores oscura y sofisticada. Además, la arquitectura de la información tenía que estar minuciosamente estructurada para destacar los servicios clave (traslados, bodas, eventos) y facilitar reservas rápidas e intuitivas desde dispositivos móviles, asegurando al mismo tiempo una estructura técnica impecable para dominar las búsquedas locales en Madrid frente a una alta competencia.',
    objectives: [
      'Posicionamiento SEO local para servicios de transporte y chófer privado en Madrid.',
      'Diseño UX/UI premium que transmita confianza absoluta y exclusividad.',
      'Generación de leads cualificados a través de formularios de reserva optimizados.',
      'Optimización extrema de velocidad de carga y adaptación responsive perfecta.'
    ],
    concept: 'Lujo silencioso y eficiencia digital. Una experiencia de usuario donde las espectaculares imágenes de los vehículos y el servicio toman el protagonismo absoluto, acompañadas de micro-interacciones suaves, contrastes pronunciados y llamadas a la acción claras para reservas instantáneas sin fricción.',
    philosophy: 'La primera impresión digital debe estar exactamente a la misma altura que el servicio físico. Una web de lujo no solo debe verse deslumbrante, sino que debe responder con la máxima velocidad, accesibilidad y precisión, respetando el valioso tiempo de su exigente clientela.',
    technicalDetails: 'Desarrollo web moderno y ultra-rápido enfocado en la máxima puntuación de performance (Core Web Vitals) y semántica SEO estructural. Uso avanzado de compresión de imágenes de alta resolución (WebP/AVIF), carga diferida (lazy loading) y un diseño CSS fluido basado en variables.',
    link: 'https://tescarluxurygreen.com'
  },
  {
    id: 'mudanzas-la-pompa',
    title: 'Mudanzas La Pompa',
    subtitle: 'Presupuestador interactivo para empresa de mudanzas en Valencia',
    description: 'Diseño y desarrollo web a medida para Mudanzas La Pompa, una empresa líder en mudanzas en Valencia. Creamos una plataforma digital optimizada para SEO local, integrando un avanzado cotizador interactivo. Esta herramienta permite a los clientes calcular el precio de su mudanza en tiempo real seleccionando el volumen de sus muebles, fechas y servicios adicionales, mejorando radicalmente la tasa de conversión y la captación de leads cualificados.',
    category: 'Diseño Web / App',
    img: '/projects/lapompa/desktop.webp',
    imgPc1: '/projects/lapompa/desktop-form.webp',
    imgReto: '/projects/lapompa/desktop-full.webp',
    imgMobile1: '/projects/lapompa/mobile1.webp',
    imgMobile2: '/projects/lapompa/mobile2.webp',
    imgMobile3: '/projects/lapompa/mobile3.webp',
    imgMobile4: '/projects/lapompa/mobile4.webp',
    clientDescription: 'Mudanzas La Pompa es una empresa de mudanzas en Valencia y portes nacionales de reciente creación que nace con la visión de modernizar un sector tradicional. Su objetivo era ofrecer transparencia total en los precios de mudanzas, facilitando a los usuarios de Valencia y alrededores una experiencia de contratación digital, rápida y sin sorpresas.',
    challenge: 'El mayor desafío técnico y de diseño UX/UI era transformar el complejo proceso de calcular una mudanza (que tradicionalmente requiere visitas presenciales o largas llamadas telefónicas) en una experiencia digital fluida. Necesitábamos desarrollar un presupuestador paso a paso que no resultara abrumador, optimizado perfectamente para dispositivos móviles, y que además alimentara un panel de control interno CRM donde el equipo pudiera gestionar cada solicitud de servicio de manera eficiente. Todo ello manteniendo una arquitectura de código limpia y rápida para asegurar un fuerte posicionamiento SEO local en Valencia.',
    objectives: [
      'Digitalizar la captación de clientes y la estimación de presupuestos de mudanzas.',
      'Desarrollar un cotizador interactivo paso a paso basado en inventario visual.',
      'Posicionar la marca a nivel SEO en Valencia para búsquedas locales de mudanzas.',
      'Implementar un panel de gestión interno robusto para administración de leads.'
    ],
    concept: 'Una web dinámica, limpia y radicalmente orientada a la usabilidad. El cotizador interactivo es el corazón de la experiencia, guiando al usuario de forma visual a través del proceso de inventariado sin fricciones, utilizando iconos claros y una navegación por pasos que reduce la carga cognitiva.',
    philosophy: 'Facilitar la mudanza desde el primer clic. Creemos que la tecnología debe simplificar procesos que históricamente han sido complejos y tediosos, aportando transparencia, velocidad y confianza al usuario en un momento de estrés como es un traslado de vivienda.',
    technicalDetails: 'Desarrollo Full-Stack con integración de un cotizador complejo en React y panel de administración backend seguro. Estrategia avanzada de SEO técnico, optimización de Core Web Vitals y diseño responsive pixel-perfect.',
    link: 'https://mudanzaslapompa.es'
  },
  {
    id: 'instalaciones-torrijos-fontaneria',
    title: 'Instalaciones Torrijos',
    subtitle: 'Especialistas en fontanería, gas y calefacción',
    description: 'Instalaciones, reparaciones y mantenimiento con un servicio cercano, rápido y bien resuelto desde el primer contacto.',
    category: 'Diseño Web / Negocios',
    img: '/projects/torrijos/main.webp',
    imgPc1: '/projects/torrijos/pc1.webp',
    imgReto: '/projects/torrijos/reto.webp',
    imgMobile1: '/projects/torrijos/mobile1.webp',
    imgMobile2: '/projects/torrijos/mobile2.webp',
    imgMobile3: '/projects/torrijos/mobile3.webp',
    imgMobile4: '/projects/torrijos/mobile4.webp',
    imgMobile5: '/projects/torrijos/mobile5.webp',
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
    id: 'dogcat',
    title: 'Dogcat',
    subtitle: 'Concienciación y plataforma digital para el rescate animal',
    description: 'Diseño y desarrollo de una plataforma integral para una ONG dedicada a la protección de animales callejeros. El objetivo es concienciar sobre la situación de abandono, facilitar las donaciones con total transparencia y ofrecer un portal de noticias del mundo animal.',
    category: 'ONG / Impacto Social',
    img: '/projects/dogcat/img.webp',
    imgPc1: '/projects/dogcat/imgPc1.webp',
    imgReto: '/projects/dogcat/imgReto.webp',
    imgMobile1: '/projects/dogcat/imgMobile1.webp',
    imgMobile2: '/projects/dogcat/imgMobile2.webp',
    imgMobile3: '/projects/dogcat/imgMobile3.webp',
    imgMobile4: '/projects/dogcat/imgMobile4.webp',
    clientDescription: "Dogcat es una organización sin ánimo de lucro que lucha por los derechos de los animales en situación de calle. Buscan crear una comunidad consciente y participativa a través de la educación y el apoyo directo a rescates.",
    challenge: "El reto era transformar una causa social en una experiencia digital persuasiva que no solo informara, sino que movilizara a la acción. Debíamos estructurar información sensible sobre la gestión de fondos y crear un blog dinámico que se convirtiera en un referente de información animal.",
    objectives: [
      "Concienciar sobre el impacto del abandono y los beneficios del apoyo a la organización.",
      "Implementar un sistema transparente de gestión y visualización de fondos recaudados.",
      "Desarrollar un blog especializado para noticias y artículos sobre bienestar animal."
    ],
    concept: "Transparencia y movilización emocional.",
    philosophy: "Conectar personas con causas animales a través de la tecnología.",
    technicalDetails: "Arquitectura orientada al contenido con blog dinámico integrado y sistema de transparencia.",
    link: "https://dogcat-madrid-rescate.onrender.com/"
  },
  {
    id: 'libreria-garcia-lorca',
    title: 'Librería García Lorca',
    subtitle: 'Transformación digital con impacto social',
    description: 'Conceptualización, diseño UX/UI y desarrollo de una plataforma digital integral para una iniciativa solidaria en Madrid. El objetivo central era digitalizar, democratizar y optimizar el proceso de donación de libros a nivel local mediante una interfaz accesible, persuasiva y profundamente humana. Buscábamos transformar un proceso analógico y a menudo tedioso en una experiencia digital gratificante que fomentara la economía circular y el acceso a la cultura.',
    category: 'Diseño Web / Social',
    img: '/projects/libreria-garcia-lorca/img.webp',
    imgPc1: '/projects/libreria-garcia-lorca/imgPc1.webp',
    imgReto: '/projects/libreria-garcia-lorca/imgReto.webp',
    imgMobile1: '/projects/libreria-garcia-lorca/imgMobile1.webp',
    imgMobile2: '/projects/libreria-garcia-lorca/imgMobile2.webp',
    imgMobile3: '/projects/libreria-garcia-lorca/imgMobile3.webp',
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
    link: 'https://edgarrooca.github.io/Libreria-Garcia-Lorca/'
  },
  {
    id: 'flesh-fest-videojuego-indie',
    title: 'Flesh Fest',
    subtitle: 'Dirección de arte y desarrollo web para un título indie',
    description: 'Diseño y desarrollo de una experiencia web inmersiva para el lanzamiento de un esperado videojuego de terror 2D. El proyecto exigía trasladar la atmósfera opresiva, la narrativa visual y el arte artesanal del juego a un entorno digital interactivo. No se trataba solo de informar, sino de crear una antesala jugable que preparara psicológicamente al usuario para el universo de Flesh Fest antes incluso de descargar el título.',
    category: 'Experiencia Digital',
    img: '/projects/flesh-fest-videojuego-indie/img.webp',
    imgPc1: '/projects/flesh-fest-videojuego-indie/imgPc1.webp',
    imgReto: '/projects/flesh-fest-videojuego-indie/imgReto.webp',
    imgMobile1: '/projects/flesh-fest-videojuego-indie/imgMobile1.webp',
    imgMobile2: '/projects/flesh-fest-videojuego-indie/imgMobile2.webp',
    imgMobile3: '/projects/flesh-fest-videojuego-indie/imgMobile3.webp',
    imgMobile4: '/projects/flesh-fest-videojuego-indie/imgMobile4.webp',
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
    category: 'UX/UI / Salud',
    img: '/projects/cuidados-paliativos-hospital-cuautitlan/img.webp',
    imgPc1: '/projects/cuidados-paliativos-hospital-cuautitlan/imgPc1.webp',
    imgReto: '/projects/cuidados-paliativos-hospital-cuautitlan/imgReto.webp',
    imgMobile1: '/projects/cuidados-paliativos-hospital-cuautitlan/imgMobile1.webp',
    imgMobile2: '/projects/cuidados-paliativos-hospital-cuautitlan/imgMobile2.webp',
    imgMobile3: '/projects/cuidados-paliativos-hospital-cuautitlan/imgMobile3.webp',
    imgMobile4: '/projects/cuidados-paliativos-hospital-cuautitlan/imgMobile4.webp',
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
    id: 'gameshelf-app',
    title: 'Gameshelf',
    subtitle: 'Arquitectura de datos y diseño de producto',
    description: 'Diseño de producto y desarrollo end-to-end de un ecosistema digital avanzado para la gestión, descubrimiento y catalogación de colecciones de videojuegos. Una herramienta robusta y escalable construida sobre una arquitectura de micro-interacciones fluidas, pensada para satisfacer las necesidades de los coleccionistas más exigentes que manejan bibliotecas de miles de títulos en múltiples plataformas.',
    category: 'Diseño de Producto / App',
    img: '/projects/gameshelf-app/img.webp',
    imgPc1: '/projects/gameshelf-app/img.webp',
    imgReto: '/projects/gameshelf-app/imgReto.webp',
    imgMobile1: '/projects/gameshelf-app/imgReto.webp',
    clientDescription: 'Gameshelf nace como un producto digital B2C premium orientado a la apasionada comunidad de coleccionistas, completistas y entusiastas del gaming. Es una plataforma SaaS diseñada para resolver el caos organizativo de quienes poseen bibliotecas masivas de videojuegos físicos y digitales distribuidas en docenas de plataformas, consolas y generaciones distintas.',
    challenge: 'El desafío técnico y de diseño de interacción (IxD) era importante: debíamos construir un sistema capaz de manejar volúmenes masivos de datos dinámicos, incluyendo metadatos complejos, carátulas en alta resolución, fechas de lanzamiento, valoraciones y múltiples filtros cruzados, sin comprometer la velocidad de respuesta de la interfaz.\n\nHabía que transformar una base de datos densa y potencialmente abrumadora en una experiencia de navegación visual, intuitiva y altamente personalizable. El usuario debía sentir que tenía el control total sobre miles de registros, pudiendo ordenar, filtrar y visualizar su colección en milisegundos, sin tiempos de carga perceptibles ni interfaces recargadas.\n\nAdemás, el reto estético consistía en crear una interfaz de usuario (UI) que fuera lo suficientemente "invisible" y minimalista como para ceder todo el protagonismo al arte de las carátulas de los videojuegos, pero lo suficientemente robusta y rica en micro-interacciones como para que la gestión diaria del catálogo se sintiera como una experiencia fluida, moderna y gratificante.',
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
