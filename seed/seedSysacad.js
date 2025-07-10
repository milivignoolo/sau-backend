const sequelize = require('../config/database');
const initModels = require('../models/initModels');

const models = initModels(sequelize);
const { Sysacad } = models;

async function runSeedSysacad() {
  try {
    await sequelize.sync({ force: true }); // recrea tablas desde modelos actualizados

    console.log('🌱 Agregando 20 nuevos estudiantes a Sysacad...');

    await Sysacad.bulkCreate([
      {
        dni: '10000011',
        legajo: 1011,
        nombre: 'Lucía',
        apellido: 'Benítez',
        email: 'lucia.benitez@utn.edu.ar',
        carrera: 'Ingeniería en Sistemas',
        año_cursado: 5,
        promedio: 8.9,
        materias_aprobadas: 36,
        materias_regularizadas: 0,
        estado: 'egresado'
      },
      {
        dni: '10000012',
        legajo: 1012,
        nombre: 'Matías',
        apellido: 'Herrera',
        email: 'matias.herrera@utn.edu.ar',
        carrera: 'Ingeniería Industrial',
        año_cursado: 2,
        promedio: 6.5,
        materias_aprobadas: 12,
        materias_regularizadas: 5,
        estado: 'activo'
      },
      {
        dni: '10000013',
        legajo: 1013,
        nombre: 'Camila',
        apellido: 'Pérez',
        email: 'camila.perez@utn.edu.ar',
        carrera: 'Ingeniería Civil',
        año_cursado: 4,
        promedio: 7.8,
        materias_aprobadas: 27,
        materias_regularizadas: 3,
        estado: 'activo'
      },
      {
        dni: '10000014',
        legajo: 1014,
        nombre: 'Gonzalo',
        apellido: 'Suárez',
        email: 'gonzalo.suarez@utn.edu.ar',
        carrera: 'Ingeniería Electrónica',
        año_cursado: 3,
        promedio: 6.3,
        materias_aprobadas: 18,
        materias_regularizadas: 4,
        estado: 'activo'
      },
      {
        dni: '10000015',
        legajo: 1015,
        nombre: 'Sofía',
        apellido: 'Alonso',
        email: 'sofia.alonso@utn.edu.ar',
        carrera: 'Ingeniería Química',
        año_cursado: 5,
        promedio: 9.0,
        materias_aprobadas: 38,
        materias_regularizadas: 0,
        estado: 'egresado'
      },
      {
        dni: '10000016',
        legajo: 1016,
        nombre: 'Facundo',
        apellido: 'Vera',
        email: 'facundo.vera@utn.edu.ar',
        carrera: 'Ingeniería Mecánica',
        año_cursado: 1,
        promedio: 5.7,
        materias_aprobadas: 6,
        materias_regularizadas: 2,
        estado: 'activo'
      },
      {
        dni: '10000017',
        legajo: 1017,
        nombre: 'Marina',
        apellido: 'Luna',
        email: 'marina.luna@utn.edu.ar',
        carrera: 'Ingeniería Electrónica',
        año_cursado: 2,
        promedio: 7.5,
        materias_aprobadas: 14,
        materias_regularizadas: 6,
        estado: 'activo'
      },
      {
        dni: '10000018',
        legajo: 1018,
        nombre: 'Iván',
        apellido: 'Gómez',
        email: 'ivan.gomez@utn.edu.ar',
        carrera: 'Ingeniería Civil',
        año_cursado: 4,
        promedio: 8.2,
        materias_aprobadas: 29,
        materias_regularizadas: 1,
        estado: 'activo'
      },
      {
        dni: '10000019',
        legajo: 1019,
        nombre: 'Julieta',
        apellido: 'Morales',
        email: 'julieta.morales@utn.edu.ar',
        carrera: 'Ingeniería en Sistemas',
        año_cursado: 3,
        promedio: 7.1,
        materias_aprobadas: 22,
        materias_regularizadas: 5,
        estado: 'activo'
      },
      {
        dni: '10000020',
        legajo: 1020,
        nombre: 'Ramiro',
        apellido: 'Ortiz',
        email: 'ramiro.ortiz@utn.edu.ar',
        carrera: 'Ingeniería Química',
        año_cursado: 1,
        promedio: 6.4,
        materias_aprobadas: 9,
        materias_regularizadas: 3,
        estado: 'activo'
      },
      {
        dni: '10000021',
        legajo: 1021,
        nombre: 'Martina',
        apellido: 'Silva',
        email: 'martina.silva@utn.edu.ar',
        carrera: 'Ingeniería Industrial',
        año_cursado: 2,
        promedio: 8.5,
        materias_aprobadas: 17,
        materias_regularizadas: 2,
        estado: 'activo'
      },
      {
        dni: '10000022',
        legajo: 1022,
        nombre: 'Bruno',
        apellido: 'Rojas',
        email: 'bruno.rojas@utn.edu.ar',
        carrera: 'Ingeniería Electrónica',
        año_cursado: 3,
        promedio: 7.0,
        materias_aprobadas: 20,
        materias_regularizadas: 4,
        estado: 'activo'
      },
      {
        dni: '10000023',
        legajo: 1023,
        nombre: 'Micaela',
        apellido: 'Ferreyra',
        email: 'mica.ferreyra@utn.edu.ar',
        carrera: 'Ingeniería Mecánica',
        año_cursado: 5,
        promedio: 9.3,
        materias_aprobadas: 35,
        materias_regularizadas: 0,
        estado: 'egresado'
      },
      {
        dni: '10000024',
        legajo: 1024,
        nombre: 'Leandro',
        apellido: 'Gutiérrez',
        email: 'leandro.gutierrez@utn.edu.ar',
        carrera: 'Ingeniería Civil',
        año_cursado: 2,
        promedio: 6.2,
        materias_aprobadas: 13,
        materias_regularizadas: 5,
        estado: 'activo'
      },
      {
        dni: '10000025',
        legajo: 1025,
        nombre: 'Daniela',
        apellido: 'Molina',
        email: 'daniela.molina@utn.edu.ar',
        carrera: 'Ingeniería Industrial',
        año_cursado: 1,
        promedio: 7.3,
        materias_aprobadas: 8,
        materias_regularizadas: 2,
        estado: 'activo'
      },
      {
        dni: '10000026',
        legajo: 1026,
        nombre: 'Ezequiel',
        apellido: 'Ramírez',
        email: 'ezequiel.ramirez@utn.edu.ar',
        carrera: 'Ingeniería en Sistemas',
        año_cursado: 4,
        promedio: 8.0,
        materias_aprobadas: 26,
        materias_regularizadas: 2,
        estado: 'activo'
      },
      {
        dni: '10000027',
        legajo: 1027,
        nombre: 'Paula',
        apellido: 'Domínguez',
        email: 'paula.dominguez@utn.edu.ar',
        carrera: 'Ingeniería Electrónica',
        año_cursado: 5,
        promedio: 8.7,
        materias_aprobadas: 34,
        materias_regularizadas: 1,
        estado: 'egresado'
      },
      {
        dni: '10000028',
        legajo: 1028,
        nombre: 'Tomás',
        apellido: 'Rivera',
        email: 'tomas.rivera@utn.edu.ar',
        carrera: 'Ingeniería Química',
        año_cursado: 2,
        promedio: 6.1,
        materias_aprobadas: 11,
        materias_regularizadas: 4,
        estado: 'activo'
      },
      {
        dni: '10000029',
        legajo: 1029,
        nombre: 'Rocío',
        apellido: 'Cabrera',
        email: 'rocio.cabrera@utn.edu.ar',
        carrera: 'Ingeniería Mecánica',
        año_cursado: 3,
        promedio: 7.6,
        materias_aprobadas: 23,
        materias_regularizadas: 3,
        estado: 'activo'
      },
      {
        dni: '10000030',
        legajo: 1030,
        nombre: 'Franco',
        apellido: 'Acosta',
        email: 'franco.acosta@utn.edu.ar',
        carrera: 'Ingeniería en Sistemas',
        año_cursado: 5,
        promedio: 9.2,
        materias_aprobadas: 37,
        materias_regularizadas: 0,
        estado: 'egresado'
      }
    ]);

    console.log('✅ 20 nuevos estudiantes agregados correctamente.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al insertar estudiantes:', error);
    process.exit(1);
  }
}

runSeedSysacad();
