const mongoose = require('mongoose');

const datasetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  columns: [{ type: String }],
  rowCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Dataset', datasetSchema);
