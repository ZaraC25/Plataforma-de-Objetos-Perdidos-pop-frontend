import { Link } from 'react-router-dom';
import { PackageSearch, Search, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-bg font-sans overflow-x-hidden">
      
      {/* Navbar Flotante */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 text-xl font-extrabold text-brand-dark tracking-tight">
            <div className="p-2 bg-brand-bg rounded-xl">
              <PackageSearch className="text-brand-green" size={24} />
            </div>
            POP - U
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
            <a href="#" className="text-brand-dark transition-colors">Productos</a>
            <a href="#" className="hover:text-brand-dark transition-colors">Soluciones</a>
            <a href="#" className="hover:text-brand-dark transition-colors">Precios</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-brand-light hover:text-brand-dark transition-colors">
              Iniciar Sesión
            </Link>
            <Link 
              to="/app" 
              className="hidden md:flex bg-brand-green text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-green-600 transition-all shadow-lg shadow-brand-green/30 items-center gap-2"
            >
              Ir al Catálogo <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section Centrado (Estilo Zenkit) */}
      <section className="relative pt-44 pb-28 px-6 text-center">
        {/* Fondos difuminados (Blobs) con los colores institucionales */}
        <div className="absolute top-10 left-1/4 w-[30rem] h-[30rem] bg-brand-light rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-1/4 w-[30rem] h-[30rem] bg-brand-green rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-[30rem] h-[30rem] bg-brand-dark rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white text-brand-light font-bold text-xs uppercase tracking-wider mb-8 shadow-sm border border-brand-light/20">
            La plataforma oficial de la universidad
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-brand-dark tracking-tight leading-[1.1] mb-8">
            Productividad para <br className="hidden md:block"/> 
            <span className="text-brand-green">mentes tranquilas.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            La suite centralizada de la universidad para reportar, buscar y recuperar objetos perdidos de forma rápida, segura y auditada.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/app" 
              className="w-full sm:w-auto bg-brand-dark text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-light transition-all shadow-xl shadow-brand-dark/30 flex items-center justify-center gap-2"
            >
              Ver Objetos Encontrados
            </Link>
            <Link 
              to="/login" 
              className="w-full sm:w-auto bg-white text-brand-dark border border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Tarjetas (Estilo Zenkit) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-brand-light font-bold tracking-widest text-sm uppercase mb-3">Servicios</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-brand-dark">Llevando tu tranquilidad al siguiente nivel</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Tarjeta 1 */}
          <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-32 h-32 mb-8 rounded-full bg-gradient-to-br from-blue-50 to-brand-light/20 flex items-center justify-center relative overflow-hidden">
              <Search size={48} className="text-brand-light group-hover:scale-110 transition-transform relative z-10" />
            </div>
            <h4 className="text-xl font-bold text-brand-dark mb-3">Busca y Encuentra</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Explora el catálogo público de objetos que han sido entregados en las oficinas de la universidad.
            </p>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-32 h-32 mb-8 rounded-full bg-gradient-to-br from-green-50 to-brand-green/20 flex items-center justify-center relative overflow-hidden">
              <ShieldCheck size={48} className="text-brand-green group-hover:scale-110 transition-transform relative z-10" />
            </div>
            <h4 className="text-xl font-bold text-brand-dark mb-3">Reclama Seguro</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Demuestra que es tuyo con nuestra descripción privada y fotos. Solo el encargado verá tus pruebas.
            </p>
          </div>

          {/* Tarjeta 3 */}
          <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-32 h-32 mb-8 rounded-full bg-gradient-to-br from-gray-50 to-brand-dark/10 flex items-center justify-center relative overflow-hidden">
              <CheckCircle2 size={48} className="text-brand-dark group-hover:scale-110 transition-transform relative z-10" />
            </div>
            <h4 className="text-xl font-bold text-brand-dark mb-3">Recupera Rápido</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Coordina con los encargados y recoge tu objeto con la certeza de un proceso auditado y transparente.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}