export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T | null;
  errors: Record<string, string> | null;
}

export interface Usuario {
  id: number;
  nombre: string;
  correoInstitucional: string;
  rol: 'ESTUDIANTE' | 'ENCARGADO_OBJETOS_PERDIDOS' | 'ADMINISTRADOR';
}