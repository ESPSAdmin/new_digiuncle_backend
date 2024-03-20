const { DataTypes } = require('sequelize');
const sequelize = require("../connection/Dbconnect");

const Product = sequelize.define('product_table', {
  name: {
    type: DataTypes.STRING,
    
  },
  brand: {
    type: DataTypes.STRING,
   
  },
  IN_stock: {
    type: DataTypes.INTEGER,
   
  },
  selling_price: {
    type: DataTypes.INTEGER,
   
  },
  MRP_price: {
    type: DataTypes.INTEGER,
    
  },
  Product_color: {
    type: DataTypes.STRING,
    
  },
  material: {
    type: DataTypes.STRING,
    
  },
  Product_color: {
    type: DataTypes.STRING,
    
  },
  category: {
    type: DataTypes.STRING,
   
  },
  length: {
    type: DataTypes.INTEGER,
   
  },
  width: {
    type: DataTypes.INTEGER,
    
  },
  height: {
    type: DataTypes.INTEGER,
   
  },
  weight: {
    type: DataTypes.STRING,
   
  },
  description: {
    type: DataTypes.STRING,
    
  },
  image:{
    type:DataTypes.STRING,
    
  }
}, {
  
});

module.exports = Product;
