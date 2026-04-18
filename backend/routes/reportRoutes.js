const express = require('express');
const { createReport, getReports, getReportById, deleteReport } = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createReport);
router.get('/', authMiddleware, getReports);
router.get('/:id', authMiddleware, getReportById);
router.delete('/:id', authMiddleware, deleteReport);

module.exports = router;
