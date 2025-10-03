import { createContext, useContext, useState, useEffect } from 'react';

// Traducciones
const translations = {
  ES: {
    // Hero Section
    hero: {
      title: "Soy <strong>Francisco López Mora</strong>, desarrollador full‑stack.",
      description1: "Desarrollador full-stack especializado en Java, React y microservicios. Me gustan las interfaces simples, la performance web y construir cosas útiles.",
      description2: "Paso mis días creando prototipos y mis noches escribiendo sobre desarrollo y diseño de producto."
    },
    
    // Experience Section
    experience: {
      title: "Experiencia",
      cids: {
        period: "Abril 2025 - Presente",
        title: "Desarrollador Full Stack",
        company: "CIDS",
        description: "Desarrollador de software con foco en backend Java y frontend AngularJS, participando en el Sistema de Gestión Electoral a nivel nacional. Diseño e implementación de APIs, consultas SQL optimizadas y reportes con JasperReports. Trabajo ágil (Scrum/Kanban), automatización de despliegues y mejoras de seguridad end-to-end."
      },
      labsis: {
        period: "Junio 2024 - Mayo 2025",
        title: "Operador de Redes",
        company: "LABSIS",
        description: "Operación y mantenimiento de infraestructura de red sísmica. Administración de servidores Linux, gestión de contenedores Docker y despliegue de servicios en AWS. Monitoreo continuo de sistemas críticos y resolución de incidencias técnicas."
      }
    },
    
    // Projects Section
    projects: {
      title: "Proyectos",
      more: "Más"
    },
    
    // Components Section
    components: {
      title: "Componentes",
      more: "Más",
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
      copyright: "© 2025 Francisco López Mora."
    },
    
    // Proyectos Page
    proyectos: {
      searchPlaceholder: "Buscar Repositorios",
      repositories: "repositorios",
      viewOnGitHub: "Ver en GitHub",
      repositoriesAlt: "Repositorios",
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
      copyEmail: "Haz clic para copiar el email"
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
      title: "I'm <strong>Francisco López Mora</strong>, full‑stack developer.",
      description1: "Full-stack developer specialized in Java, React and microservices. I like simple interfaces, web performance and building useful things.",
      description2: "I spend my days creating prototypes and my nights writing about development and product design."
    },
    
    // Experience Section
    experience: {
      title: "Experience",
      cids: {
        period: "April 2025 - Present",
        title: "Full Stack Developer",
        company: "CIDS",
        description: "Software developer focused on Java backend and AngularJS frontend, participating in the National Electoral Management System. API design and implementation, optimized SQL queries and JasperReports reports. Agile work (Scrum/Kanban), deployment automation and end-to-end security improvements."
      },
      labsis: {
        period: "June 2024 - May 2025",
        title: "Network Operator",
        company: "LABSIS",
        description: "Operation and maintenance of seismic network infrastructure. Linux server administration, Docker container management and AWS service deployment. Continuous monitoring of critical systems and technical incident resolution."
      }
    },
    
    // Projects Section
    projects: {
      title: "Projects",
      more: "More"
    },
    
    // Components Section
    components: {
      title: "Components",
      more: "More",
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
      copyright: "© 2025 Francisco López Mora."
    },
    
    // Proyectos Page
    proyectos: {
      searchPlaceholder: "Search Repositories",
      repositories: "repositories",
      viewOnGitHub: "View on GitHub",
      repositoriesAlt: "Repositories",
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
      copyEmail: "Click to copy email"
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
