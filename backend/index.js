import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB en EC2 (sin credenciales)
const DB_URI = 'mongodb://18.118.33.70:27017/colegio'; // Reemplaza con la IP de tu EC2

mongoose.connect(DB_URI)
    .then(() => console.error('✅ Conectado a MongoDB (sin credenciales)'))
    .catch(err => console.error('❌ Error de conexión:', err));

// Rutas
app.get('/estudiantes', async (req, res) => {
    try {
        const estudiantes = await mongoose.connection.db.collection('estudiantes').find().toArray();
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener estudiantes' });
    }
});

app.get('/profesores', async (req, res) => {
    try {
        const profesores = await mongoose.connection.db.collection('profesores').find().toArray();
        res.json(profesores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener profesores' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor API corriendo en http://localhost:${PORT}`);
});