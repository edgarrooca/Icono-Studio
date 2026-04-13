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
    id: 5,
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
  }
];
