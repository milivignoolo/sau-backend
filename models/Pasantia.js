const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Pasantia = sequelize.define('Pasantia', {
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    area: DataTypes.STRING,
    vacantes: DataTypes.INTEGER,
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    modalidad: DataTypes.STRING,
    remuneracion: DataTypes.STRING,
    ubicacion: DataTypes.STRING,
    duracion: DataTypes.STRING,
    horas_semanales: DataTypes.INTEGER,
    horario_estimado: DataTypes.STRING,
    tareas: DataTypes.TEXT,

    // requisitos
    carrera: DataTypes.STRING,
    año_cursado_min: DataTypes.INTEGER,
    habilidades_tecnicas: DataTypes.JSON, // {nombre, nivel}
    habilidades_blandas: DataTypes.JSON,
    idiomas: DataTypes.JSON,

    urgencia: { type: DataTypes.INTEGER, defaultValue: 1 },
    estado: { type: DataTypes.STRING, defaultValue: 'pendiente' },

    // Foreign key explícita
    empresaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Empresas', // nombre de tabla en la base de datos
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
  });

  return Pasantia;
};
