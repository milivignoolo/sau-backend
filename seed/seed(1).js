// seed/seed.js
const sequelize = require('../config/database');
const initModels = require('../models/initModels');
const bcrypt = require('bcrypt');

const models = initModels(sequelize);
const { Sysacad, PersonalSAU } = models;

async function runSeed() {
  try {
    await sequelize.sync({ alter: true }); // Borra y recrea las tablas

    console.log('🌱 Seeding base de datos...');

    // Insertar estudiantes en Sysacad
    await Sysacad.bulkCreate([
      {
        dni: '12345678',
        legajo: 'A001',
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan.perez@utn.edu.ar',
        carrera: 'Ingeniería en Sistemas',
        año_cursado: 3,
        promedio: 7.8,
        materias_aprobadas: 20,
        materias_regularizadas: 8,
        estado: 'activo'
      },
      {
        dni: '87654321',
        legajo: 'A002',
        nombre: 'Ana',
        apellido: 'Gómez',
        email: 'ana.gomez@utn.edu.ar',
        carrera: 'Ingeniería Electrónica',
        año_cursado: 2,
        promedio: 6.5,
        materias_aprobadas: 15,
        materias_regularizadas: 10,
        estado: 'activo'
      }
    ]);

    // Insertar administradores en PersonalSAU
    await PersonalSAU.bulkCreate([
      {
        dni: '11111111',
        nombre: 'Lucía',
        apellido: 'Rodríguez',
        email: 'lucia.rodriguez@sau.utn.edu.ar'
      },
      {
        dni: '22222222',
        nombre: 'Martín',
        apellido: 'Díaz',
        email: 'martin.diaz@sau.utn.edu.ar'
      }
    ]);

    console.log('✅ Seed ejecutado con éxito.');
    process.exit(0); // terminar script correctamente
  } catch (error) {
    console.error('❌ Error al ejecutar el seed:', error);
    process.exit(1);
  }
}

console.log('⚠️ SEED EJECUTADO');
runSeed();
