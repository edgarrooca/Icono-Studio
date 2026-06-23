import type { BlogPost } from '../types/blog';

export const blogBatch20260623: BlogPost[] = [
  {
    title: 'Gemini ya corrige errores de fórmulas en Google Sheets: cómo aprovecharlo en una pyme sin saber Excel avanzado',
    subtitle: 'Google lanzó el 22 de junio de 2026 una función para diagnosticar y corregir errores de fórmulas en un clic dentro de Sheets. Para una pyme, eso puede ahorrar más tiempo del que parece.',
    slug: 'gemini-sheets-corregir-formulas-2026-pymes',
    date: '23 Jun 2026',
    author: 'Icono Studio',
    tag: 'Productividad & IA',
    image: '/blog/gemini-sheets-formulas-2026-pymes.webp',
    metaTitle: 'Gemini corrige fórmulas en Sheets: guía para pymes | Icono Studio',
    metaDescription: 'Cómo usar la nueva función de Gemini para corregir errores de fórmulas en Google Sheets y aplicarla a presupuestos, seguimiento y operativa diaria de una pyme.',
    keywords: ['gemini sheets formulas 2026', 'corregir formulas google sheets con ia', 'google sheets pyme 2026', 'gemini sheets pymes', 'errores formulas sheets'],
    content: `
      <p>El <strong>22 de junio de 2026</strong>, Google anunció una mejora muy concreta dentro de Workspace: <strong>Gemini en Google Sheets ya puede diagnosticar y corregir errores de fórmulas en un clic</strong>. La propia actualización explica que la herramienta revisa la estructura de datos alrededor de la celda, te dice cuál es el problema principal y propone una versión corregida. Además, Google ha dejado <strong>límites promocionales más altos hasta el 15 de julio de 2026</strong> para que los clientes de Workspace puedan probarla con más margen.</p>
      <p>Dicho así puede sonar a detalle técnico. Para una pyme no lo es tanto. Muchas pequeñas empresas siguen usando Sheets para presupuestos, seguimiento comercial, planificación, listados de cobros o tareas internas. Y ahí hay un problema clásico: <strong>la hoja vive, pero solo una o dos personas se atreven a tocar las fórmulas</strong>. Cuando algo falla, nadie sabe por qué, nadie quiere romperla más y el proceso entero se vuelve frágil.</p>

      <h2>Qué cambia de verdad con esta función</h2>
      <p>Hasta ahora, si una fórmula devolvía error, el camino habitual era buscar en foros, probar versiones a ciegas o esperar a que alguien “que sabe de hojas” lo arreglara. La novedad de Gemini no convierte a todo el equipo en analista, pero sí reduce mucho la fricción entre <strong>detectar un fallo y entenderlo</strong>.</p>
      <p>Eso importa especialmente en negocios pequeños porque la mayoría no necesita modelados complejos. Necesita cosas bastante más terrenales:</p>
      <ul>
        <li>Que un presupuesto no deje de sumar por una referencia rota.</li>
        <li>Que un seguimiento de leads no mezcle estados por una fórmula mal copiada.</li>
        <li>Que un resumen mensual no se caiga porque alguien movió una columna.</li>
        <li>Que una persona no técnica pueda mantener la hoja sin miedo.</li>
      </ul>

      <h2>Dónde suele ahorrar más tiempo</h2>
      <h3>1. Presupuestos y márgenes</h3>
      <p>En muchas pymes el cálculo de presupuestos sigue pasando por hojas con descuentos, extras, fases o impuestos. Si una fórmula empieza a fallar, el impacto no es solo operativo: afecta a precio, margen y confianza. Poder pedir una explicación y una corrección rápida evita revisar todo el documento desde cero.</p>

      <h3>2. Seguimiento comercial</h3>
      <p>Si aún no trabajas con CRM o solo usas uno para parte del proceso, Sheets suele asumir la capa intermedia: quién pidió presupuesto, cuándo se respondió, en qué estado está la oportunidad o cuál es la siguiente acción. Una fórmula rota en esa hoja puede ocultar leads o crear sensación de orden donde ya no lo hay.</p>
      <p>Esto enlaza bastante con <a href="/blog/crm-pymes-servicios-2026-no-perder-leads-web">lo que ya contamos sobre no perder leads por falta de sistema</a>. La hoja puede seguir siendo útil, pero tiene que ser mantenible.</p>

      <h3>3. Cuadros de mando simples</h3>
      <p>No hace falta tener un dashboard sofisticado para que una hoja te ayude a decidir. Comparar semanas, resumir fuentes de contacto o agrupar servicios puede bastar. El problema aparece cuando las fórmulas que sostienen ese resumen dejan de ser entendibles para el resto del equipo.</p>

      <h3>4. Equipos donde la hoja no la montó quien hoy la usa</h3>
      <p>Este es uno de los escenarios más comunes. La hoja original la creó alguien hace meses, ese alguien ya no la toca, y ahora otros deben mantenerla. La nueva ayuda de Gemini es especialmente útil ahí, porque <strong>devuelve contexto</strong>: no solo arregla, también explica.</p>

      <h2>Qué tipo de errores conviene revisar con Gemini primero</h2>
      <p>La función tiene más valor cuando el error está dentro de una hoja útil y recurrente, no en una prueba aislada. Empieza por archivos que el equipo abra cada semana:</p>
      <ul>
        <li>Hojas de seguimiento de presupuestos.</li>
        <li>Listados de cobro o facturación interna.</li>
        <li>Planificaciones con fechas y estados.</li>
        <li>Informes mensuales que alguien exporta para revisar negocio.</li>
      </ul>
      <p>Si la hoja es importante y el fallo afecta a decisiones reales, merece la pena aprovechar esta novedad antes de que el archivo quede “congelado” por miedo a tocarlo.</p>

      <h2>Cómo usarlo sin crear más dependencia</h2>
      <p>Hay un matiz importante. La mejora no debería empujar a crear hojas cada vez más opacas solo porque “luego Gemini las arregla”. La forma sensata de usarla es la contraria:</p>
      <ul>
        <li>Resolver errores más rápido.</li>
        <li>Entender por qué estaban ocurriendo.</li>
        <li>Simplificar después la hoja para que dependa menos de fórmulas enrevesadas.</li>
      </ul>
      <p>Si una pyme usa esta función para mantener un caos creciente, la ganancia será corta. Si la usa para <strong>ordenar y documentar mejor</strong>, entonces sí compensa.</p>

      <h2>Una forma práctica de implantarlo esta semana</h2>
      <p>El enfoque más útil no es “vamos a meter IA en todas las hojas”. Es este:</p>
      <ol>
        <li>Haz una lista de las 3 hojas que más se usan.</li>
        <li>Marca cuáles suelen dar errores o dudas.</li>
        <li>Prueba Gemini solo en esas.</li>
        <li>Documenta qué fallos se repiten y simplifica estructura donde haga falta.</li>
      </ol>
      <p>Si además trabajas ya con la nueva capacidad de crear y editar hojas en español, esta mejora encaja muy bien con <a href="/blog/gemini-sheets-espanol-2026-presupuestos-seguimiento">nuestra guía sobre Gemini en Sheets para presupuestos y seguimiento</a>.</p>

      <h2>Cuándo no basta con esto</h2>
      <p>Si varias personas actualizan la misma hoja, si necesitas trazabilidad fuerte o si el seguimiento comercial depende de demasiadas pestañas, quizá el problema ya no sea una fórmula. Quizá el problema es que la operación pide otra herramienta o una estructura más estable entre <strong>web, captación y seguimiento</strong>.</p>
      <p>Gemini te ayuda a mantener mejor una hoja. No sustituye una decisión de sistema.</p>

      <h2>Conclusión</h2>
      <p>La nueva función de Gemini en Sheets interesa porque ataca una fricción real de las pymes: <strong>errores pequeños que bloquean procesos grandes</strong>. No hace falta dominar Excel avanzado para sacarle partido. Hace falta identificar qué hojas sostienen trabajo importante y usar la mejora para recuperar claridad, no para esconder más complejidad.</p>
      <p><strong>¿Quieres ordenar mejor la parte comercial y operativa que hoy vive entre formularios, emails y hojas?</strong> En Icono Studio podemos ayudarte a conectar web, seguimiento y automatización con una estructura más sólida. <a href="/contacto">Cuéntanos tu caso</a>.</p>
    `,
    faqs: [
      {
        question: '¿Qué hace exactamente Gemini con un error de fórmula?',
        answer: 'Google explica que analiza la estructura de datos alrededor de la celda, identifica la causa principal del error y propone una versión corregida de la fórmula.'
      },
      {
        question: '¿Esto sustituye a un CRM o a un sistema de gestión?',
        answer: 'No. Sirve para mantener mejor hojas importantes, pero si tu proceso comercial ya es complejo, seguramente necesitas una capa más estable que una hoja.'
      },
      {
        question: '¿Qué debería probar primero una pyme?',
        answer: 'Empieza por hojas críticas y recurrentes, como seguimiento de presupuestos, cobros o tareas semanales, donde un error afecte a decisiones reales.'
      }
    ]
  },
  {
    title: 'Ask Gemini en Drive ya usa Gmail como fuente: una forma práctica de unir correos, archivos y contexto en una pyme',
    subtitle: 'Google activó el 3 de junio de 2026 la posibilidad de usar hilos de Gmail como fuente dentro de Ask Gemini en Drive. Bien aplicada, puede ahorrar mucho tiempo en búsquedas y seguimiento.',
    slug: 'ask-gemini-drive-gmail-2026-pymes',
    date: '23 Jun 2026',
    author: 'Icono Studio',
    tag: 'Herramientas & IA',
    image: '/blog/ask-gemini-drive-gmail-2026-pymes.webp',
    metaTitle: 'Ask Gemini en Drive con Gmail: guía para pymes | Icono Studio',
    metaDescription: 'Cómo aprovechar que Ask Gemini en Drive ya puede usar hilos de Gmail como fuente para ordenar propuestas, aprobaciones y contexto comercial en una pyme.',
    keywords: ['ask gemini drive gmail 2026', 'gemini drive gmail source', 'google drive gemini pymes', 'contexto gmail drive ia', 'workspace gemini pyme'],
    content: `
      <p>Google activó el <strong>3 de junio de 2026</strong> una mejora bastante útil en Workspace: <strong>Ask Gemini en Drive ya puede usar hilos de Gmail como fuente</strong>, además de archivos y carpetas. La idea oficial es sencilla: que las respuestas se apoyen en una vista más completa del contexto del negocio, mezclando <strong>emails, documentos y carpetas</strong> dentro de una misma consulta.</p>
      <p>Para una pyme esto tiene más recorrido del que parece. Uno de los problemas más comunes en negocios pequeños no es la falta de información. Es justo lo contrario: <strong>la información está partida entre correos, propuestas, PDFs, presupuestos, comentarios internos y versiones distintas del mismo archivo</strong>. Y cuando alguien necesita entender el estado real de un tema, acaba abriendo diez pestañas.</p>

      <h2>Qué resuelve realmente esta novedad</h2>
      <p>Hasta ahora podías preguntar a Gemini sobre archivos concretos de Drive. El salto importante es que ahora también puede mirar <strong>los correos donde se negoció, se aprobó o se matizó ese mismo trabajo</strong>. Eso cambia bastante el valor de la consulta, porque deja de ser solo “qué pone en el documento” para acercarse más a “qué contexto tiene este asunto”.</p>
      <p>En un negocio de servicios, eso puede ayudar en situaciones muy típicas:</p>
      <ul>
        <li>Recuperar el alcance real de una propuesta enviada hace semanas.</li>
        <li>Ver qué objeciones puso el cliente antes de aceptar.</li>
        <li>Entender qué versión del documento es la buena.</li>
        <li>Preparar un seguimiento sin releer todo el hilo.</li>
      </ul>

      <h2>Casos donde una pyme le puede sacar partido</h2>
      <h3>1. Propuestas y presupuestos</h3>
      <p>Muchas veces el PDF final no cuenta toda la historia. El cliente pidió cambios por correo, matizó prioridades, negoció fases o dejó claro qué parte era urgente. Si Ask Gemini puede apoyarse en el hilo y en el documento, la recuperación de contexto es mucho más rápida.</p>

      <h3>2. Onboarding y traspasos</h3>
      <p>Cuando una cuenta pasa de una persona a otra, parte del conocimiento suele perderse en la bandeja de entrada. La mejora de Drive puede recortar bastante ese tiempo muerto, porque permite resumir mejor qué se acordó y dónde están los materiales relevantes.</p>

      <h3>3. Seguimiento comercial</h3>
      <p>Si un lead pidió varias cosas, dudó del precio o preguntó por plazos, todo eso queda disperso entre correos y documentos. Tener una capa que junte ambas fuentes ayuda a responder mejor y a evitar ese clásico “déjame revisar el histórico y te digo”.</p>
      <p>Esto encaja muy bien con <a href="/blog/gemini-google-workspace-2026-tareas-pyme">nuestra guía sobre tareas reales que una pyme puede acelerar con Gemini en Workspace</a>.</p>

      <h3>4. Búsqueda interna sin depender de la memoria de una persona</h3>
      <p>En muchas empresas pequeñas hay alguien que “sabe dónde está todo”. Ese rol invisible funciona hasta que no está, cambia de foco o se satura. Esta mejora ayuda a repartir mejor el acceso al contexto, siempre que los permisos y la estructura estén bien planteados.</p>

      <h2>Qué conviene preparar antes de usarlo</h2>
      <p>La función no arregla un Drive caótico por arte de magia. Si quieres que aporte valor, conviene revisar tres cosas:</p>
      <h3>1. Carpetas mínimamente coherentes</h3>
      <p>Si cada cliente, propuesta o proyecto vive con nombres distintos y sin una lógica básica, Gemini tendrá más difícil recuperar contexto útil. No hace falta una taxonomía perfecta, pero sí un mínimo orden.</p>

      <h3>2. Correos con asuntos razonables</h3>
      <p>Los hilos ayudan más cuando el email no está lleno de reenvíos opacos, asuntos vacíos o conversaciones mezcladas. Parece menor, pero influye bastante.</p>

      <h3>3. Permisos claros</h3>
      <p>Google indica que la disponibilidad depende de planes elegibles y de tener activadas las funciones inteligentes necesarias. Además, en cualquier uso real conviene revisar bien qué personas deben poder consultar ese contexto y cuáles no.</p>

      <h2>Errores frecuentes al pensar en esta mejora</h2>
      <ul>
        <li>Creer que sustituye a un CRM o a una herramienta de seguimiento.</li>
        <li>Usarla sobre un Drive sin estructura mínima.</li>
        <li>Pensar que cualquier conversación en email es ya conocimiento reutilizable.</li>
        <li>No definir para qué equipo o proceso se va a usar primero.</li>
      </ul>
      <p>La clave está en elegir bien los casos. Si intentas aplicarlo a todo a la vez, el valor se diluye. Si lo aplicas a presupuestos, onboarding o seguimiento, suele verse antes.</p>

      <h2>Un flujo sensato para empezar</h2>
      <p>La mejor prueba inicial suele ser muy concreta:</p>
      <ol>
        <li>Escoge un cliente o proyecto reciente con bastante email y varios documentos.</li>
        <li>Pide a Gemini un resumen del hilo y de los archivos asociados.</li>
        <li>Comprueba si detecta alcance, bloqueos, fechas y siguientes pasos.</li>
        <li>Ajusta estructura o naming si la respuesta sale coja.</li>
      </ol>
      <p>Si eso funciona, ya tienes un punto de apoyo para extenderlo a más cuentas o procesos.</p>

      <h2>Cómo encaja con tu web y tu captación</h2>
      <p>Aunque esta mejora viva dentro de Workspace, también toca la parte comercial. Una pyme que tarda demasiado en recuperar contexto responde peor, persigue peor y transmite menos seguridad. Y eso afecta a leads que llegan desde la web, formularios o campañas.</p>
      <p>Por eso también conecta con <a href="/blog/herramientas-conectar-web-no-perder-leads-2026">la idea de no perder leads entre herramientas desconectadas</a>. No todo pasa por comprar un software nuevo. A veces pasa por usar mejor lo que ya tienes.</p>

      <h2>Conclusión</h2>
      <p>Que Ask Gemini en Drive ya use Gmail como fuente no es un simple extra de producto. Para una pyme puede convertirse en una forma bastante práctica de <strong>recuperar contexto sin saltar entre correo, carpetas y documentos</strong>. No sustituye el orden, pero sí puede acelerar mucho la búsqueda y el seguimiento cuando el trabajo ya vive dentro de Google Workspace.</p>
      <p><strong>¿Quieres ordenar mejor la capa entre tu web, tu seguimiento comercial y tus herramientas internas?</strong> En Icono Studio podemos ayudarte a simplificar ese sistema para que vender y atender dependa menos de memoria dispersa. <a href="/contacto">Hablemos</a>.</p>
    `,
    faqs: [
      {
        question: '¿Qué añade exactamente Gmail como fuente en Ask Gemini en Drive?',
        answer: 'Permite que las respuestas no se apoyen solo en archivos y carpetas de Drive, sino también en hilos de Gmail relacionados con ese contexto.'
      },
      {
        question: '¿Esto reemplaza un CRM?',
        answer: 'No. Puede ayudarte a recuperar contexto comercial más rápido, pero no sustituye un sistema pensado para seguimiento, estados, tareas y trazabilidad.'
      },
      {
        question: '¿Dónde suele notarse más en una pyme?',
        answer: 'Sobre todo en propuestas, aprobaciones, onboarding y seguimiento de clientes donde el contexto está repartido entre correos y documentos.'
      }
    ]
  },
  {
    title: 'Poda de contenido en 2026: cuándo borrar, unir o redirigir páginas para no arrastrar SEO ni confundir a la IA',
    subtitle: 'La conversación sobre AI Search está reabriendo una pregunta vieja pero muy útil: qué hacer con páginas viejas, duplicadas o demasiado flojas para seguir vivas en una web de negocio.',
    slug: 'content-pruning-seo-ia-2026-pymes',
    date: '23 Jun 2026',
    author: 'Icono Studio',
    tag: 'SEO & IA',
    image: '/blog/content-pruning-seo-ia-2026-pymes.webp',
    metaTitle: 'Poda de contenido para SEO e IA en 2026 | Icono Studio',
    metaDescription: 'Cómo decidir cuándo borrar, unir o redirigir contenido antiguo para mejorar claridad, SEO y visibilidad en IA sin cargarte páginas útiles.',
    keywords: ['content pruning seo ia 2026', 'podar contenido web pyme', 'borrar o redirigir posts antiguos', 'seo ai search contenido', 'limpieza contenido web negocio'],
    content: `
      <p>Una de las piezas que más se está moviendo en la conversación SEO de junio de 2026 es la <strong>poda de contenido</strong>. Search Engine Land publicó el <strong>18 de junio de 2026</strong> una guía específica sobre cuándo <strong>eliminar, redirigir o consolidar páginas</strong> pensando en AI Search. Y casi al mismo tiempo, la guía oficial de Google para optimizar webs hacia experiencias generativas volvió a insistir en lo esencial: <strong>estructura técnica clara</strong> y <strong>contenido único, valioso y poco “commodity”</strong>.</p>
      <p>Para una pyme esto importa bastante. Muchas webs acumulan artículos, páginas de servicio repetidas, landings antiguas, URLs de campañas ya muertas o textos que no dicen nada distinto. No siempre estorban por existir. Pero sí pueden acabar enviando señales flojas, duplicadas o confusas, tanto a Google como a sistemas que intentan resumir qué hace realmente tu negocio.</p>

      <h2>Qué no significa podar contenido</h2>
      <p>Podar contenido no es ponerse a borrar URLs por intuición ni hacer una limpieza agresiva porque “la IA prefiere menos páginas”. Ese enfoque es demasiado simplón. La pregunta útil no es cuántas páginas tienes, sino <strong>cuántas aportan algo distinto, útil y vigente</strong>.</p>
      <p>Google, de hecho, sigue apuntando a la misma dirección que ya marcaba antes: crear contenido <strong>útil, fiable y pensado para personas</strong>. Si una página sigue resolviendo una duda real, tiene tráfico cualificado, enlaza bien con negocio y aporta contexto propio, no deberías tocarla solo por moda.</p>

      <h2>Cuándo una página empieza a estorbar</h2>
      <h3>1. Cuando repite lo mismo que otra URL mejor</h3>
      <p>Esto pasa mucho en webs de servicios que han ido añadiendo posts parecidos sobre el mismo tema. Cambian un poco el título, meten un par de palabras nuevas y poco más. Resultado: varias URLs compiten por una idea demasiado similar y ninguna termina de destacar.</p>

      <h3>2. Cuando responde de forma genérica a una duda ya muy explotada</h3>
      <p>Google lo resume bien cuando habla de evitar contenido “commodity”: piezas que podrían haber salido de cualquier sitio y que añaden poco valor propio. Si tu artículo es una versión más de “7 consejos genéricos” sin ejemplos, experiencia o claridad comercial, cuesta que destaque.</p>
      <p>Esto se cruza bastante con <a href="/blog/contenido-original-experiencia-real-seo-ai-overviews-ai-mode-2026">lo que ya comentamos sobre contenido original y experiencia real</a>.</p>

      <h3>3. Cuando la información ya no es actual</h3>
      <p>Herramientas, productos, precios, flujos o recomendaciones cambian. Si una página antigua ya no representa cómo trabajas, cómo se mueve el sector o qué alternativas convienen, dejarla viva sin revisión puede hacer más daño que bien.</p>

      <h3>4. Cuando atrae impresiones pobres y no ayuda a negocio</h3>
      <p>No toda URL con pocas visitas merece morir. Pero si una página lleva tiempo sin tracción clara, no se enlaza desde ningún sitio relevante, no ayuda a explicar el negocio y además está canibalizando otra mejor, conviene revisarla.</p>

      <h2>Las tres salidas sensatas</h2>
      <h3>1. Mantener y mejorar</h3>
      <p>Si la pieza sigue siendo útil, la salida no es eliminarla. Es reforzarla: actualizar datos, mejorar estructura, aclarar intención, añadir ejemplos propios y enlazarla mejor hacia páginas de servicio o decisión.</p>

      <h3>2. Consolidar</h3>
      <p>Cuando tienes varias URLs pequeñas compitiendo sobre un mismo tema, muchas veces compensa más unirlas en una pieza mejor. Ahí la poda no empobrece la web: la vuelve más clara.</p>

      <h3>3. Redirigir o eliminar</h3>
      <p>Si la URL ya no tiene sentido, no responde a una búsqueda útil o ha quedado obsoleta sin valor de recuperación, puede merecer la pena redirigirla a una página más fuerte o retirarla del mapa.</p>

      <h2>Cómo decidir sin ir a ciegas</h2>
      <p>La forma práctica es bastante simple:</p>
      <ol>
        <li>Haz inventario de páginas o posts viejos.</li>
        <li>Revisa si siguen trayendo impresiones, clics o conversiones.</li>
        <li>Comprueba si la intención está mejor resuelta en otra URL.</li>
        <li>Decide: mejorar, unir o redirigir.</li>
      </ol>
      <p>Search Console sigue siendo muy útil para esto. Si necesitas esa parte, te ayudará revisar <a href="/blog/search-console-ai-mode-2026-medicion-visibilidad">nuestra guía sobre medición de visibilidad en AI Mode</a> y <a href="/blog/search-console-informes-ia-2026-negocio">cómo leer mejor los nuevos informes de IA</a>.</p>

      <h2>Qué errores conviene evitar</h2>
      <ul>
        <li>Borrar páginas con enlaces o señales útiles sin plan de redirección.</li>
        <li>Medir solo clics y olvidar si la URL ayuda a negocio o a confianza.</li>
        <li>Fusionar contenidos con intenciones distintas solo por reducir volumen.</li>
        <li>Conservar posts flojos “por si acaso” aunque ya no representen al negocio.</li>
      </ul>

      <h2>Por qué esto importa más con IA</h2>
      <p>La capa de IA no premia mágicamente tener menos páginas. Lo que sí penaliza en la práctica es la <strong>ambigüedad</strong>. Si una marca se explica mal, repite mensajes genéricos y reparte autoridad entre muchas piezas débiles, a un sistema le cuesta más entender qué hace, qué sabe y qué debería citar.</p>
      <p>Cuando una web está más limpia, más actualizada y mejor organizada, es más fácil que tanto Google como una persona encuentren <strong>la mejor URL para la mejor duda</strong>.</p>

      <h2>Una auditoría útil para esta semana</h2>
      <p>Escoge diez posts o páginas antiguas. Para cada una, responde solo tres preguntas:</p>
      <ul>
        <li>¿Sigue resolviendo una duda actual de mi cliente?</li>
        <li>¿Dice algo distinto o mejor que otra URL mía?</li>
        <li>¿Ayuda a llevar a una acción comercial o a reforzar confianza?</li>
      </ul>
      <p>Si responde “no” a dos o tres de ellas, ya tienes candidata a revisión.</p>

      <h2>Conclusión</h2>
      <p>La poda de contenido vuelve a estar sobre la mesa porque AI Search está premiando más la <strong>claridad real</strong> que la acumulación sin criterio. No se trata de adelgazar tu web por estética. Se trata de decidir qué páginas merecen seguir vivas, cuáles deben unirse y cuáles ya no ayudan ni a posicionar ni a explicar bien tu negocio.</p>
      <p><strong>¿Quieres revisar si tu blog o tus páginas de servicio están demasiado dispersos para 2026?</strong> En Icono Studio podemos ayudarte a limpiar estructura, reforzar URLs valiosas y conectar mejor contenido con captación real. <a href="/contacto">Escríbenos</a>.</p>
    `,
    faqs: [
      {
        question: '¿Podar contenido significa borrar artículos antiguos sin más?',
        answer: 'No. Puede significar mejorar, consolidar o redirigir. La decisión depende de si la URL sigue siendo útil, actual y distinta frente al resto.'
      },
      {
        question: '¿La IA prefiere webs con menos páginas?',
        answer: 'No hay una regla así. Lo que sí suele ayudar es una web con contenido más claro, menos duplicado y mejor alineado con dudas reales.'
      },
      {
        question: '¿Qué debería revisar primero una pyme?',
        answer: 'Posts y páginas antiguas que repitan tema, estén desactualizadas o no aporten ya ni tráfico cualificado ni contexto comercial.'
      }
    ]
  },
  {
    title: 'Auditoría express de Google Business Profile en 2026: reseñas recientes, categorías y fotos antes de tocar la web',
    subtitle: 'Antes de pensar en rediseños grandes, muchas pymes todavía tienen margen rápido en su ficha de Google. La clave no es rellenarla por rellenar, sino corregir lo que sí afecta a visibilidad y confianza.',
    slug: 'auditoria-google-business-profile-2026-pymes',
    date: '23 Jun 2026',
    author: 'Icono Studio',
    tag: 'SEO Local',
    image: '/blog/auditoria-google-business-profile-2026-pymes.webp',
    metaTitle: 'Auditoría Google Business Profile 2026 | Icono Studio',
    metaDescription: 'Checklist rápida para auditar Google Business Profile en 2026: reseñas recientes, categoría principal, fotos, servicios y coherencia con tu web.',
    keywords: ['auditoria google business profile 2026', 'checklist google business profile', 'reseñas google perfil empresa', 'categorias google business profile', 'seo local pyme 2026'],
    content: `
      <p>En local, una parte muy grande del problema sigue siendo básica: <strong>la ficha no está tan bien cuidada como el negocio cree</strong>. Y eso importa aún más en 2026, cuando Maps, AI Overviews y otras capas de recomendación necesitan datos claros para entender qué haces, en qué zona trabajas y por qué deberían mostrarte.</p>
      <p>Search Engine Land publicó el <strong>31 de marzo de 2026</strong> una auditoría útil sobre Google Business Profile que insiste en dos puntos muy prácticos: <strong>la recencia de las reseñas</strong> y la <strong>selección de categorías</strong> siguen marcando mucha diferencia. Por su parte, la ayuda oficial de Google recuerda algo que muchos perfiles todavía incumplen: elige una <strong>categoría principal específica</strong>, usa el <strong>menor número de categorías necesarias</strong> y añade fotos y vídeos que ayuden a completar y hacer más atractivo el perfil.</p>

      <h2>Por qué conviene revisar la ficha antes de tocar la web</h2>
      <p>Porque en muchos negocios locales la ficha ya es una mini landing: enseña servicios, reseñas, horario, teléfono, web, zonas y prueba visual. Si esa capa está coja, cualquier rediseño de la web aterriza sobre una base incompleta.</p>
      <p>No significa que la ficha sustituya a la web. Significa que mucha gente decide si hace clic, llama o compara antes de entrar. Y si Google no entiende bien la ficha, tampoco ayuda mucho a encontrarte.</p>

      <h2>Qué revisar primero en una auditoría express</h2>
      <h3>1. Reseñas: menos obsesión por el total y más atención a la recencia</h3>
      <p>Uno de los errores más comunes es presumir de tener muchas reseñas antiguas mientras el competidor recibe señales frescas cada mes. La auditoría de Search Engine Land subraya precisamente eso: importa mucho <strong>la velocidad y recencia de las reseñas</strong>, no solo el volumen histórico.</p>
      <p>La lectura útil para una pyme es sencilla: si llevas meses sin reseñas nuevas, ya tienes un frente claro. No para comprar reseñas ni forzarlas, sino para pedirlas mejor al cerrar trabajos reales y responder con más criterio.</p>

      <h3>2. Categoría principal y categorías secundarias</h3>
      <p>Google es bastante explícito en su ayuda: escoge una <strong>categoría principal específica que describa tu negocio</strong> y usa solo las categorías necesarias. Esto parece menor, pero afecta directamente a cómo Google interpreta el perfil.</p>
      <p>La revisión aquí no va de “poner más”. Va de comprobar si la categoría principal representa de verdad la actividad que más quieres mover. Y, muy importante, sin inventar ni rellenar el nombre comercial con palabras clave. Google también insiste en representar el negocio tal y como se reconoce en el mundo real.</p>

      <h3>3. Fotos y vídeos útiles</h3>
      <p>La documentación oficial de Google dice que fotos y vídeos ayudan a completar el perfil y hacerlo más atractivo. En la práctica, lo útil suele ser bastante concreto: exterior si hay local físico, interior si aporta confianza, trabajos reales, equipo y elementos que ayuden a reconocer el servicio.</p>
      <p>Mejor eso que una colección de imágenes genéricas o antiguas. Si alguien llega a tu ficha y las fotos no se parecen al negocio actual, la confianza cae rápido.</p>

      <h3>4. Servicios, horarios y datos de contacto</h3>
      <p>Esta parte debería ser obvia, pero falla muchísimo. Horarios desactualizados, servicios incompletos, URLs que apuntan a páginas poco útiles o teléfonos que no se atienden como toca. Antes de pensar en táctica avanzada, hay que asegurar esta base.</p>

      <h3>5. Coherencia con la web</h3>
      <p>La ficha y la web no pueden contar historias distintas. Si en Google dices una cosa y en la página de servicio dices otra, la confianza baja. Y no solo la de la persona. También la del sistema que intenta recomponer quién eres y qué ofreces.</p>
      <p>Ahí ayuda revisar <a href="/blog/google-business-profile-google-my-business-checklist-maps">nuestra checklist más amplia de Google Business Profile</a> y <a href="/blog/profile-strength-google-business-profile-2026">cómo usar Profile Strength con criterio</a>.</p>

      <h2>Qué no haría en una auditoría seria</h2>
      <ul>
        <li>No metería palabras clave extra en el nombre del negocio.</li>
        <li>No subiría fotos irrelevantes solo por llenar.</li>
        <li>No añadiría categorías porque “por si acaso”.</li>
        <li>No dejaría sin responder reseñas importantes durante semanas.</li>
      </ul>

      <h2>Cómo hacer una revisión en 30 minutos</h2>
      <ol>
        <li>Busca tu negocio y tres competidores en Maps.</li>
        <li>Mira cuántas reseñas nuevas ha recibido cada uno en el último mes o dos.</li>
        <li>Comprueba si tu categoría principal sigue siendo la mejor.</li>
        <li>Revisa si tus fotos representan bien el negocio actual.</li>
        <li>Abre la web desde la ficha y verifica si la página responde a la intención del clic.</li>
      </ol>
      <p>Con eso ya puedes detectar bastante más de lo que parece.</p>

      <h2>Qué relación tiene esto con AI Search</h2>
      <p>Cuanto más claro sea tu perfil, menos huecos dejas para que otros definan tu negocio por ti. En local, eso importa mucho porque las capas de IA trabajan a partir de señales como categorías, reseñas, consistencia y presencia web. Si tu ficha es ambigua, tu marca también lo será cuando un sistema intente recomendarla.</p>

      <h2>Conclusión</h2>
      <p>Antes de entrar en cambios grandes, una pyme debería hacerse una pregunta más simple: <strong>mi ficha de Google está realmente actualizada y pensada para convertir?</strong> Si la respuesta no es un sí claro, hay recorrido rápido en reseñas recientes, categoría principal, fotos, servicios y coherencia con la web.</p>
      <p><strong>¿Quieres revisar tu Google Business Profile y la página a la que manda para que trabajen juntas?</strong> En Icono Studio podemos ayudarte a ordenar esa capa local con más criterio y menos ruido. <a href="/contacto">Cuéntanos tu caso</a>.</p>
    `,
    faqs: [
      {
        question: '¿Qué pesa más, tener muchas reseñas o tener reseñas recientes?',
        answer: 'Las dos cosas importan, pero en 2026 la recencia y la constancia de nuevas reseñas están pesando mucho en la comparativa entre perfiles locales.'
      },
      {
        question: '¿Conviene añadir más categorías para salir en más búsquedas?',
        answer: 'No como regla. Google recomienda elegir una categoría principal específica y usar el menor número de categorías necesarias para describir el negocio.'
      },
      {
        question: '¿La ficha puede sustituir a mi web?',
        answer: 'No. La ficha ayuda a descubrirte y comparar, pero la web sigue siendo donde resuelves mejor servicio, precio, pruebas y siguiente paso.'
      }
    ]
  },
  {
    title: 'Anuncios para la era AI Search: cómo adaptar campañas y landings si Google responde más dentro del resultado',
    subtitle: 'Google está probando nuevos formatos publicitarios dentro de experiencias más conversacionales. Para muchos negocios, el cambio importante no es el formato: es la exigencia sobre la landing y el mensaje.',
    slug: 'anuncios-ai-search-landings-2026-negocios',
    date: '23 Jun 2026',
    author: 'Icono Studio',
    tag: 'Ads & Captación',
    image: '/blog/anuncios-ai-search-landings-2026.webp',
    metaTitle: 'Anuncios para AI Search y landings en 2026 | Icono Studio',
    metaDescription: 'Qué cambia con los nuevos anuncios para AI Search y cómo adaptar campañas y landing pages si Google resuelve más información antes del clic.',
    keywords: ['anuncios ai search 2026', 'ai overviews ads landings', 'google ads ai mode 2026', 'landing pages ai search', 'campanas google ads pymes 2026'],
    content: `
      <p>Google dejó claro en Google Marketing Live del <strong>20 de mayo de 2026</strong> que quiere llevar la publicidad a una búsqueda mucho más conversacional. Su anuncio habla de <strong>Conversational Discovery ads</strong>, <strong>Highlighted Answers</strong>, formatos de Shopping con explicaciones generadas por Gemini y un <strong>Business Agent for Leads</strong> dentro del propio anuncio. Paralelamente, la conversación en medios especializados ha girado hacia otra pregunta práctica: <strong>qué hace falta para que tus campañas y tus landings sigan funcionando cuando el buscador responde más antes del clic</strong>.</p>
      <p>Para una pyme de servicios esto no significa que mañana vaya a usar todos esos formatos. Algunos están pensados primero para retail o grandes anunciantes. Pero sí significa algo más transversal: <strong>el usuario llega más filtrado, más informado y con menos paciencia para aterrizar en una página genérica</strong>.</p>

      <h2>Qué está cambiando de fondo</h2>
      <p>Google explica que estos formatos quieren dar <strong>detalles relevantes y orientación útil</strong> dentro de experiencias más conversacionales. En AI Mode, por ejemplo, habla de anuncios capaces de responder mejor a preguntas específicas y de “Highlighted Answers” para aparecer dentro de listas de recomendaciones. También insiste en que para aprovecharlo conviene construir la base con <strong>AI Max, Performance Max y señales más completas</strong>.</p>
      <p>Traducido a negocio pequeño: el buscador está haciendo más trabajo de explicación previa. Por tanto, tu clic potencial ya no llega tan frío. Si haces Ads para servicios, eso cambia mucho la landing ideal.</p>

      <h2>Qué debería cambiar en una landing de servicios</h2>
      <h3>1. Menos hero genérico y más encaje inmediato</h3>
      <p>Si Google ya ha resumido parte de la decisión, la página de destino no puede arrancar con mensajes vagos tipo “soluciones a medida para tu negocio”. Necesita resolver rápido: qué servicio es, para quién encaja, qué problema resuelve y qué paso sigue.</p>

      <h3>2. Más claridad en precio, rango o criterio comercial</h3>
      <p>Las búsquedas más conversacionales suelen madurar antes la comparación. Si alguien entra desde ese contexto, esconder por completo precio, mínimos o condiciones genera más fricción. No siempre hace falta una tarifa cerrada, pero sí señales claras de encaje.</p>

      <h3>3. FAQs y objeciones dentro de la misma página</h3>
      <p>Si el buscador responde más arriba, el clic que llega suele venir con preguntas concretas. Una landing de servicios debería absorberlas sin obligar a abrir cinco páginas más. Ahí sigue siendo muy útil lo que ya explicamos sobre <a href="/blog/faq-rich-result-google-2026-faqs-web-negocio">FAQs bien planteadas</a> y <a href="/blog/micro-intents-paginas-servicio-estructura-convierte-2026">micro-intents en páginas de servicio</a>.</p>

      <h3>4. Siguiente paso mucho más visible</h3>
      <p>Si el tráfico llega más cualificado, el CTA tiene que estar más cerca de la decisión. Presupuesto, llamada, auditoría o reserva: lo que toque, pero sin esconderlo bajo una home ornamental.</p>

      <h2>Qué revisar en la cuenta publicitaria</h2>
      <h3>1. Señales y conversiones</h3>
      <p>Si Google va a interpretar más contexto y a empujar automatización, necesitas alimentar bien la medición. Si no, el sistema optimiza sobre datos pobres. Aquí sigue siendo clave revisar <a href="/blog/enhanced-conversions-leads-google-ads-2026">Enhanced Conversions for Leads</a> y que la web esté midiendo formularios, llamadas o acciones importantes de verdad.</p>

      <h3>2. Creatividades y activos más específicos</h3>
      <p>Google está orientando sus formatos a respuestas más útiles. Cuanto más genérico sea tu mensaje, peor compite en esa lógica. El copy debe dejar más claro tipo de servicio, caso de uso, diferenciador y siguiente paso.</p>

      <h3>3. Relación entre keyword, anuncio y página</h3>
      <p>Esta parte no es nueva, pero en AI Search se vuelve todavía más crítica. Si la intención que dispara el anuncio no aterriza en una página claramente alineada, el clic se desperdicia más rápido.</p>
      <p>Si estás trabajando Search con automatización, conviene repasar también <a href="/blog/ai-max-landing-pages-dinamicas-google-ads-2026">qué exige AI Max a las landing pages</a>.</p>

      <h2>Qué no conviene hacer</h2>
      <ul>
        <li>No mandar todo el tráfico a la home por comodidad.</li>
        <li>No confiar en automatización con medición débil.</li>
        <li>No pensar que el buscador “venderá por ti” si la landing sigue siendo vaga.</li>
        <li>No separar del todo Ads, SEO y contenido si el usuario investiga de forma más conversacional.</li>
      </ul>

      <h2>Por qué esto afecta también a negocios pequeños</h2>
      <p>A veces estos anuncios parecen una historia de grandes marcas, pero la consecuencia baja enseguida a la pyme: <strong>la calidad del clic se vuelve más dependiente del contexto previo</strong>. Y eso premia a quien tiene una página más concreta, un mensaje menos genérico y un sistema de seguimiento más limpio.</p>

      <h2>Una prueba sensata para este mes</h2>
      <p>Escoge una campaña importante y revisa solo esto:</p>
      <ol>
        <li>¿La landing deja claro en 5 segundos si el usuario encaja?</li>
        <li>¿Resuelve precio, proceso o dudas básicas sin obligar a salir?</li>
        <li>¿Mide bien el siguiente paso real?</li>
      </ol>
      <p>Si fallas en una o dos de esas, ahí hay trabajo antes incluso de tocar la puja.</p>

      <h2>Conclusión</h2>
      <p>La era AI Search no cambia solo dónde puede aparecer un anuncio. Cambia la exigencia sobre lo que pasa <strong>después del clic</strong>. Cuanto más trabajo haga Google antes de mandar tráfico, más claro, útil y accionable debe ser tu destino. Para una pyme, eso no pide magia. Pide mejores mensajes, mejores páginas y mejor medición.</p>
      <p><strong>¿Quieres revisar si tus campañas y tus landings están preparadas para este nuevo tipo de búsqueda?</strong> En Icono Studio podemos ayudarte a alinear captación, páginas y seguimiento para convertir mejor. <a href="/contacto">Hablemos</a>.</p>
    `,
    faqs: [
      {
        question: '¿Estos nuevos formatos de Google Ads aplican ya a cualquier pyme?',
        answer: 'No todos. Algunos están en pruebas o más orientados a retail, pero la tendencia sí afecta a cualquier negocio que dependa de búsquedas más conversacionales.'
      },
      {
        question: '¿Qué debería revisar primero una empresa de servicios?',
        answer: 'La landing page: claridad de encaje, objeciones resueltas, siguiente paso visible y medición correcta de la conversión.'
      },
      {
        question: '¿La automatización publicitaria compensa si la web es floja?',
        answer: 'No demasiado. Si la página no resuelve bien intención y conversión, la automatización puede traer clics, pero no arregla la fricción principal.'
      }
    ]
  },
];
