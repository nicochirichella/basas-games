import { ConfiguracionPartido } from "../types/configuracionPartido";
import Repository from '../repository';
import Partido from "./partido";
import { pathToFileURL } from "url";

export default class juego { 
    private repository = new Repository();
    private partido = new Partido();

    public async crearPartido(configuracion: ConfiguracionPartido){ 
        if (this.isValidConfiguration(configuracion)) {
            let nuevopartido = await this.partido.crearpartido(configuracion);
            console.log('la nueva partido es:' ,nuevopartido);
        }
    }

    private isValidConfiguration(configuracion: ConfiguracionPartido): boolean {
        return true;
    }
}