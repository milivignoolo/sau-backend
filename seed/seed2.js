const sequelize = require('../config/database');
const initModels = require('../models/initModels');

const models = initModels(sequelize);
const { Sysacad } = models;

async function runSeed2() {
  try {
    await sequelize.sync(); // Solo asegura que las tablas estén

    console.log('🌱 Agregando nuevos estudiantes a Sysacad...');

    await Sysacad.bulkCreate([
      {
        dni: '10000001',
        legajo: 'B001',
        nombre: 'Valentina',
        apellido: 'Ruiz',
        email: 'valentina.ruiz@utn.edu.ar',
        carrera: 'Ingeniería Química',
        año_cursado: 3,
        promedio: 7.4,
        materias_aprobadas: 22,
        materias_regularizadas: 5,
        estado: 'activo'
      },
      {
        dni: '10000002',
        legajo: 'B002',
        nombre: 'Nicolás',
        apellido: 'Martínez',
        email: 'nicolas.martinez@utn.edu.ar',
        carrera: 'Ingeniería Mecánica',
        año_cursado: 4,
        promedio: 8.1,
        materias_aprobadas: 28,
        materias_regularizadas: 2,
        estado: 'activo'
      },
      {
        dni: '10000003',
        legajo: 'B003',
        nombre: 'Carla',
        apellido: 'Giménez',
        email: 'carla.gimenez@utn.edu.ar',
        carrera: 'Ingeniería en Sistemas',
        año_cursado: 1,
        promedio: 6.8,
        materias_aprobadas: 10,
        materias_regularizadas: 4,
        estado: 'activo'
      },
      {
        dni: '10000004',
        legajo: 'B004',
        nombre: 'Diego',
        apellido: 'Sosa',
        email: 'diego.sosa@utn.edu.ar',
        carrera: 'Ingeniería Civil',
        año_cursado: 5,
        promedio: 7.9,
        materias_aprobadas: 30,
        materias_regularizadas: 1,
        estado: 'activo'
      },
      {
        dni: '10000005',
        legajo: 'B005',
        nombre: 'Florencia',
        apellido: 'Moreno',
        email: 'flor.moreno@utn.edu.ar',
        carrera: 'Ingeniería Industrial',
        año_cursado: 3,
        promedio: 8.3,
        materias_aprobadas: 25,
        materias_regularizadas: 3,
        estado: 'activo'
      },
      {
        dni: '10000006',
        legajo: 'B006',
        nombre: 'Julián',
        apellido: 'Torres',
        email: 'julian.torres@utn.edu.ar',
        carrera: 'Ingeniería Electrónica',
        año_cursado: 2,
        promedio: 6.7,
        materias_aprobadas: 13,
        materias_regularizadas: 6,
        estado: 'activo'
      },
      {
        dni: '10000007',
        legajo: 'B007',
        nombre: 'Agustina',
        apellido: 'López',
        email: 'agustina.lopez@utn.edu.ar',
        carrera: 'Ingeniería en Sistemas',
        año_cursado: 4,
        promedio: 9.1,
        materias_aprobadas: 29,
        materias_regularizadas: 0,
        estado: 'activo'
      },
      {
        dni: '10000008',
        legajo: 'B008',
        nombre: 'Tomás',
        apellido: 'Fernández',
        email: 'tomas.fernandez@utn.edu.ar',
        carrera: 'Ingeniería Química',
        año_cursado: 1,
        promedio: 6.0,
        materias_aprobadas: 5,
        materias_regularizadas: 7,
        estado: 'activo'
      },
      {
        dni: '10000009',
        legajo: 'B009',
        nombre: 'Brenda',
        apellido: 'Navarro',
        email: 'brenda.navarro@utn.edu.ar',
        carrera: 'Ingeniería Industrial',
        año_cursado: 2,
        promedio: 7.0,
        materias_aprobadas: 17,
        materias_regularizadas: 6,
        estado: 'activo'
      },
      {
        dni: '10000010',
        legajo: 'B010',
        nombre: 'Federico',
        apellido: 'Castro',
        email: 'federico.castro@utn.edu.ar',
        carrera: 'Ingeniería Civil',
        año_cursado: 3,
        promedio: 6.9,
        materias_aprobadas: 21,
        materias_regularizadas: 3,
        estado: 'activo'
      }
    ]);

    console.log('✅ 10 nuevos estudiantes agregados correctamente.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al insertar estudiantes:', error);
    process.exit(1);
  }
}

runSeed2();
