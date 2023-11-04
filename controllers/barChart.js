const ProductTransaction = require('../models/productSchema')

async function fetchBarChart(selectedMonth) {
    try {
      const priceRanges = ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901-above'];
  
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
            _id: null,
            counts: {
              $push: {
                price: '$price',
              },
            },
          },
        },
      ];
  
      const results = await ProductTransaction.aggregate(pipeline);
  
      const barChartData = {};
  
      if (results.length > 0) {
        const counts = results[0].counts;
  
        // Initialize the barChartData object with 0 counts for all price ranges
        for (const range of priceRanges) {
          barChartData[range] = 0;
        }
  
        // Update the counts based on the prices in the data
        counts.forEach((item) => {
          const price = parseFloat(item.price);
          for (const range of priceRanges) {
            const bounds = range.split('-');
            const lowerBound = parseFloat(bounds[0]);
            const upperBound = parseFloat(bounds[1]);
            if (!isNaN(price) && price >= lowerBound && price < upperBound) {
              barChartData[range]++;
              break;
            }
          }
        });
      }
  
      return barChartData;
    } catch (error) {
      console.error('Error generating bar chart data:', error);
      return {};
    }
  }


  const barFunc = async (req, res) => {
    const selectedMonth = req.query.month;
    try {
      const barChart = await fetchBarChart(selectedMonth);
      res.json(barChart);
    } catch (error) {
      console.error('Error generating bar chart data:', error);
      res.status(500).json({ success: false, message: 'Failed to generate bar chart data.' });
    }
  };


module.exports = {barFunc ,fetchBarChart};