import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { 
  Package, Users, LogOut, Plus, FileWarning, ClipboardList, 
  PackageCheck, BarChart2, ShieldCheck, Home
} from 'lucide-react';

export function Sidebar() {
  const usuario = useAuthStore((state) => state.usuario);
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => 
    location.pathname === path 
      ? 'bg-brand-light text-white font-semibold shadow-md' 
      : 'text-white/70 hover:bg-brand-dark hover:text-white';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="w-64 bg-brand-dark min-h-screen flex flex-col text-sm shadow-xl z-10">
      <Link to="/" className="p-6 text-white font-extrabold text-2xl border-b border-white/10 tracking-tight flex items-center gap-2 hover:opacity-80 transition">
        <Package size={28} className="text-brand-green"/> POP - U
      </Link>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <Link to="/app" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/app')}`}>
          <Package size={20} /> Catálogo
        </Link>

        <Link to="/app/mis-reportes" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/app/mis-reportes')}`}>
          <FileWarning size={20} /> Mis Reportes
        </Link>
        
        <Link to="/app/mis-solicitudes" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/app/mis-solicitudes')}`}>
          <ClipboardList size={20} /> Mis Solicitudes
        </Link>

        {(usuario?.rol === 'ADMINISTRADOR' || usuario?.rol === 'ENCARGADO_OBJETOS_PERDIDOS') && (
          <>
            <div className="pt-6 pb-2 text-xs font-bold text-brand-green uppercase tracking-wider">Gestión</div>
            <Link to="/app/encargado/objetos/nuevo" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/app/encargado/objetos/nuevo')}`}>
              <Plus size={20} /> Registrar Objeto
            </Link>
            <Link to="/app/encargado/reportes" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/app/encargado/reportes')}`}>
              <FileWarning size={20} /> Reportes Pérdida
            </Link>
            <Link to="/app/encargado/solicitudes" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/app/encargado/solicitudes')}`}>
              <ClipboardList size={20} /> Solicitudes
            </Link>
            <Link to="/app/encargado/entregas" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/app/encargado/entregas')}`}>
              <PackageCheck size={20} /> Entregas
            </Link>
          </>
        )}
        
        {usuario?.rol === 'ADMINISTRADOR' && (
          <>
            <div className="pt-6 pb-2 text-xs font-bold text-brand-green uppercase tracking-wider">Administración</div>
            <Link to="/app/admin/usuarios" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/app/admin/usuarios')}`}>
              <Users size={20} /> Usuarios
            </Link>
            <Link to="/app/admin/estadisticas" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/app/admin/estadisticas')}`}>
              <BarChart2 size={20} /> Estadísticas
            </Link>
            <Link to="/app/admin/auditoria" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/app/admin/auditoria')}`}>
              <ShieldCheck size={20} /> Auditoría
            </Link>
          </>
        )}
      </nav>

      <div className="p-4 border-t border-white/10 bg-black/10">
        <Link to="/" className="flex items-center gap-3 px-4 py-3 mb-2 w-full text-left text-white/70 hover:bg-white/10 hover:text-white rounded-xl transition-all font-medium">
          <Home size={20} /> Ir al Inicio
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-200 hover:bg-red-500 hover:text-white rounded-xl transition-all font-medium"
        >
          <LogOut size={20} /> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}