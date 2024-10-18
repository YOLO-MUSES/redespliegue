const mongoose = require('mongoose');
const { Schema } = mongoose;

const publicSchema = Schema({
  name: {
    type: [String], // Cambiar a un arreglo de cadenas
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 0; // Asegúrate de que el arreglo no esté vacío
      },
      message: 'El campo name debe contener al menos un nombre.'
    }
  },
  Imagen: [{
    type: String,
    required: true
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true // Create an index on the user field for faster querying
  }
});

const Publics = mongoose.model('Publics', publicSchema); // Cambié 'publicSchema' a 'Publics'

module.exports = Publics;
