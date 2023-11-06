const ProductTransaction = require('../models/productSchema')


const listFunc = async (req, res) => {
    const selectedMonth = req.query.month;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
  
    try {
      const monthNumber = parseInt(selectedMonth, 10);
  
      if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
        return res.status(400).json({ success: false, message: 'Invalid month value.' });
      }
  
      const query = {
        $expr: {
          $eq: [{ $month: '$dateOfSale' }, monthNumber],
        }
        
      };
  
      const totalRecords = await ProductTransaction.countDocuments(query);
      const transactions = await ProductTransaction.find(query)
      // .skip((page - 1) * perPage)
      // .limit(perPage);
      res.json({ totalRecords, transactions });
    } catch (error) {
      console.error('Error listing transactions:', error);
      res.status(500).json({ success: false, message: 'Failed to list transactions.' });
    }
  }
module.exports = listFunc;
