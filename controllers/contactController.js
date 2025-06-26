const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// exports.handleContact = async (req, res) => {
//   const { name, email, message } = req.body;

//   const contact = new Contact({ name, email, message });
//   await contact.save();

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   const mailOptionsToAdmin = {
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_USER,
//     subject: 'Novo Contato do Site',
//     text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`
//   };

//   const mailOptionsToUser = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Recebemos sua mensagem',
//     text: `Olá ${name}, recebemos sua solicitação e entraremos em contato em breve.`
//   };

//   try {
//     await transporter.sendMail(mailOptionsToAdmin);
//     await transporter.sendMail(mailOptionsToUser);
//     res.status(200).json({ message: 'Mensagem enviada com sucesso' });
//   } catch (error) {
//     console.error('Erro ao enviar email:', error);
//     res.status(500).json({ message: 'Erro ao enviar email' });
//   }
// };

// controllers/contactController.js
exports.handleContact = async (req, res) => {
  const { name, email, message } = req.body;

  const contact = new Contact({ name, email, message });
  await contact.save();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptionsToAdmin = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'Novo Contato do Site',
    text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`
  };

  const mailOptionsToUser = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Recebemos sua mensagem',
    text: `Olá ${name}, recebemos sua solicitação e entraremos em contato em breve.`
  };

  try {
    await transporter.sendMail(mailOptionsToAdmin);
    await transporter.sendMail(mailOptionsToUser);
    res.status(200).json({ message: 'Mensagem enviada com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ message: 'Erro ao enviar email' });
  }
};
