const Sequelize = require('sequelize');
const Letter = require('./letter');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Letter = Letter;

Letter.init(sequelize);

// Letter.associate(db);

module.exports = db;
