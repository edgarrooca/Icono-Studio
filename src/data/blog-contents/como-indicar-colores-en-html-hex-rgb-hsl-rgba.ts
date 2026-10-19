export const content = `
      <p>Si estás diseñando o tocando código web, tarde o temprano aparece esta duda: <strong>¿cómo indicar colores en HTML?</strong></p>
      <p>Aunque solemos decir "en HTML", en realidad los colores se aplican sobre todo con CSS. Lo importante es entender los formatos más usados para elegir el correcto según cada caso.</p>

      <h2>Formatos principales de color en web</h2>
      <h3>1. HEX (hexadecimal)</h3>
      <p>Es el formato más conocido. Usa seis caracteres para representar rojo, verde y azul.</p>
      <pre><code>color: #1a73e8;
background-color: #f5f7fb;</code></pre>

      <h3>2. RGB</h3>
      <p>Define color con valores de 0 a 255 para cada canal.</p>
      <pre><code>color: rgb(26, 115, 232);</code></pre>

      <h3>3. RGBA</h3>
      <p>Igual que RGB, pero añade transparencia (alpha) de 0 a 1.</p>
      <pre><code>background-color: rgba(26, 115, 232, 0.15);</code></pre>

      <h3>4. HSL</h3>
      <p>Usa tono, saturación y luminosidad. Es muy práctico para crear variaciones de una misma paleta.</p>
      <pre><code>color: hsl(214, 82%, 51%);</code></pre>

      <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80" alt="Ejemplos de colores en HTML y CSS" class="w-full rounded-[2rem] my-12" />

      <h2>¿Qué formato de color conviene usar?</h2>
      <ul>
        <li><strong>HEX:</strong> simple y estándar para la mayoría de estilos.</li>
        <li><strong>RGB/RGBA:</strong> útil cuando necesitas transparencia.</li>
        <li><strong>HSL:</strong> excelente para sistemas de diseño y ajustes rápidos de tono/luz.</li>
      </ul>

      <h2>Buenas prácticas para elegir colores web</h2>
      <h3>1. Define una paleta base</h3>
      <p>Evita improvisar color por color. Trabaja con variables y una paleta limitada para mantener coherencia.</p>

      <h3>2. Cuida contraste y accesibilidad</h3>
      <p>Texto y fondo deben tener contraste suficiente para lectura cómoda, especialmente en móvil.</p>

      <h3>3. Usa variables CSS</h3>
      <pre><code>:root {
  --color-primary: #1a73e8;
  --color-text: #1f2937;
  --color-bg: #f9fafb;
}</code></pre>

      <h3>4. Piensa en marca y conversión</h3>
      <p>El color no es solo estética. También guía la atención y afecta al comportamiento del usuario en botones y llamadas a la acción.</p>

      <h2>Errores comunes al indicar colores en HTML/CSS</h2>
      <ul>
        <li>Usar demasiados colores sin jerarquía.</li>
        <li>No definir estados hover/active.</li>
        <li>Ignorar el modo móvil y la legibilidad.</li>
      </ul>

      <h2>Conclusión</h2>
      <p>Para trabajar colores web con criterio, no basta con saber un código HEX. Lo importante es combinar formato técnico, coherencia visual y accesibilidad.</p>
      <p><strong>¿Quieres una web con diseño profesional y paleta bien trabajada?</strong> En Icono Studio cuidamos cada detalle visual para que tu marca se vea mejor y convierta más. <a href="/#contacto">Cuéntanos tu idea</a>.</p>
    `;
