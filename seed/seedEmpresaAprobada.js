// seeds/insertarEmpresaAprobada.js
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const initModels = require('../models/initModels');
const config = require('../config/database');

const sequelize = config;
const { Empresa } = initModels(sequelize);

async function seed() {
  try {
    await sequelize.sync(); // o sync({ force: true }) si querés recrear tablas

    const hashedPassword = await bcrypt.hash('Password123!', 10);

    await Empresa.bulkCreate([{
      cuit: '30-12345678-9',
      razon_social: 'Empresa Ejemplo S.A.',
      email: 'empresa.aprobada@ejemplo.com',
      contraseña: hashedPassword,
      estado: 'aprobada',
      rubro: 'Tecnología',
      domicilio_legal: 'Calle Falsa 123',
      telefono: '1234567890',
      ubicacion: 'Buenos Aires',
      referente: 'Juan Pérez',
      cargo_referente: 'Gerente',
      web: 'https://empresa-ejemplo.com',
      redes_sociales: '@empresaEjemplo'
    }]);

    console.log('✅ Seed de Empresa aprobada completado.');
    process.exit();
  } catch (err) {
    console.error('❌ Error en el seed:', err);
    process.exit(1);
  }
}

seed();
