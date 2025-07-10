const EstudianteModel = require('./Estudiante');
const EmpresaModel = require('./Empresa');
const AdministradorModel = require('./Administrador');
const PasantiaModel = require('./Pasantia');
const SysacadModel = require('./Sysacad');
const PersonalSAUModel = require('./PersonalSAU');

module.exports = (sequelize) => {
  const Estudiante = EstudianteModel(sequelize);
  const Empresa = EmpresaModel(sequelize);
  const Administrador = AdministradorModel(sequelize);
  const Pasantia = PasantiaModel(sequelize);
  const Sysacad = SysacadModel(sequelize);
  const PersonalSAU = PersonalSAUModel(sequelize);

  // Relaciones
  Empresa.hasMany(Pasantia, { foreignKey: 'empresaId' });
  Pasantia.belongsTo(Empresa, { foreignKey: 'empresaId' });

  return {
    Estudiante,
    Empresa,
    Administrador,
    Pasantia,
    Sysacad,
    PersonalSAU
  };
};
