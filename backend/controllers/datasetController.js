const Dataset = require('../models/Dataset');
const fs = require('fs');
const csv = require('csv-parser');

exports.uploadDataset = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const results = [];
    const columns = [];
    let rowCount = 0;

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('headers', (headers) => {
        columns.push(...headers);
      })
      .on('data', () => {
        rowCount++;
      })
      .on('end', async () => {
        const dataset = new Dataset({
          userId: req.user.id,
          fileName: req.file.originalname,
          filePath: req.file.path,
          columns,
          rowCount,
        });

        await dataset.save();
        res.json(dataset);
      })
      .on('error', (err) => {
        res.status(500).json({ message: 'Error parsing CSV' });
      });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDatasets = async (req, res) => {
  try {
    const datasets = await Dataset.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(datasets);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDatasetById = async (req, res) => {
  try {
    const dataset = await Dataset.findOne({ _id: req.params.id, userId: req.user.id });
    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }
    res.json(dataset);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteDataset = async (req, res) => {
  try {
    const dataset = await Dataset.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }
    res.json({ message: 'Dataset deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
