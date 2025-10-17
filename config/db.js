const mongoose = require('mongoose');
require('dotenv').config();

const conectarDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/estudiantesdb';
    await mongoose.connect(mongoUri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    
    console.log('✅ MongoDB conectado');
  } catch (err) {
    console.error('❌ Error al conectar MongoDB:', err);
    process.exit(1);
  }
};

module.exports = conectarDB;