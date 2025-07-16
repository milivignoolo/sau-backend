// seeds/insertarPersonalSAU.js
const { Sequelize } = require('sequelize');
const initModels = require('../models/initModels');
const config = require('../config/database');

const sequelize = config;
const { PersonalSAU } = initModels(sequelize);

const datos = [
  { dni: '12345678', nombre: 'Ana', apellido: 'Martínez', email: 'ana.martinez@sau.utn.edu.ar' },
  { dni: '23456789', nombre: 'Carlos', apellido: 'Gómez', email: 'carlos.gomez@sau.utn.edu.ar' },
  { dni: '34567890', nombre: 'Laura', apellido: 'Fernández', email: 'laura.fernandez@sau.utn.edu.ar' },
  { dni: '45678901', nombre: 'Javier', apellido: 'López', email: 'javier.lopez@sau.utn.edu.ar' },
  { dni: '56789012', nombre: 'María', apellido: 'Pérez', email: 'maria.perez@sau.utn.edu.ar' },
  { dni: '67890123', nombre: 'Diego', apellido: 'Rodríguez', email: 'diego.rodriguez@sau.utn.edu.ar' },
  { dni: '78901234', nombre: 'Lucía', apellido: 'García', email: 'lucia.garcia@sau.utn.edu.ar' },
  { dni: '89012345', nombre: 'Fernando', apellido: 'Sánchez', email: 'fernando.sanchez@sau.utn.edu.ar' },
  { dni: '90123456', nombre: 'Elena', apellido: 'Ruiz', email: 'elena.ruiz@sau.utn.edu.ar' },
  { dni: '01234567', nombre: 'Ricardo', apellido: 'Torres', email: 'ricardo.torres@sau.utn.edu.ar' }
];

async function seed() {
  try {
    await sequelize.sync(); // O usá sync({ force: true }) si querés recrear la tabla
    await PersonalSAU.bulkCreate(datos);
    console.log('✅ Seed de PersonalSAU completado.');
    process.exit();
  } catch (err) {
    console.error('❌ Error en el seed:', err);
    process.exit(1);
  }
}

seed();
