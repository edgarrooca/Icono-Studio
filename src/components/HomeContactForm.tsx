import type { ChangeEvent, FormEvent } from 'react';
import { ChevronDown, Send } from 'lucide-react';
import { debugLeadFormButtonClick, debugLeadFormInvalid, debugLeadFormSubmitCapture } from '../lib/analytics';

type Values = { nombre: string; email: string; mensaje: string; negocio: string; whatsapp: string; necesidad: string; presupuesto: string };
type Props = {
  values: Values;
  busy: boolean;
  error: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function HomeContactForm({ values, busy, error, onChange, onSubmit }: Props) {
  return (
    <form
      className="home-lead-form"
      onSubmit={onSubmit}
      aria-busy={busy}
      onSubmitCapture={() => debugLeadFormSubmitCapture('contact_home_integrated')}
      onInvalidCapture={event => {
        const target = event.target as HTMLInputElement;
        debugLeadFormInvalid('contact_home_integrated', target.name, target.validationMessage);
      }}
    >
      <div className="home-lead-row">
        <div className="home-lead-field">
          <label htmlFor="home-name">¿Cómo te llamas?</label>
          <input id="home-name" name="nombre" autoComplete="name" required value={values.nombre} onChange={onChange} placeholder="Tu nombre" />
        </div>
        <div className="home-lead-field">
          <label htmlFor="home-email">Tu email</label>
          <input id="home-email" name="email" type="email" autoComplete="email" required value={values.email} onChange={onChange} placeholder="hola@tuempresa.com" />
        </div>
      </div>
      <div className="home-lead-field">
        <label htmlFor="home-message">Cuéntanos tu idea</label>
        <textarea id="home-message" name="mensaje" required rows={4} value={values.mensaje} onChange={onChange} placeholder="Qué hace tu negocio y qué te gustaría conseguir con tu web. No hace falta que sepas de tecnología." />
      </div>
      <details className="home-lead-details">
        <summary>Más detalles del proyecto <span>Opcional</span><ChevronDown size={17} aria-hidden="true" /></summary>
        <div className="home-lead-extras">
          <div className="home-lead-row">
            <div className="home-lead-field">
              <label htmlFor="home-business">Negocio o marca</label>
              <input id="home-business" name="negocio" autoComplete="organization" value={values.negocio} onChange={onChange} placeholder="Nombre de tu negocio" />
            </div>
            <div className="home-lead-field">
              <label htmlFor="home-phone">Teléfono o WhatsApp</label>
              <input id="home-phone" name="whatsapp" type="tel" autoComplete="tel" value={values.whatsapp} onChange={onChange} placeholder="Si prefieres que te llamemos" />
            </div>
          </div>
          <div className="home-lead-row">
            <div className="home-lead-field">
              <label htmlFor="home-need">¿Qué necesitas?</label>
              <select id="home-need" name="necesidad" value={values.necesidad} onChange={onChange}>
                <option value="">Todavía no lo sé</option>
                <option value="corporativa">Mostrar y presentar mi negocio</option>
                <option value="landing">Promocionar una oferta o campaña</option>
                <option value="portfolio">Enseñar mis trabajos</option>
                <option value="tienda">Vender por internet</option>
                <option value="rediseño">Mejorar la web que ya tengo</option>
                <option value="no-claro">Necesito orientación</option>
              </select>
            </div>
            <div className="home-lead-field">
              <label htmlFor="home-budget">Presupuesto aproximado</label>
              <select id="home-budget" name="presupuesto" value={values.presupuesto} onChange={onChange}>
                <option value="">Prefiero que me orientéis</option>
                <option value="350-500">350 € - 500 €</option>
                <option value="500-800">500 € - 800 €</option>
                <option value="800-1200">800 € - 1.200 €</option>
                <option value="1200+">Más de 1.200 €</option>
                <option value="orientacion">Necesito orientación</option>
              </select>
            </div>
          </div>
        </div>
      </details>
      {error && <p role="alert" className="home-lead-error">{error}</p>}
      <div className="home-lead-action">
        <button type="submit" disabled={busy} onClick={() => debugLeadFormButtonClick('contact_home_integrated')} className="brand-button home-lead-submit">
          {busy ? 'Enviando…' : 'Pedir presupuesto'} <Send size={17} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
