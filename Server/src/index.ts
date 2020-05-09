/**
 * Required External Modules
 */
import Repository from './repository';
const express = require("express");
const path = require("path");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
const repository = new Repository();

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

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });