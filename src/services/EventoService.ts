import { EventoRepository } from '../repositories/EventoRepository.js';
import { PartidaRepository } from '../repositories/PartidaRepository.js';
import { CreateEventoSumulaDTO } from '../dtos/CreateEventoSumulaDTO.js';
import { EventoSumula } from '../models/EventoSumula.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { BusinessRuleError } from '../errors/BusinessRuleError.js';

export class EventoService {

  public constructor(private readonly PartidaRepository: PartidaRepository, private readonly EventoRepository: EventoRepository) { }

  async lancarEvento(dados: CreateEventoSumulaDTO) {
    const partida = await this.PartidaRepository.findSumulaDados(dados.id_partida);

    if (!partida) {
      throw new NotFoundError('Partida não encontrada.');
    }

    if (partida.status === 'agendado') {
      throw new BusinessRuleError('Não é possível lançar eventos em uma partida que ainda não começou.');
    }
    if (partida.status === 'encerrado') {
      throw new BusinessRuleError('A súmula desta partida já foi fechada e não pode receber novos eventos.');
    }

    const eventoModel = EventoSumula.construir(
      String(dados.id_partida),
      String(dados.id_atleta),
      String(dados.id_clube),
      dados.tipo_evento,
      dados.minuto_evento
    );

    const novoEvento = await this.EventoRepository.create(eventoModel);
    const tipoEvento = dados.tipo_evento.toLowerCase();

    // 4. Atualiza o placar reaproveitando os dados da 'partida' já buscada
    if (tipoEvento === 'gol') {
      if (String(dados.id_clube) === String(partida.id_mandante)) {
        await this.PartidaRepository.incrementarGolMandante(dados.id_partida);
      }
      else if (String(dados.id_clube) === String(partida.id_visitante)) {
        await this.PartidaRepository.incrementarGolVisitante(dados.id_partida);
      }
    }
    return novoEvento;
  }

  async obterSumulaCompleta(id_partida: string) {
    const partida = await this.PartidaRepository.findSumulaDados(id_partida);
    if (!partida) {
      throw new NotFoundError('Partida não encontrada.');
    }

    const eventos = await this.EventoRepository.findByPartida(id_partida);
    return {
      detalhes_partida: partida,
      sumula_eventos: eventos
    };
  }
}