/**
 * Required External Modules
 */
import Repository from './repository';
import Juego from './models/juego';
const express = require("express");
const path = require("path");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
const repository = new Repository();
const juego = new Juego();

/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */
app.get('/', function (req: any, res: any) {
    res.send('<b>My</b> first express http server');
});

app.get('/get-mazo', async (req: any, res: any) => {
  try {
      const cartas = await repository.getCardsFromMazo(1);
      res.send({ status: true, cartas })
  } catch (error) {
      console.log(error);
      res.send({ status: false, error});
  }
})

app.get('/prueba-nuevo-juego', async (req: any, res: any) => {
  try {
      const configuration = {
        juego_id: 1,
        jugadores_ids: [1,2,3,4],
        mazo_id: 1
      }
      const result = juego.crearPartido(configuration);
      res.send({status: true, result})
  } catch (error) {
    console.log(error);
    res.send({ status: false, error});
  }
})

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });