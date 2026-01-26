import { useState, useEffect } from 'react';
import { X, Mail, Send, CheckCircle, Copy, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';
import { useLanguage } from '../context/LanguageContext';

export default function ContactModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        // Limpiar estados de hover antes de cerrar
        document.activeElement?.blur();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Resetear formulario cuando se abre/cierra
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
      setIsSubmitting(false);
      setEmailCopied(false);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('franciscolopezmora3@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar email:', err);
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = 'franciscolopezmora3@gmail.com';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Verificar si EmailJS está configurado
      if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE') { // TODO: Cambiar por la clave pública de EmailJS  de acuerdo a la configuración de EmailJS
        console.warn('EmailJS no está configurado. Simulando envío...');
        // Simular envío si no está configurado
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        // Enviar email real con EmailJS
        // Incluir el email del remitente en el mensaje
        const messageWithEmail = `Email del remitente: ${formData.email}\n\n${formData.message}`;
        
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: messageWithEmail,
          to_email: EMAILJS_CONFIG.TO_EMAIL
        };

        const result = await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY // TODO: Cambiar por la clave pública de EmailJS de acuerdo a la configuración de EmailJS 
        );

        console.log('Email enviado exitosamente:', result);
      }
      
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Cerrar modal después de 2 segundos
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      setIsSubmitting(false);
      // Aquí podrías mostrar un mensaje de error al usuario
      alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o contacta directamente por email.');
    }
  };

  // No renderizar si no está abierto
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white">
              {isSubmitted ? t('contact.successTitle') : t('contact.title')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            // Estado de éxito
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                {t('contact.successMessage')}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {t('contact.successDescription')}
              </p>
            </div>
          ) : (
            // Formulario
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  <span className="text-red-500 mr-1">*</span>
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 focus:border-transparent transition-colors"
                  placeholder="Tu nombre" // TODO: Cambiar por el nombre de la persona que contacta
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  <span className="text-red-500 mr-1">*</span>
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 focus:border-transparent transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  <span className="text-red-500 mr-1">*</span>
                  {t('contact.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 focus:border-transparent transition-colors"
                  placeholder="¿En qué puedo ayudarte?" // TODO: Cambiar por el asunto de la consulta
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  <span className="text-red-500 mr-1">*</span>
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 focus:border-transparent transition-colors resize-none"
                  placeholder="Contáme más detalles..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2 rounded-md font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white dark:border-neutral-900 border-t-transparent rounded-full animate-spin" />
                    <span>{t('contact.sending')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('contact.send')}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        {!isSubmitted && (
          <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
            <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
              {t('contact.alternativeContact')}{' '}
              <button 
                onClick={handleCopyEmail}
                className="text-neutral-700 dark:text-neutral-300 hover:underline inline-flex items-center space-x-1 group"
                title={t('contact.copyEmail')}
              >
                <span>franciscolopezmora3@gmail.com</span>
                {emailCopied ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}