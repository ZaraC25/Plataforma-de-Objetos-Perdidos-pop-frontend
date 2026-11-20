import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { api } from '../lib/api';
import { toast } from 'sonner';
import type { ApiResponse, Usuario } from '../types/api';
import { Loader2 } from 'lucide-react';
import { AuthLayout } from '../components/layout/AuthLayout';

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
      const response = await api.post<ApiResponse<{ token: string; usuario: Usuario }>>('/auth/login', {
        correoInstitucional: correo,
        contrasena: contrasena,
      });

      if (response.data.success && response.data.data) {
        login(response.data.data.usuario, response.data.data.token);
        toast.success(`Hola, ${response.data.data.usuario.nombre}`);
        navigate('/app');
      }
    } catch {
      // El interceptor ya muestra el mensaje
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Iniciar sesión" aside="Lo que se pierde en el campus, aparece aquí.">
      <p className="mt-2 text-ink-soft">Usa tu correo institucional.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="label" htmlFor="correo">Correo institucional</label>
          <input
            id="correo"
            type="email"
            autoComplete="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="field"
            placeholder="usuario@universidad.edu"
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="contrasena">Contraseña</label>
          <input
            id="contrasena"
            type="password"
            autoComplete="current-password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="field"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full">
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>

      <p className="mt-8 text-sm text-ink-soft">
        ¿No tienes cuenta? Las crea la administración de la universidad; solicítala en la oficina de objetos perdidos.
      </p>
    </AuthLayout>
  );
}
