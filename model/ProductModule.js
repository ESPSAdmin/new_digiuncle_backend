


const mongoose = require('mongoose');


const Product = mongoose.Schema({
  user_id: {
    type: String,
    allowNull: true
  },
  name: {
    type: String,
    allowNull: true
  },
  brand: {
    type: String,
    
    allowNull: true
  },
  IN_stock: {
    type: Number,
    
    allowNull: true
  },
  product_color: {
    type: String,
    
    allowNull: true
  },
  MRP_price: {
    type: Number,
    
    allowNull: true
  },
  selling_price: {
    type: Number,
    
    allowNull: true
  },
  category: {
    type: String,
    
    allowNull: true
  },
  material: {
    type: String,
    
    allowNull: true
  },
  weight: {
    type: String,
    
    allowNull: true
  },
  Dimension: {
    type: String,
    
    allowNull: true
  },
  description: {
    type: String,
    
    allowNull: true
  },
  SKU_id: {
    type: String,
    
    allowNull: true
  },
  HSN_code: {
    type: String,
    
    allowNull: true
  },
  tax: {
    type: Number,
    allowNull: true
  },
  Local_charge: {
    type: Number,
    
    allowNull: true
  },
  Zonal_charge: {
    type: Number,
    
    allowNull: true
  },
  National_charges: {
    type: Number,
    
    allowNull: true
  },
  image:{
    type:[String]
  }
  

}, { timestamps: true })


const Product_table = mongoose.model("Product_table", Product)

module.exports = {
  Product_table
}