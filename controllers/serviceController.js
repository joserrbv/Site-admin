const Service = require('../models/Service');
const fs = require('fs');

exports.getServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

exports.addService = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? req.file.filename : '';
  const service = new Service({ title, description, image });
  await service.save();
  res.status(201).json(service);
};

exports.updateService = async (req, res) => {
  const { title, description } = req.body;
  const updateData = { title, description };
  if (req.file) updateData.image = req.file.filename;
  const service = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
  res.json(service);
};

exports.deleteService = async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (service?.image) {
    fs.unlink(`uploads/${service.image}`, (err) => {
      if (err) console.error('Erro ao deletar imagem:', err);
    });
  }
  await service.deleteOne();
  res.json({ message: 'Serviço deletado' });
};
