// index.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');         // conexión Sequelize
const initModels = require('./models/initModels');      // relaciones y modelos
const models = initModels(sequelize);   
require('dotenv').config();                // instanciar los modelos

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());                     // permitir peticiones desde frontend
app.use(express.json());             // parsear JSON de las peticiones

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend del sistema de pasantías funcionando');
});

// Rutas de API
//REGISTROS
const estudianteRoutes = require('./routes/estudiante.routes');
app.use('/api/estudiantes', estudianteRoutes);
const empresaRoutes = require('./routes/empresa.routes');
app.use('/api/empresas', empresaRoutes);
const adminRoutes = require('./routes/admin.routes');
app.use('/api/administradores', adminRoutes);
const pasantiaRoutes = require('./routes/pasantia.routes');
app.use('/api/pasantias', pasantiaRoutes);

//email
const emailRoutes = require('./routes/email.routes');
app.use('/api/email', emailRoutes);


//LOGIN
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);




// Inicialización de Sequelize y el servidor
sequelize.sync({ logging: false })   // actualiza tablas automáticamente
  .then(() => {
    console.log('Conexión a la base de datos establecida');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar con la base de datos:', err);
  });
