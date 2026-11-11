import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppShell() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-8 flex-1 overflow-auto">
          <Outlet /> {/* Aquí se inyectan las páginas */}
        </main>
      </div>
    </div>
  );
}