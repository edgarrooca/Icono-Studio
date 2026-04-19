import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import HostingMaintenance from './pages/HostingMaintenance';
import Contact from './pages/Contact';
import HashScrollHandler from './components/HashScrollHandler';

export default function App() {
  return (
    <Router>
      <HashScrollHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hosting-mantenimiento-web" element={<HostingMaintenance />} />
        <Route path="/proyecto/:id" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
