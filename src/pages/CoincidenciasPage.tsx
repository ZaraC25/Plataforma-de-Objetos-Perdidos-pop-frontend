import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Tag, User, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import {
  useCoincidenciasMisReportes,
  useCoincidenciasTodos,
  type Coincidencia,
} from '../features/coincidencias/api/useCoincidencias';

const CATEGORIA_LABEL: Record<string, string> = {
  ELECTRONICA: 'Electrónica',
  DOCUMENTOS: 'Documentos',
  ROPA: 'Ropa',
  ACCESORIOS: 'Accesorios',
  LLAVES: 'Llaves',
  CARTERAS_BOLSOS: 'Carteras / Bolsos',
  LIBROS_APUNTES: 'Libros / Apuntes',
  DEPORTES: 'Deportes',
  OTROS: 'Otros',
};

function CoincidenciaCard({ c, showUser, porIA }: { c: Coincidencia; showUser: boolean; porIA: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Badge IA */}
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
          <Sparkles size={12} /> {porIA ? 'Coincidencia detectada por IA' : 'Coincidencia por palabras clave'}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Reporte de pérdida */}
        <div className="rounded-xl bg-red-50 p-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-red-500">
            Objeto perdido
          </p>
          {showUser && (
            <p className="mb-1 flex items-center gap-1 text-xs text-slate-500">
              <User size={12} /> {c.reporteUsuarioNombre} · {c.reporteUsuarioCorreo}
            </p>
          )}
          <p className="text-sm font-semibold text-slate-800 line-clamp-3">{c.reporteDescripcion}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-red-100 px-2 py-0.5 text-xs text-red-700">
              <Tag size={10} /> {CATEGORIA_LABEL[c.reporteCategoria] ?? c.reporteCategoria}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-red-100 px-2 py-0.5 text-xs text-red-700">
              <MapPin size={10} /> {c.reporteUltimaUbicacion}
            </span>
          </div>
        </div>

        {/* Objeto encontrado */}
        <div className="rounded-xl bg-green-50 p-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-green-600">
            Objeto encontrado
          </p>
          <p className="text-sm font-semibold text-slate-800">{c.objetoTitulo}</p>
          <p className="mt-1 text-xs text-slate-600 line-clamp-2">{c.objetoDescripcion}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-green-100 px-2 py-0.5 text-xs text-green-700">
              <Tag size={10} /> {CATEGORIA_LABEL[c.objetoCategoria] ?? c.objetoCategoria}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-green-100 px-2 py-0.5 text-xs text-green-700">
              <MapPin size={10} /> {c.objetoUbicacion}
            </span>
          </div>
          <Link
            to={`/app/objetos/${c.objetoId}`}
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-green-700 hover:underline"
          >
            Ver objeto <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CoincidenciasPage() {
  const usuario = useAuthStore((s) => s.usuario);
  const esAdmin = usuario?.rol === 'ADMINISTRADOR' || usuario?.rol === 'ENCARGADO_OBJETOS_PERDIDOS';

  const [consultado, setConsultado] = useState(false);

  const queryEstudiante = useCoincidenciasMisReportes(consultado && !esAdmin);
  const queryAdmin = useCoincidenciasTodos(consultado && esAdmin);

  const query = esAdmin ? queryAdmin : queryEstudiante;
  const coincidencias: Coincidencia[] = query.data?.items ?? [];
  const aviso = query.data?.aviso ?? null;
  const loading = query.isFetching;
  const errorMsg = query.isError
    ? ((query.error as { response?: { data?: { message?: string } } })?.response?.data?.message ??
      'No se pudo completar el análisis. Intenta de nuevo.')
    : null;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Encabezado */}
      <div className="flex flex-col gap-1">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <Sparkles size={24} className="text-violet-600" />
          Coincidencias con IA
        </h1>
        <p className="text-sm text-slate-500">
          {esAdmin
            ? 'Gemini analiza todos los reportes de pérdida contra los objetos disponibles y sugiere coincidencias.'
            : 'Gemini analiza tus reportes de pérdida contra los objetos disponibles y te dice cuáles podrían ser tuyos.'}
        </p>
      </div>

      {/* Botón de análisis */}
      {!consultado && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50 p-10 text-center">
          <Sparkles size={40} className="text-violet-400" />
          <p className="text-sm text-slate-600 max-w-sm">
            Presiona el botón para que Gemini analice las descripciones y encuentre posibles coincidencias.
          </p>
          <button
            onClick={() => setConsultado(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
          >
            <Sparkles size={16} /> Analizar con Gemini
          </button>
        </div>
      )}

      {/* Cargando */}
      {consultado && loading && (
        <div className="flex flex-col items-center gap-4 py-16 text-slate-500">
          <RefreshCw size={32} className="animate-spin text-violet-500" />
          <p className="text-sm">Gemini está analizando las coincidencias…</p>
          <p className="text-xs text-slate-400">Esto puede tomar unos segundos</p>
        </div>
      )}

      {/* Aviso: resultado por palabras clave porque Gemini no respondió */}
      {consultado && !loading && !errorMsg && aviso && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-500" />
          <p>{aviso}</p>
        </div>
      )}

      {/* Error del análisis */}
      {consultado && !loading && errorMsg && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-12 text-center">
          <AlertCircle size={36} className="text-red-400" />
          <p className="font-semibold text-red-700">No se pudo analizar con Gemini</p>
          <p className="text-xs text-red-600">{errorMsg}</p>
          <button
            onClick={() => query.refetch()}
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:underline"
          >
            <RefreshCw size={12} /> Reintentar
          </button>
        </div>
      )}

      {/* Sin resultados */}
      {consultado && !loading && !errorMsg && coincidencias.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <AlertCircle size={36} className="text-slate-300" />
          <p className="font-semibold text-slate-700">No se encontraron coincidencias</p>
          <p className="text-xs text-slate-400">
            {!esAdmin
              ? 'Gemini no encontró objetos disponibles que coincidan con tus reportes activos.'
              : 'No hay coincidencias detectadas entre los reportes activos y los objetos disponibles.'}
          </p>
          <button
            onClick={() => query.refetch()}
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:underline"
          >
            <RefreshCw size={12} /> Volver a analizar
          </button>
        </div>
      )}

      {/* Resultados */}
      {consultado && !loading && coincidencias.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-700">
              {coincidencias.length} coincidencia{coincidencias.length !== 1 ? 's' : ''} encontrada{coincidencias.length !== 1 ? 's' : ''}
            </p>
            <button
              onClick={() => query.refetch()}
              className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:underline"
            >
              <RefreshCw size={12} /> Actualizar
            </button>
          </div>
          {coincidencias.map((c, i) => (
            <CoincidenciaCard
              key={`${c.reporteId}-${c.objetoId}-${i}`}
              c={c}
              showUser={esAdmin}
              porIA={!aviso}
            />
          ))}
        </div>
      )}
    </div>
  );
}
