import { IsInt, IsNotEmpty, IsDateString, IsString, Matches, IsOptional } from 'class-validator';

export class CreatePartidaDTO {
  @IsInt({ message: 'O id do campeonato deve ser um número inteiro.' })
  @IsNotEmpty()
  id_campeonato: number;

  @IsInt()
  @IsNotEmpty()
  id_mandante: number;

  @IsInt()
  @IsNotEmpty()
  id_visitante: number;

  @IsDateString({}, { message: 'A data deve estar no formato AAAA-MM-DD.' })
  @IsNotEmpty()
  data: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'A hora deve estar no formato HH:MM.' })
  hora: string;

  @IsNotEmpty()
  @IsString()
  local: string;

  @IsOptional()
  @IsString()
  status?: 'agendado' | 'em_andamento' | 'encerrado' | 'cancelado';
}