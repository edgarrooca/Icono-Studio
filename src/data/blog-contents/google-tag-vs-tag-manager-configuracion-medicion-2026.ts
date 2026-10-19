export const content = `
      <p>Si estás invirtiendo en anuncios, medir bien no es opcional. El problema es que mucha gente mezcla scripts, dispara eventos duplicados y termina tomando decisiones con datos rotos.</p>
      <p>La duda clásica es: <strong>¿me basta con Google Tag o necesito Google Tag Manager?</strong></p>

      <h2>Diferencia rápida y clara</h2>
      <ul>
        <li><strong>Google Tag (gtag.js):</strong> implementación directa en código. Es simple para casos muy básicos.</li>
        <li><strong>Google Tag Manager (GTM):</strong> capa de gestión de etiquetas y eventos sin tocar código cada vez.</li>
      </ul>
      <p>Si tu web solo mide una acción simple, gtag.js puede ser suficiente. Si gestionas GA4, Google Ads, Reddit Pixel, Meta o varios eventos de negocio, GTM suele ser la opción más escalable.</p>

      <h2>Stack recomendado para una pyme de servicios en 2026</h2>
      <h3>1. Base de analítica</h3>
      <ul>
        <li>GA4 para comportamiento y embudo.</li>
        <li>Google Ads para optimización de campañas.</li>
        <li>Eventos de negocio definidos (no solo pageviews).</li>
      </ul>

      <h3>2. Capa de etiquetado</h3>
      <ul>
        <li>GTM Web Container para centralizar eventos.</li>
        <li>Nomenclatura de eventos estable.</li>
        <li>Triggers claros por URL, clic y envío de formulario.</li>
      </ul>

      <h3>3. Publicidad y terceros</h3>
      <ul>
        <li>Google Ads conversion tag.</li>
        <li>Reddit Pixel (PageVisit + Lead si aplica).</li>
        <li>Deduplicación si combinas pixel y CAPI.</li>
      </ul>

      <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80" alt="Configuración de medición con Google Tag Manager y GA4" class="w-full rounded-[2rem] my-12" />

      <h2>Qué eventos sí debes medir en una web de captación</h2>
      <ul>
        <li><strong>generate_lead:</strong> envío de formulario principal.</li>
        <li><strong>click_whatsapp:</strong> clic en botón de WhatsApp.</li>
        <li><strong>click_phone:</strong> clic en teléfono desde móvil.</li>
        <li><strong>view_service_page:</strong> visita a páginas de servicio de alta intención.</li>
      </ul>
      <p>Con esto puedes ver no solo cuántas visitas llegan, sino qué canales traen usuarios con mayor intención real.</p>

      <h2>Consentimiento y cumplimiento: no lo dejes para después</h2>
      <p>Si tienes tráfico de la UE, Google exige pasar señales de consentimiento para casos aplicables de medición y personalización. Ignorarlo puede afectar a tus audiencias, tu modelado de conversiones y tu capacidad de optimizar campañas.</p>
      <p>No es asesoría legal, pero a nivel operativo la recomendación suele ser:</p>
      <ul>
        <li>Banner CMP bien implementado.</li>
        <li>Estados de consentimiento claros antes de disparar etiquetas sensibles.</li>
        <li>Verificación técnica con Tag Assistant y pruebas reales de formulario.</li>
      </ul>

      <h2>Errores frecuentes que rompen la atribución</h2>
      <ul>
        <li><strong>Etiquetas duplicadas:</strong> mismo evento disparado por código y por GTM.</li>
        <li><strong>Eventos sin contexto:</strong> se registra el lead pero no la fuente o landing.</li>
        <li><strong>Cambios sin QA:</strong> publicar sin validar en entorno real.</li>
        <li><strong>Nombres inconsistentes:</strong> dificulta reportes y optimización automática.</li>
      </ul>

      <h2>Conclusión</h2>
      <p>Para un negocio que hace captación constante, GTM suele ganar por control y escalabilidad. Lo importante no es solo "poner una etiqueta", sino diseñar una medición que te permita decidir mejor dónde invertir y qué canales te traen clientes reales.</p>
      <p><strong>¿Quieres que te dejemos la medición limpia y lista para crecer?</strong> En Icono Studio configuramos tracking de forma ordenada para que tus campañas se apoyen en datos fiables, no en intuiciones. <a href="/#contacto">Lo vemos contigo</a>.</p>
    `;
