// src/dtos/CreateEventoSumulaDTO.ts
import { IsInt, IsNotEmpty, IsIn, IsOptional, Min, Max, IsString } from 'class-validator';

export class CreateEventoSumulaDTO {
  
  @IsInt({ message: 'O id do atleta deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O id do atleta é obrigatório.' })
  id_atleta: number;

  @IsInt({ message: 'O id da partida deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O id da partida é obrigatório.' })
  id_partida: number;

  id_clube?: number;

  @IsNotEmpty({ message: 'O tipo de evento é obrigatório.' })
  @IsIn(['GOL', 'CARTAO_AMARELO', 'CARTAO_VERMELHO', 'GOL_CONTRA'], { 
    message: 'Tipo de evento inválido. Use GOL, CARTAO_AMARELO, CARTAO_VERMELHO ou GOL_CONTRA.' 
  })
  tipo_evento: 'GOL' | 'CARTAO_AMARELO' | 'CARTAO_VERMELHO' | 'GOL_CONTRA';

  @IsOptional()
  @IsInt({ message: 'O minuto do jogo deve ser um número inteiro.' })
  @Min(0, { message: 'O minuto do jogo não pode ser negativo.' })
  @Max(150, { message: 'Minuto inválido (acima do limite máximo de acréscimos/prorrogação).' })
  minuto_jogo?: number;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string.' })
  descricao?: string;
  
}