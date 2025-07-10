const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Administrador = sequelize.define('Administrador', {
    dni: { type: DataTypes.STRING, allowNull: false, unique: true },
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: { type: DataTypes.STRING, allowNull: false },
    contraseña: DataTypes.STRING,
    estado: { type: DataTypes.STRING, defaultValue: 'activo' }
  });

  return Administrador;
};
