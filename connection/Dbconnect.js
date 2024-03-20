const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('DigiUncle', 'DigiUncleAdmin', 'SPSltd@2022', {
    host: '68.178.145.244',
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