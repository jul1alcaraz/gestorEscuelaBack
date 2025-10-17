const mongoose = require('mongoose');

const cursosEnum = ["Matemática", "Historia", "Ciencias", "Arte"];

const EstudianteSchema = new mongoose.Schema({
  nombre: { type: String, required: true, },
  apellido: { type: String, required: true, },
  email: { type: String, required: true, unique: true, lowercase: true,  },
  cursos: {
    type: [{ type: String, enum: cursosEnum }],
    required: true,
    validate: {
      validator: function(arr) {
        return Array.isArray(arr) && arr.length > 0;
      },
      message: "El estudiante debe estar inscrito en al menos un curso."
    }
  }
}, { timestamps: true });

EstudianteSchema.index({ email: 1 }, { unique: true });

module.exports = {
  Estudiante: mongoose.model('Estudiante', EstudianteSchema),
  CURSOS_VALIDOS: cursosEnum
};