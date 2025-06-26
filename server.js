// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const contactRoutes = require('./routes/contact');
const serviceRoutes = require('./routes/services');
const authRoutes = require('./routes/auth');


const app = express();
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Servir painel admin
app.use('/admin', express.static(path.join(__dirname, 'public')));
const fs = require('fs');

app.use('/api/contact', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/admin', authRoutes);

// Garante que a pasta uploads existe
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(5000, () => console.log('Servidor rodando na porta 5000'));
  })
  .catch(err => console.error(err));


