const express = require('express');
const { previewData, processData, executeDatasetQuery, getAutoInsights } = require('../controllers/dataController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/preview', authMiddleware, previewData);
router.post('/process', authMiddleware, processData);
router.post('/:datasetId/query', authMiddleware, executeDatasetQuery);
router.get('/:datasetId/auto-insights', authMiddleware, getAutoInsights);

module.exports = router;
