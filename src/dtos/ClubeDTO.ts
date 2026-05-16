import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateClubeDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome do clube é obrigatório.' })
  nome!: string; // Com '!' porque é obrigatório

  @IsOptional()
  @IsString()
  brasao?: string; // Com '?' não precisa de '!'

  @IsOptional()
  @IsString()
  cores_oficiais?: string;

  @IsOptional()
  @IsString()
  responsavel?: string;

  @IsOptional()
  @IsString()
  @Length(14, 18, { message: 'O CNPJ deve ter um formato válido.' })
  cnpj?: string;
}