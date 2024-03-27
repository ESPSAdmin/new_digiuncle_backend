const mongoose = require('mongoose');


const Order = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        allowNull: true
    },
    status: {
        type: String,
        required: true,
        allowNull: true
    },
    info_id: {
        type: String,
        required: true,
        allowNull: true
    },
    product_id: {
        type: String,
        required: true,
        allowNull: true
    },
    payement: {
        type: String,
        required: true,
        allowNull: true
    }


}, { timestamps: true })


const OrderTable = mongoose.model("order", Order)

module.exports = {
    OrderTable
}