import jugador from "./jugador";
import { ConfiguracionPartido } from "../types/configuracionPartido";
import Repository from "../repository";
import {EstadosPartidos} from "../enums/enums";

export default class partido {
    private repository = new Repository();
    private validTransitions: { [key: number]: Array<number>; } = { };

    public async crearpartido(configuracionPartido: ConfiguracionPartido,) {
        let partido = await this.repository.createPartido(configuracionPartido.juego_id, configuracionPartido.mazo_id, EstadosPartidos.creada);
        this.validTransitions[EstadosPartidos.creada] = [EstadosPartidos.iniciada, EstadosPartidos.finalizada];
        this.validTransitions[EstadosPartidos.iniciada] = [EstadosPartidos.finalizada];
        return partido;
    }

    public async unirseAPartido(partido_id: number, jugador_id: number){
        try {
            this.validarPartidoIniciado(partido_id);
            this.repository.inicioPuntajeJugador(jugador_id, partido_id);
        } catch (error){
            console.log(error);
        }
    }

    public async iniciarPartido(partido_id: number) {
        this.cambiarEstado(EstadosPartidos.iniciada, partido_id);
    }

    private async cambiarEstado(nuevoEstado: number, partido_id: number){
        let partido = await this.repository.getPartidoById(partido_id);
        if(this.validTransitions[partido.estado].includes(nuevoEstado)){
            this.repository.updateEstadoPartido(partido_id, nuevoEstado);
        }
    }

    private async validarPartidoIniciado(partido_id: number) {
        if (!this.repository.checkPartidoCreado(partido_id)){
            throw Error('No es una partida valida para unirse');
        }
    }
}