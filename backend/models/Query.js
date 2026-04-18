const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  datasetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dataset', required: true },
  queryText: { type: String, required: true },
  structuredQuery: { type: Object },
}, { timestamps: true });

module.exports = mongoose.model('Query', querySchema);
