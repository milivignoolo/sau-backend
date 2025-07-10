const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PersonalSAU = sequelize.define('PersonalSAU', {
    dni: { type: DataTypes.STRING, allowNull: false },
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING
  });

  return PersonalSAU;
};
