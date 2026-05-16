export interface Partida {
  id_partida?: number;
  id_campeonato: number; // FK para campeonatos
  id_clube_casa: number;  // FK para clubes
  id_clube_fora: number;  // FK para clubes
  id_local?: number | null; // FK para locais
  data: string | Date; // Data da partida
  hora: string; // Tipo TIME do banco (Ex: "19:30:00")
  status_partida?: 'agendado' | 'em_andamento' | 'encerrado' | 'cancelado';
}