// models/Producto.js
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
    },
    precio: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    categoria: {
        type: String,
    },
}, {
    timestamps: true, // Para agregar createdAt y updatedAt
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
