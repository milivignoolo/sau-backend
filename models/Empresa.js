const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Empresa = sequelize.define('Empresa', {
    cuit: { type: DataTypes.STRING, allowNull: false, unique: true },
    razon_social: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    rubro: DataTypes.STRING,
    domicilio_legal: DataTypes.STRING,
    telefono: DataTypes.STRING,
    ubicacion: DataTypes.STRING,
    referente: DataTypes.STRING,
    cargo_referente: DataTypes.STRING,
    web: DataTypes.STRING,
    redes_sociales: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    aprobada: { type: DataTypes.BOOLEAN, defaultValue: false },
    estado: { type: DataTypes.STRING, defaultValue: 'pendiente' } // pendiente, aprobada, rechazada
  });

  return Empresa;
};
