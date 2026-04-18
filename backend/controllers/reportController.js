const Report = require('../models/Report');

exports.createReport = async (req, res) => {
  try {
    const { datasetId, charts, insights } = req.body;

    const report = new Report({
      userId: req.user.id,
      datasetId,
      charts,
      insights,
    });

    await report.save();
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: 'Server error saving report' });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user.id })
      .populate('datasetId', 'fileName')
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findOne({ _id: req.params.id, userId: req.user.id })
      .populate('datasetId', 'fileName columns');
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json({ message: 'Report deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
