const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Base de datos temporal (en memoria)
let garments = [];

/**
 * 🔥 POST - Guardar prenda
 */
app.post('/garments', (req, res) => {
  console.log(' POST /garments recibido');
  console.log('DATA:', req.body);

  const { name, type, color, occasion, userId } = req.body;

  if (!name || !type || !color || !occasion || !userId) {
    console.log('❌ Faltan datos');
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const newGarment = {
    id: Date.now().toString(),
    name,
    type,
    color,
    occasion,
    userId,
    createdAt: new Date(),
  };

  garments.push(newGarment);

  console.log(' Prenda guardada:', newGarment);

  res.status(201).json({
    message: 'Prenda guardada correctamente',
    data: newGarment,
  });
});

/**
 * 🔥 GET - Obtener prendas por usuario
 */
app.get('/garments/:userId', (req, res) => {
  const { userId } = req.params;

  console.log(`📤 GET /garments/${userId}`);

  const userGarments = garments.filter(
    (g) => g.userId === userId
  );

  res.json(userGarments);
});

/**
 * 🔥 Ruta de prueba
 */
app.get('/', (req, res) => {
  console.log('🌐 API consultada');
  res.send('API DripDesk funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});