const Admin = require('../models/Admin');


exports.login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email, password });
  if (!admin) return res.status(401).json({ message: 'Credenciais inválidas' });
  res.json({ token: 'admin-token' }); // Para produção, use JWT!
};

exports.register = async (req, res) => {
  const { email, password } = req.body;

  const exists = await Admin.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email já cadastrado' });

  const admin = new Admin({ email, password });
  await admin.save();

  res.status(201).json({ message: 'Admin registrado com sucesso' });
};
