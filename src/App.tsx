import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import AnalyticsTracker from './components/AnalyticsTracker';
import CookieConsentBanner from './components/CookieConsentBanner';
import HashScrollHandler from './components/HashScrollHandler';
import WhatsAppButton from './components/WhatsAppButton';
import SalesNotification from './components/SalesNotification';
import { seoLocations } from './data/seoLocations';

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const HostingMaintenance = lazy(() => import('./pages/HostingMaintenance'));
const Contact = lazy(() => import('./pages/Contact'));
const GraciasPresupuesto = lazy(() => import('./pages/GraciasPresupuesto'));
const DisenoWebLocation = lazy(() => import('./pages/DisenoWebLocation'));
const WebExpress = lazy(() => import('./pages/WebExpress'));
const WebExpressCheckout = lazy(() => import('./pages/WebExpressCheckout'));
const WebExpressSuccess = lazy(() => import('./pages/WebExpressSuccess'));
const CondicionesWebExpress = lazy(() => import('./pages/CondicionesWebExpress'));
const AvisoLegal = lazy(() => import('./pages/AvisoLegal'));
const PoliticaPrivacidad = lazy(() => import('./pages/PoliticaPrivacidad'));
const Pricing = lazy(() => import('./pages/Pricing'));

export default function App() {
  return (
    <Router>
      <AnalyticsTracker />
      <HashScrollHandler />
      <WhatsAppButton />
      <CookieConsentBanner />
      <SalesNotification />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/precios" element={<Pricing />} />
          <Route path="/hosting-mantenimiento-web" element={<HostingMaintenance />} />
          <Route path="/proyecto/:id" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {seoLocations.map(loc => (
            <Route path={`/diseno-web-${loc.slug}`} element={<DisenoWebLocation key={loc.slug} locationSlug={loc.slug} />} />
          ))}
          <Route path="/pagina-web-gratis" element={<WebExpress />} />
          <Route path="/web-express" element={<Navigate to="/pagina-web-gratis" replace />} />
          <Route path="/contratar-web-express" element={<WebExpressCheckout />} />
          <Route path="/gracias-web-express" element={<WebExpressSuccess />} />
          <Route path="/condiciones-web-express" element={<CondicionesWebExpress />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/gracias-presupuesto" element={<GraciasPresupuesto />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
