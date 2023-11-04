const ProductTransaction = require('../models/productSchema');
const { fetchBarChart } = require('./barChart');
const { fetchPieChart } = require('./pieChart');
const { fetchStatistics } = require('./statistics');


async function fetchTransactions(selectedMonth) {
    try {
      // Parse the selected month as an integer (e.g., "January" as 1, "February" as 2, etc.)
      const monthNumber = parseInt(selectedMonth, 10);
  
      if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
        throw new Error('Invalid month value.');
      }
  
      // Construct the date range for the selected month
      const startDate = new Date(`2000-${monthNumber}-01`);
      const endDate = new Date(`2000-${monthNumber + 1}-01`);
  
      // Define the query to filter transactions by dateOfSale within the selected month
      const query = {
        dateOfSale: {
          $gte: startDate,
          $lt: endDate,
        },
      };
  
      // Use Mongoose to retrieve the transactions that match the query
      const transactions = await ProductTransaction.find(query);
  
      return transactions;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error; // Rethrow the error to handle it at a higher level
    }
  }
  

const combineFunc =  async (req, res) => {
    const selectedMonth = req.query.month;
  
    try {
      const transactions = await fetchTransactions(selectedMonth);
      const statistics = await fetchStatistics(selectedMonth);
      const barChart = await fetchBarChart(selectedMonth);
      const pieChart = await fetchPieChart(selectedMonth);
        
      const combinedData = {
        transactions,
        statistics,
        barChart,
        pieChart,
      };
  
      res.json(combinedData);
    } catch (error) {
      console.error('Error combining API responses:', error);
      res.status(500).json({ success: false, message: 'Failed to combine API responses.' });
    }
  }


module.exports = combineFunc;   