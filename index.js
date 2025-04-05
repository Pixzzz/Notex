import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());

// Conexión a MongoDB (local en la EC2)
const DB_URI = 'mongodb://localhost:27017/colegio';

mongoose.connect(DB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola Mundo desde el EC2!');
});

// Ruta para obtener estudiantes
app.get('/estudiantes', async (req, res) => {
  try {
    const estudiantes = await mongoose.connection.db.collection('estudiantes').find().toArray();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor API corriendo en http://0.0.0.0:${PORT}`);
});