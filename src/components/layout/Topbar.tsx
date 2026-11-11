import { useAuthStore } from '../../stores/authStore';
import { UserCircle } from 'lucide-react';
import { CampanaNotificaciones } from './CampanaNotificaciones'; // <-- NUEVO IMPORT

export function Topbar() {
  const usuario = useAuthStore((state) => state.usuario);

  return (
    <header className="bg-white h-16 border-b flex items-center justify-between px-8 shadow-sm">
      <h2 className="text-gray-800 font-semibold text-lg">Plataforma de Objetos Perdidos</h2>
      
      <div className="flex items-center gap-6">
        {/* CAMPANA AQUÍ */}
        <CampanaNotificaciones />

        <div className="flex items-center gap-3 text-gray-600 border-l pl-6">
          <UserCircle size={24} className="text-blue-600" />
          <div className="text-sm">
            <p className="font-semibold text-gray-800">{usuario?.nombre}</p>
            <p className="text-xs text-gray-500">{usuario?.rol}</p>
          </div>
        </div>
      </div>
    </header>
  );
}