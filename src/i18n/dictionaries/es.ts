import type { Dictionary } from "./en";

const es: Dictionary = {
  meta: {
    title: "ROLTEK — Ingeniería de software por Fran Roldán",
    description:
      "ROLTEK es la marca de ingeniería de software de Fran Roldán: aplicaciones web, productos móviles nativos y sistemas digitales bien construidos.",
  },
  a11y: {
    skipToContent: "Saltar al contenido",
    mainNav: "Navegación principal",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
    home: "ROLTEK, inicio",
    externalLink: "se abre en una pestaña nueva",
  },
  nav: {
    home: "Inicio",
    projects: "Proyectos",
    about: "Sobre mí",
    blog: "Blog",
    contact: "Contacto",
  },
  common: {
    contactCta: "Hablemos",
    viewProject: "Ver caso de estudio",
    allProjects: "Todos los proyectos",
    readMore: "Leer artículo",
    backTo: "Volver a",
    year: "Año",
    status: "Estado",
    stack: "Stack",
    category: "Categoría",
    sourceCode: "Código fuente",
    liveSite: "En vivo",
    copyEmail: "Copiar email",
    copied: "Copiado",
    minRead: "min de lectura",
    published: "Publicado",
    updated: "Actualizado",
  },
  status: {
    "in-development": "En desarrollo",
    beta: "Beta",
    live: "Publicado",
    archived: "Archivado",
  },
  categories: {
    all: "Todos",
    web: "Web",
    mobile: "Móvil",
    backend: "Backend",
    "open-source": "Open Source",
  },
  postCategories: {
    swiftui: "SwiftUI",
    kotlin: "Kotlin",
    react: "React",
    architecture: "Arquitectura",
    engineering: "Ingeniería",
  },
  hero: {
    eyebrow: "Ingeniería de software · Productos digitales",
    titleLine1: "Construyo software.",
    titleLine2: "Diseño experiencias.",
    subtitle:
      "Soy Fran Roldán, desarrollador de software. Diseño y construyo experiencias digitales, aplicaciones web y productos móviles con una mentalidad centrada en la ingeniería.",
    primaryCta: "Explorar proyectos",
    secondaryCta: "Sobre mí",
    diagramLabel:
      "Diagrama abstracto de un sistema de software: un cliente conectado mediante una API a servicios y datos.",
  },
  featured: {
    index: "01",
    label: "Trabajo seleccionado",
    title: "Productos construidos de principio a fin.",
    intro:
      "Desde la primera decisión de arquitectura hasta el último detalle de interacción. Cada proyecto se documenta como un caso de estudio.",
    moreSoon: "Más proyectos en camino",
    moreSoonText:
      "Aquí se publicarán nuevos productos y trabajo open source a medida que vean la luz.",
  },
  expertise: {
    index: "02",
    label: "Especialidad",
    title: "Donde más valor aporto.",
    items: [
      {
        title: "Software Engineering",
        description:
          "Código limpio, tipado y probado. Decisiones documentadas para que el sistema pueda crecer sin miedo.",
        tags: ["TypeScript", "Java", "Testing", "Code review"],
      },
      {
        title: "Web Applications",
        description:
          "Interfaces rápidas y accesibles con React y Next.js, diseñadas en torno a flujos de usuario reales.",
        tags: ["React", "Next.js", "Tailwind CSS", "Accesibilidad"],
      },
      {
        title: "Native Mobile Development",
        description:
          "Apps nativas para plataformas Apple y Android, respetando las convenciones de cada ecosistema.",
        tags: ["Swift", "SwiftUI", "Kotlin", "watchOS"],
      },
      {
        title: "Architecture & APIs",
        description:
          "Backends y APIs con límites claros, contratos predecibles y margen para escalar.",
        tags: ["Spring Boot", "REST", "Modelado de datos", "Integración"],
      },
    ],
  },
  philosophy: {
    index: "03",
    label: "Filosofía",
    title: "El buen software es más que código.",
    lead: "El código es el material. Lo que importa es lo que hace posible y cuánto tiempo sigue funcionando bien.",
    principles: [
      {
        title: "Arquitectura",
        text: "La estructura decide lo fácil que será el siguiente cambio. Diseño los límites antes de escribir funcionalidades.",
      },
      {
        title: "Rendimiento",
        text: "La velocidad es una funcionalidad. Medida, presupuestada y protegida desde el primer commit.",
      },
      {
        title: "Experiencia de usuario",
        text: "Cada decisión técnica termina en una persona usando el producto. Esa es la prueba real.",
      },
      {
        title: "Mantenibilidad",
        text: "El software vive durante años. El código legible y la documentación honesta son una forma de respeto.",
      },
    ],
  },
  now: {
    index: "04",
    label: "En construcción",
    title: "En el banco de trabajo.",
    viewCase: "Caso de estudio",
  },
  contactCta: {
    titleLine1: "¿Tienes algo en mente?",
    titleLine2: "Construyámoslo.",
    text: "Cuéntame tu idea, producto o reto técnico. Suelo responder en pocos días.",
    emailCta: "Escribir un email",
  },
  footer: {
    tagline:
      "Ingeniería de software y productos digitales por Fran Roldán.",
    navigation: "Navegación",
    elsewhere: "En otros sitios",
    rights: "Todos los derechos reservados.",
    privacy: "Privacidad",
    rss: "RSS",
  },
  about: {
    metaTitle: "Sobre mí",
    metaDescription:
      "Fran Roldán, desarrollador de software full-stack detrás de ROLTEK. React, TypeScript, Java, Spring Boot y desarrollo móvil nativo.",
    eyebrow: "Sobre mí",
    title: "Ingeniero de oficio. Constructor por naturaleza.",
    intro: [
      "Soy Fran Roldán, desarrollador de software y la persona detrás de ROLTEK.",
      "Trabajo como desarrollador full-stack: construyo interfaces con React y TypeScript, y backends y APIs con Java y Spring Boot. Disfruto teniendo la visión completa, desde el modelo de datos hasta el último detalle de interacción.",
      "Me estoy especializando progresivamente en desarrollo móvil nativo para iOS y Android, porque creo que las mejores experiencias nacen de respetar cada plataforma.",
    ],
    roltekTitle: "Por qué ROLTEK",
    roltekText:
      "ROLTEK es mi marca personal de ingeniería y el paraguas de los productos que construyo. Un nombre que deja que el trabajo hable primero, y un hogar para futuras apps como StepOrbit.",
    philosophyTitle: "Cómo trabajo",
    philosophy: [
      {
        title: "Entender antes de construir",
        text: "Primero el problema, después la solución. Un modelo claro del dominio ahorra semanas de código.",
      },
      {
        title: "Tipado, probado, revisado",
        text: "Los tipos estrictos y los tests con sentido hacen que cambiar sea barato y refactorizar, seguro.",
      },
      {
        title: "Pasos pequeños, feedback real",
        text: "Entregar de forma incremental, medir y ajustar. El uso real gana a las suposiciones.",
      },
    ],
    stackTitle: "Stack",
    stack: [
      { group: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS"] },
      { group: "Backend", items: ["Java", "Spring Boot", "APIs REST"] },
      { group: "Móvil", items: ["Swift", "SwiftUI", "Kotlin"] },
    ],
    card: {
      name: "Nombre",
      role: "Rol",
      brand: "Marca",
      roleValue: "Desarrollador de software full-stack",
    },
    linksTitle: "Encuéntrame",
  },
  projects: {
    metaTitle: "Proyectos",
    metaDescription:
      "Proyectos y productos diseñados y desarrollados por Fran Roldán bajo ROLTEK.",
    eyebrow: "Proyectos",
    title: "Trabajo, documentado.",
    intro:
      "Productos y experimentos construidos de principio a fin. Cada uno con su contexto, sus decisiones y sus compromisos.",
    filterLabel: "Filtrar por categoría",
    empty: "Todavía no hay proyectos en esta categoría.",
    count: "proyectos",
    countOne: "proyecto",
  },
  project: {
    overview: "Resumen",
    challenges: "Retos",
    solutions: "Enfoque",
    outcomes: "Resultados",
    gallery: "Galería",
    inProgressNote:
      "Este proyecto está en desarrollo activo. Este caso de estudio crecerá a medida que evolucione.",
    next: "Siguiente proyecto",
  },
  blog: {
    metaTitle: "Blog",
    metaDescription:
      "Artículos técnicos sobre SwiftUI, Kotlin, React, arquitectura e ingeniería de software.",
    eyebrow: "Blog",
    title: "Notas desde el banco de trabajo.",
    intro:
      "Escritura técnica sobre SwiftUI, Kotlin, React, arquitectura y el oficio del software.",
    emptyTitle: "Los primeros artículos se están escribiendo.",
    emptyText:
      "Suscríbete al feed RSS para enterarte cuando se publiquen.",
    toc: "En esta página",
    draft: "Borrador · solo visible en desarrollo",
  },
  contact: {
    metaTitle: "Contacto",
    metaDescription: "Ponte en contacto con Fran Roldán en ROLTEK.",
    eyebrow: "Contacto",
    title: "Hablemos.",
    intro:
      "Tanto si tienes una idea de producto, un reto técnico o simplemente quieres saludar, el email es la mejor forma de contactar conmigo.",
    emailLabel: "Email",
    githubLabel: "GitHub",
    githubText: "Código, experimentos y trabajo open source.",
  },
  privacy: {
    metaTitle: "Política de privacidad",
    metaDescription: "Cómo trata roltek.es tus datos.",
    eyebrow: "Legal",
    title: "Política de privacidad",
    updated: "Última actualización",
    sections: [
      {
        title: "Responsable",
        body: [
          "Este sitio web lo gestiona Fran Roldán bajo la marca ROLTEK. Para cualquier cuestión sobre privacidad puedes escribir al email de contacto indicado más abajo.",
        ],
      },
      {
        title: "Datos que recoge este sitio",
        body: [
          "Este sitio no tiene cuentas de usuario, formularios de contacto, analítica ni rastreadores publicitarios.",
          "Si me escribes un email, usaré tu dirección y tu mensaje únicamente para responderte, y no los compartiré con terceros.",
        ],
      },
      {
        title: "Cookies",
        body: [
          "El sitio solo guarda una cookie técnica (NEXT_LOCALE) cuando cambias el idioma manualmente, para recordar tu elección. No contiene datos personales ni se usa para rastrearte.",
        ],
      },
      {
        title: "Alojamiento",
        body: [
          "El sitio está alojado en Vercel, que puede tratar datos técnicos como tu dirección IP en los registros del servidor para servir las páginas y proteger el servicio.",
        ],
      },
      {
        title: "Tus derechos",
        body: [
          "Puedes solicitar el acceso, la rectificación o la supresión de cualquier dato personal que me hayas enviado escribiendo al email de contacto.",
        ],
      },
    ],
  },
  notFound: {
    code: "404",
    title: "Esta ruta no existe.",
    text: "Puede que la página se haya movido o que la dirección no sea correcta.",
    cta: "Volver al inicio",
  },
  error: {
    title: "Algo ha fallado.",
    text: "Se ha producido un error inesperado al cargar esta página.",
    retry: "Reintentar",
  },
};

export default es;
