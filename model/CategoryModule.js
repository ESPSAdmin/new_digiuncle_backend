const { DataTypes } = require('sequelize');
const sequelize = require("../connection/Dbconnect");

const Category = sequelize.define('Category_table', {
  
  category_name: {
    type: DataTypes.STRING,
    
  },
  user_id: {
    type: DataTypes.STRING,
  },
  image_url: {
    type: DataTypes.STRING,
  }
}, {
  
});

module.exports = Category;
