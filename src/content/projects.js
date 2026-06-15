// Fuente de datos para la sección de proyectos destacados del Home y la página Proyectos
export const projects = [
  {
    id: "pique",
    title: "Pique",
    description: {
      ES: "Mi principal proyecto de producto: un SaaS multi-club para gestionar reservas, agenda, clientes, pagos, caja, clases, stock y operaciones diarias.",
      EN: "My main product project: a multi-club SaaS for managing reservations, schedules, clients, payments, cash, classes, stock and daily operations."
    },
    category: { ES: "Plataforma para clubes", EN: "Multi-club platform" },
    badge: { ES: "Producto principal", EN: "Main product" },
    tags: [
      "SaaS",
      { ES: "Múltiples clubes", EN: "Multi-club" },
      { ES: "Reservas", EN: "Reservations" },
      { ES: "Pagos", EN: "Payments" },
    ],
    href: "https://pique.ar/",
    updated: true,
  },
  {
    id: "sge",
    title: "SGE — Sistema de Gestión Electoral",
    description: {
      ES: "Experiencia profesional full-stack en un sistema empresarial: validaciones, requerimientos de clientes, análisis técnico, revisión de código y despliegues a testing.",
      EN: "Professional full-stack work on an enterprise system: validations, client requests, technical analysis, code review and testing deployments."
    },
    category: { ES: "Experiencia profesional", EN: "Professional experience" },
    badge: { ES: "Sistema interno", EN: "Internal system" },
    tags: [
      "Java",
      "Struts / EJB",
      "Oracle",
      { ES: "Validaciones", EN: "Validations" },
      { ES: "Despliegues", EN: "Deployments" },
    ],
  },
  {
    id: "calip-backoffice",
    title: "Calip",
    description: {
      ES: "Backoffice orientado a operaciones comerciales, con flujos de ventas, inventario, pagos, caja y dashboards administrativos.",
      EN: "Operations-focused backoffice with sales, inventory, payments, cash register and administrative dashboard workflows."
    },
    category: { ES: "Gestión comercial", EN: "Commercial operations" },
    badge: { ES: "Panel de gestión privado", EN: "Private backoffice" },
    tags: [
      { ES: "Panel de gestión", EN: "Backoffice" },
      { ES: "Ventas", EN: "Sales" },
      { ES: "Inventario", EN: "Inventory" },
      { ES: "Caja y pagos", EN: "Cash and payments" },
    ],
    href: "https://calip-backoffice-storefront.vercel.app/",
  },
  {
    id: "cruma",
    title: "CRUMA",
    description: {
      ES: "Producto web para planificar horarios universitarios y resolver conflictos de materias y correlativas.",
      EN: "Web product for planning university schedules and resolving course and prerequisite conflicts."
    },
    category: { ES: "Producto web", EN: "Web product" },
    year: 2025,
    tags: ["React", "Java", "Spring Boot", "PostgreSQL", "Docker"],
    href: "https://www.cruma.app/",
    github: "https://github.com/franlopezmora/cruma",
    githubOwner: "franlopezmora",
    githubRepo: "cruma",
    updated: true,
  },
  {
    id: "link-shorter",
    title: "Link Shortener",
    description: {
      ES: "Producto full-stack para crear, administrar y compartir enlaces cortos con autenticación y persistencia.",
      EN: "Full-stack product for creating, managing and sharing short links with authentication and persistence."
    },
    category: { ES: "Producto full-stack", EN: "Full-stack product" },
    year: 2025,
    tags: ["Next.js", "NextAuth", "Prisma", "Node.js", "PostgreSQL", "TypeScript"],
    href: "https://link-shortener-flm.vercel.app/",
    github: "https://github.com/franlopezmora/link-shortener",
    githubOwner: "franlopezmora",
    githubRepo: "link-shortener",
  },
  {
    id: "colorcheck",
    title: "ColorCheck",
    description: {
      ES: "Herramienta web para analizar contraste y accesibilidad en paletas de colores.",
      EN: "Web tool for analyzing contrast and accessibility across color palettes."
    },
    category: { ES: "Herramienta web", EN: "Web tool" },
    year: 2025,
    tags: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"],
    href: "https://color-check-six.vercel.app",
    github: "https://github.com/franlopezmora/colorcheck",
    githubOwner: "franlopezmora",
    githubRepo: "colorcheck",
  },
  {
    id: "chess-analyzer",
    title: "Chess Analyzer",
    description: {
      ES: "Aplicación web para analizar partidas de ajedrez y convertir movimientos en información útil.",
      EN: "Web application for analyzing chess games and turning moves into useful information."
    },
    category: { ES: "Aplicación web", EN: "Web application" },
    year: 2025,
    tags: ["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS"],
    href: "https://chess-analyzer-puce.vercel.app/",
    github: "https://github.com/franlopezmora/chess-analyzer",
    githubOwner: "franlopezmora",
    githubRepo: "chess-analyzer",
    status: "beta",
  },
  {
    id: "tpi-backend",
    title: "Driver Test Manager",
    description: {
      ES: "Sistema distribuido con microservicios para coordinar pruebas de manejo, interesados y notificaciones.",
      EN: "Distributed microservices system for coordinating driving tests, applicants and notifications."
    },
    category: { ES: "Sistema distribuido", EN: "Distributed system" },
    year: 2025,
    tags: ["Next.js", "Java", "Spring Boot", "PostgreSQL", "Docker", "JWT"],
    href: "/essay/crafting-tpi-backend",
    github: "https://github.com/franlopezmora/TPI-BDA",
    githubOwner: "franlopezmora",
    githubRepo: "TPI-BDA",
  },
];
