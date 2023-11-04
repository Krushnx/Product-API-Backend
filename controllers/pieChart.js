const ProductTransaction = require('../models/productSchema')

async function fetchPieChart(selectedMonth) {
    try {
      // Calculate the count of items in each category for the selected month
      const pipeline = [
        {
          $match: {
            $expr: {
              $eq: [{ $month: '$dateOfSale' }, parseInt(selectedMonth, 10)],
            },
          },
        },
        {
          $group: {
            _id: '$category', // Replace 'productCategory' with the actual field name in your schema
            count: { $sum: 1 },
          },
        },
      ];
  
      console.log('Aggregation Pipeline:', pipeline); // Add this line to print the pipeline
  
      const results = await ProductTransaction.aggregate(pipeline);
  
      console.log('Pie Chart Results:', results); // Add this line to print the results
  
      const pieChartData = {};
  
      // Loop through the results and format the data
      results.forEach((category) => {
        pieChartData[category._id] = category.count;
      });
  
      console.log('Final Pie Chart Data:', pieChartData); // Add this line to print the final pie chart data
  
      return pieChartData;
    } catch (error) {
      console.error('Error generating pie chart data:', error);
      return {};
    }
  }

 const pieFunc =  async (req, res) => {
    const selectedMonth = req.query.month;
    try {
      const pieChart = await fetchPieChart(selectedMonth);
      res.json(pieChart);
    } catch (error) {
      console.error('Error generating pie chart data:', error);
      res.status(500).json({ success: false, message: 'Failed to generate pie chart data.' });
    }
  }


module.exports = {pieFunc,fetchPieChart};