export interface NavChildLink {
  name: string;
  href: string;
}

export interface NavLink {
  name: string;
  href?: string;
  children?: NavChildLink[];
}

export const mainNavLinks: NavLink[] = [
  { name: 'Inicio', href: '/#inicio' },
  { name: 'Proyectos', href: '/proyectos' },
  {
    name: 'SERVICIOS',
    children: [
      { name: 'Diseño Web Valencia', href: '/diseno-web-valencia' },
      { name: 'Diseño Web Barcelona', href: '/diseno-web-barcelona' },
      { name: 'Diseño Web Madrid', href: '/diseno-web-madrid' },
    ],
  },
  { name: 'Soporte web', href: '/hosting-mantenimiento-web' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contacto', href: '/contacto' },
];
