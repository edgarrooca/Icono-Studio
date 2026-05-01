import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HashScrollHandler from './components/HashScrollHandler';
import WhatsAppButton from './components/WhatsAppButton';

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const HostingMaintenance = lazy(() => import('./pages/HostingMaintenance'));
const Contact = lazy(() => import('./pages/Contact'));
const DisenoWebValencia = lazy(() => import('./pages/DisenoWebValencia'));
const DisenoWebBarcelona = lazy(() => import('./pages/DisenoWebBarcelona'));
const DisenoWebMadrid = lazy(() => import('./pages/DisenoWebMadrid'));
const AvisoLegal = lazy(() => import('./pages/AvisoLegal'));
const PoliticaPrivacidad = lazy(() => import('./pages/PoliticaPrivacidad'));

function RouteFallback() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-6">
      <div className="flex items-center gap-4 text-brand-dark">
        <div className="w-10 h-10 rounded-full border-4 border-brand-blue border-t-transparent animate-spin" />
        <p className="ui-eyebrow text-brand-dark/70">Cargando página</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <HashScrollHandler />
      <WhatsAppButton />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/hosting-mantenimiento-web" element={<HostingMaintenance />} />
          <Route path="/proyecto/:id" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/diseno-web-valencia" element={<DisenoWebValencia />} />
          <Route path="/diseno-web-barcelona" element={<DisenoWebBarcelona />} />
          <Route path="/diseno-web-madrid" element={<DisenoWebMadrid />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
