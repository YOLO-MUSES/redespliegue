// models/Venta.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VentaSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: { type: String, required:true},
    total: { type: Number, required: true },
    date: { type: String, required:true }
});

module.exports = mongoose.model('Venta', VentaSchema);
