// config/database.js
const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: console.log // podés poner true si querés ver los SQL que ejecuta
});

module.exports = sequelize;
