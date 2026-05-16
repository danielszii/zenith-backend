import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class CreateCampeonatoDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome do campeonato é obrigatório.' })
  nome!: string;

  @IsOptional()
  @IsString()
  formato?: string;

  @IsOptional()
  @IsString()
  criterios_desempate?: string;

  @IsString()
  @IsIn(['futebol', 'futsal'], { message: 'A modalidade deve ser futebol ou futsal.' })
  modalidade!: 'futebol' | 'futsal';

  @IsString()
  @IsIn(['sub-17', 'sub-19', 'sub-21', 'profissional'], { message: 'Categoria inválida.' })
  categoria!: 'sub-17' | 'sub-19' | 'sub-21' | 'profissional';
}