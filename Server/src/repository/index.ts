import { knex } from '../knex';
import PartidaRepository from './partidaRepository';

export default class repository {

    private partidaRepository = new PartidaRepository();

    public getCardsFromMazo = async (mazo_id: number): Promise<any> => {
        return knex.raw('SELECT * FROM carta WHERE mazo_id = ?;', [mazo_id])
            .then((resp: any) => {
                if (resp.rows.length === 0) {
                    throw Error('No cards from this mazo');
                }
                return resp.rows
            });
    }
// ****************** INICIO SECCION PARTIDO ***************
    public async createPartido(id_juego: number, id_mazo: number, estado: number): Promise<any>{
        return await this.partidaRepository.createPartido(id_juego, id_mazo, estado);
    } 

    public async checkPartidoCreado(partido_id: number): Promise<any>{
        return await this.partidaRepository.checkPartidoCreado(partido_id);
    } 

    public async getPartidoById(partido_id: number): Promise<any>{
        return await this.partidaRepository.getPartidoById(partido_id);
    }

    public async updateEstadoPartido(partido_id: number, nuevoEstado: number): Promise<any>{
        return await this.partidaRepository.updateEstadoPartido(partido_id, nuevoEstado);
    }

// ****************** FIN SECCION PARTIDO ***************

    public inicioPuntajeJugador = async (id_jugador: number, id_partido: number): Promise<any> => {
        return knex.raw(`
            INSERT INTO
            puntaje_jugador_partida (jugador_id, partido_id)
            VALUES (?,?)
        `, [id_jugador, id_partido]);
    };

}