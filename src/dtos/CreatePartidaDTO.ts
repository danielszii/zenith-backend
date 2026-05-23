// src/dtos/CreatePartidaDTO.ts
import { IsInt, IsNotEmpty, IsDateString, IsString, Matches, IsOptional } from 'class-validator';

export class CreatePartidaDTO {
  @IsInt({ message: 'O id do campeonato deve ser um número inteiro.' })
  @IsNotEmpty()
  id_campeonato!: number;

  @IsInt()
  @IsNotEmpty()
  id_mandante!: number;

  @IsInt()
  @IsNotEmpty()
  id_visitante!: number;

  @IsOptional()
  @IsInt()
  id_local?: number;

  @IsDateString({}, { message: 'A data deve estar no formato AAAA-MM-DD.' })
  @IsNotEmpty()
  data_partida!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'A hora deve estar no formato HH:MM.' })
  horario_partida!: string;
}