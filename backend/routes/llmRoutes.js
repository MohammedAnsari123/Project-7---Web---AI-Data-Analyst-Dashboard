const express = require('express');
const { interpretQuery, generateInsight, getSuggestions } = require('../controllers/llmController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/interpret', authMiddleware, interpretQuery);
router.post('/insight', authMiddleware, generateInsight);
router.get('/suggestions/:datasetId', authMiddleware, getSuggestions);

module.exports = router;
