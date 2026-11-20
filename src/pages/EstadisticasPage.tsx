import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { ApiResponse } from '../types/api';
import { PageHeader, LoadingState } from '../components/ui';

export function EstadisticasPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['estadisticas'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<any>>('/admin/estadisticas');
      return res.data.data;
    },
  });

  const registrados: number = data?.totalObjetos || 0;
  const entregados: number = data?.objetosEntregados || 0;
  const tasa = registrados ? Math.round((entregados / registrados) * 100) : 0;

  const secundarias = [
    { titulo: 'Objetos registrados', valor: registrados },
    { titulo: 'Objetos entregados', valor: entregados },
    { titulo: 'Solicitudes pendientes', valor: data?.solicitudesPendientes || 0 },
    { titulo: 'Usuarios', valor: data?.totalUsuarios || 0 },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Estadísticas" description="Cómo va la oficina de objetos perdidos." />

      {isLoading ? (
        <LoadingState label="Cargando estadísticas…" />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          {/* Lo que más importa: cuántos objetos vuelven a su dueño */}
          <section className="panel flex flex-col justify-between p-6 sm:p-8">
            <h2 className="text-sm font-semibold text-ink-soft">Objetos devueltos a su dueño</h2>
            <p className="mt-4 font-display text-7xl font-extrabold tabular-nums text-brand-dark" style={{ letterSpacing: '-0.04em' }}>
              {tasa}%
            </p>
            <div className="mt-6">
              <div className="h-2.5 overflow-hidden rounded-full bg-paper" role="progressbar" aria-valuenow={tasa} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full rounded-full bg-brand-green" style={{ width: `${tasa}%` }} />
              </div>
              <p className="mt-2 text-sm text-ink-soft">
                {entregados} de {registrados} objetos registrados ya fueron entregados.
              </p>
            </div>
          </section>

          <dl className="grid grid-cols-2 gap-4">
            {secundarias.map((t) => (
              <div key={t.titulo} className="panel p-5">
                <dt className="text-sm text-ink-soft">{t.titulo}</dt>
                <dd className="mt-2 font-display text-3xl font-[650] tabular-nums text-ink">{t.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
