import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Guardar la posición del scroll antes de la animación
    const scrollY = window.scrollY;
    
    // Activar la animación automáticamente con el delay especificado
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Restaurar la posición del scroll después de un breve delay
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 50);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  return [ref, isVisible];
};
