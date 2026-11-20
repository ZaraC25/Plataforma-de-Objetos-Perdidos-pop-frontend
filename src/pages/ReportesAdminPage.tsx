import { useReportesAdmin } from '../features/reportes/api/useReportesAdmin';
import { Inbox } from 'lucide-react';
import { PageHeader, EmptyState, LoadingState } from '../components/ui';
import { ReporteRow } from '../components/ui/ReporteRow';

export function ReportesAdminPage() {
  const { data: reportes, isLoading } = useReportesAdmin();

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Reportes de pérdida"
        description="Lo que los estudiantes están buscando. Compáralo con los objetos que llegan a la oficina."
      />

      {isLoading ? (
        <LoadingState label="Cargando reportes…" />
      ) : !reportes?.length ? (
        <EmptyState icon={Inbox} title="No hay reportes de pérdida" description="Los reportes que creen los estudiantes aparecerán aquí." />
      ) : (
        <ul className="panel divide-y divide-line">
          {reportes.map((rep) => <ReporteRow key={rep.id} rep={rep} />)}
        </ul>
      )}
    </div>
  );
}
