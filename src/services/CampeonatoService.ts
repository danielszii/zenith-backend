import { CampeonatoRepository } from '../repositories/CampeonatoRepository.js';
import { CreateCampeonatoDTO } from '../dtos/CreateCampeonatoDTO.js';
import { Campeonato } from '../models/Campeonato.js';
import { BusinessRuleError, NotFoundError } from '../errors/AppError.js';

const campeonatoRepository = new CampeonatoRepository();

export class CampeonatoService {
  async criarCampeonato(dados: CreateCampeonatoDTO) {
    const campeonato = Campeonato.construir(dados.nome, new Date(dados.data_inicio), new Date(dados.data_fim), dados.modalidade); // Validação básica usando o construtor da entidade
    return await campeonatoRepository.create(campeonato);
  }

  async listarCampeonatos() {
    return await campeonatoRepository.findAll();
  }

  async atualizarCampeonato(id: string, dados: Partial<CreateCampeonatoDTO>) {
    return await campeonatoRepository.update(id, dados);
  }

  async deletarCampeonato(id: string) {
    return await campeonatoRepository.delete(id);
  }

  async buscarPorId(id: string) {
    const campeonato = await campeonatoRepository.findById(id);
    if (!campeonato) {
      throw new NotFoundError('Campeonato não encontrado.');
    }
    return campeonato;
  }

  async inscreverClube(id_campeonato: string, id_clube: string) {
    // 1. REGRA DE NEGÓCIO: Valida se os IDs foram enviados corretamente
    if (!id_campeonato || !id_clube) {
      throw new BusinessRuleError('Os identificadores do campeonato e do clube são obrigatórios.');
    }

    // 2. REGRA DE NEGÓCIO: Verifica se o clube já está participando desse campeonato
    const inscricaoExistente = await campeonatoRepository.findInscricao(id_campeonato, id_clube);

    if (inscricaoExistente) {
      throw new BusinessRuleError('Este clube já está inscrito neste campeonato.');
    }

    // 3. Se passou pelas regras, manda o repositório gravar no banco
    return await campeonatoRepository.inscreverClube(id_campeonato, id_clube);
  }
}