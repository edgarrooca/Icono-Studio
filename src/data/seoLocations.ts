export interface SeoLocation {
  slug: string;
  name: string;
  faqs: Array<{ q: string; a: string }>;
  surroundingTowns: string[];
}

const baseFaqs = [
  { q: '¿Cuánto cuesta una página web?', a: 'Depende del tipo de proyecto, pero una web básica empieza desde 350 € + IVA.' },
  { q: '¿Cuánto tardas en hacerla?', a: 'Una web sencilla suele estar lista en 1–3 semanas, dependiendo del contenido y revisiones.' },
  { q: '¿Tengo que tener textos y fotos?', a: 'No necesariamente. Podemos ayudarte con los textos base y usar imágenes de stock si no tienes material propio.' },
  { q: '¿La web será mía?', a: 'Sí. Te entregamos tu web publicada y organizada.' },
  { q: '¿Incluyes hosting o mantenimiento?', a: 'Sí, podemos encargarnos del hosting y soporte mensual si quieres despreocuparte.' }
];

export const seoLocations: SeoLocation[] = [
  {
    slug: 'valencia',
    name: 'Valencia',
    faqs: [
      ...baseFaqs,
      { q: '¿Ofrecéis servicio en Valencia?', a: 'Sí, trabajamos de forma 100% online con clientes de Valencia y toda la provincia.' }
    ],
    surroundingTowns: ["Torrent", "Paterna", "Gandía", "Sagunto", "Alzira", "Mislata", "Burjassot", "Ontinyent", "Aldaia"]
  },
  {
    slug: 'madrid',
    name: 'Madrid',
    faqs: [
      ...baseFaqs,
      { q: '¿Ofrecéis servicio en Madrid?', a: 'Sí, gestionamos proyectos online con empresas de todo Madrid y alrededores.' }
    ],
    surroundingTowns: ["Móstoles", "Alcalá de Henares", "Fuenlabrada", "Leganés", "Getafe", "Alcorcón", "Torrejón de Ardoz", "Parla", "Alcobendas"]
  },
  {
    slug: 'barcelona',
    name: 'Barcelona',
    faqs: [
      ...baseFaqs,
      { q: '¿Ofrecéis servicio en Barcelona?', a: 'Sí, realizamos diseño web de forma remota para clientes de toda la provincia de Barcelona.' }
    ],
    surroundingTowns: ["L'Hospitalet de Llobregat", "Terrassa", "Badalona", "Sabadell", "Mataró", "Santa Coloma de Gramenet", "Cornellà de Llobregat", "Sant Boi de Llobregat"]
  },
  {
    slug: 'alicante',
    name: 'Alicante',
    faqs: [
      ...baseFaqs,
      { q: '¿Ofrecéis servicio en Alicante?', a: 'Sí, colaboramos de manera digital con negocios de Alicante y toda la Costa Blanca.' }
    ],
    surroundingTowns: ["Elche", "Torrevieja", "Orihuela", "Benidorm", "Alcoy", "San Vicente del Raspeig", "Elda", "Dénia", "Villena"]
  },
  {
    slug: 'sevilla',
    name: 'Sevilla',
    faqs: [
      ...baseFaqs,
      { q: '¿Ofrecéis servicio en Sevilla?', a: 'Sí, nuestro servicio online nos permite crear páginas web para toda la provincia de Sevilla.' }
    ],
    surroundingTowns: ["Dos Hermanas", "Alcalá de Guadaíra", "Utrera", "Mairena del Aljarafe", "Écija", "La Rinconada", "Los Palacios y Villafranca", "Coria del Río"]
  },
  {
    slug: 'malaga',
    name: 'Málaga',
    faqs: [
      ...baseFaqs,
      { q: '¿Ofrecéis servicio en Málaga?', a: 'Sí, trabajamos fluidamente de forma remota con empresas de Málaga y toda la Costa del Sol.' }
    ],
    surroundingTowns: ["Marbella", "Mijas", "Fuengirola", "Vélez-Málaga", "Estepona", "Torremolinos", "Benalmádena", "Rincón de la Victoria", "Antequera"]
  },
  {
    slug: 'zaragoza',
    name: 'Zaragoza',
    faqs: [
      ...baseFaqs,
      { q: '¿Ofrecéis servicio en Zaragoza?', a: 'Sí, ayudamos a negocios de Zaragoza y resto de Aragón a mejorar su presencia digital.' }
    ],
    surroundingTowns: ["Calatayud", "Utebo", "Ejea de los Caballeros", "Tarazona", "Caspe", "La Almunia de Doña Godina", "Tauste", "Cuarte de Huerva"]
  },
  {
    slug: 'murcia',
    name: 'Murcia',
    faqs: [
      ...baseFaqs,
      { q: '¿Ofrecéis servicio en Murcia?', a: 'Sí, diseñamos páginas web optimizadas para empresas de toda la Región de Murcia.' }
    ],
    surroundingTowns: ["Cartagena", "Lorca", "Molina de Segura", "Alcantarilla", "Mazarrón", "Cieza", "Águilas", "Yecla", "Torre-Pacheco"]
  },
  {
    slug: 'palma',
    name: 'Palma',
    faqs: [
      ...baseFaqs,
      { q: '¿Ofrecéis servicio en Palma?', a: 'Sí, operamos 100% online, lo que nos permite dar un servicio rápido y directo a clientes de toda Mallorca.' }
    ],
    surroundingTowns: ["Calvià", "Manacor", "Inca", "Marratxí", "Llucmajor", "Felanitx", "Alcúdia", "Pollença", "Sóller"]
  },
  {
    slug: 'bilbao',
    name: 'Bilbao',
    faqs: [
      ...baseFaqs,
      { q: '¿Ofrecéis servicio en Bilbao?', a: 'Sí, trabajamos a distancia con empresas de Bilbao y el resto de Bizkaia.' }
    ],
    surroundingTowns: ["Barakaldo", "Getxo", "Portugalete", "Santurtzi", "Basauri", "Leioa", "Galdakao", "Sestao", "Erandio"]
  }
];
