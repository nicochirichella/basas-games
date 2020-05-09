import { knex } from '../knex';

export default class repository {

    public getCardsFromMazo = (mazo_id: number): Promise<any> => {
        return knex.raw('SELECT * FROM carta WHERE mazo_id = ?;', [mazo_id])
            .then((resp: any) => {
                if (resp.rows.length === 0) {
                    throw Error('No cards from this mazo');
                }
                return resp.rows
            });
    }

}