export interface Contrato {
  id_contrato?: number;
  id_atleta: number;
  id_clube: number;
  data_inicio: string | Date;
  data_fim?: string | Date;
  status_contrato?: string;
}