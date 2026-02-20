
export type UrgencyLevel = 'BAJO' | 'MEDIO' | 'ALTO';

export interface ReportForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  parish: string; // Parroquia
  community: string; // Comunidad
  details: string; // Detalles del reporte
  urgency: UrgencyLevel;
  photos: File[];
}

export interface ReportStatus {
  id: string;
  status: 'PENDIENTE' | 'EN_CAMINO' | 'RESUELTO' | 'CANCELADO';
  timestamp: string;
  description: string;
  lastUpdate: string;
}
