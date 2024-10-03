const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todosRouter = require('./routes/todos');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
const mongoURI = process.env.MONGO_URL || 'mongodb://mongodb:27017/todo-app';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log('Error de conexión a MongoDB:', err.message));

// Rutas
app.use('/api/todos', todosRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Backend de la aplicación Todo');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
