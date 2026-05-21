import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, ChevronRight, Calculator, Store, LayoutTemplate, Globe, Clock, FileText, HelpCircle, Briefcase } from 'lucide-react';
import { submitLeadForm } from '../lib/analytics';

interface BudgetCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

type AnswerType = {
  id: string;
  label: string;
  icon: React.ElementType;
};

const STEPS = [
  {
    id: 'tipo',
    question: '¿Qué tipo de página necesitas?',
    description: 'Tranquilo/a, si no lo tienes claro, marca la que más se parezca.',
    answers: [
      { id: 'landing', label: 'Una web sencilla para que me encuentren (1 a 3 apartados como Inicio, Servicios y Contacto).', icon: LayoutTemplate },
      { id: 'corporativa', label: 'Una web profesional y completa (Varios apartados, quiénes somos, portafolio...).', icon: Globe },
      { id: 'ecommerce', label: 'Quiero vender productos en internet (Una tienda online).', icon: Store }
    ] as AnswerType[]
  },
  {
    id: 'contenido',
    question: '¿Tienes los textos y las fotos preparados?',
    description: 'Saber esto nos ayuda a calcular cuánto tiempo dedicaremos al proyecto.',
    answers: [
      { id: 'todo_listo', label: 'Sí, lo tengo todo (o casi todo) listo.', icon: CheckCircle2 },
      { id: 'ayuda_parcial', label: 'Tengo algunas cosas, pero necesitaré algo de ayuda.', icon: HelpCircle },
      { id: 'nada', label: 'No tengo nada, prefiero que me ayudéis a crearlo todo.', icon: FileText }
    ] as AnswerType[]
  },
  {
    id: 'plazo',
    question: '¿Para cuándo te gustaría tenerla funcionando?',
    description: 'Nos organizamos según tus fechas.',
    answers: [
      { id: 'urgente', label: 'Lo antes posible, tengo bastante urgencia.', icon: Clock },
      { id: 'normal', label: 'En 1 o 2 meses (es el ritmo normal).', icon: Briefcase },
      { id: 'mirando', label: 'No tengo ninguna prisa, solo quiero ir mirando opciones y precios.', icon: Calculator }
    ] as AnswerType[]
  }
];

export default function BudgetCalculator({ isOpen, onClose }: BudgetCalculatorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    mensaje: '',
    privacidad: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Resetear estado al cerrar o abrir
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setSelections({});
      setIsSuccess(false);
      setFormData({ nombre: '', email: '', whatsapp: '', mensaje: '', privacidad: false });
    }
  }, [isOpen]);

  const handleSelect = (stepId: string, answerId: string) => {
    setSelections(prev => ({ ...prev, [stepId]: answerId }));
    setTimeout(() => {
      if (currentStep < STEPS.length) {
        setCurrentStep(prev => prev + 1);
      }
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mapear IDs a respuestas legibles para el email
    const tipoMap: Record<string, string> = {
      'landing': 'Web sencilla (1-3 apartados)',
      'corporativa': 'Web completa',
      'ecommerce': 'Tienda Online'
    };
    
    const contenidoMap: Record<string, string> = {
      'todo_listo': 'Tienen textos y fotos',
      'ayuda_parcial': 'Necesitan ayuda con textos/fotos',
      'nada': 'No tienen nada, necesitan todo'
    };
    
    const plazoMap: Record<string, string> = {
      'urgente': 'Urgente',
      'normal': '1 a 2 meses',
      'mirando': 'Sin prisa, solo mirando precio'
    };

    const finalData = {
      ...formData,
      necesidad: tipoMap[selections['tipo'] || ''] || selections['tipo'],
      estado_contenido: contenidoMap[selections['contenido'] || ''] || selections['contenido'],
      plazo_entrega: plazoMap[selections['plazo'] || ''] || selections['plazo'],
      negocio: 'N/A' // Rellenar si es necesario
    };

    try {
      const response = await submitLeadForm('calculator_lead', finalData);
      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Hubo un error al enviar tu solicitud. Inténtalo de nuevo.");
      }
    } catch (error) {
      alert("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const progress = ((currentStep) / (STEPS.length + 1)) * 100;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
              <Calculator size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 leading-tight">Calculadora de Precio</h3>
              <p className="text-xs text-gray-500">Presupuesto en 1 minuto</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress bar */}
        {!isSuccess && (
          <div className="w-full h-1.5 bg-gray-100 shrink-0">
            <motion.div 
              className="h-full bg-brand-lime"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        {/* Content Area */}
        <div className="p-6 sm:p-8 sm:px-10 overflow-y-auto grow">
          <AnimatePresence mode="wait">
            {!isSuccess && currentStep < STEPS.length && (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-8">
                  <span className="text-xs font-black text-brand-blue tracking-wider uppercase mb-2 block">
                    Paso {currentStep + 1} de {STEPS.length}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-dark mb-3 leading-tight">
                    {STEPS[currentStep].question}
                  </h2>
                  <p className="text-gray-500 text-sm sm:text-base">
                    {STEPS[currentStep].description}
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {STEPS[currentStep].answers.map((answer) => {
                    const isSelected = selections[STEPS[currentStep].id] === answer.id;
                    const Icon = answer.icon;
                    return (
                      <button
                        key={answer.id}
                        onClick={() => handleSelect(STEPS[currentStep].id, answer.id)}
                        className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex items-start sm:items-center gap-4 group ${
                          isSelected 
                            ? 'border-brand-blue bg-brand-blue/5' 
                            : 'border-gray-100 hover:border-brand-blue/30 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`mt-0.5 sm:mt-0 shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-brand-blue text-white' : 'bg-white border border-gray-200 text-gray-400 group-hover:text-brand-blue'
                        }`}>
                          <Icon size={20} />
                        </div>
                        <span className={`font-medium sm:text-lg flex-1 ${isSelected ? 'text-brand-blue' : 'text-gray-700'}`}>
                          {answer.label}
                        </span>
                        <div className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-brand-blue bg-brand-blue' : 'border-gray-300'
                        }`}>
                          {isSelected && <CheckCircle2 size={14} className="text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {!isSuccess && currentStep === STEPS.length && (
              <motion.div
                key="step-final"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-8 text-center sm:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-lime/20 text-brand-dark mb-4">
                    <CheckCircle2 size={24} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-dark mb-3 leading-tight">
                    ¡Cálculo finalizado!
                  </h2>
                  <p className="text-gray-500 text-sm sm:text-base max-w-md">
                    Déjanos cómo contactar contigo y te enviaremos una estimación gratuita y ajustada a lo que has elegido en 24h.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1.5">Tu nombre *</label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                      placeholder="Ej. Juan Pérez"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-1.5">Teléfono / WhatsApp *</label>
                      <input
                        type="tel"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                        placeholder="Ej. 600 000 000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-1.5">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors mt-2">
                    <input 
                      type="checkbox" 
                      name="privacidad"
                      required
                      checked={formData.privacidad}
                      onChange={handleInputChange}
                      className="mt-1 shrink-0 w-4 h-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                    />
                    <span className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                      Acepto la <a href="/politica-de-privacidad" target="_blank" className="text-brand-blue underline">Política de Privacidad</a> y consiento el tratamiento de mis datos para recibir la propuesta.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 bg-brand-blue text-white py-4 px-6 rounded-xl font-bold text-base hover:bg-brand-dark transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Enviando solicitud...</span>
                    ) : (
                      <>
                        Ver mi presupuesto gratuito <ChevronRight size={20} />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {isSuccess && (
              <motion.div
                key="step-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                  ¡Genial, {formData.nombre}!
                </h2>
                <p className="text-gray-600 text-lg mb-8 max-w-sm mx-auto">
                  Hemos recibido tus respuestas. Nuestro equipo lo está revisando y te enviaremos una valoración muy pronto al email o WhatsApp que nos has dejado.
                </p>
                <button
                  onClick={onClose}
                  className="bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors"
                >
                  Volver a la web
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Footer controls */}
        {!isSuccess && currentStep > 0 && currentStep <= STEPS.length && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 shrink-0">
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-blue transition-colors"
            >
              <ArrowLeft size={16} /> Volver al paso anterior
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
