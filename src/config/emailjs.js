// Configuración de EmailJS
// IMPORTANTE: Reemplaza estos valores con tus credenciales reales de EmailJS

export const EMAILJS_CONFIG = {
  // Tu Public Key de EmailJS (lo encuentras en Account > API Keys)
  PUBLIC_KEY: 'zkz2JGoQacyj0djIg',
  
  // ID del servicio de email (ej: Gmail, Outlook, etc.)
  SERVICE_ID: 'service_di2u2tw',
  
  // ID de la plantilla de email
  TEMPLATE_ID: 'template_1k7bwag',
  
  // Email de destino (tu email)
  TO_EMAIL: 'franciscolopezmora3@gmail.com'
};

// Función para inicializar EmailJS
export const initEmailJS = () => {
  console.log('EmailJS configurado correctamente');
};
