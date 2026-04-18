const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadDataset, getDatasets, getDatasetById, deleteDataset } = require('../controllers/datasetController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /csv/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    }
    cb(new Error('Only CSV files are allowed'));
  },
});

// Routes
router.post('/upload', authMiddleware, upload.single('file'), uploadDataset);
router.get('/', authMiddleware, getDatasets);
router.get('/:id', authMiddleware, getDatasetById);
router.delete('/:id', authMiddleware, deleteDataset);

module.exports = router;
