export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  img: string;
  imgReto?: string;
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
    id: 1,
    title: 'Flesh Fest',
    subtitle: 'Dirección de arte y desarrollo web para un título indie',
    description: 'Diseño y desarrollo de una experiencia web inmersiva para el lanzamiento de un esperado videojuego de terror 2D. El proyecto exigía trasladar la atmósfera opresiva, la narrativa visual y el arte artesanal del juego a un entorno digital interactivo. No se trataba solo de informar, sino de crear una antesala jugable que preparara psicológicamente al usuario para el universo de Flesh Fest antes incluso de descargar el título.',
    category: 'Digital Experience',
    img: 'https://picsum.photos/seed/fleshfest/800/2400',
    imgReto: 'https://picsum.photos/seed/1reto/800/2400',
    clientDescription: 'Flesh Fest es un título indie de terror 2D que desafía las convenciones del género mediante un apartado visual íntegramente ilustrado a mano. El estudio detrás de la obra buscaba no solo una página promocional, sino una extensión de la propia experiencia de juego. Necesitaban un portal digital que capturara la esencia macabra, la tensión psicológica y la riqueza artística de su universo, sirviendo como el primer punto de contacto real entre el jugador y la pesadilla que les aguarda.',
    challenge: 'El desafío principal radicaba en la traducción de un estilo artístico puramente analógico y tradicional (hand-drawn) a una interfaz web moderna, interactiva y responsive, sin que en el proceso se perdiera la esencia cruda, orgánica y perturbadora que define la identidad del juego.\n\nPor un lado, nos enfrentábamos a la necesidad de utilizar assets visuales de altísima resolución y animaciones complejas para mantener la fidelidad del arte original. Por otro lado, la experiencia web exigía un rendimiento técnico impecable: tiempos de carga casi instantáneos y una navegación fluida en cualquier dispositivo, ya que cualquier latencia o salto en la interfaz rompería inmediatamente la inmersión psicológica del usuario.\n\nAdemás, debíamos diseñar una arquitectura de la información que, si bien debía ser clara para proporcionar los datos de lanzamiento y enlaces de compra, tenía que presentarse de forma críptica y misteriosa, obligando al usuario a explorar e interactuar con la interfaz casi como si estuviera resolviendo el primer puzzle del juego.',
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
    id: 2,
    title: 'Librería García Lorca',
    subtitle: 'Transformación digital con impacto social',
    description: 'Conceptualización, diseño UX/UI y desarrollo de una plataforma digital integral para una iniciativa solidaria en Madrid. El objetivo central era digitalizar, democratizar y optimizar el proceso de donación de libros a nivel local mediante una interfaz accesible, persuasiva y profundamente humana. Buscábamos transformar un proceso analógico y a menudo tedioso en una experiencia digital gratificante que fomentara la economía circular y el acceso a la cultura.',
    category: 'Web Design / Social',
    img: 'https://picsum.photos/seed/lorca/800/2400',
    imgReto: 'https://picsum.photos/seed/2reto/800/2400',
    clientDescription: 'La Librería García Lorca es una iniciativa cultural y solidaria arraigada en el corazón de Madrid, cuya misión principal es la democratización del acceso a la lectura y el fomento de la economía circular. A través de la recolección y redistribución de libros de segunda mano, buscan tejer una red de apoyo comunitario, ofreciendo literatura a quienes más lo necesitan y dando una segunda vida a miles de ejemplares cada año.',
    challenge: 'El reto fundamental de este proyecto era de naturaleza conductual y demográfica: necesitábamos diseñar una plataforma que inspirara confianza inmediata y facilitara la acción de donar en el menor número de pasos posible, superando la barrera digital para un público objetivo extremadamente amplio.\n\nNos dirigíamos tanto a jóvenes estudiantes digitalmente nativos como a personas mayores del barrio que quizás no están tan familiarizadas con interfaces complejas. Esto requería un equilibrio perfecto y delicado entre un diseño moderno, limpio y atractivo, y una usabilidad a prueba de balas que no dejara a nadie atrás por frustración tecnológica.\n\nAdicionalmente, el proyecto debía transmitir los valores de solidaridad, cercanía y amor por la cultura sin caer en los clichés visuales habituales de las ONGs. Necesitábamos una identidad digital propia, que se sintiera local pero profesional, y que lograra convertir la buena intención de un vecino en una donación real y tangible mediante un flujo de usuario sin ningún tipo de fricción.',
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
    id: 3,
    title: 'Cuidados Paliativos',
    subtitle: 'Diseño empático para el sector salud',
    description: 'Creación de un entorno digital sereno, claro y profundamente accesible para el Hospital de Cuautitlán. Una plataforma diseñada específicamente desde la empatía para reducir la carga cognitiva de pacientes y familiares en momentos de extrema vulnerabilidad emocional. El proyecto abarcó desde la reestructuración completa de la arquitectura de la información hasta el diseño de la interfaz y el desarrollo frontend.',
    category: 'UX/UI / Healthcare',
    img: 'https://picsum.photos/seed/paliativos/800/2400',
    imgReto: 'https://picsum.photos/seed/3reto/800/2400',
    clientDescription: 'El Hospital de Cuautitlán, a través de su unidad especializada, ofrece un servicio integral de cuidados paliativos enfocado en el acompañamiento, la dignidad y la calidad de vida de pacientes terminales y sus familias. Su labor trasciende lo puramente médico, adentrándose en el apoyo psicológico, emocional y espiritual durante una de las etapas más vulnerables y complejas de la vida humana.',
    challenge: 'El reto de diseño y comunicación era doble y sumamente delicado. Por un lado, debíamos estructurar y comunicar información médica compleja, protocolos de actuación y servicios sensibles de forma cristalina, asegurando que las familias pudieran encontrar respuestas rápidas en momentos de crisis.\n\nPor otro lado, y quizás el desafío más importante, era diseñar una interfaz que transmitiera paz, contención emocional, empatía y profunda profesionalidad. Teníamos que evitar a toda costa la frialdad clínica, el alarmismo visual o la sobrecarga de datos que caracteriza a muchos portales de salud tradicionales, los cuales a menudo aumentan la ansiedad del usuario.\n\nEl diseño debía actuar como un "refugio digital". Esto implicaba tomar decisiones radicales en cuanto a la paleta cromática, la tipografía y el uso del espacio en blanco, creando un entorno que no solo informara, sino que abrazara al visitante, reduciendo su carga cognitiva y ofreciéndole un camino claro y sereno hacia la ayuda que necesita.',
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
    id: 4,
    title: 'Gameshelf',
    subtitle: 'Arquitectura de datos y diseño de producto',
    description: 'Diseño de producto y desarrollo end-to-end de un ecosistema digital avanzado para la gestión, descubrimiento y catalogación de colecciones de videojuegos. Una herramienta robusta y escalable construida sobre una arquitectura de micro-interacciones fluidas, pensada para satisfacer las necesidades de los coleccionistas más exigentes que manejan bibliotecas de miles de títulos en múltiples plataformas.',
    category: 'Product Design / App',
    img: 'https://picsum.photos/seed/gameshelf/800/2400',
    imgReto: 'https://picsum.photos/seed/4reto/800/2400',
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
