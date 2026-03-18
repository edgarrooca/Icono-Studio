export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  img: string;
  clientDescription: string;
  challenge: string;
  objectives: string[];
  concept: string;
  philosophy: string;
  technicalDetails: string;
}

export const portfolioProjects: Project[] = [
  {
    id: 1,
    title: 'Lumina',
    subtitle: 'Estudio de arquitectura y diseño referente a nivel internacional',
    description: 'Plataforma e-commerce B2B con integración ERP.',
    category: 'E-commerce',
    img: 'https://picsum.photos/seed/ecommerce-b2b/800/2400',
    clientDescription: 'Lumina representa una de las firmas más reconocidas del panorama arquitectónico nacional e internacional. Con una trayectoria sólida y una filosofía marcada por la armonía, la serenidad y el diseño atemporal, su nueva web debía reflejar todos estos valores con coherencia visual y conceptual. Desde Icono Studio desarrollamos una web hecha completamente a medida, donde el diseño actúa como extensión natural de su obra arquitectónica.',
    challenge: 'Un estudio con identidad propia que merecía una web única. Lumina lidera un equipo multidisciplinar donde arquitectura y diseño dialogan en perfecta sintonía.\n\nNuestro reto fue diseñar una web desde cero que hiciera justicia a la profundidad conceptual y visual del trabajo de Lumina.\n\nCreamos una web que no solo transmite elegancia y claridad, sino que estructura los contenidos de manera intuitiva, permitiendo al visitante ver todo el contenido de forma clara.',
    objectives: [
      'Diseñar una web totalmente personalizada, que sirviera tanto como archivo visual de su trabajo como herramienta de comunicación.',
      'Transmitir la esencia del estudio: una identidad sólida, elegante y coherente con su manera de entender la arquitectura y el diseño.',
      'Trabajar cuidadosamente la experiencia en dispositivos móviles, el SEO y la optimización del rendimiento para proyectar la excelencia del estudio también en el ámbito digital.'
    ],
    concept: 'Cada rincón del nuevo sitio está concebido como una prolongación del lenguaje del estudio: limpio, estructurado y con una fuerte carga emocional. El desarrollo nos permitió trabajar cada interacción como si se tratase de una estancia más dentro de su obra: funcional, serena y profundamente estética.',
    philosophy: 'La nueva web de Lumina es más que un escaparate de proyectos: es una experiencia que transmite los mismos valores que sus obras físicas.\n\nLa armonía, la atemporalidad, la atmósfera y la precisión en cada detalle se ven reflejados también en el diseño de la página web.\n\nCada sección, cada imagen, cada tipografía ha sido elegida para construir un entorno web que, al igual que sus espacios, invita al sosiego y a la contemplación.',
    technicalDetails: 'Para el Estudio de Lumina desarrollamos una web totalmente a medida, cuidando cada detalle para reflejar su identidad visual y la calidad de sus proyectos.\n\nCreamos un diseño personalizado, con estructuras dinámicas y un sistema de loops que permite mostrar vídeos e imágenes de forma fluida.\n\nAdemás, desarrollamos campos personalizados con ACF para gestionar proyectos, localizaciones, equipo y más, facilitando la autonomía del cliente en la edición de contenidos. También integramos un buscador avanzado que permite filtrar los trabajos por múltiples criterios, mejorando la experiencia de navegación y consulta.'
  },
  {
    id: 2,
    title: 'Nova Fintech',
    subtitle: 'Web corporativa para un referente del diseño financiero',
    description: 'Rediseño de identidad visual y portal corporativo.',
    category: 'Web Corporativa',
    img: 'https://picsum.photos/seed/fintech-corp/800/2400',
    clientDescription: 'Nova Fintech representa una de las firmas más reconocidas del panorama financiero nacional e internacional. Con una trayectoria sólida y una filosofía marcada por la innovación, la seguridad y el diseño atemporal, su nueva web debía reflejar todos estos valores con coherencia visual y conceptual. Desde Icono Studio desarrollamos una web hecha completamente a medida, donde el diseño actúa como extensión natural de su obra.',
    challenge: 'Un estudio con identidad propia que merecía una web única. Nova Fintech lidera un equipo multidisciplinar donde finanzas y diseño dialogan en perfecta sintonía.\n\nNuestro reto fue diseñar una web desde cero que hiciera justicia a la profundidad conceptual y visual del trabajo de Nova Fintech.\n\nCreamos una web que no solo transmite elegancia y claridad, sino que estructura los contenidos de manera intuitiva, permitiendo al visitante ver todo el contenido de forma clara.',
    objectives: [
      'Diseñar una web totalmente personalizada, que sirviera tanto como archivo visual de su trabajo como herramienta de comunicación.',
      'Transmitir la esencia del estudio: una identidad sólida, elegante y coherente con su manera de entender las finanzas y el diseño.',
      'Trabajar cuidadosamente la experiencia en dispositivos móviles, el SEO y la optimización del rendimiento para proyectar la excelencia del estudio también en el ámbito digital.'
    ],
    concept: 'Cada rincón del nuevo sitio está concebido como una prolongación del lenguaje del estudio: limpio, estructurado y con una fuerte carga emocional. El desarrollo nos permitió trabajar cada interacción como si se tratase de una estancia más dentro de su obra: funcional, serena y profundamente estética.',
    philosophy: 'La nueva web de Nova Fintech es más que un escaparate de proyectos: es una experiencia que transmite los mismos valores que sus obras físicas.\n\nLa armonía, la atemporalidad, la atmósfera y la precisión en cada detalle se ven reflejados también en el diseño de la página web.\n\nCada sección, cada imagen, cada tipografía ha sido elegida para construir un entorno web que, al igual que sus espacios, invita al sosiego y a la contemplación.',
    technicalDetails: 'Para el Estudio de Nova Fintech desarrollamos una web totalmente a medida, cuidando cada detalle para reflejar su identidad visual y la calidad de sus proyectos.\n\nCreamos un diseño personalizado, con estructuras dinámicas y un sistema de loops que permite mostrar vídeos e imágenes de forma fluida.\n\nAdemás, desarrollamos campos personalizados con ACF para gestionar proyectos, localizaciones, equipo y más, facilitando la autonomía del cliente en la edición de contenidos. También integramos un buscador avanzado que permite filtrar los trabajos por múltiples criterios, mejorando la experiencia de navegación y consulta.'
  },
  {
    id: 3,
    title: 'Aura Studio',
    subtitle: 'Estudio de arquitectura y diseño referente a nivel internacional',
    description: 'Estrategia integral SEO y CRO.',
    category: 'SEO & CRO',
    img: 'https://picsum.photos/seed/seo-cro/800/2400',
    clientDescription: 'Aura Studio representa una de las firmas más reconocidas del panorama arquitectónico nacional e internacional. Con una trayectoria sólida y una filosofía marcada por la armonía, la serenidad y el diseño atemporal, su nueva web debía reflejar todos estos valores con coherencia visual y conceptual. Desde Icono Studio desarrollamos una web hecha completamente a medida, donde el diseño actúa como extensión natural de su obra arquitectónica.',
    challenge: 'Un estudio con identidad propia que merecía una web única. Aura Studio lidera un equipo multidisciplinar donde arquitectura y diseño dialogan en perfecta sintonía.\n\nNuestro reto fue diseñar una web desde cero que hiciera justicia a la profundidad conceptual y visual del trabajo de Aura Studio.\n\nCreamos una web que no solo transmite elegancia y claridad, sino que estructura los contenidos de manera intuitiva, permitiendo al visitante ver todo el contenido de forma clara.',
    objectives: [
      'Diseñar una web totalmente personalizada, que sirviera tanto como archivo visual de su trabajo como herramienta de comunicación.',
      'Transmitir la esencia del estudio: una identidad sólida, elegante y coherente con su manera de entender la arquitectura y el diseño.',
      'Trabajar cuidadosamente la experiencia en dispositivos móviles, el SEO y la optimización del rendimiento para proyectar la excelencia del estudio también en el ámbito digital.'
    ],
    concept: 'Cada rincón del nuevo sitio está concebido como una prolongación del lenguaje del estudio: limpio, estructurado y con una fuerte carga emocional. El desarrollo nos permitió trabajar cada interacción como si se tratase de una estancia más dentro de su obra: funcional, serena y profundamente estética.',
    philosophy: 'La nueva web de Aura Studio es más que un escaparate de proyectos: es una experiencia que transmite los mismos valores que sus obras físicas.\n\nLa armonía, la atemporalidad, la atmósfera y la precisión en cada detalle se ven reflejados también en el diseño de la página web.\n\nCada sección, cada imagen, cada tipografía ha sido elegida para construir un entorno web que, al igual que sus espacios, invita al sosiego y a la contemplación.',
    technicalDetails: 'Para el Estudio de Aura Studio desarrollamos una web totalmente a medida, cuidando cada detalle para reflejar su identidad visual y la calidad de sus proyectos.\n\nCreamos un diseño personalizado, con estructuras dinámicas y un sistema de loops que permite mostrar vídeos e imágenes de forma fluida.\n\nAdemás, desarrollamos campos personalizados con ACF para gestionar proyectos, localizaciones, equipo y más, facilitando la autonomía del cliente en la edición de contenidos. También integramos un buscador avanzado que permite filtrar los trabajos por múltiples criterios, mejorando la experiencia de navegación y consulta.'
  },
  {
    id: 4,
    title: 'Zenith',
    subtitle: 'Web corporativa para un referente del diseño',
    description: 'App web progresiva (PWA) a medida.',
    category: 'Desarrollo a medida',
    img: 'https://picsum.photos/seed/pwa-app/800/2400',
    clientDescription: 'Zenith representa una de las firmas más reconocidas del panorama tecnológico nacional e internacional. Con una trayectoria sólida y una filosofía marcada por la armonía, la serenidad y el diseño atemporal, su nueva web debía reflejar todos estos valores con coherencia visual y conceptual. Desde Icono Studio desarrollamos una web hecha completamente a medida, donde el diseño actúa como extensión natural de su obra arquitectónica.',
    challenge: 'Un estudio con identidad propia que merecía una web única. Zenith lidera un equipo multidisciplinar donde tecnología y diseño dialogan en perfecta sintonía.\n\nNuestro reto fue diseñar una web desde cero que hiciera justicia a la profundidad conceptual y visual del trabajo de Zenith.\n\nCreamos una web que no solo transmite elegancia y claridad, sino que estructura los contenidos de manera intuitiva, permitiendo al visitante ver todo el contenido de forma clara.',
    objectives: [
      'Diseñar una web totalmente personalizada, que sirviera tanto como archivo visual de su trabajo como herramienta de comunicación.',
      'Transmitir la esencia del estudio: una identidad sólida, elegante y coherente con su manera de entender la tecnología y el diseño.',
      'Trabajar cuidadosamente la experiencia en dispositivos móviles, el SEO y la optimización del rendimiento para proyectar la excelencia del estudio también en el ámbito digital.'
    ],
    concept: 'Cada rincón del nuevo sitio está concebido como una prolongación del lenguaje del estudio: limpio, estructurado y con una fuerte carga emocional. El desarrollo nos permitió trabajar cada interacción como si se tratase de una estancia más dentro de su obra: funcional, serena y profundamente estética.',
    philosophy: 'La nueva web de Zenith es más que un escaparate de proyectos: es una experiencia que transmite los mismos valores que sus obras físicas.\n\nLa armonía, la atemporalidad, la atmósfera y la precisión en cada detalle se ven reflejados también en el diseño de la página web.\n\nCada sección, cada imagen, cada tipografía ha sido elegida para construir un entorno web que, al igual que sus espacios, invita al sosiego y a la contemplación.',
    technicalDetails: 'Para el Estudio de Zenith desarrollamos una web totalmente a medida, cuidando cada detalle para reflejar su identidad visual y la calidad de sus proyectos.\n\nCreamos un diseño personalizado, con estructuras dinámicas y un sistema de loops que permite mostrar vídeos e imágenes de forma fluida.\n\nAdemás, desarrollamos campos personalizados con ACF para gestionar proyectos, localizaciones, equipo y más, facilitando la autonomía del cliente en la edición de contenidos. También integramos un buscador avanzado que permite filtrar los trabajos por múltiples criterios, mejorando la experiencia de navegación y consulta.'
  },
  {
    id: 5,
    title: 'Maison',
    subtitle: 'Estudio de arquitectura y diseño referente a nivel internacional',
    description: 'Tienda online de alto rendimiento headless.',
    category: 'E-commerce',
    img: 'https://picsum.photos/seed/headless-shop/800/2400',
    clientDescription: 'Maison representa una de las firmas más reconocidas del panorama arquitectónico nacional e internacional. Con una trayectoria sólida y una filosofía marcada por la armonía, la serenidad y el diseño atemporal, su nueva web debía reflejar todos estos valores con coherencia visual y conceptual. Desde Icono Studio desarrollamos una web hecha completamente a medida, donde el diseño actúa como extensión natural de su obra arquitectónica.',
    challenge: 'Un estudio con identidad propia que merecía una web única. Maison lidera un equipo multidisciplinar donde arquitectura y diseño dialogan en perfecta sintonía.\n\nNuestro reto fue diseñar una web desde cero que hiciera justicia a la profundidad conceptual y visual del trabajo de Maison.\n\nCreamos una web que no solo transmite elegancia y claridad, sino que estructura los contenidos de manera intuitiva, permitiendo al visitante ver todo el contenido de forma clara.',
    objectives: [
      'Diseñar una web totalmente personalizada, que sirviera tanto como archivo visual de su trabajo como herramienta de comunicación.',
      'Transmitir la esencia del estudio: una identidad sólida, elegante y coherente con su manera de entender la arquitectura y el diseño.',
      'Trabajar cuidadosamente la experiencia en dispositivos móviles, el SEO y la optimización del rendimiento para proyectar la excelencia del estudio también en el ámbito digital.'
    ],
    concept: 'Cada rincón del nuevo sitio está concebido como una prolongación del lenguaje del estudio: limpio, estructurado y con una fuerte carga emocional. El desarrollo nos permitió trabajar cada interacción como si se tratase de una estancia más dentro de su obra: funcional, serena y profundamente estética.',
    philosophy: 'La nueva web de Maison es más que un escaparate de proyectos: es una experiencia que transmite los mismos valores que sus obras físicas.\n\nLa armonía, la atemporalidad, la atmósfera y la precisión en cada detalle se ven reflejados también en el diseño de la página web.\n\nCada sección, cada imagen, cada tipografía ha sido elegida para construir un entorno web que, al igual que sus espacios, invita al sosiego y a la contemplación.',
    technicalDetails: 'Para el Estudio de Maison desarrollamos una web totalmente a medida, cuidando cada detalle para reflejar su identidad visual y la calidad de sus proyectos.\n\nCreamos un diseño personalizado, con estructuras dinámicas y un sistema de loops que permite mostrar vídeos e imágenes de forma fluida.\n\nAdemás, desarrollamos campos personalizados con ACF para gestionar proyectos, localizaciones, equipo y más, facilitando la autonomía del cliente en la edición de contenidos. También integramos un buscador avanzado que permite filtrar los trabajos por múltiples criterios, mejorando la experiencia de navegación y consulta.'
  },
  {
    id: 6,
    title: 'Vértice',
    subtitle: 'Web corporativa para un referente del diseño',
    description: 'Sistema de landing pages dinámicas.',
    category: 'Marketing Digital',
    img: 'https://picsum.photos/seed/landing-leads/800/2400',
    clientDescription: 'Vértice representa una de las firmas más reconocidas del panorama arquitectónico nacional e internacional. Con una trayectoria sólida y una filosofía marcada por la armonía, la serenidad y el diseño atemporal, su nueva web debía reflejar todos estos valores con coherencia visual y conceptual. Desde Icono Studio desarrollamos una web hecha completamente a medida, donde el diseño actúa como extensión natural de su obra arquitectónica.',
    challenge: 'Un estudio con identidad propia que merecía una web única. Vértice lidera un equipo multidisciplinar donde arquitectura y diseño dialogan en perfecta sintonía.\n\nNuestro reto fue diseñar una web desde cero que hiciera justicia a la profundidad conceptual y visual del trabajo de Vértice.\n\nCreamos una web que no solo transmite elegancia y claridad, sino que estructura los contenidos de manera intuitiva, permitiendo al visitante ver todo el contenido de forma clara.',
    objectives: [
      'Diseñar una web totalmente personalizada, que sirviera tanto como archivo visual de su trabajo como herramienta de comunicación.',
      'Transmitir la esencia del estudio: una identidad sólida, elegante y coherente con su manera de entender la arquitectura y el diseño.',
      'Trabajar cuidadosamente la experiencia en dispositivos móviles, el SEO y la optimización del rendimiento para proyectar la excelencia del estudio también en el ámbito digital.'
    ],
    concept: 'Cada rincón del nuevo sitio está concebido como una prolongación del lenguaje del estudio: limpio, estructurado y con una fuerte carga emocional. El desarrollo nos permitió trabajar cada interacción como si se tratase de una estancia más dentro de su obra: funcional, serena y profundamente estética.',
    philosophy: 'La nueva web de Vértice es más que un escaparate de proyectos: es una experiencia que transmite los mismos valores que sus obras físicas.\n\nLa armonía, la atemporalidad, la atmósfera y la precisión en cada detalle se ven reflejados también en el diseño de la página web.\n\nCada sección, cada imagen, cada tipografía ha sido elegida para construir un entorno web que, al igual que sus espacios, invita al sosiego y a la contemplación.',
    technicalDetails: 'Para el Estudio de Vértice desarrollamos una web totalmente a medida, cuidando cada detalle para reflejar su identidad visual y la calidad de sus proyectos.\n\nCreamos un diseño personalizado, con estructuras dinámicas y un sistema de loops que permite mostrar vídeos e imágenes de forma fluida.\n\nAdemás, desarrollamos campos personalizados con ACF para gestionar proyectos, localizaciones, equipo y más, facilitando la autonomía del cliente en la edición de contenidos. También integramos un buscador avanzado que permite filtrar los trabajos por múltiples criterios, mejorando la experiencia de navegación y consulta.'
  }
];
