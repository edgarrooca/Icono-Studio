import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, getDocs, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { LayoutDashboard, Settings, Plus, LogOut, Trash2, Image as ImageIcon, Link as LinkIcon, Folder, FileText, CheckCircle2, Sparkles, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, Type } from '@google/genai';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'settings'>('projects');
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    subtitle: '',
    category: 'E-commerce',
    description: '',
    clientDescription: '',
    challenge: '',
    objectives: '',
    img: '',
    imgPc1: '',
    imgReto: '',
    imgMobile1: '',
    imgMobile2: '',
    imgMobile3: '',
    imgMobile4: '',
    imgMobile5: '',
    imgObj1: '',
    imgObj2: '',
    link: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleGenerateAI = async () => {
    if (!projectForm.title) {
      showToast("Escribe un título primero para que la IA tenga contexto", "error");
      return;
    }
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Actúa como un copywriter experto para una agencia de diseño web. Voy a añadir un proyecto a mi portfolio llamado "${projectForm.title}" de la categoría "${projectForm.category}". Genera el contenido para los siguientes campos del portfolio.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              subtitle: { type: Type.STRING, description: "Subtítulo atractivo (ej: Rediseño completo y migración)" },
              description: { type: Type.STRING, description: "Descripción corta para la tarjeta (2 líneas)" },
              clientDescription: { type: Type.STRING, description: "Descripción del cliente y su sector (2 líneas)" },
              challenge: { type: Type.STRING, description: "El reto del proyecto (1 párrafo)" },
              objectives: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 o 4 objetivos clave conseguidos" }
            },
            required: ["subtitle", "description", "clientDescription", "challenge", "objectives"]
          }
        }
      });
      
      const data = JSON.parse(response.text || "{}");
      setProjectForm(prev => ({
        ...prev,
        subtitle: data.subtitle || prev.subtitle,
        description: data.description || prev.description,
        clientDescription: data.clientDescription || prev.clientDescription,
        challenge: data.challenge || prev.challenge,
        objectives: data.objectives ? data.objectives.join('\n') : prev.objectives
      }));
      showToast("¡Contenido generado con éxito!");
    } catch (error) {
      console.error(error);
      showToast("Error al generar con IA", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjectForm(prev => ({ ...prev, [name]: value }));
  };

  const fetchData = async () => {
    try {
      const projectsSnapshot = await getDocs(collection(db, 'projects'));
      setProjects(projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const settingsDoc = await getDoc(doc(db, 'settings', 'site'));
      if (settingsDoc.exists()) {
        setSiteSettings(settingsDoc.data());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      showToast("Error al cargar los datos", "error");
    }
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const importInitialProjects = async () => {
    if (!user) {
      showToast("Debes iniciar sesión para importar proyectos", "error");
      return;
    }

    try {
      const { portfolioProjects } = await import('../data/projects');
      
      const projectsSnapshot = await getDocs(collection(db, 'projects'));
      const existingProjects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      for (const proj of portfolioProjects) {
        const existing = existingProjects.find((p: any) => p.title === proj.title);
        
        if (existing) {
          // Update existing but PRESERVE images (do not include img fields in the update)
          const updateData = {
            title: proj.title,
            subtitle: proj.subtitle,
            category: proj.category,
            description: proj.description,
            clientDescription: proj.clientDescription,
            challenge: proj.challenge,
            objectives: proj.objectives,
            link: proj.link || '',
            concept: proj.concept || '',
            philosophy: proj.philosophy || '',
            technicalDetails: proj.technicalDetails || '',
            updatedAt: new Date().toISOString()
          };
          await setDoc(doc(db, 'projects', existing.id), updateData, { merge: true });
        } else {
          // Create new with default placeholder images
          const generateSlug = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
          const slug = proj.id && typeof proj.id === 'string' && isNaN(Number(proj.id)) ? proj.id : generateSlug(proj.title);
          
          const newData = {
            title: proj.title,
            subtitle: proj.subtitle,
            category: proj.category,
            description: proj.description,
            clientDescription: proj.clientDescription,
            challenge: proj.challenge,
            objectives: proj.objectives,
            img: proj.img,
            link: proj.link || '',
            concept: proj.concept || '',
            philosophy: proj.philosophy || '',
            technicalDetails: proj.technicalDetails || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          await setDoc(doc(db, 'projects', slug), newData);
        }
      }
      showToast("Proyectos sincronizados correctamente con los nuevos textos");
      fetchData();
    } catch (error) {
      console.error("Error importing projects:", error);
      
      // Handle Firestore errors properly as requested by the system
      const errInfo = {
        error: error instanceof Error ? error.message : String(error),
        operationType: 'create',
        path: 'projects',
        authInfo: {
          userId: auth.currentUser?.uid,
          email: auth.currentUser?.email,
          emailVerified: auth.currentUser?.emailVerified,
          isAnonymous: auth.currentUser?.isAnonymous,
          tenantId: auth.currentUser?.tenantId,
          providerInfo: auth.currentUser?.providerData.map(provider => ({
            providerId: provider.providerId,
            displayName: provider.displayName,
            email: provider.email,
            photoUrl: provider.photoURL
          })) || []
        }
      };
      console.error('Firestore Error: ', JSON.stringify(errInfo));
      
      if (error instanceof Error && error.message.includes('Missing or insufficient permissions')) {
        showToast("No tienes permisos para añadir proyectos. Solo el administrador puede hacerlo.", "error");
      } else {
        showToast("Error al importar proyectos", "error");
      }
    }
  };

  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      title: projectForm.title,
      subtitle: projectForm.subtitle || '',
      clientDescription: projectForm.clientDescription || '',
      description: projectForm.description,
      challenge: projectForm.challenge || '',
      objectives: projectForm.objectives?.split('\n').filter(o => o.trim() !== '') || [],
      category: projectForm.category,
      img: projectForm.img,
      imgPc1: projectForm.imgPc1 || '',
      imgReto: projectForm.imgReto || '',
      imgMobile1: projectForm.imgMobile1 || '',
      imgMobile2: projectForm.imgMobile2 || '',
      imgMobile3: projectForm.imgMobile3 || '',
      imgMobile4: projectForm.imgMobile4 || '',
      imgMobile5: projectForm.imgMobile5 || '',
      imgObj1: projectForm.imgObj1 || '',
      imgObj2: projectForm.imgObj2 || '',
      link: projectForm.link,
      updatedAt: new Date().toISOString()
    };
    
    try {
      if (editingProjectId) {
        await setDoc(doc(db, 'projects', editingProjectId), projectData, { merge: true });
        showToast("Proyecto actualizado correctamente");
      } else {
        const generateSlug = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const slug = generateSlug(projectForm.title);
        
        await setDoc(doc(db, 'projects', slug), {
          ...projectData,
          createdAt: new Date().toISOString()
        });
        showToast("Proyecto añadido correctamente");
      }
      
      setEditingProjectId(null);
      setProjectForm({
        title: '',
        subtitle: '',
        category: 'E-commerce',
        description: '',
        clientDescription: '',
        challenge: '',
        objectives: '',
        img: '',
        imgPc1: '',
        imgReto: '',
        imgMobile1: '',
        imgMobile2: '',
        imgMobile3: '',
        imgMobile4: '',
        imgMobile5: '',
        imgObj1: '',
        imgObj2: '',
        link: ''
      });
      fetchData();
    } catch (error) {
      console.error("Error saving project:", error);
      showToast("Error al guardar el proyecto", "error");
    }
  };

  const editProject = (project: any) => {
    setEditingProjectId(project.id);
    setProjectForm({
      title: project.title || '',
      subtitle: project.subtitle || '',
      category: project.category || 'E-commerce',
      description: project.description || '',
      clientDescription: project.clientDescription || '',
      challenge: project.challenge || '',
      objectives: Array.isArray(project.objectives) ? project.objectives.join('\n') : (project.objectives || ''),
      img: project.img || '',
      imgPc1: project.imgPc1 || '',
      imgReto: project.imgReto || '',
      imgMobile1: project.imgMobile1 || '',
      imgMobile2: project.imgMobile2 || '',
      imgMobile3: project.imgMobile3 || '',
      imgMobile4: project.imgMobile4 || '',
      imgMobile5: project.imgMobile5 || '',
      imgObj1: project.imgObj1 || '',
      imgObj2: project.imgObj2 || '',
      link: project.link || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: '',
      subtitle: '',
      category: 'E-commerce',
      description: '',
      clientDescription: '',
      challenge: '',
      objectives: '',
      img: '',
      imgPc1: '',
      imgReto: '',
      imgMobile1: '',
      imgMobile2: '',
      imgMobile3: '',
      link: ''
    });
  };

  const deleteProject = (id: string) => {
    setProjectToDelete(id);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await deleteDoc(doc(db, 'projects', projectToDelete));
      showToast("Proyecto eliminado");
      setProjectToDelete(null);
      fetchData();
    } catch (error) {
      console.error("Error deleting project:", error);
      showToast("Error al eliminar", "error");
      setProjectToDelete(null);
    }
  };

  const updateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newSettings = {
      heroTitle: formData.get('heroTitle'),
      heroSubtitle: formData.get('heroSubtitle'),
      contactEmail: formData.get('contactEmail'),
    };
    
    try {
      await setDoc(doc(db, 'settings', 'site'), newSettings);
      showToast("Configuración guardada");
      fetchData();
    } catch (error) {
      console.error("Error updating settings:", error);
      showToast("Error al guardar", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl max-w-md w-full text-center border border-gray-100">
          <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard className="w-10 h-10 text-brand-blue" />
          </div>
          <h1 className="font-display text-3xl uppercase tracking-tight text-brand-dark mb-2">Panel de Control</h1>
          <p className="text-gray-500 mb-8">Inicia sesión para gestionar tu portfolio y la configuración de la web.</p>
          <button 
            onClick={handleLogin} 
            className="w-full bg-brand-dark text-white px-6 py-4 rounded-full font-bold uppercase tracking-wide hover:bg-brand-lime hover:text-brand-dark transition-all duration-300"
          >
            Acceder con Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg flex items-center gap-3 font-medium ${
              toast.type === 'success' ? 'bg-brand-lime text-brand-dark' : 'bg-red-500 text-white'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 size={20} />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white border-r border-gray-200 flex flex-col sticky top-0 md:h-screen z-20">
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-dark rounded-xl flex items-center justify-center">
              <span className="text-brand-lime font-display font-bold text-xl">I</span>
            </div>
            <span className="font-display text-xl uppercase tracking-tight font-bold text-brand-dark">Icono Studio</span>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'projects' ? 'bg-brand-blue/10 text-brand-blue' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Folder size={20} />
            Proyectos
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'settings' ? 'bg-brand-blue/10 text-brand-blue' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Settings size={20} />
            Configuración
          </button>
        </nav>

        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-6 px-2">
            <img src={user.photoURL || ''} alt="User" className="w-10 h-10 rounded-full bg-gray-200" referrerPolicy="no-referrer" />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-brand-dark truncate">{user.displayName}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-600 px-4 py-3 rounded-xl font-medium hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {activeTab === 'projects' && (
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-brand-dark mb-2">Portfolio</h2>
                <p className="text-gray-500">Gestiona los proyectos que se muestran en tu web.</p>
              </div>
            </div>

            <div className="flex flex-col gap-12">
              {/* Add Project Form */}
              <div className="w-full">
                <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-gray-100">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h3 className="font-display text-xl uppercase tracking-tight text-brand-dark flex items-center gap-2">
                      <Plus size={20} className="text-brand-blue" />
                      {editingProjectId ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                    </h3>
                    <div className="flex items-center gap-3">
                      {editingProjectId && (
                        <button 
                          type="button"
                          onClick={cancelEdit}
                          className="text-sm font-bold text-gray-500 hover:text-brand-dark transition-colors uppercase tracking-wider"
                        >
                          Cancelar Edición
                        </button>
                      )}
                      <button 
                        type="button"
                        onClick={handleGenerateAI}
                        disabled={isGenerating}
                        className="flex items-center gap-2 bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full font-bold text-sm hover:bg-brand-blue hover:text-white transition-colors disabled:opacity-50"
                      >
                      {isGenerating ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Sparkles size={16} />
                      )}
                      {isGenerating ? 'Generando...' : 'Autocompletar con IA'}
                    </button>
                    </div>
                  </div>
                  <form onSubmit={saveProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Título</label>
                      <input name="title" value={projectForm.title} onChange={handleFormChange} placeholder="Ej: E-commerce Nike" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Categoría</label>
                      <select name="category" value={projectForm.category} onChange={handleFormChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" required>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Web Corporativa">Web Corporativa</option>
                        <option value="SEO & CRO">SEO & CRO</option>
                        <option value="Desarrollo a medida">Desarrollo a medida</option>
                        <option value="Marketing Digital">Marketing Digital</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subtítulo</label>
                      <input name="subtitle" value={projectForm.subtitle} onChange={handleFormChange} placeholder="Ej: Rediseño completo y migración a Shopify" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Descripción Corta (Tarjeta)</label>
                      <textarea name="description" value={projectForm.description} onChange={handleFormChange} rows={2} placeholder="Breve descripción para la tarjeta..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all resize-none" required></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Descripción del Cliente</label>
                      <textarea name="clientDescription" value={projectForm.clientDescription} onChange={handleFormChange} rows={2} placeholder="Descripción del cliente para el detalle del proyecto..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all resize-none"></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">El Reto</label>
                      <textarea name="challenge" value={projectForm.challenge} onChange={handleFormChange} rows={4} placeholder="Describe el reto del proyecto..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all resize-none"></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Objetivos (uno por línea)</label>
                      <textarea name="objectives" value={projectForm.objectives} onChange={handleFormChange} rows={4} placeholder="Objetivo 1&#10;Objetivo 2&#10;Objetivo 3" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all resize-none"></textarea>
                    </div>
                    <div className="md:col-span-2 pt-6 border-t border-gray-100">
                      <h4 className="font-display text-lg uppercase tracking-tight text-brand-dark mb-4 flex items-center gap-2">
                        <ImageIcon size={18} className="text-brand-blue" />
                        Imágenes del Proyecto
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Imagen Principal (Mockup PC 2)</label>
                          <div className="relative">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input required name="img" value={projectForm.img} onChange={handleFormChange} placeholder="URL de la imagen principal" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
                          </div>
                          {projectForm.img && (
                            <div className="mt-2 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                              <img src={projectForm.img} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Error+al+cargar+imagen'; }} />
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Imagen PC 1 (Opcional)</label>
                          <div className="relative">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input name="imgPc1" value={projectForm.imgPc1} onChange={handleFormChange} placeholder="URL de la imagen PC 1" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
                          </div>
                          {projectForm.imgPc1 && (
                            <div className="mt-2 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                              <img src={projectForm.imgPc1} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Error+al+cargar+imagen'; }} />
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Imagen Reto (Opcional)</label>
                          <div className="relative">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input name="imgReto" value={projectForm.imgReto} onChange={handleFormChange} placeholder="URL de la imagen del reto" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
                          </div>
                          {projectForm.imgReto && (
                            <div className="mt-2 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                              <img src={projectForm.imgReto} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Error+al+cargar+imagen'; }} />
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Móvil 1 (Opcional)</label>
                          <div className="relative">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input name="imgMobile1" value={projectForm.imgMobile1} onChange={handleFormChange} placeholder="URL de la imagen móvil 1" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
                          </div>
                          {projectForm.imgMobile1 && (
                            <div className="mt-2 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                              <img src={projectForm.imgMobile1} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Error+al+cargar+imagen'; }} />
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Móvil 2 (Opcional)</label>
                          <div className="relative">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input name="imgMobile2" value={projectForm.imgMobile2} onChange={handleFormChange} placeholder="URL de la imagen móvil 2" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
                          </div>
                          {projectForm.imgMobile2 && (
                            <div className="mt-2 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                              <img src={projectForm.imgMobile2} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Error+al+cargar+imagen'; }} />
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Móvil 3 (Opcional)</label>
                          <div className="relative">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input name="imgMobile3" value={projectForm.imgMobile3} onChange={handleFormChange} placeholder="URL de la imagen móvil 3" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
                          </div>
                          {projectForm.imgMobile3 && (
                            <div className="mt-2 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                              <img src={projectForm.imgMobile3} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Error+al+cargar+imagen'; }} />
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Móvil 4 (Opcional)</label>
                          <div className="relative">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input name="imgMobile4" value={projectForm.imgMobile4} onChange={handleFormChange} placeholder="URL de la imagen móvil 4" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
                          </div>
                          {projectForm.imgMobile4 && (
                            <div className="mt-2 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                              <img src={projectForm.imgMobile4} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Error+al+cargar+imagen'; }} />
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Móvil 5 (Opcional)</label>
                          <div className="relative">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input name="imgMobile5" value={projectForm.imgMobile5} onChange={handleFormChange} placeholder="URL de la imagen móvil 5" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
                          </div>
                          {projectForm.imgMobile5 && (
                            <div className="mt-2 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                              <img src={projectForm.imgMobile5} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Error+al+cargar+imagen'; }} />
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Imagen Objetivos 1 (Opcional)</label>
                          <div className="relative">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input name="imgObj1" value={projectForm.imgObj1} onChange={handleFormChange} placeholder="URL de la imagen objetivos 1" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
                          </div>
                          {projectForm.imgObj1 && (
                            <div className="mt-2 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                              <img src={projectForm.imgObj1} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Error+al+cargar+imagen'; }} />
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Imagen Objetivos 2 (Opcional)</label>
                          <div className="relative">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input name="imgObj2" value={projectForm.imgObj2} onChange={handleFormChange} placeholder="URL de la imagen objetivos 2" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
                          </div>
                          {projectForm.imgObj2 && (
                            <div className="mt-2 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                              <img src={projectForm.imgObj2} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Error+al+cargar+imagen'; }} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2 pt-6 border-t border-gray-100">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Enlace (Opcional)</label>
                      <div className="relative">
                        <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input name="link" value={projectForm.link} onChange={handleFormChange} placeholder="https://..." className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
                      </div>
                    </div>
                    <div className="md:col-span-2 pt-2">
                      <button type="submit" className="w-full bg-brand-dark text-white px-6 py-4 rounded-xl font-bold uppercase tracking-wide hover:bg-brand-lime hover:text-brand-dark transition-all duration-300">
                        {editingProjectId ? 'Guardar Cambios' : 'Añadir Proyecto'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Projects List */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-2xl uppercase tracking-tight text-brand-dark">Proyectos Guardados</h3>
                  <button 
                    onClick={importInitialProjects}
                    className="flex items-center gap-2 bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-brand-blue hover:text-white transition-all duration-300"
                  >
                    <Download size={16} />
                    Importar Mis Proyectos
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.length === 0 ? (
                    <div className="col-span-full bg-white p-12 rounded-[2rem] border border-dashed border-gray-300 text-center">
                      <Folder className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h4 className="text-lg font-bold text-gray-500 mb-1">Aún no hay proyectos</h4>
                      <p className="text-sm text-gray-400">Añade tu primer proyecto usando el formulario.</p>
                    </div>
                  ) : (
                    projects.map(project => (
                      <div key={project.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 group">
                        <div className="aspect-video bg-gray-100 relative overflow-hidden">
                          <img src={project.img} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.id}/1200/800`; }} />
                          <div className="absolute top-3 right-3 flex gap-2">
                            <button 
                              onClick={() => editProject(project)}
                              className="w-10 h-10 bg-white/90 backdrop-blur-sm text-brand-blue rounded-full flex items-center justify-center shadow-sm hover:bg-brand-blue hover:text-white transition-colors"
                              title="Editar proyecto"
                            >
                              <Settings size={18} />
                            </button>
                            <button 
                              onClick={() => deleteProject(project.id)}
                              className="w-10 h-10 bg-white/90 backdrop-blur-sm text-red-500 rounded-full flex items-center justify-center shadow-sm hover:bg-red-500 hover:text-white transition-colors"
                              title="Eliminar proyecto"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-brand-blue mb-2">{project.category}</div>
                          <h4 className="font-display text-xl font-bold text-brand-dark mb-2 truncate">{project.title}</h4>
                          <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto">
            <div className="mb-10">
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-brand-dark mb-2">Configuración</h2>
              <p className="text-gray-500">Ajusta los textos principales y datos de contacto de tu web.</p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
              <form onSubmit={updateSettings} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Título Principal (Hero)</label>
                    <input name="heroTitle" defaultValue={siteSettings.heroTitle} placeholder="Ej: Transformamos ideas en experiencias digitales" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subtítulo (Hero)</label>
                    <textarea name="heroSubtitle" defaultValue={siteSettings.heroSubtitle} rows={3} placeholder="Ej: Somos una agencia creativa especializada en..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all resize-none"></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email de Contacto</label>
                    <input name="contactEmail" type="email" defaultValue={siteSettings.contactEmail} placeholder="holaiconostudio@gmail.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button type="submit" className="bg-brand-dark text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wide hover:bg-brand-lime hover:text-brand-dark transition-all duration-300">
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {projectToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-2xl font-display font-bold text-brand-dark mb-4">¿Eliminar proyecto?</h3>
              <p className="text-gray-600 mb-8">
                Esta acción no se puede deshacer. El proyecto se eliminará permanentemente de tu base de datos.
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setProjectToDelete(null)}
                  className="px-6 py-3 rounded-xl font-bold uppercase tracking-wide text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-3 rounded-xl font-bold uppercase tracking-wide bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Sí, eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
