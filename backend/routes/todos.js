const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Agregar una nueva tarea
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Título y descripción son obligatorios.' });
  }

  const todo = new Todo({
    title,
    description,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una tarea
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'No se encontró la tarea.' });
    }
    res.json({ message: 'Tarea eliminada exitosamente.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Marcar como completada una tarea
router.patch('/:id/complete', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'No se encontró la tarea.' });
    }

    todo.completedOn = new Date();
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para importar tareas desde localStorage
router.post('/import', async (req, res) => {
  try {
    const todos = req.body.todos; // Array de tareas
    const insertedTodos = await Todo.insertMany(todos);
    res.status(201).json(insertedTodos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
