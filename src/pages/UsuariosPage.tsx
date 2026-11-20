import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { ApiResponse } from '../types/api';
import { UserPlus, Loader2, Users } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader, LoadingState, EmptyState, StatusBadge, humanize } from '../components/ui';

const vacio = { nombre: '', correoInstitucional: '', identificadorInstitucional: '', contrasena: '', rol: 'ESTUDIANTE' };

export function UsuariosPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [creando, setCreando] = useState(false);
  const [formData, setFormData] = useState(vacio);

  const { data, isLoading } = useQuery({
    queryKey: ['usuarios'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<{ content: any[] }>>('/admin/usuarios');
      return res.data.data?.content || [];
    },
  });

  const cambiarEstado = async (id: number, estadoActual: string) => {
    const nuevoEstado = estadoActual === 'ACTIVA' ? 'SUSPENDIDA' : 'ACTIVA';
    try {
      await api.patch(`/admin/usuarios/${id}/estado`, { estado: nuevoEstado });
      toast.success(nuevoEstado === 'ACTIVA' ? 'Cuenta reactivada' : 'Cuenta suspendida');
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    } catch {
      // El interceptor ya muestra el error
    }
  };

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreando(true);
    try {
      await api.post('/admin/usuarios', formData);
      toast.success(`Cuenta creada para ${formData.nombre}`);
      setShowForm(false);
      setFormData(vacio);
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    } catch {
      // El interceptor ya muestra el error
    } finally {
      setCreando(false);
    }
  };

  const set = (k: keyof typeof vacio) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [k]: e.target.value });

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Usuarios"
        description="Crea cuentas para estudiantes y encargados, o suspende el acceso de una cuenta."
        action={
          !showForm && (
            <button onClick={() => setShowForm(true)} className="btn btn-primary">
              <UserPlus size={18} /> Crear cuenta
            </button>
          )
        }
      />

      {showForm && (
        <form onSubmit={handleCrear} className="pop-in panel mb-6 p-6" style={{ transformOrigin: 'top' }}>
          <h2 className="text-lg font-[650]">Nueva cuenta</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label className="label" htmlFor="u-nombre">Nombre completo</label>
              <input id="u-nombre" required value={formData.nombre} onChange={set('nombre')} className="field" />
            </div>
            <div>
              <label className="label" htmlFor="u-correo">Correo institucional</label>
              <input id="u-correo" type="email" required value={formData.correoInstitucional} onChange={set('correoInstitucional')} className="field" />
            </div>
            <div>
              <label className="label" htmlFor="u-id">Código institucional <span className="font-normal text-ink-soft">(opcional)</span></label>
              <input id="u-id" value={formData.identificadorInstitucional} onChange={set('identificadorInstitucional')} className="field" />
            </div>
            <div>
              <label className="label" htmlFor="u-pass">Contraseña inicial</label>
              <input id="u-pass" type="password" required minLength={8} value={formData.contrasena} onChange={set('contrasena')} className="field" autoComplete="new-password" />
            </div>
            <div>
              <label className="label" htmlFor="u-rol">Rol</label>
              <select id="u-rol" value={formData.rol} onChange={set('rol')} className="field">
                <option value="ESTUDIANTE">Estudiante</option>
                <option value="ENCARGADO_OBJETOS_PERDIDOS">Encargado de objetos perdidos</option>
                <option value="ADMINISTRADOR">Administrador</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button type="button" onClick={() => { setShowForm(false); setFormData(vacio); }} className="btn btn-ghost">Cancelar</button>
            <button type="submit" disabled={creando} className="btn btn-primary">
              {creando && <Loader2 size={16} className="animate-spin" />} Crear cuenta
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <LoadingState label="Cargando usuarios…" />
      ) : !data?.length ? (
        <EmptyState icon={Users} title="No hay usuarios" />
      ) : (
        <div className="panel overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-line text-xs text-ink-soft">
              <tr>
                <th className="px-5 py-3 font-semibold">Usuario</th>
                <th className="px-5 py-3 font-semibold">Rol</th>
                <th className="px-5 py-3 font-semibold">Estado</th>
                <th className="px-5 py-3 text-right font-semibold"><span className="sr-only">Acciones</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {data.map((u: any) => (
                <tr key={u.id} className="row-hover">
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-ink">{u.nombre}</p>
                    <p className="text-xs text-ink-soft">{u.correoInstitucional}</p>
                  </td>
                  <td className="px-5 py-3.5 text-ink-soft">{humanize(u.rol)}</td>
                  <td className="px-5 py-3.5"><StatusBadge estado={u.estadoCuenta} /></td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => cambiarEstado(u.id, u.estadoCuenta)}
                      className={`btn px-3 py-1.5 text-[13px] ${u.estadoCuenta === 'ACTIVA' ? 'btn-ghost text-danger' : 'btn-ghost'}`}
                    >
                      {u.estadoCuenta === 'ACTIVA' ? 'Suspender' : 'Reactivar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
