import { Link } from 'react-router-dom';
import { useReportes } from '../features/reportes/api/useReportes';
import { Plus, SearchX } from 'lucide-react';
import { PageHeader, EmptyState, LoadingState } from '../components/ui';
import { ReporteRow } from '../components/ui/ReporteRow';

export function MisReportesPage() {
  const { data: reportes, isLoading } = useReportes();

  const nuevo = (
    <Link to="/app/mis-reportes/nuevo" className="btn btn-primary">
      <Plus size={18} /> Nuevo reporte
    </Link>
  );

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Mis reportes de pérdida"
        description="Te avisaremos cuando llegue a la oficina algo parecido a lo que reportaste."
        action={reportes?.length ? nuevo : undefined}
      />

      {isLoading ? (
        <LoadingState label="Cargando tus reportes…" />
      ) : !reportes?.length ? (
        <EmptyState
          icon={SearchX}
          title="No has reportado ninguna pérdida"
          description="Si perdiste algo en el campus, cuéntanos qué es y dónde lo viste por última vez."
          action={nuevo}
        />
      ) : (
        <ul className="panel divide-y divide-line">
          {reportes.map((rep) => <ReporteRow key={rep.id} rep={rep} />)}
        </ul>
      )}
    </div>
  );
}
