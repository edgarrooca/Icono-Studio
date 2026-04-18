import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import Dashboard from './pages/Dashboard';
import HostingMaintenance from './pages/HostingMaintenance';
import HashScrollHandler from './components/HashScrollHandler';

export default function App() {
  return (
    <Router>
      <HashScrollHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hosting-mantenimiento-web" element={<HostingMaintenance />} />
        <Route path="/proyecto/:id" element={<ProjectDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
