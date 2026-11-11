import { useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotificaciones } from '../../features/notificaciones/api/useNotificaciones';

export function CampanaNotificaciones() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: notificaciones } = useNotificaciones();
  
  const noLeidas = notificaciones?.length || 0;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative transition"
      >
        <Bell size={22} />
        {noLeidas > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
            {noLeidas}
          </span>
        )}
      </button>

      {/* Dropdown simple */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
          <div className="p-4 border-b bg-gray-50 rounded-t-lg font-semibold text-gray-700">
            Notificaciones
          </div>
          <div className="max-h-64 overflow-y-auto">
            {noLeidas === 0 ? (
              <p className="p-4 text-center text-sm text-gray-500">No hay notificaciones nuevas</p>
            ) : (
              notificaciones?.map((noti) => (
                <div key={noti.id} className="p-4 border-b hover:bg-gray-50 transition">
                  <p className="text-sm text-gray-800">{noti.mensaje}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(noti.fechaCreacion).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}