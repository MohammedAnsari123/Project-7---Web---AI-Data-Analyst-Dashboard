const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  datasetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dataset', required: true },
  charts: [{ type: Object }], // Store chart configuration / data snapshot
  insights: { type: String }, // Store AI generated insights
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
