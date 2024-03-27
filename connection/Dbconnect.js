const { Sequelize } = require('sequelize');
require("dotenv").config()


const sequelize = new Sequelize('test', 'root', process.env.DB_Password, {
    host: process.env.Access_Host,
    logging:false,
    dialect:"mysql"
  });


  try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  sequelize.sync()


  module.exports = sequelize