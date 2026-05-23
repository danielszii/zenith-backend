import { EventoSumulaRepository } from '../repositories/EventoSumulaRepository.js';
import { PartidaService } from './PartidaService.js';
import { CreateEventoSumulaDTO } from '../dtos/CreateEventoSumulaDTO.js';

const eventoRepository = new EventoSumulaRepository();
const partidaService = new PartidaService();

export class EventoSumulaService {
  
  async registrarEvento(id_partida: number, dados: CreateEventoSumulaDTO) {
    
    // REGRA DE NEGÓCIO: A partida precisa estar rodando!
    const partida = await partidaService.buscarPorId(id_partida);
    
    if (partida.status_partida !== 'em_andamento') {
      throw new Error(`Acesso negado. Não é possível registrar o evento '${dados.tipo_evento}' porque a partida está com o status: '${partida.status_partida}'.`);
    }

    // Se a partida está rolando, salva o evento no banco
    return await eventoRepository.create({
      id_partida,
      id_atleta: dados.id_atleta,
      tipo_evento: dados.tipo_evento,
      minuto_jogo: dados.minuto_jogo
    });
  }

  async listarEventosDaPartida(id_partida: number) { // Verifica se a partida existe antes de buscar os eventos
    await partidaService.buscarPorId(id_partida);
    return await eventoRepository.findByPartida(id_partida);
  }
}