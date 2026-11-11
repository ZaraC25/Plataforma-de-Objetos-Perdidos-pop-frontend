import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { toast } from 'sonner';
import { PackageSearch, ArrowLeft } from 'lucide-react';

export function RegistroPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correoInstitucional: '',
    identificadorInstitucional: '',
    contrasena: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/registro', formData);
      if (response.data.success) {
        toast.success('¡Cuenta creada exitosamente! Ya puedes iniciar sesión.');
        navigate('/login');
      }
    } catch (error: any) {
      console.error("Error del backend:", error.response?.data);
      // Mostramos el mensaje detallado que envía el backend
      const msg = error.response?.data?.message || 'Error al registrarse. Revisa los datos.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-brand-bg font-sans">
      {/* Lado Izquierdo (Branding) */}
      <div className="hidden lg:flex w-1/2 relative bg-brand-dark overflow-hidden flex-col justify-center px-16 text-white">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-light rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-brand-green rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-4 mb-8 hover:opacity-80 transition">
            <div className="bg-white p-3 rounded-2xl">
              <PackageSearch size={40} className="text-brand-dark" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">Plataforma POP</h1>
          </Link>
          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Únete a la <br />
            <span className="text-brand-green">comunidad</span> universitaria.
          </h2>
          <p className="text-brand-light text-lg max-w-md">
            Crea tu cuenta para reportar objetos perdidos y reclamar los que encuentres.
          </p>
        </div>
      </div>

      {/* Lado Derecho (Formulario) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl shadow-brand-dark/5">
          
          <Link to="/login" className="inline-flex items-center gap-2 text-brand-light mb-6 hover:text-brand-dark transition">
            <ArrowLeft size={18} /> Volver al login
          </Link>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Crear Cuenta</h2>
            <p className="text-gray-500">Ingresa tus datos para registrarte</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre Completo</label>
              <input
                type="text" required
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                className="w-full px-4 py-2.5 bg-brand-bg border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-light focus:bg-white transition-all"
                placeholder="Ej: Juan Pérez"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Institucional</label>
              <input
                type="email" required
                value={formData.correoInstitucional}
                onChange={(e) => setFormData({...formData, correoInstitucional: e.target.value})}
                className="w-full px-4 py-2.5 bg-brand-bg border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-light focus:bg-white transition-all"
                placeholder="usuario@universidad.edu"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Identificador (Código estudiantil) - Opcional</label>
              <input
                type="text"
                value={formData.identificadorInstitucional}
                onChange={(e) => setFormData({...formData, identificadorInstitucional: e.target.value})}
                className="w-full px-4 py-2.5 bg-brand-bg border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-light focus:bg-white transition-all"
                placeholder="Ej: 20231045"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
              <input
                type="password" required minLength={8}
                value={formData.contrasena}
                onChange={(e) => setFormData({...formData, contrasena: e.target.value})}
                className="w-full px-4 py-2.5 bg-brand-bg border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-light focus:bg-white transition-all"
                placeholder="Mínimo 8 caracteres"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-green text-white font-bold py-3.5 rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-brand-green/30 disabled:opacity-70 mt-4"
            >
              {loading ? 'Creando cuenta...' : 'Registrarme'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}