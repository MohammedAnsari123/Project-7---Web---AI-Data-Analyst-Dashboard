const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');
const Dataset = require('../models/Dataset');

// Helper to read CSV and return rows
const readCsv = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};

exports.previewData = async (req, res) => {
  try {
    const { datasetId } = req.body;
    const dataset = await Dataset.findOne({ _id: datasetId, userId: req.user.id });
    if (!dataset) return res.status(404).json({ message: 'Dataset not found' });

    const rows = await readCsv(dataset.filePath);
    res.json(rows.slice(0, 10)); // Return first 10 rows for preview
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.executeDatasetQuery = async (req, res) => {
  try {
    const { datasetId } = req.params;
    const { queryText } = req.body;

    const dataset = await Dataset.findOne({ _id: datasetId, userId: req.user.id });
    if (!dataset) return res.status(404).json({ message: 'Dataset not found' });

    // 1. Call AI Service to interpret query (now with smart chart selection)
    const interpretRes = await axios.post(`${process.env.LLM_SERVICE_URL}/llm/interpret`, {
      queryText,
      columns: dataset.columns
    });

    const structuredQuery = interpretRes.data;

    // 2. Process data using structured parameters
    const results = await this.performDataOperation(dataset.filePath, structuredQuery);

    res.json({
      query: queryText,
      structuredQuery,
      results
    });
  } catch (err) {
    console.error('Unified Query Error:', err.message);
    res.status(500).json({ message: 'Uplink synchronization failed. Please verify your query parameters.' });
  }
};

exports.getAutoInsights = async (req, res) => {
  try {
    const { datasetId } = req.params;
    const dataset = await Dataset.findOne({ _id: datasetId, userId: req.user.id });
    if (!dataset) return res.status(404).json({ message: 'Dataset not found' });

    const rows = await readCsv(dataset.filePath);
    if (rows.length === 0) return res.json([]);

    const columns = dataset.columns;
    const insights = [];

    // 1. Identify Categorical and Numerical Columns
    const firstRow = rows[0];
    const categoricalCols = columns.filter(col => isNaN(firstRow[col]) && firstRow[col] !== undefined);
    const numericalCols = columns.filter(col => !isNaN(firstRow[col]) && firstRow[col] !== '');
    const timeCols = columns.filter(col => {
      const low = col.toLowerCase();
      return low.includes('date') || low.includes('time') || low.includes('year') || low.includes('month');
    });

    // Insight A: Trend Analysis (If Time column exists)
    if (timeCols.length > 0 && numericalCols.length > 0) {
      const timeCol = timeCols[0];
      const numCol = numericalCols[0];
      const aggregation = await this.performDataOperation(dataset.filePath, {
        operation: 'sum',
        column: numCol,
        groupBy: timeCol,
        metric: 'value'
      });
      insights.push({
        title: `${numCol} Trend over ${timeCol}`,
        vizType: 'line', // SMART CHOICE: Time Trend -> Line
        data: aggregation.slice(0, 15)
      });
    }

    // Insight B: Primary Category Distribution (Comparison)
    if (categoricalCols.length > 0) {
      const targetCol = categoricalCols[0];
      const distribution = await this.performDataOperation(dataset.filePath, {
        operation: 'count',
        groupBy: targetCol,
        metric: 'value'
      });
      insights.push({
        title: `${targetCol} Comparison`,
        vizType: 'bar', // SMART CHOICE: Differences between categories -> Bar
        data: distribution.slice(0, 8)
      });
    }

    // Insight C: Volume Distribution (Area)
    if (numericalCols.length > 0) {
        const numCol = numericalCols[0];
        const distribution = await this.performDataOperation(dataset.filePath, {
          operation: 'top',
          column: numCol,
          limit: 10
        });
        insights.push({
          title: `Premium ${numCol} Volume`,
          vizType: 'area', // SMART CHOICE: Show volume
          data: distribution.map(r => ({ _id: r[categoricalCols[0] || columns[0]], value: parseFloat(r[numCol]) }))
        });
    }

    // Insight D: Proportional Split (Composition)
    if (categoricalCols.length > 1) {
        const targetCol = categoricalCols[1];
        const distribution = await this.performDataOperation(dataset.filePath, {
          operation: 'count',
          groupBy: targetCol,
          metric: 'value'
        });
        insights.push({
          title: `${targetCol} Composition`,
          vizType: 'pie', // SMART CHOICE: Composition -> Pie
          data: distribution.slice(0, 5)
        });
    }

    res.json(insights);
  } catch (err) {
    console.error('Auto Analysis Error:', err);
    res.status(500).json({ message: 'Neural analysis failed' });
  }
};

exports.performDataOperation = async (filePath, structuredQuery) => {
  const { operation, column, groupBy, limit, metric } = structuredQuery;
  let rows = await readCsv(filePath);
  let result = [];

  if (operation === 'top') {
    result = rows
      .sort((a, b) => parseFloat(b[column]) - parseFloat(a[column]))
      .slice(0, limit || 10);
  } else if (groupBy) {
    const groups = {};
    rows.forEach((row) => {
      const key = row[groupBy] || 'Unknown';
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    });

    result = Object.keys(groups).map((key) => {
      const groupRows = groups[key];
      let val = 0;
      if (operation === 'sum') {
        val = groupRows.reduce((acc, r) => acc + (parseFloat(r[column]) || 0), 0);
      } else if (operation === 'avg') {
        val = groupRows.reduce((acc, r) => acc + (parseFloat(r[column]) || 0), 0) / groupRows.length;
      } else if (operation === 'count' || operation === 'distribution') {
        val = groupRows.length;
      }
      return { _id: key, [metric || 'value']: val };
    });
  } else {
    // Global aggregation
    if (operation === 'sum') {
      const sum = rows.reduce((acc, r) => acc + (parseFloat(r[column]) || 0), 0);
      result = [{ _id: 'Total', [metric || 'total']: sum }];
    } else if (operation === 'avg') {
      const avg = rows.reduce((acc, r) => acc + (parseFloat(r[column]) || 0), 0) / rows.length;
      result = [{ _id: 'Average', [metric || 'average']: avg }];
    } else {
      result = rows.slice(0, limit || 100);
    }
  }

  return result;
};

exports.processData = async (req, res) => {
  try {
    const { datasetId, structuredQuery } = req.body;
    const dataset = await Dataset.findOne({ _id: datasetId, userId: req.user.id });
    if (!dataset) return res.status(404).json({ message: 'Dataset not found' });

    const result = await this.performDataOperation(dataset.filePath, structuredQuery);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error processing data' });
  }
};
