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
    legal: "Aviso legal",
    rss: "RSS",
  },
  about: {
    metaTitle: "Sobre Fran Roldán, desarrollador full-stack",
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
    metaTitle: "Proyectos de software",
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
    metaDescription:
      "Escribe a Fran Roldán (ROLTEK) para hablar de aplicaciones web, apps móviles nativas o un reto de ingeniería de software.",
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
    metaDescription: "Cómo trata roltek.es tus datos personales y qué cookies usa.",
    eyebrow: "Legal",
    title: "Política de privacidad",
    updated: "Última actualización",
    sections: [
      {
        title: "Responsable del tratamiento",
        body: [
          "{name} (NIF {taxId}), con domicilio en {address}, es el responsable de los datos personales que se traten a través de {domain}, el sitio web que publico bajo el nombre ROLTEK. Puedes contactar conmigo en {email}.",
        ],
      },
      {
        title: "Qué datos trato",
        body: [
          "Este sitio no tiene cuentas de usuario, formularios, analítica ni rastreadores publicitarios.",
          "Solo trato los datos que tú me envías por correo electrónico (tu dirección, tu nombre si lo indicas y el contenido del mensaje) y los datos técnicos que cualquier servidor web registra al servir las páginas, como la dirección IP, el navegador y la fecha de la visita.",
          "Escribirme es voluntario. Si no me facilitas un email, simplemente no podré responderte.",
        ],
      },
      {
        title: "Finalidad y base jurídica",
        body: [
          "Uso los datos de tus mensajes únicamente para responderte y mantener la conversación que inicies. La base jurídica es mi interés legítimo en atender las consultas que recibo y, si me escribes para proponer un proyecto, la aplicación de medidas precontractuales a petición tuya (art. 6.1.f y 6.1.b del RGPD).",
          "Los registros técnicos del servidor se tratan por el interés legítimo en servir el sitio de forma segura y prevenir abusos (art. 6.1.f del RGPD).",
          "No tomo decisiones automatizadas ni elaboro perfiles.",
        ],
      },
      {
        title: "Cuánto tiempo conservo los datos",
        body: [
          "Conservo los correos el tiempo necesario para atender tu consulta y, como máximo, dos años desde el último contacto, salvo que me pidas antes su supresión o que deban conservarse para cumplir una obligación legal.",
          "Los registros técnicos los conserva el proveedor de alojamiento durante periodos breves, según su propia política.",
        ],
      },
      {
        title: "Destinatarios",
        body: [
          "No cedo tus datos a terceros salvo obligación legal. Para funcionar, el sitio se apoya en proveedores que actúan como encargados del tratamiento: Vercel Inc. (alojamiento web) y Cloudflare, Inc. (recepción y reenvío del correo de {domain}), además del proveedor del buzón en el que leo ese correo.",
        ],
      },
      {
        title: "Transferencias internacionales",
        body: [
          "Vercel y Cloudflare son empresas de Estados Unidos, por lo que algunos datos pueden tratarse fuera del Espacio Económico Europeo. Ambas están adheridas al Marco de Privacidad de Datos UE-EE. UU. (Data Privacy Framework), que la Comisión Europea reconoce como garantía de un nivel de protección adecuado.",
        ],
      },
      {
        title: "Cookies",
        body: [
          "{domain} no usa cookies de analítica, de publicidad ni de terceros. Por eso no verás un aviso de cookies.",
          "Solo existe una cookie propia y técnica, NEXT_LOCALE, que se guarda cuando cambias el idioma manualmente para recordar tu elección. Dura un año, no contiene datos personales y no se usa para rastrearte. Al ser necesaria para una función que tú solicitas, no requiere consentimiento (art. 22.2 de la LSSI). Puedes borrarla cuando quieras desde la configuración de tu navegador.",
        ],
      },
      {
        title: "Tus derechos",
        body: [
          "Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a {email}. Te responderé en el plazo máximo de un mes.",
          "Si consideras que no he tratado tus datos correctamente, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).",
        ],
      },
      {
        title: "Cambios en esta política",
        body: [
          "Si esta política cambia, actualizaré la fecha que aparece al principio de la página.",
        ],
      },
    ],
  },
  legal: {
    metaTitle: "Aviso legal",
    metaDescription: "Titular, condiciones de uso y propiedad intelectual de roltek.es.",
    eyebrow: "Legal",
    title: "Aviso legal",
    updated: "Última actualización",
    owner: {
      name: "Titular",
      taxId: "NIF",
      address: "Domicilio",
      email: "Email",
    },
    sections: [
      {
        title: "Titular del sitio web",
        body: [
          "En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), se informa de que {domain} es el sitio web personal de {name}, cuyos datos identificativos aparecen arriba.",
          "ROLTEK es el nombre con el que publico mi trabajo; no es una sociedad ni una marca registrada. El sitio no vende productos ni presta servicios a través de internet: su finalidad es dar a conocer mis proyectos y mi trayectoria profesional.",
        ],
      },
      {
        title: "Condiciones de uso",
        body: [
          "El acceso al sitio es gratuito y no requiere registro. Al navegar por él te comprometes a usarlo de forma lícita, sin dañar su funcionamiento ni intentar acceder a partes que no son públicas.",
        ],
      },
      {
        title: "Propiedad intelectual",
        body: [
          "Los textos, diseños, logotipos, imágenes y el código propio del sitio pertenecen a {name}, salvo que se indique otra cosa. Puedes enlazar y citar el contenido indicando la fuente; para cualquier otro uso, pide permiso antes.",
          "El código publicado en repositorios abiertos se rige por la licencia indicada en cada repositorio. Los nombres y marcas de terceros pertenecen a sus respectivos titulares.",
        ],
      },
      {
        title: "Responsabilidad",
        body: [
          "Intento que la información sea correcta y esté actualizada, pero no puedo garantizar que esté libre de errores ni que el sitio esté siempre disponible.",
          "Los enlaces a sitios externos se ofrecen por comodidad. No controlo su contenido ni respondo de él.",
        ],
      },
      {
        title: "Protección de datos",
        body: [
          "Cómo se tratan tus datos personales y qué cookies usa el sitio se explica en la política de privacidad, enlazada en el pie de página.",
        ],
      },
      {
        title: "Legislación aplicable",
        body: [
          "Este aviso legal se rige por la legislación española. Cualquier controversia se someterá a los juzgados y tribunales que correspondan conforme a la ley; si actúas como consumidor, a los de tu domicilio.",
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
