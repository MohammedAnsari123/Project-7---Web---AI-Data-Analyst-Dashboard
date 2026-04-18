const axios = require('axios');
const Query = require('../models/Query');
const Dataset = require('../models/Dataset');

exports.interpretQuery = async (req, res) => {
  try {
    const { datasetId, queryText } = req.body;

    const dataset = await Dataset.findById(datasetId);
    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }

    // Call Python LLM service
    const response = await axios.post(`${process.env.LLM_SERVICE_URL}/llm/interpret`, {
      queryText,
      columns: dataset.columns,
    });

    const structuredQuery = response.data;

    const query = new Query({
      userId: req.user.id,
      datasetId,
      queryText,
      structuredQuery,
    });

    await query.save();
    res.json(query);
  } catch (err) {
    console.error('LLM Interpretation Error:', err.message);
    res.status(500).json({ message: 'Error interpreting query with AI' });
  }
};

exports.generateInsight = async (req, res) => {
  try {
    const { datasetId, dataSnapshot, queryContext } = req.body;

    const response = await axios.post(`${process.env.LLM_SERVICE_URL}/llm/generate-insight`, {
      dataSnapshot,
      queryContext,
    });

    res.json({ insight: response.data.insight });
  } catch (err) {
    res.status(500).json({ message: 'Error generating insight' });
  }
};

exports.getSuggestions = async (req, res) => {
  try {
    const { datasetId } = req.params;
    const dataset = await Dataset.findById(datasetId);

    const response = await axios.post(`${process.env.LLM_SERVICE_URL}/llm/suggest-queries`, {
      columns: dataset.columns,
    });

    res.json(response.data.suggestions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching suggestions' });
  }
};
