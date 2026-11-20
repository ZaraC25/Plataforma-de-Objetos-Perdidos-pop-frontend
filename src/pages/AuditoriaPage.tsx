import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { ApiResponse } from '../types/api';
import { ShieldCheck } from 'lucide-react';
import { PageHeader, LoadingState, EmptyState, StatusBadge, formatDate, humanize } from '../components/ui';

export function AuditoriaPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['auditoria'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<{ content: any[] }>>('/admin/auditoria');
      return res.data.data?.content || [];
    },
  });

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="Auditoría" description="Registro de cada acción hecha en la plataforma, quién la hizo y su resultado." />

      {isLoading ? (
        <LoadingState label="Cargando historial…" />
      ) : !data?.length ? (
        <EmptyState icon={ShieldCheck} title="Sin registros todavía" />
      ) : (
        <div className="panel overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-line text-xs text-ink-soft">
              <tr>
                <th className="px-5 py-3 font-semibold">Fecha</th>
                <th className="px-5 py-3 font-semibold">Usuario</th>
                <th className="px-5 py-3 font-semibold">Acción</th>
                <th className="px-5 py-3 font-semibold">Registro</th>
                <th className="px-5 py-3 font-semibold">Resultado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {data.map((a: any) => (
                <tr key={a.id} className="row-hover">
                  <td className="whitespace-nowrap px-5 py-3 tabular-nums text-ink-soft">{formatDate(a.fechaHora, true)}</td>
                  <td className="px-5 py-3 font-medium text-ink">{a.usuarioResponsable?.nombre || 'Sistema'}</td>
                  <td className="px-5 py-3 text-ink">{humanize(a.accion)}</td>
                  <td className="px-5 py-3 text-ink-soft">{humanize(a.entidadAfectada)} #{a.registroAfectadoId}</td>
                  <td className="px-5 py-3"><StatusBadge estado={a.resultado} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
