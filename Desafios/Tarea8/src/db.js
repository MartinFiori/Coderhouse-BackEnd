const options = require('./options/mysqlconfig.js');
const knex = require('knex');

const database = knex(options);

// database.schema.createTable('champs', table => {
//         table.increments('id');
//         table.varchar('name', 30);
//         table.varchar('rol', 10);
//         table.varchar('img', 150);
//     }).then(() => console.log('Table Created!'))
//     .catch(err => console.log(err))
//     .finally(() => database.destroy())

module.exports = database;