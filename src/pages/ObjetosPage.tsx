import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useObjetos } from '../features/objetos/api/useObjetos';
import { PackageOpen, Plus, Search, SearchX, MapPin, CalendarDays } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import {
  PageHeader, EmptyState, LoadingState, ErrorState, StatusBadge,
  CATEGORIAS, categoriaLabel, folio, formatDate,
} from '../components/ui';

export function ObjetosPage() {
  const { data: objetos, isLoading, isError } = useObjetos();
  const usuario = useAuthStore((state) => state.usuario);
  const [query, setQuery] = useState('');
  const [categoria, setCategoria] = useState<string | null>(null);

  const esGestor = usuario?.rol === 'ADMINISTRADOR' || usuario?.rol === 'ENCARGADO_OBJETOS_PERDIDOS';

  const filtrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (objetos ?? []).filter((o) => {
      if (categoria && o.categoria !== categoria) return false;
      if (!q) return true;
      return [o.titulo, o.descripcion, o.ubicacion].some((t) => t?.toLowerCase().includes(q));
    });
  }, [objetos, query, categoria]);

  const presentes = useMemo(
    () => CATEGORIAS.filter((c) => objetos?.some((o) => o.categoria === c.value)),
    [objetos],
  );

  const action = esGestor ? (
    <Link to="/app/encargado/objetos/nuevo" className="btn btn-primary">
      <Plus size={18} /> Registrar objeto encontrado
    </Link>
  ) : (
    <Link to="/app/mis-reportes/nuevo" className="btn btn-primary">
      <SearchX size={18} /> Reportar objeto perdido
    </Link>
  );

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Catálogo de objetos"
        description="Objetos entregados en la oficina de objetos perdidos. Si ves algo tuyo, ábrelo y solicita la recuperación."
        action={action}
      />

      {isLoading ? (
        <LoadingState label="Cargando catálogo…" />
      ) : isError ? (
        <ErrorState label="No pudimos cargar el catálogo. Revisa tu conexión y recarga la página." />
      ) : objetos?.length === 0 ? (
        <EmptyState
          icon={PackageOpen}
          title="Aún no hay objetos registrados"
          description="Cuando la oficina registre un objeto encontrado, aparecerá aquí."
        />
      ) : (
        <>
          <div className="mb-6 flex flex-col gap-3">
            <div className="relative max-w-md">
              <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nombre, descripción o lugar"
                className="field pl-10"
                aria-label="Buscar objetos"
              />
            </div>
            {presentes.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {[{ value: null as string | null, label: 'Todas' }, ...presentes].map((c) => {
                  const active = categoria === c.value;
                  return (
                    <button
                      key={c.label}
                      onClick={() => setCategoria(c.value)}
                      aria-pressed={active}
                      className={`btn rounded-full px-3.5 py-1.5 text-[13px] ${
                        active ? 'bg-brand-dark text-white' : 'border border-line bg-white text-ink-soft hover:text-ink'
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {filtrados.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="Nada coincide con tu búsqueda"
              description="Prueba con otras palabras o quita el filtro de categoría. También puedes reportar el objeto como perdido."
              action={
                <button className="btn btn-ghost" onClick={() => { setQuery(''); setCategoria(null); }}>
                  Limpiar filtros
                </button>
              }
            />
          ) : (
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtrados.map((obj) => (
                <li key={obj.id}>
                  <Link to={`/app/objetos/${obj.id}`} className="tag-card flex h-full flex-col py-5 pl-12 pr-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-xs font-semibold tabular-nums text-ink-soft">
                        {folio(obj.id)} · {categoriaLabel(obj.categoria)}
                      </span>
                      <StatusBadge estado={obj.estado} />
                    </div>
                    <h3 className="mt-2 text-lg font-[650] leading-snug">{obj.titulo}</h3>
                    <p className="mt-1.5 line-clamp-2 text-sm text-ink-soft">{obj.descripcion}</p>
                    <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-[13px] text-ink-soft">
                      <span className="flex items-center gap-1.5"><MapPin size={14} /> {obj.ubicacion}</span>
                      <span className="flex items-center gap-1.5"><CalendarDays size={14} /> {formatDate(obj.fechaHallazgo)}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
