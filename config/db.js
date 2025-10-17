const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/estudiantesdb';
    
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