import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { ApiResponse } from '../types/api';
import { UserCircle, Ban, CheckCircle, UserPlus, X } from 'lucide-react';
import { toast } from 'sonner';

export function UsuariosPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correoInstitucional: '',
    identificadorInstitucional: '',
    contrasena: '',
    rol: 'ESTUDIANTE'
  });

  const { data, isLoading } = useQuery({
    queryKey: ['usuarios'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<{ content: any[] }>>('/admin/usuarios');
      return res.data.data?.content || [];
    }
  });

  const cambiarEstado = async (id: number, estadoActual: string) => {
    const nuevoEstado = estadoActual === 'ACTIVA' ? 'SUSPENDIDA' : 'ACTIVA';
    try {
      await api.patch(`/admin/usuarios/${id}/estado`, { estado: nuevoEstado });
      toast.success(`Usuario ${nuevoEstado === 'ACTIVA' ? 'activado' : 'suspendido'}`);
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    } catch {
      toast.error('Error al cambiar estado');
    }
  };

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/admin/usuarios', formData);
      toast.success('Usuario creado exitosamente');
      setShowForm(false);
      setFormData({ nombre: '', correoInstitucional: '', identificadorInstitucional: '', contrasena: '', rol: 'ESTUDIANTE' });
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al crear usuario');
    }
  };

  if (isLoading) return <div className="text-center py-10">Cargando usuarios...</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-brand-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-light transition"
        >
          {showForm ? <X size={20} /> : <UserPlus size={20} />} 
          {showForm ? 'Cancelar' : 'Nuevo Usuario'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6 border-l-4 border-brand-green">
          <h2 className="text-lg font-bold mb-4">Crear Nuevo Usuario</h2>
          <form onSubmit={handleCrear} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Nombre Completo" required value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} className="px-3 py-2 border rounded" />
            <input type="email" placeholder="Correo Institucional" required value={formData.correoInstitucional} onChange={e => setFormData({...formData, correoInstitucional: e.target.value})} className="px-3 py-2 border rounded" />
            <input type="text" placeholder="ID Institucional (Opcional)" value={formData.identificadorInstitucional} onChange={e => setFormData({...formData, identificadorInstitucional: e.target.value})} className="px-3 py-2 border rounded" />
            <input type="password" placeholder="Contraseña" required minLength={8} value={formData.contrasena} onChange={e => setFormData({...formData, contrasena: e.target.value})} className="px-3 py-2 border rounded" />
            <select value={formData.rol} onChange={e => setFormData({...formData, rol: e.target.value})} className="px-3 py-2 border rounded">
              <option value="ESTUDIANTE">Estudiante</option>
              <option value="ENCARGADO_OBJETOS_PERDIDOS">Encargado de Objetos Perdidos</option>
              <option value="ADMINISTRADOR">Administrador</option>
            </select>
            <button type="submit" className="bg-brand-green text-white font-bold py-2 rounded hover:bg-green-600">Guardar Usuario</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Usuario</th>
              <th className="p-4 font-semibold text-gray-600">Rol</th>
              <th className="p-4 font-semibold text-gray-600">Estado</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((u: any) => (
              <tr key={u.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <UserCircle className="text-blue-500" size={24} />
                    <div>
                      <p className="font-bold text-gray-800">{u.nombre}</p>
                      <p className="text-xs text-gray-500">{u.correoInstitucional}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{u.rol.replace(/_/g, ' ')}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    u.estadoCuenta === 'ACTIVA' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {u.estadoCuenta}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => cambiarEstado(u.id, u.estadoCuenta)}
                    className={`p-2 rounded ${u.estadoCuenta === 'ACTIVA' ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
                    title={u.estadoCuenta === 'ACTIVA' ? 'Suspender' : 'Activar'}
                  >
                    {u.estadoCuenta === 'ACTIVA' ? <Ban size={18} /> : <CheckCircle size={18} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}