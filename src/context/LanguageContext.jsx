import { createContext, useContext, useState, useEffect } from 'react';

// Traducciones
const translations = {
  ES: {
    // Hero Section
    hero: {
      kicker: "Desarrollador full-stack",
      title: "Soy Francisco López Mora, desarrollador full-stack.",
      description1: "Estudio Ingeniería en Sistemas en la UTN y trabajo desarrollando aplicaciones web. Me muevo entre frontend, backend y bases de datos, principalmente con React, Node.js, Java y PostgreSQL.",
      description2: "Actualmente estoy construyendo Pique, un sistema para clubes deportivos. También trabajo en el Sistema de Gestión Electoral, donde desarrollo funcionalidades con Java, Oracle y tecnologías enterprise.",
      primaryCta: "Ver proyectos",
      secondaryCta: "Descargar CV"
    },
    
    // Experience Section
    experience: {
      title: "Experiencia",
      description: "Experiencia en desarrollo web, sistemas empresariales e infraestructura.",
      cids: {
        period: "Abril 2025 - Presente",
        title: "Desarrollador Full Stack — Sistema de Gestión Electoral",
        company: "CIDS",
        description: "Trabajo en el Sistema de Gestión Electoral con Java, Struts, EJB, WildFly/JBoss, Oracle, Maven e Hibernate/JPA. Desarrollo validaciones y cambios solicitados por clientes, reviso código y preparo despliegues a testing."
      },
      labsis: {
        period: "Junio 2024 - Mayo 2025",
        title: "Operador de Redes",
        company: "LABSIS",
        description: "Operación y mantenimiento de infraestructura de red sísmica. Administración de servidores Linux, contenedores Docker y servicios en AWS. Monitoreo y resolución de incidencias técnicas."
      }
    },
    
    // Projects Section
    projects: {
      title: "Proyectos",
      description: "Proyectos donde combino interfaz, backend y datos para resolver necesidades concretas.",
      more: "Ver todos"
    },
    
    // Components Section
    components: {
      title: "Componentes",
      description: "Exploraciones de interacción y detalles de interfaz construidos para aprender, probar y refinar.",
      more: "Ver craft",
      vanishInput: {
        title: "Vanish Input",
        description: "Input que desaparece con animación suave"
      },
      gooeyTooltip: {
        title: "Gooey Tooltip",
        description: "Tooltip con efecto gooey y animaciones"
      },
      animatedCheckbox: {
        title: "Animated Checkbox",
        description: "Checkbox con animaciones fluidas"
      },
      pillNavBar: {
        title: "Pill Nav Bar",
        description: "Barra de navegación estilo dock con animaciones"
      }
    },
    
    // Footer
    footer: {
      copyright: "© 2026 Francisco López Mora."
    },
    
    // Proyectos Page
    proyectos: {
      title: "Proyectos y productos",
      description: "SaaS, sistemas empresariales, backoffices y herramientas construidas alrededor de necesidades concretas.",
      searchPlaceholder: "Buscar proyectos",
      project: "proyecto",
      repositories: "proyectos",
      viewOnGitHub: "Ver perfil en GitHub",
      repositoriesAlt: "Proyectos",
      githubAlt: "GitHub",
      cmdKey: "Cmd"
    },
    
    // Contact Modal
    contact: {
      title: "Contacto",
      successTitle: "¡Mensaje enviado!",
      successMessage: "¡Gracias por tu mensaje!",
      successDescription: "Te responderé lo antes posible.",
      name: "Nombre",
      email: "Email",
      subject: "Asunto",
      message: "Mensaje",
      send: "Enviar mensaje",
      sending: "Enviando...",
      required: "Todos los campos son obligatorios",
      alternativeContact: "O contacta directamente por email:",
      copyEmail: "Haz clic para copiar el email",
      close: "Cerrar modal"
    },
    
    // Header
    header: {
      contact: "Contacto",
      resume: "Descargar CV",
      english: "English",
      spanish: "Español",
      changeTheme: "Cambiar tema"
    },
    
    // Bottom Navigation
    bottomNav: {
      home: "Inicio",
      projects: "Proyectos",
      craft: "Craft"
    },
    
    // Craft Page
    craft: {
      viewPrototype: "Ver Prototipo",
      readEssay: "Leer Ensayo"
    },
    
    // PrevNext Navigation
    prevNext: {
      previous: "Anterior",
      next: "Siguiente"
    },
    
    // Essay Page
    essay: {
      back: "← Volver",
      notFound: "No encontrado",
      notFoundDescription: "El ensayo \"{slug}\" no existe.",
      untitled: "Sin título",
      loading: "Cargando…"
    },
    
    // Prototype Page
    prototype: {
      back: "← Volver",
      notFound: "No se encontró el prototipo \"{id}\".",
      defaultTitle: "Prototipo {id}",
      defaultDate: "Enero 2025",
      customCursor: {
        description: "Probá pasar el mouse por la card y el botón. El cursor reacciona a elementos interactivos."
      },
      vanishInput: {
        description: "Escribí y presioná Enter: las letras se borran y el caret regresa a su lugar.",
        placeholder: "¿Qué necesitas?"
      },
      darkModeToggle: {
        title: "Dark Mode Toggle",
        date: "Marzo 2025",
        description: "Alterná entre modo claro y oscuro para ver cómo cambian los componentes en tiempo real."
      },
      gooeyTooltip: {
        title: "Gooey Tooltip",
        date: "Marzo 2024",
        description: "Pasá el mouse por el botón para ver el tooltip con efecto 'gooey'."
      },
      pillNavDock: {
        title: "Pill Nav Dock",
        date: "Abril 2025",
        description: "Navbar dock embebida dentro de la caja."
      },
      todoList: {
        title: "Todo List + Animated Checkbox",
        date: "Mayo 2025",
        description: "Checkbox con tick animado (stroke), glow y ripple al marcar."
      },
      sidebar: {
        title: "Sidebar Demo",
        date: "Junio 2025",
        content: "Contenido"
      }
    }
  },
  
  EN: {
    // Hero Section
    hero: {
      kicker: "Full-stack developer",
      title: "I'm Francisco López Mora, a full-stack developer.",
      description1: "I study Information Systems Engineering at UTN and work developing web applications. I work across frontend, backend and databases, mainly with React, Node.js, Java and PostgreSQL.",
      description2: "I'm currently building Pique, a system for sports clubs. I also work on the Electoral Management System, where I develop features using Java, Oracle and enterprise technologies.",
      primaryCta: "View projects",
      secondaryCta: "Download resume"
    },
    
    // Experience Section
    experience: {
      title: "Experience",
      description: "Experience in web development, enterprise systems and infrastructure.",
      cids: {
        period: "April 2025 - Present",
        title: "Full Stack Developer — Electoral Management System",
        company: "CIDS",
        description: "I work on the Electoral Management System with Java, Struts, EJB, WildFly/JBoss, Oracle, Maven and Hibernate/JPA. I build validations and client-requested changes, review code and prepare testing deployments."
      },
      labsis: {
        period: "June 2024 - May 2025",
        title: "Network Operator",
        company: "LABSIS",
        description: "Operation and maintenance of seismic network infrastructure. Linux server administration, Docker containers and AWS services. Monitoring and technical incident resolution."
      }
    },
    
    // Projects Section
    projects: {
      title: "Projects",
      description: "Projects where I combine interface work, backend and data to solve concrete needs.",
      more: "View all"
    },
    
    // Components Section
    components: {
      title: "Components",
      description: "Interaction explorations and interface details built to learn, test and refine.",
      more: "View craft",
      vanishInput: {
        title: "Vanish Input",
        description: "Input that disappears with smooth animation"
      },
      gooeyTooltip: {
        title: "Gooey Tooltip",
        description: "Tooltip with gooey effect and animations"
      },
      animatedCheckbox: {
        title: "Animated Checkbox",
        description: "Checkbox with fluid animations"
      },
      pillNavBar: {
        title: "Pill Nav Bar",
        description: "Dock-style navigation bar with animations"
      }
    },
    
    // Footer
    footer: {
      copyright: "© 2026 Francisco López Mora."
    },
    
    // Proyectos Page
    proyectos: {
      title: "Projects and products",
      description: "SaaS, enterprise systems, backoffices and tools built around concrete needs.",
      searchPlaceholder: "Search projects",
      project: "project",
      repositories: "projects",
      viewOnGitHub: "View GitHub profile",
      repositoriesAlt: "Projects",
      githubAlt: "GitHub",
      cmdKey: "Cmd"
    },
    
    // Contact Modal
    contact: {
      title: "Contact",
      successTitle: "Message sent!",
      successMessage: "Thank you for your message!",
      successDescription: "I'll get back to you as soon as possible.",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send message",
      sending: "Sending...",
      required: "All fields are required",
      alternativeContact: "Or contact directly by email:",
      copyEmail: "Click to copy email",
      close: "Close modal"
    },
    
    // Header
    header: {
      contact: "Contact",
      resume: "Download CV",
      english: "English",
      spanish: "Español",
      changeTheme: "Change theme"
    },
    
    // Bottom Navigation
    bottomNav: {
      home: "Home",
      projects: "Projects",
      craft: "Craft"
    },
    
    // Craft Page
    craft: {
      viewPrototype: "View Prototype",
      readEssay: "Read Essay"
    },
    
    // PrevNext Navigation
    prevNext: {
      previous: "Previous",
      next: "Next"
    },
    
    // Essay Page
    essay: {
      back: "← Back",
      notFound: "Not found",
      notFoundDescription: "The essay \"{slug}\" does not exist.",
      untitled: "Untitled",
      loading: "Loading…"
    },
    
    // Prototype Page
    prototype: {
      back: "← Back",
      notFound: "No prototype found for \"{id}\".",
      defaultTitle: "Prototype {id}",
      defaultDate: "January 2025",
      customCursor: {
        description: "Try moving your mouse over the card and button. The cursor reacts to interactive elements."
      },
      vanishInput: {
        description: "Type and press Enter: the letters disappear and the caret returns to its place.",
        placeholder: "What do you need?"
      },
      darkModeToggle: {
        title: "Dark Mode Toggle",
        date: "March 2025",
        description: "Switch between light and dark mode to see how components change in real time."
      },
      gooeyTooltip: {
        title: "Gooey Tooltip",
        date: "March 2024",
        description: "Hover over the button to see the tooltip with a 'gooey' effect."
      },
      pillNavDock: {
        title: "Pill Nav Dock",
        date: "April 2025",
        description: "Navbar dock embedded inside the box."
      },
      todoList: {
        title: "Todo List + Animated Checkbox",
        date: "May 2025",
        description: "Checkbox with animated tick (stroke), glow and ripple when checked."
      },
      sidebar: {
        title: "Sidebar Demo",
        date: "June 2025",
        content: "Content"
      }
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'ES';
    }
    return 'ES';
  });

  // Sincronizar con localStorage al montar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && (savedLanguage === 'ES' || savedLanguage === 'EN')) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  const t = (key, variables = {}) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    let result = value || key;
    
    // Handle variable interpolation
    if (typeof result === 'string' && Object.keys(variables).length > 0) {
      Object.entries(variables).forEach(([varKey, varValue]) => {
        result = result.replace(new RegExp(`{${varKey}}`, 'g'), varValue);
      });
    }
    
    return result;
  };

  const changeLanguage = (newLanguage) => {
    // Efecto visual similar a F5 sin recargar
    if (typeof window !== 'undefined') {
      // Detectar modo oscuro
      const isDark = document.documentElement.classList.contains('dark') || 
                     (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      // Crear overlay que simula el refresh de F5
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${isDark ? '#171717' : 'white'};
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.2s ease;
      `;
      
      document.body.appendChild(overlay);
      
      // Aplicar efecto de fade in (como F5)
      setTimeout(() => {
        overlay.style.opacity = '1';
        
        // Cambiar idioma cuando el overlay esté visible
        setTimeout(() => {
          setLanguage(newLanguage);
          localStorage.setItem('language', newLanguage);
          
          // Fade out para mostrar el contenido actualizado
          setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
              if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
              }
            }, 200);
          }, 100);
        }, 50);
      }, 10);
    } else {
      setLanguage(newLanguage);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
