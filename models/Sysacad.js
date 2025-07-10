const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Sysacad = sequelize.define('Sysacad', {
    dni: { type: DataTypes.STRING, allowNull: false },
    legajo: { type: DataTypes.STRING, allowNull: false },
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    carrera: DataTypes.STRING,
    año_cursado: DataTypes.INTEGER,
    promedio: DataTypes.FLOAT,
    materias_aprobadas: DataTypes.INTEGER,
    materias_regularizadas: DataTypes.INTEGER,
    estado: DataTypes.STRING // por si querés marcar "egresado", etc.
  });

  return Sysacad;
};
