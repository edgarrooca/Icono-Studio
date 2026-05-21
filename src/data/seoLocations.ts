export interface SeoLocation {
  slug: string;
  name: string;
  faqs: Array<{ q: string; a: string }>;
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
      { q: '¿Trabajas solo en Valencia?', a: 'No. Estamos en Valencia, pero trabajamos con clientes de toda España.' }
    ]
  },
  {
    slug: 'madrid',
    name: 'Madrid',
    faqs: [
      ...baseFaqs,
      { q: '¿Trabajas solo en Madrid?', a: 'No. Trabajamos con clientes de Madrid y de toda España.' }
    ]
  },
  {
    slug: 'barcelona',
    name: 'Barcelona',
    faqs: [
      ...baseFaqs,
      { q: '¿Trabajas solo en Barcelona?', a: 'No. Trabajamos con clientes de Barcelona y de toda España.' }
    ]
  },
  {
    slug: 'alicante',
    name: 'Alicante',
    faqs: [
      ...baseFaqs,
      { q: '¿Trabajas solo en Alicante?', a: 'No. Trabajamos con clientes de Alicante y de toda España.' }
    ]
  },
  {
    slug: 'sevilla',
    name: 'Sevilla',
    faqs: [
      ...baseFaqs,
      { q: '¿Trabajas solo en Sevilla?', a: 'No. Trabajamos con clientes de Sevilla y de toda España.' }
    ]
  },
  {
    slug: 'malaga',
    name: 'Málaga',
    faqs: [
      ...baseFaqs,
      { q: '¿Trabajas solo en Málaga?', a: 'No. Trabajamos con clientes de Málaga y de toda España.' }
    ]
  },
  {
    slug: 'zaragoza',
    name: 'Zaragoza',
    faqs: [
      ...baseFaqs,
      { q: '¿Trabajas solo en Zaragoza?', a: 'No. Trabajamos con clientes de Zaragoza y de toda España.' }
    ]
  },
  {
    slug: 'murcia',
    name: 'Murcia',
    faqs: [
      ...baseFaqs,
      { q: '¿Trabajas solo en Murcia?', a: 'No. Trabajamos con clientes de Murcia y de toda España.' }
    ]
  },
  {
    slug: 'palma',
    name: 'Palma',
    faqs: [
      ...baseFaqs,
      { q: '¿Trabajas solo en Palma?', a: 'No. Trabajamos con clientes de Palma y de toda España.' }
    ]
  },
  {
    slug: 'bilbao',
    name: 'Bilbao',
    faqs: [
      ...baseFaqs,
      { q: '¿Trabajas solo en Bilbao?', a: 'No. Trabajamos con clientes de Bilbao y de toda España.' }
    ]
  }
];
