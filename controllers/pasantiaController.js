const { Pasantia, Empresa, Estudiante } = require('../models/initModels')(require('../config/database'));


function calcularPorcentajeCoincidencia(requisitos = [], delEstudiante = []) {
    if (!requisitos.length) return 1; // si la pasantía no exige nada, se considera compatible
    const coincidencias = requisitos.filter(r => delEstudiante.includes(r));
    return coincidencias.length / requisitos.length;
  }

const pasantiaController = {
  register: async (req, res) => {
    try {
      const {
        empresaId,
        titulo,
        descripcion,
        area,
        vacantes,
        fecha_inicio,
        fecha_fin,
        modalidad,
        remuneracion,
        ubicacion,
        duracion,
        horas_semanales,
        horario_estimado,
        tareas,
        carrera,
        año_cursado_min,
        habilidades_tecnicas,
        habilidades_blandas,
        idiomas,
        urgencia
      } = req.body;

      // Verificar que la empresa exista y esté aprobada
      const empresa = await Empresa.findByPk(empresaId);

      if (!empresa) {
        return res.status(404).json({ error: 'Empresa no encontrada.' });
      }

      if (!empresa.aprobada) {
        return res.status(403).json({ error: 'La empresa no está aprobada para registrar pasantías.' });
      }

      // Crear la pasantía con estado pendiente por defecto
      const nuevaPasantia = await Pasantia.create({
        empresaId,
        titulo,
        descripcion,
        area,
        vacantes,
        fecha_inicio,
        fecha_fin,
        modalidad,
        remuneracion,
        ubicacion,
        duracion,
        horas_semanales,
        horario_estimado,
        tareas,
        carrera,
        año_cursado_min,
        habilidades_tecnicas,
        habilidades_blandas,
        idiomas,
        urgencia,
        estado: 'pendiente' // explícito para claridad
      });

      res.status(201).json({
        mensaje: 'Pasantía registrada exitosamente.',
        pasantia: nuevaPasantia
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno al registrar pasantía.' });
    }
  },
  getCompatibles: async (req, res) => {
    try {
      const { estudianteId } = req.params;

      const estudiante = await Estudiante.findByPk(estudianteId);
      if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' });

      const pasantias = await Pasantia.findAll({ where: { estado: 'aprobada' } }); // o 'pendiente' si lo preferís

      const resultado = pasantias.map(p => {
        const carreraOk = p.carrera === estudiante.carrera;
        const añoOk = estudiante.año_cursado >= p.año_cursado_min;

        const tecnicasMatch = calcularPorcentajeCoincidencia(p.habilidades_tecnicas, estudiante.habilidades_tecnicas);
        const blandasMatch = calcularPorcentajeCoincidencia(p.habilidades_blandas, estudiante.habilidades_blandas);
        const idiomasMatch = calcularPorcentajeCoincidencia(p.idiomas, estudiante.idiomas);

        const promedioCompatibilidad = (tecnicasMatch + blandasMatch + idiomasMatch) / 3;

        let bandera = 'no compatible';
        const cumpleBasicos = carreraOk && añoOk && promedioCompatibilidad >= 0.5;

        if (cumpleBasicos) {
          if (promedioCompatibilidad >= 0.8) {
            bandera = 'alta';
          } else if (promedioCompatibilidad >= 0.5) {
            bandera = 'media';
          } else {
            bandera = 'baja';
          }
        }

        return {
          pasantia: p,
          bandera_compatibilidad: bandera
        };
      });

      res.status(200).json(resultado);

    } catch (error) {
      console.error('Error al buscar pasantías compatibles:',error);
      res.status(500).json({ error: 'Error al buscar pasantías compatibles' });
    }
  },
  cambiarEstado: async (req, res) => {
    try {
      const { id } = req.params;
      const { estado } = req.body;

      const pasantia = await Pasantia.findByPk(id);
      if (!pasantia) {
        return res.status(404).json({ error: 'Pasantía no encontrada.' });
      }

      pasantia.estado = estado;
      await pasantia.save();

      res.status(200).json({
        mensaje: `Estado de pasantía actualizado a '${estado}'`,
        pasantia
      });

    } catch (error) {
      console.error('Error al cambiar estado de pasantía:', error);
      res.status(500).json({ error: 'Error interno al cambiar estado de pasantía.' });
    }
}
};

module.exports = pasantiaController;
