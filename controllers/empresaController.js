const bcrypt = require('bcrypt');
const { Empresa } = require('../models/initModels')(require('../config/database'));

const empresaController = {
  register: async (req, res) => {
    try {
      const {
        cuit,
        razon_social,
        email,
        contraseña,
        datosAdicionales
      } = req.body;

      const existe = await Empresa.findOne({ where: { cuit } });
      if (existe) {
        return res.status(400).json({ error: 'La empresa ya está registrada.' });
      }

      const codigoVerificacion = Math.floor(100000 + Math.random() * 900000);
      console.log(`[SIMULACIÓN] Código de verificación enviado al correo: ${email} → Código: ${codigoVerificacion}`);

      const hashedPassword = await bcrypt.hash(contraseña, 10);

      const nuevaEmpresa = await Empresa.create({
        cuit,
        razon_social,
        email,
        contraseña: hashedPassword,
        estado: 'pendiente',
        rubro: datosAdicionales?.rubro,
        domicilio_legal: datosAdicionales?.domicilio_legal,
        telefono: datosAdicionales?.telefono,
        ubicacion: datosAdicionales?.ubicacion,
        referente: datosAdicionales?.referente,
        cargo_referente: datosAdicionales?.cargo_referente,
        web: datosAdicionales?.web,
        redes_sociales: datosAdicionales?.redes_sociales
      });

      res.status(201).json({
        mensaje: 'Empresa registrada exitosamente. Pendiente de aprobación.',
        empresa: nuevaEmpresa
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno al registrar empresa.' });
    }
  },

  verificarCuit: async (req, res) => {
    try {
      const { cuit } = req.body;
      if (!cuit) {
        return res.status(400).json({ error: 'CUIT requerido' });
      }

      const empresa = await Empresa.findOne({ where: { cuit } });
      if (empresa) {
        return res.status(400).json({ error: 'CUIT ya registrado' });
      }

      return res.status(200).json({ mensaje: 'CUIT disponible' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error interno al verificar CUIT.' });
    }
  },

  aprobarEmpresa: async (req, res) => {
    try {
      const { id } = req.params;

      const empresa = await Empresa.findByPk(id);
      if (!empresa) {
        return res.status(404).json({ error: 'Empresa no encontrada.' });
      }

      if (empresa.estado === 'aprobada') {
        return res.status(400).json({ error: 'La empresa ya fue aprobada.' });
      }

      empresa.estado = 'aprobada';
      empresa.aprobada = true;
      await empresa.save();

      res.status(200).json({
        mensaje: 'Empresa aprobada correctamente.',
        empresa
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al aprobar empresa.' });
    }
  }
};

module.exports = empresaController;
