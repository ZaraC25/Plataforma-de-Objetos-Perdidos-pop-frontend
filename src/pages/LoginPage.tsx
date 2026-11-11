import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { api } from '../lib/api';
import { toast } from 'sonner';
import type { ApiResponse, Usuario } from '../types/api';
import { PackageSearch } from 'lucide-react';

export function LoginPage() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);
  
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post<ApiResponse<{token: string, usuario: Usuario}>>('/auth/login', {
        correoInstitucional: correo,
        contrasena: contrasena,
      });

      if (response.data.success && response.data.data) {
        login(response.data.data.usuario, response.data.data.token);
        toast.success(`¡Bienvenido, ${response.data.data.usuario.nombre}!`);
        navigate('/app');
      }
    } catch (error) {
      // El interceptor ya muestra el mensaje
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
            El poder de <br />
            <span className="text-brand-green">encontrar</span> lo que perdiste.
          </h2>
          <p className="text-brand-light text-lg max-w-md">
            Centraliza, busca y recupera tus objetos perdidos dentro de la universidad de forma rápida y segura.
          </p>
        </div>
      </div>

      {/* Lado Derecho (Formulario) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl shadow-brand-dark/5">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Iniciar Sesión</h2>
            <p className="text-gray-500">Ingresa con tu cuenta institucional</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Correo Institucional</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full px-5 py-3 bg-brand-bg border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-light focus:bg-white transition-all"
                placeholder="usuario@universidad.edu"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="w-full px-5 py-3 bg-brand-bg border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-light focus:bg-white transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-dark text-white font-bold py-3.5 rounded-xl hover:bg-brand-light transition-all shadow-lg shadow-brand-dark/30 disabled:opacity-70"
            >
              {loading ? 'Ingresando...' : 'Ingresar al sistema'}
            </button>
          </form>
          
          {/* Nota de seguridad para el usuario */}
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>Las cuentas son creadas únicamente por la administración de la universidad.</p>
            <Link to="/" className="inline-block mt-2 text-brand-light hover:underline">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}