import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent, type SyntheticEvent as ReactSyntheticEvent } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, X } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';

type GalleryCardSize = 'small' | 'medium-small' | 'medium' | 'large';

interface GalleryProject {
  key?: string;
  id: string;
  title: string;
  description: string;
  highlights: string[];
  image: string;
  aspectRatio: number;
  size: GalleryCardSize;
}

const galleryProjects: GalleryProject[] = [
  {
    id: 'inktime-tattoo',
    title: 'Ink Time',
    description: 'Una presencia digital con carácter para un estudio de tatuajes que quería mostrar su trabajo sin perder cercanía.',
    highlights: ['Trabajo visual protagonista', 'Navegación más clara', 'Identidad con carácter'],
    image: '/projects/inktime-tattoo/homepage-preview.webp',
    aspectRatio: 1440 / 810,
    size: 'small',
  },
  {
    id: 'somnis-d-angels',
    title: 'Somnis d’Àngels',
    description: 'Una experiencia visual delicada y luminosa para presentar una marca de eventos con emoción y personalidad.',
    highlights: ['Presentación más emocional', 'Contenido fácil de explorar', 'Diseño coherente'],
    image: '/projects/somnis-d-angels/homepage-preview.webp',
    aspectRatio: 1440 / 810,
    size: 'large',
  },
  {
    id: 'autocustomgt',
    title: 'AutoCustomGT',
    description: 'Una tienda online más clara y rápida para que encontrar el accesorio adecuado sea sencillo desde el primer clic.',
    highlights: ['Catálogo ordenado', 'Compra más sencilla', 'Fichas de producto claras'],
    image: '/projects/autocustomgt/homepage-preview.webp',
    aspectRatio: 1440 / 810,
    size: 'medium-small',
  },
  {
    id: 'lorenzo-secades-fotografia',
    title: 'Lorenzo Secades',
    description: 'Un portfolio editorial que deja que cada imagen tenga su espacio y convierte el trabajo del fotógrafo en la propia historia.',
    highlights: ['El trabajo es protagonista', 'Recorrido visual fluido', 'Portfolio adaptable'],
    image: '/projects/lorenzo-secades-fotografia/home.webp',
    aspectRatio: 1800 / 1187,
    size: 'medium',
  },
  {
    id: 'tescar-luxury-green',
    title: 'Tescar Luxury Green',
    description: 'Una web corporativa sobria y natural para explicar un servicio especializado con confianza y claridad.',
    highlights: ['Servicios mejor explicados', 'Confianza desde el inicio', 'Presencia más profesional'],
    image: '/projects/tescar/desktop.webp',
    aspectRatio: 1600 / 1000,
    size: 'small',
  },
  {
    id: 'dogcat',
    title: 'Dogcat',
    description: 'Una plataforma amable y fácil de usar que conecta a las personas con el cuidado que necesitan sus animales.',
    highlights: ['Información bien organizada', 'Experiencia fácil de usar', 'Marca más cercana'],
    image: '/projects/dogcat/img.webp',
    aspectRatio: 1280 / 802,
    size: 'large',
  },
  {
    id: 'libreria-garcia-lorca',
    title: 'Librería García Lorca',
    description: 'Una librería de barrio llevada a internet con una navegación cálida, ordenada y muy fácil de entender.',
    highlights: ['Contenido fácil de encontrar', 'Navegación cálida', 'Productos destacados'],
    image: '/projects/libreria-garcia-lorca/img.webp',
    aspectRatio: 1151 / 720,
    size: 'medium-small',
  },
];

const repeatedProjects = Array.from({ length: 5 }, (_, cycle) =>
  galleryProjects.map((project) => ({ ...project, key: `${cycle}-${project.id}` })),
).flat();

const REFERENCE_CARD_WIDTH = 300;
const REFERENCE_DEPTH_SCALE = 1.7;
// Keep every card in front of the track's hit-test plane. Negative translateZ
// values made the visually visible cards in the rear impossible to click.
const REFERENCE_DEPTH_OFFSET = 44;
// Keep the same horizontal rhythm as the reference component, but use a
// restrained overlap so the cards remain legible while their depth changes.
const REFERENCE_CARD_STEP = 310;
const REFERENCE_CARD_VERTICAL_SHIFT = 0;
const REFERENCE_CYCLE_WIDTH = galleryProjects.length * REFERENCE_CARD_STEP;
const REFERENCE_CARD_PATTERN = [
  { depth: 0, top: -30, scale: 1 },
  { depth: 100, top: 52, scale: 1.06 },
  { depth: -42, top: -8, scale: 0.94 },
  { depth: -38, top: 42, scale: 0.94 },
  { depth: 12, top: 66, scale: 0.98 },
  { depth: -28, top: 14, scale: 0.96 },
  // Keep the front-most card fully inside the stage after its 3D scale.
  { depth: 120, top: -28, scale: 1.08 },
] as const;
// Render the middle copy initially. This keeps two full sets available on either
// side while dragging, so wrapping never teleports the visible cards.
const INITIAL_OFFSET = REFERENCE_CYCLE_WIDTH * 2;
// Use the real cover ratio, rather than stretching a short screenshot to
// match the information panel and inventing the missing bottom of the page.
function ProjectCover({ project }: { project: GalleryProject }) {
  return (
    <span className="block w-full overflow-hidden" style={{ aspectRatio: project.aspectRatio }}>
      <img
        src={project.image}
        alt={`Portada de la web ${project.title}`}
        className="block h-full w-full object-contain object-top"
        loading="eager"
        decoding="async"
        draggable={false}
        onError={handleImgError}
      />
    </span>
  );
}

function handleImgError(event: ReactSyntheticEvent<HTMLImageElement>) {
  // A missing fallback must not trigger an endless error/request loop.
  if (!event.currentTarget.src.endsWith('/og-image.png')) event.currentTarget.src = '/og-image.png';
}

// Browser frame around the actual project screenshot.
function BrowserChrome({ label }: { label: string }) {
  return (
    <span className="flex w-full items-center gap-2 border-b border-[#E4ECF5] px-3 py-2 sm:px-4 sm:py-2.5" aria-hidden="true">
      <span className="h-2 w-2 rounded-full bg-[#F0B4B4] sm:h-2.5 sm:w-2.5" />
      <span className="h-2 w-2 rounded-full bg-[#F3D9A4] sm:h-2.5 sm:w-2.5" />
      <span className="h-2 w-2 rounded-full bg-[#B9DCC0] sm:h-2.5 sm:w-2.5" />
      <span className="ml-2 min-w-0 flex-1 truncate rounded-full bg-[#F1F5FA] px-3 py-1 text-center font-sans text-[9px] font-medium text-[#7C8BC0] sm:text-[10px]">
        {label}
      </span>
    </span>
  );
}

export default function ProyectosRecientes() {
  const navigate = useNavigate();
  const stageRef = useRef<HTMLDivElement>(null);
  const nativeGalleryRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<HTMLDialogElement>(null);
  const metricsRef = useRef({ scale: 1, step: REFERENCE_CARD_STEP, cycle: REFERENCE_CYCLE_WIDTH });
  const metricsInitializedRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const positionRef = useRef(INITIAL_OFFSET);
  const pointerStartRef = useRef<number | null>(null);
  const pointerStartYRef = useRef<number | null>(null);
  const pointerPositionRef = useRef(INITIAL_OFFSET);
  const pointerDistanceRef = useRef(0);
  const suppressClickRef = useRef(false);
  const draggingRef = useRef(false);
  const originCardRef = useRef<HTMLElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // Preserve the original depth effect on phones and tablets too. Only use
  // the static alternative when the visitor explicitly requests less motion.
  const [isNativeGallery, setIsNativeGallery] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setIsNativeGallery(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const update = () => setIsPageVisible(document.visibilityState === 'visible');
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const update = () => {
      if (!stage.clientWidth) return;
      const scale = Math.min(1, Math.max(0.5, (stage.clientWidth - 48) / 380));
      const previousCycle = metricsRef.current.cycle;
      metricsRef.current = { scale, step: REFERENCE_CARD_STEP * scale, cycle: REFERENCE_CYCLE_WIDTH * scale };
      const nextPosition = positionRef.current / previousCycle * metricsRef.current.cycle;
      const initialCenterOffset = !metricsInitializedRef.current && stage.clientWidth < 640
        ? (stage.clientWidth - REFERENCE_CARD_WIDTH * scale) / 2 : 0;
      setTrackPosition(nextPosition - initialCenterOffset);
      metricsInitializedRef.current = true;
      // Do not retain a drag origin measured in the old viewport's units.
      pointerStartRef.current = null;
      pointerIdRef.current = null;
      draggingRef.current = false;
      setIsDragging(false);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [isNativeGallery]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsGalleryVisible(entry.isIntersecting),
      { threshold: 0.18 },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isNativeGallery || shouldReduceMotion || isDragging || selectedProject || !isGalleryVisible || isHovered || isFocused || !isPageVisible) return undefined;

    let previousTime = performance.now();
    let frameId = 0;
    const move = (time: number) => {
      const track = trackRef.current;
      if (track && pointerIdRef.current === null) {
        const elapsed = Math.min(time - previousTime, 50);
        previousTime = time;
        setTrackPosition(positionRef.current + (elapsed / 16) * 0.9 * metricsRef.current.scale);
      }
      frameId = window.requestAnimationFrame(move);
    };

    frameId = window.requestAnimationFrame(move);
    return () => window.cancelAnimationFrame(frameId);
  }, [isNativeGallery, isGalleryVisible, isDragging, selectedProject, shouldReduceMotion, isHovered, isFocused, isPageVisible]);

  useScrollLock(!!selectedProject);
  useLayoutEffect(() => {
    if (!selectedProject) return undefined;
    const dialog = selectionRef.current;
    if (!dialog) return;
    dialog.showModal();
    return () => {
      dialog.close();
      if (originCardRef.current?.isConnected) originCardRef.current.focus({ preventScroll: true });
    };
  }, [selectedProject]);

  const setTrackPosition = (position: number) => {
    const { scale, step, cycle } = metricsRef.current;
    // All input methods share the same seamless loop. Clamping at the ends
    // previously left dragging/wheel navigation stuck while autoplay wrapped.
    const boundedPosition = cycle * 2 + ((position - cycle * 2) % cycle + cycle) % cycle;
    positionRef.current = boundedPosition;
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = 'none';
    track.style.transform = 'translate3d(0, 0, 0)';
    track.style.width = `${cycle * 5}px`;
    const center = (stageRef.current?.clientWidth ?? REFERENCE_CARD_WIDTH) / 2;
    const nearestIndex = Math.round((boundedPosition + center - REFERENCE_CARD_WIDTH * scale / 2) / step);

    track.querySelectorAll<HTMLElement>('[data-reference-card]').forEach((card, index) => {
      const pattern = REFERENCE_CARD_PATTERN[index % REFERENCE_CARD_PATTERN.length];
      const cardPosition = index * step - boundedPosition;
      card.style.width = `${REFERENCE_CARD_WIDTH * scale}px`;
      card.style.height = `${REFERENCE_CARD_WIDTH * scale / repeatedProjects[index].aspectRatio}px`;
      card.style.transform = `translate3d(${cardPosition}px, calc(-50% + ${(REFERENCE_CARD_VERTICAL_SHIFT + pattern.top) * scale}px), ${(pattern.depth + REFERENCE_DEPTH_OFFSET) * REFERENCE_DEPTH_SCALE * scale}px) scale(${pattern.scale})`;
      // A single, visible tab stop, rather than repeated/off-screen cards.
      card.tabIndex = index === nearestIndex ? 0 : -1;
    });
  };

  // React re-renders when the gallery enters the viewport, when a card opens,
  // and when dragging starts. Re-apply the imperative card transforms after
  // those renders so the gallery never flashes back to its initial layout.
  useLayoutEffect(() => {
    setTrackPosition(positionRef.current);
  });

  const closeSelection = () => {
    if (!selectedProject) return;
    setSelectedProject(null);
  };

  const handleProjectSelect = (project: GalleryProject, event: ReactMouseEvent<HTMLButtonElement>) => {
    if (selectedProject || isDragging) return;
    if (!isNativeGallery && event.detail !== 0 && (suppressClickRef.current || Math.abs(pointerDistanceRef.current) > 8)) {
      suppressClickRef.current = false;
      pointerDistanceRef.current = 0;
      return;
    }

    originCardRef.current = event.currentTarget;
    suppressClickRef.current = false;
    pointerDistanceRef.current = 0;
    setSelectedProject(project);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (selectedProject || !event.isPrimary || event.button !== 0) return;
    pointerIdRef.current = event.pointerId;
    pointerStartRef.current = event.clientX;
    pointerStartYRef.current = event.clientY;
    pointerPositionRef.current = positionRef.current;
    pointerDistanceRef.current = 0;
    suppressClickRef.current = false;
    draggingRef.current = false;
    setIsDragging(false);
    setTrackPosition(positionRef.current);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStartRef.current === null || pointerIdRef.current !== event.pointerId) return;
    const distance = event.clientX - pointerStartRef.current;
    const verticalDistance = Math.abs(event.clientY - (pointerStartYRef.current ?? event.clientY));
    if (!draggingRef.current) {
      if (verticalDistance > 8 && verticalDistance >= Math.abs(distance)) {
        pointerStartRef.current = null;
        pointerIdRef.current = null;
        return;
      }
      if (Math.abs(distance) < 8) return;
      draggingRef.current = true;
      setIsDragging(true);
      suppressClickRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    pointerDistanceRef.current = distance;
    setTrackPosition(pointerPositionRef.current - distance);
  };

  const finishPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;
    pointerIdRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    pointerStartRef.current = null;
    pointerStartYRef.current = null;
    draggingRef.current = false;
    setIsDragging(false);
    if (suppressClickRef.current) setTrackPosition(positionRef.current);
    // Suppression lasts through the synthetic click. The next pointerdown
    // (or a keyboard activation) starts a fresh interaction.
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const handleWheel = (event: WheelEvent) => {
      if (selectedProject || event.ctrlKey || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      if (Math.abs(event.deltaX) < 1) return;
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stage.clientWidth : 1;
      setTrackPosition(positionRef.current + event.deltaX * unit);
    };
    // React's wheel listener is passive; a native listener can actually stop
    // horizontal page scrolling without blocking ordinary vertical scroll.
    stage.addEventListener('wheel', handleWheel, { passive: false });
    return () => stage.removeEventListener('wheel', handleWheel);
  }, [selectedProject]);

  const stepGallery = (direction: number) => {
    setTrackPosition(positionRef.current + direction * metricsRef.current.step);
  };

  // The selection resolves into two independent cards. DOM order puts the
  // info card first and the portada second; CSS `order` places the portada
  // visually on the LEFT and the information on the RIGHT, with no overlap.
  // Below tablet width, stack both cards in the scrolling modal and keep the
  // cover's original proportions rather than forcing equal panel heights.
  const selectedKey = selectedProject ? selectedProject.key ?? selectedProject.id : '';
  const selectedCardTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 96, damping: 20, mass: 1.05 };
  const backCardTransition = shouldReduceMotion
    ? { duration: 0 }
    : { ...selectedCardTransition, delay: 0.16 };
  return (
    <section id="proyectos" className="relative scroll-mt-24 overflow-hidden bg-white" aria-label="Proyectos destacados"
      onFocusCapture={(event) => {
        setIsFocused(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsFocused(false);
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-24 bg-[linear-gradient(to_bottom,#F7F7F7_0%,rgba(247,247,247,0.68)_28%,rgba(247,247,247,0.26)_62%,transparent_100%)] sm:h-28 lg:h-32" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-[linear-gradient(to_top,#F7F7F7_0%,rgba(247,247,247,0.7)_30%,rgba(247,247,247,0.28)_64%,transparent_100%)] sm:h-48 lg:h-56" aria-hidden="true" />

      <div className="relative z-10">
      <div className="mx-auto w-full max-w-7xl px-5 pb-5 pt-12 sm:px-6 sm:pb-7 sm:pt-14 lg:px-8 lg:pb-8 lg:pt-16">
        <div className="mx-auto max-w-[46rem] text-center">
          <h2 className="text-balance font-display text-[1.85rem] font-extrabold leading-[1.12] tracking-[-0.032em] text-[#0B1B63] sm:text-[2.15rem] lg:text-[2.42rem] xl:text-[2.6rem]">
            Webs que hablan <span className="text-[#3E88AE]">por ti</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-[1.02rem] font-medium leading-[1.55] text-[#27396C] sm:text-[1.06rem] lg:text-[1.1rem]">
            Una muestra de páginas creadas para negocios como el tuyo.
          </p>
        </div>
      </div>

      {isNativeGallery && (
        <div
          ref={nativeGalleryRef}
          className="portfolio-native-gallery flex w-full snap-x snap-mandatory items-start gap-4 overflow-x-auto overscroll-x-contain px-5 pb-6 pt-3"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Galería de proyectos: desliza para ver más"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
            event.preventDefault();
            event.currentTarget.scrollBy({ left: (event.key === 'ArrowRight' ? 1 : -1) * event.currentTarget.clientWidth * 0.86, behavior: shouldReduceMotion ? 'instant' : 'smooth' });
          }}
        >
          {galleryProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              className="min-w-0 max-w-[24rem] flex-[0_0_88%] snap-center overflow-hidden rounded-[1.25rem] border border-[#D9E6EF] bg-white p-0 text-left shadow-[0_8px_20px_rgba(11,27,99,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E88AE]"
              aria-label={`Seleccionar proyecto ${project.title}`}
              aria-haspopup="dialog"
              onClick={(event) => handleProjectSelect(project, event)}
            >
              <ProjectCover project={project} />
              <span className="flex items-center justify-between gap-3 border-t border-[#E4ECF5] px-4 py-3 text-[0.9rem] font-semibold text-[#0B1B63]">
                <span>{project.title}</span><ArrowRight size={16} className="shrink-0" aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      )}

      <div className={`${isNativeGallery ? 'hidden' : 'flex'} w-full items-center`}>
        <div
          ref={stageRef}
          className="portfolio-gallery-stage relative h-[min(100dvh,300px)] w-full overflow-visible select-none outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2A6D98] sm:h-[410px] lg:h-[420px]"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Galería de proyectos de Icono Studio"
          aria-describedby="project-gallery-help"
          tabIndex={0}
          style={{ touchAction: 'pan-y pinch-zoom' }}
          onPointerEnter={(event) => { if (event.pointerType === 'mouse') setIsHovered(true); }}
          onPointerLeave={(event) => {
            if (event.pointerType === 'mouse') setIsHovered(false);
            if (!draggingRef.current) {
              pointerStartRef.current = null;
              pointerIdRef.current = null;
            }
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPointer}
          onPointerCancel={finishPointer}
          onLostPointerCapture={(event) => {
            // Touch starts with implicit capture on the image. Transferring
            // capture to the stage must not end the drag via a bubbled event.
            if (event.target === event.currentTarget) finishPointer(event);
          }}
          onKeyDown={(event) => {
            if (selectedProject) return;
            if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) {
              event.preventDefault();
              trackRef.current?.querySelector<HTMLButtonElement>('[tabindex="0"]')?.click();
              return;
            }
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();
            const cardHasFocus = (event.target as HTMLElement).hasAttribute('data-reference-card');
            if (event.key === 'Home' || event.key === 'End') {
              const { cycle, step, scale } = metricsRef.current;
              const centerOffset = ((stageRef.current?.clientWidth ?? 300) - REFERENCE_CARD_WIDTH * scale) / 2;
              setTrackPosition(cycle - centerOffset + (event.key === 'End' ? (galleryProjects.length - 1) * step : 0));
            } else stepGallery(event.key === 'ArrowRight' ? 1 : -1);
            if (cardHasFocus) trackRef.current?.querySelector<HTMLElement>('[tabindex="0"]')?.focus({ preventScroll: true });
          }}
          onClickCapture={(event) => {
            if (event.detail !== 0 && suppressClickRef.current) {
              event.preventDefault();
              event.stopPropagation();
              suppressClickRef.current = false;
              pointerDistanceRef.current = 0;
            }
          }}
          onClick={(event) => {
            if (selectedProject && event.target === event.currentTarget) closeSelection();
          }}
        >
          <div
            ref={trackRef}
            className={`portfolio-gallery-track absolute left-0 top-0 h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              width: `${REFERENCE_CYCLE_WIDTH * 5}px`,
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            {repeatedProjects.map((project, index) => {
              const patternPosition = index % REFERENCE_CARD_PATTERN.length;
              const pattern = REFERENCE_CARD_PATTERN[patternPosition];
              const left = index * REFERENCE_CARD_STEP;

              return (
                <button
                  key={project.key}
                  type="button"
                  aria-label={`Seleccionar proyecto ${project.title}`}
                  aria-haspopup="dialog"
                  tabIndex={-1}
                  data-reference-card="true"
                  className={`portfolio-gallery-card absolute left-0 overflow-hidden rounded-[16px] bg-[#DDE6EE] p-0 text-left outline-none transition-[filter] duration-500 ease-out focus-visible:ring-2 focus-visible:ring-[#2A6D98] focus-visible:ring-offset-4 focus-visible:ring-offset-white ${selectedProject ? 'blur-[6px]' : 'blur-[0px]'}`}
                  style={{
                    top: '50%',
                    transform: `translate3d(${left - INITIAL_OFFSET}px, calc(-50% + ${REFERENCE_CARD_VERTICAL_SHIFT + pattern.top}px), ${(pattern.depth + REFERENCE_DEPTH_OFFSET) * REFERENCE_DEPTH_SCALE}px) scale(${pattern.scale})`,
                    boxShadow: '0 22px 42px rgba(11, 27, 99, 0.2), 0 4px 12px rgba(11, 27, 99, 0.08)',
                    width: REFERENCE_CARD_WIDTH,
                    height: REFERENCE_CARD_WIDTH / project.aspectRatio,
                    zIndex: 1000 + pattern.depth + REFERENCE_DEPTH_OFFSET,
                    willChange: 'transform',
                  }}
                  onClick={(event) => handleProjectSelect(project, event)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="block h-full w-full object-contain object-top"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    onError={handleImgError}
                  />
                </button>
              );
            })}
          </div>

            {selectedProject && createPortal(
              <dialog
                ref={selectionRef}
                className="fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none overflow-y-auto overscroll-contain border-0 bg-transparent p-0 text-inherit backdrop:bg-[#0B1B63]/20 backdrop:backdrop-blur-sm"
                aria-labelledby="project-selection-title"
                onCancel={(event) => { event.preventDefault(); closeSelection(); }}
                onClose={() => setSelectedProject(null)}
                onKeyDown={(event) => {
                  if (event.key !== 'Tab') return;
                  const dialog = event.currentTarget as HTMLDialogElement;
                  const stops = Array.from<HTMLElement>(dialog.querySelectorAll('button:not(:disabled), a[href], [tabindex="0"]'))
                    .filter((element) => element.getClientRects().length > 0);
                  const first = stops[0];
                  const last = stops[stops.length - 1];
                  // Native modal inertness blocks the page, but Chromium may
                  // still send Tab from the last link into browser chrome.
                  if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last?.focus();
                  } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first?.focus();
                  }
                }}
              >
              <motion.div
                key="project-selection"
                className="relative flex min-h-full w-full items-center justify-center px-4 pb-8 pt-20 sm:px-6 lg:px-8"
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: 'easeOut' }}
                onClick={(event) => {
                  if (event.target === event.currentTarget) closeSelection();
                }}
              >
                <button type="button" autoFocus aria-label="Cerrar proyecto"
                  className="fixed right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-[#B8DDED] bg-white text-[#0B1B63] shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-[#2A6D98] focus-visible:ring-offset-2"
                  onClick={closeSelection}
                ><X size={22} aria-hidden="true" /></button>
                <div className="relative grid w-full max-w-[1140px] grid-cols-1 items-center gap-4 md:grid-cols-2 md:gap-6">
                  <motion.div
                    key={`project-info-${selectedKey}`}
                    className="order-2 relative flex min-w-0 cursor-default flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_28px_64px_rgba(11,27,99,0.16),0_8px_20px_rgba(11,27,99,0.08)] sm:rounded-[24px]"
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 24, y: 6, rotate: 0, scale: 0.94 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.92 }}
                    transition={backCardTransition}
                    aria-label={`Mostrar información de ${selectedProject.title}`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,#EDF8FD_0%,rgba(237,248,253,0.55)_55%,rgba(237,248,253,0)_100%)]" aria-hidden="true" />
                    <div className="relative flex h-full min-h-0 flex-col justify-center gap-4 px-5 py-5 sm:gap-5 sm:px-9 sm:py-7 lg:px-11">
                      <h3 id="project-selection-title" className="font-display text-[1.7rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0B1B63] sm:text-[2.2rem] lg:text-[2.4rem]">
                        {selectedProject.title}
                      </h3>
                      <p className="max-w-[430px] font-sans text-[13px] font-medium leading-[1.55] text-[#27396C] sm:text-[15px] lg:text-[16px]">
                        {selectedProject.description}
                      </p>
                      <ul className="flex max-w-[460px] flex-col gap-2" aria-label="Aspectos destacados del proyecto">
                        {selectedProject.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-center gap-2.5 font-sans text-[11px] font-semibold leading-[1.3] text-[#27396C] sm:text-[13px]">
                            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#B8DDED] bg-[#EDF8FD] text-[#2A6D98] sm:h-6 sm:w-6" aria-hidden="true">
                              <Check size={12} strokeWidth={2.2} />
                            </span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                      <motion.button
                        type="button"
                        className="brand-button mt-1 inline-flex w-fit items-center gap-2 px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] sm:px-6 sm:py-3 sm:text-[12px]"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 130, damping: 20, delay: 0.22 }}
                        onClick={(event) => {
                          event.stopPropagation();
                          navigate(`/proyecto/${selectedProject.id}`);
                        }}
                      >
                        Ver proyecto
                      </motion.button>
                    </div>
                  </motion.div>

                  <motion.a
                    key={`project-card-${selectedKey}`}
                    href={`/proyecto/${selectedProject.id}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      // SPA navigation for a plain left click; keep the real
                      // href so ctrl/⌘/shift/middle-click open a new tab.
                      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                      event.preventDefault();
                      navigate(`/proyecto/${selectedProject.id}`);
                    }}
                    className="group order-1 relative flex min-w-0 flex-col overflow-hidden rounded-[20px] bg-white text-left shadow-[0_24px_50px_rgba(42,40,37,0.24)] outline-none focus-visible:ring-2 focus-visible:ring-[#2A6D98] focus-visible:ring-offset-4 sm:rounded-[24px]"
                    initial={shouldReduceMotion ? false : { opacity: 1, x: -24, y: 10, rotate: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      rotate: 0,
                      scale: 1,
                    }}
                    transition={selectedCardTransition}
                    aria-label={`Ver el proyecto ${selectedProject.title}`}
                  >
                    <BrowserChrome label={selectedProject.id.replace(/-/g, ' ')} />
                    <ProjectCover project={selectedProject} />
                  </motion.a>

                </div>
              </motion.div>
              </dialog>, document.body
            )}
        </div>
      </div>

      <p id="project-gallery-help" className="sr-only">Desliza o arrastra para explorar. Usa las flechas del teclado para cambiar de proyecto e Intro para abrirlo.</p>

      <div className="mt-4 flex justify-center px-5 pb-8 sm:px-6 sm:pb-10 lg:px-8">
        <RouterLink
          to="/proyectos"
          className="brand-button group/cta inline-flex w-full min-w-0 max-w-[22rem] items-center justify-center gap-3 whitespace-nowrap px-6 py-[1.1rem] font-sans text-[1.06rem] font-semibold sm:w-auto sm:min-w-[18.5rem] sm:px-8 sm:text-[1.1rem]"
          aria-label="Ver proyectos de Icono Studio"
        >
          Ver proyectos
          <ArrowRight size={18} className="transition-transform duration-300 group-hover/cta:translate-x-1" aria-hidden="true" />
        </RouterLink>
      </div>
      </div>
    </section>
  );
}
