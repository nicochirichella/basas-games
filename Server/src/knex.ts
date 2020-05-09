const knexConfig = {
    client: 'postgres',
    connection: {
        host     : 'database.trocafone.local',
        user     : 'trocafone',
        password : 'trocafone',
        database : 'plataforma_juegos',
    } 
  };
  
  export const knex = require('knex')(knexConfig);