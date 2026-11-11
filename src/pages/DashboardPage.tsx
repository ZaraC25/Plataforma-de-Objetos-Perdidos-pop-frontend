import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const usuario = useAuthStore((state) => state.usuario);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-blue-600">Panel de Control</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Hola, {usuario?.nombre} ({usuario?.rol})</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Bienvenido a la Plataforma</h2>
          <p>El sistema está conectado al backend exitosamente.</p>
        </div>
      </div>
    </div>
  );
}