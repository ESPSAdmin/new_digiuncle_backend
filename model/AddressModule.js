const { DataTypes } = require('sequelize');
const sequelize = require("../connection/Dbconnect");

const Address = sequelize.define('address', {
    info_id:{
        type:DataTypes.STRING,
        primaryKey: true, 
    },
    addressLine1: {
        type: DataTypes.STRING,

    },
    addressLine2: {
        type: DataTypes.STRING,

    },
    Landmark: {
        type: DataTypes.STRING,

    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    longitude: {
        type: DataTypes.STRING,

    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Address;
