import { knex } from '../knex';

export default class partidaRepository {
    public createPartido = async (id_juego: number, id_mazo: number, estado: number): Promise<any> => {
        await knex.raw(`
                INSERT INTO
                partido (juego_id, mazo_id, estado)
                VALUES (?,?,?)
            `, [id_juego, id_mazo, estado]);
    
        return knex.raw(`SELECT * FROM partido order by Id desc limit 1`)
            .then((resp: any) => {
                return {...resp.rows[0]}
            });
    };
    
    public checkPartidoCreado = async (partido_id: number): Promise<any> => {
        return knex.raw(`
                SELECT count(*) as found
                FROM partido where id = ? and estado = 'creada';
            `, [partido_id])
            .then((resp: any) => {
                return resp.rows[0].found === '1';
            })
            .catch((e: any) => {console.log(e); return false});
    }

    public getPartidoById = async (partido_id: number): Promise<any> => {
        return knex.raw(`
                SELECT *
                FROM partido where id = ?;
            `, [partido_id])
            .then((resp: any) => {
                return {...resp.rows[0]}
            })
            .catch((e: any) => {console.log(e); return false});
    }

    public updateEstadoPartido = async (partido_id: number, nuevoEstado: number): Promise<any> => {
        return knex.raw(`
            UPDATE partido 
            SET estado = ?
            WHERE id = ?
        `, [nuevoEstado,partido_id]);
    }
}
