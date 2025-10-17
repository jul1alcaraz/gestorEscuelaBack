const express = require('express');
const router = express.Router();
const { Estudiante, CURSOS_VALIDOS } = require('../models/ModelEstudiante');
const mongoose = require('mongoose');

function validarCurso(curso) {
  return CURSOS_VALIDOS.includes(curso);
}

router.get('/', async (req, res) => {
  try {
    const { curso } = req.query;
    let filter = {};
    if (curso) {
      if (!validarCurso(curso)) {
        return res.status(400).json({ error: `Curso inválido.` });
      }
      filter = { cursos: curso };
    }
    const estudiantes = await Estudiante.find(filter).lean();
    res.json(estudiantes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar estudiantes' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'ID inválido' });
    const est = await Estudiante.findById(id).lean();
    if (!est) return res.status(404).json({ error: 'Estudiante no encontrado' });
    res.json(est);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener estudiante' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nombre, apellido, email, cursos } = req.body;
    if (!nombre || !apellido || !email || !Array.isArray(cursos)) {
      return res.status(400).json({ error: 'Faltan campos requeridos.' });
    }
    for (const c of cursos) {
      if (!validarCurso(c)) {
        return res.status(400).json({ error: `Curso inválido '${c}'.` });
      }
    }

    const nuevo = new Estudiante({ nombre, apellido, email, cursos });
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(409).json({ error: 'El email ya está registrado.' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error al crear estudiante' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, cursos } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'ID inválido' });

    const update = {};
    if (nombre !== undefined) update.nombre = nombre;
    if (apellido !== undefined) update.apellido = apellido;
    if (email !== undefined) update.email = email;
    if (cursos !== undefined) {
      if (!Array.isArray(cursos)) {
        return res.status(400).json({ error: 'cursos debe ser un array' });
      }
      for (const c of cursos) {
        if (!validarCurso(c)) {
          return res.status(400).json({ error: `Curso inválido '${c}'.` });
        }
      }
      update.cursos = cursos;
    }

    const actualizado = await Estudiante.findByIdAndUpdate(id, update, { new: true, runValidators: true, context: 'query' });
    if (!actualizado) return res.status(404).json({ error: 'Estudiante no encontrado' });
    res.json(actualizado);
  } catch (err) {
    console.error(err);
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(409).json({ error: 'El email ya está registrado.' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error al actualizar estudiante' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'ID inválido' });
    const eliminado = await Estudiante.findByIdAndDelete(id);
    if (!eliminado) return res.status(404).json({ error: 'Estudiante no encontrado' });
    res.json({ message: 'Estudiante eliminado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar estudiante' });
  }
});

module.exports = router;