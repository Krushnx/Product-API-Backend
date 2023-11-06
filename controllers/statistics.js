const ProductTransaction = require('../models/productSchema')



async function fetchStatistics(selectedMonth) {
    try {
      // Calculate statistics for the selected month
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
            totalSaleAmount: { $sum: '$price' },
            totalSoldItems: { $sum: 1 },
          },
        },
      ];
  
      const results = await ProductTransaction.aggregate(pipeline);
  
      return results[0];
    } catch (error) {
      console.error('Error fetching statistics:', error);
      return {
        totalSaleAmount: 0,
        totalSoldItems: 0,
      };
    }
  }

const statFunc =async (req, res) => {
    const selectedMonth = req.query.month;
    try {
      const statistics = await fetchStatistics(selectedMonth);
      res.json(statistics);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch statistics.' });
    }
  }
module.exports = {statFunc , fetchStatistics};

