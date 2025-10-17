const express = require('express');
const mongoose = require('mongoose');
const conectarDB = require('./config/db');
const dotenv = require('dotenv');


const app = express();

app.use(express.json());

conectarDB();

const estudiantesRouter = require('./routes/Rutas');
app.use('/estudiantes', estudiantesRouter);

app.get('/', (req, res) => res.json({ status: 'ok' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

module.exports = app;