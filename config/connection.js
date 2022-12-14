// impoort sequelize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config() // import environment variables to hide username, password, and db name

let sequelize;

// create connection to our db. parameters: db name, username, password
if(process.env.JAWSDB_URL){
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306
});
}

module.exports = sequelize;