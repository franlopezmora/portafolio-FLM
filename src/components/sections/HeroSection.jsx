export default function HeroSection() {
  return (
    <section className="mb-16">
      {/* Bio */}
      <div className="text-left mb-8">
        <h1 className="text-2xl sm:text-3xl font-normal mb-4">
          Soy <span className="font-bold">Francisco López Mora</span>, desarrollador full‑stack.
        </h1>
        
        <div className="space-y-3 text-neutral-600 dark:text-neutral-300 max-w-[60ch]">
          <p>
            Desarrollador full-stack especializado en Java, React y microservicios. Me gustan las interfaces simples, la performance web 
            y construir cosas útiles.
          </p>
          
          <p>
            Paso mis días creando prototipos y mis noches escribiendo 
            sobre desarrollo y diseño de producto.
          </p>
        </div>
      </div>
    </section>
  );
}
