const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Estudiante = sequelize.define('Estudiante', {
    dni: { type: DataTypes.STRING, allowNull: false, unique: true },
    legajo: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false },
    nombre: { type: DataTypes.STRING },
    apellido: { type: DataTypes.STRING },
    carrera: { type: DataTypes.STRING },
    año_cursado: { type: DataTypes.INTEGER },
    promedio: { type: DataTypes.FLOAT },
    habilidades_blandas: { type: DataTypes.JSON }, // [{nombre, nivel}]
    habilidades_tecnicas: { type: DataTypes.JSON },
    idiomas: { type: DataTypes.JSON },
    disponibilidad_horaria: { type: DataTypes.STRING },
    experiencia_previa: { type: DataTypes.TEXT },
    contraseña: { type: DataTypes.STRING },
    estado: { type: DataTypes.STRING, defaultValue: 'activo' }
  });

  return Estudiante;
};
