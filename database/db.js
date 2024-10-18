const mongoose = require('mongoose');
require('dotenv').config(); // Cargar variables de entorno
const uri = process.env.URI_MONGO; // URI de MongoDB

// Conectar a MongoDB
const main = async () => {
    try {
        const connection = await mongoose.connect(uri); // Sin las opciones obsoletas
        console.log('MongoDB conectado ✔');
        return connection.connection.getClient(); // Retorna el cliente MongoDB
    } catch (err) {
        console.log('Error al conectar a MongoDB:', err);
        throw err; // Para que los errores se propaguen
    }
};

// Ejecutar la conexión
module.exports = {
    main: main() // Ejecuta la función main y retorna la promesa del cliente MongoDB
};
