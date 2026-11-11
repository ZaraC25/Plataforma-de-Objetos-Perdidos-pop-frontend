import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

// Páginas Públicas
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';

// Páginas de la App (Protegidas)
import { ObjetosPage } from './pages/ObjetosPage';
import { ObjetoDetallePage } from './pages/ObjetoDetallePage';
import { MisReportesPage } from './pages/MisReportesPage';
import { ReporteFormPage } from './pages/ReporteFormPage';
import { MisSolicitudesPage } from './pages/MisSolicitudesPage';
import { NuevaSolicitudPage } from './pages/NuevaSolicitudPage';
import { ObjetoFormPage } from './pages/ObjetoFormPage';
import { SolicitudesAdminPage } from './pages/SolicitudesAdminPage';
import { ReportesAdminPage } from './pages/ReportesAdminPage';
import { EntregasPage } from './pages/EntregasPage';
import { UsuariosPage } from './pages/UsuariosPage';
import { EstadisticasPage } from './pages/EstadisticasPage';
import { AuditoriaPage } from './pages/AuditoriaPage';

// Layout y Estado
import { AppShell } from './components/layout/AppShell';
import { useAuthStore } from './stores/authStore';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token);
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* RUTAS PROTEGIDAS (Bajo /app) */}
        <Route 
          path="/app" 
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route index element={<ObjetosPage />} />
          <Route path="objetos/:id" element={<ObjetoDetallePage />} />

          {/* Estudiante */}
          <Route path="mis-reportes" element={<MisReportesPage />} />
          <Route path="mis-reportes/nuevo" element={<ReporteFormPage />} />
          <Route path="mis-solicitudes" element={<MisSolicitudesPage />} />
          <Route path="solicitudes/nueva/:id" element={<NuevaSolicitudPage />} />

          {/* Encargado / Admin */}
          <Route path="encargado/objetos/nuevo" element={<ObjetoFormPage />} />
          <Route path="encargado/solicitudes" element={<SolicitudesAdminPage />} />
          <Route path="encargado/reportes" element={<ReportesAdminPage />} />
          <Route path="encargado/entregas" element={<EntregasPage />} />

          {/* Admin */}
          <Route path="admin/usuarios" element={<UsuariosPage />} />
          <Route path="admin/estadisticas" element={<EstadisticasPage />} />
          <Route path="admin/auditoria" element={<AuditoriaPage />} />
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}