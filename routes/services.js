const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getServices, addService, updateService, deleteService } = require('../controllers/serviceController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.get('/', getServices);
router.post('/', upload.single('image'), addService);
router.put('/:id', upload.single('image'), updateService);
router.delete('/:id', deleteService);

module.exports = router;
