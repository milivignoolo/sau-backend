const nodemailer = require('nodemailer');
require('dotenv').config(); // Por si no está ya cargado en tu index.js

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS // Usá contraseña de aplicación si tenés 2FA
  }
});

exports.enviarCodigo = async (req, res) => {
  const { email, codigo } = req.body;

  if (!email || !codigo) {
    return res.status(400).json({ error: 'Faltan datos: email o código.' });
  }

  const mailOptions = {
    from: `"SAU UTN" <${process.env.MAIL_USER}>`,
    to: email,
    subject: 'Código de Verificación - Registro de Estudiante',
    text: `Tu código de verificación es: ${codigo}. Es válido por 5 minutos.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Correo enviado exitosamente');
    res.json({ mensaje: 'Correo enviado correctamente.' });
  } catch (error) {
    console.error('❌ Error al enviar el correo:', error);
    res.status(500).json({ error: 'No se pudo enviar el correo.' });
  }
};
