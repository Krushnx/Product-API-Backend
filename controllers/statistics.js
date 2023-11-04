// async function fetchTransactions(selectedMonth) {
//     try {
//       // Parse the selected month as an integer (e.g., "January" as 1, "February" as 2, etc.)
//       const monthNumber = parseInt(selectedMonth, 10);
  
//       if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
//         throw new Error('Invalid month value.');
//       }
  
//       // Construct the date range for the selected month
//       const startDate = new Date(`2000-${monthNumber}-01`);
//       const endDate = new Date(`2000-${monthNumber + 1}-01`);
  
//       // Define the query to filter transactions by dateOfSale within the selected month
//       const query = {
//         dateOfSale: {
//           $gte: startDate,
//           $lt: endDate,
//         },
//       };
  
//       // Use Mongoose to retrieve the transactions that match the query
//       const transactions = await ProductTransaction.find(query);
  
//       return transactions;
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//       throw error; // Rethrow the error to handle it at a higher level
//     }
//   }


// module.exports =fetchTransactions;



const ProductTransaction = require('../models/productSchema')
const axios = require('axios');



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

