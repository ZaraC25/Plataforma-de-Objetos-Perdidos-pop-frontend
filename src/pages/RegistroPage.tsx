import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { AuthLayout } from '../components/layout/AuthLayout';

export function RegistroPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correoInstitucional: '',
    identificadorInstitucional: '',
    contrasena: '',
  });

  const set = (k: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [k]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/registro', formData);
      if (response.data.success) {
        toast.success('Cuenta creada. Ya puedes iniciar sesión.');
        navigate('/login');
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || 'No se pudo crear la cuenta. Revisa los datos.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Crear cuenta" aside="Reporta lo que perdiste y reclama lo que encuentren.">
      <p className="mt-2 text-ink-soft">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="font-semibold text-brand-dark hover:underline">Inicia sesión</Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="label" htmlFor="nombre">Nombre completo</label>
          <input id="nombre" type="text" required value={formData.nombre} onChange={set('nombre')} className="field" autoComplete="name" />
        </div>
        <div>
          <label className="label" htmlFor="correo">Correo institucional</label>
          <input id="correo" type="email" required value={formData.correoInstitucional} onChange={set('correoInstitucional')} className="field" placeholder="usuario@universidad.edu" autoComplete="email" />
        </div>
        <div>
          <label className="label" htmlFor="codigo">Código estudiantil <span className="font-normal text-ink-soft">(opcional)</span></label>
          <input id="codigo" type="text" value={formData.identificadorInstitucional} onChange={set('identificadorInstitucional')} className="field" placeholder="20231045" />
        </div>
        <div>
          <label className="label" htmlFor="pass">Contraseña</label>
          <input id="pass" type="password" required minLength={8} value={formData.contrasena} onChange={set('contrasena')} className="field" autoComplete="new-password" />
          <p className="hint">Mínimo 8 caracteres.</p>
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary btn-lg mt-2 w-full">
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? 'Creando cuenta…' : 'Crear cuenta'}
        </button>
      </form>
    </AuthLayout>
  );
}
