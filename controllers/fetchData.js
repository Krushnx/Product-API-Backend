const ProductTransaction = require('../models/productSchema')
const axios = require('axios');


const fetchFunc = async (req, res) => {
    try {
      // Fetch data from the third-party API
      const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
      const data = response.data; // The data from the third-party API
  
      // Save the fetched data to your MongoDB database
      // Loop through the data and create documents in your MongoDB collection
      for (const transaction of data) {
        const newTransaction = new ProductTransaction({
          id: transaction.id,
          title: transaction.title,
          price: transaction.price,
          description: transaction.description,
          category: transaction.category,
          image: transaction.image,
          sold: transaction.sold,
          dateOfSale: transaction.dateOfSale,
        });
        await newTransaction.save();
      }
  
      res.json({ success: true, message: 'Data fetched and saved to the database.' });
    } catch (error) {
      console.error('Error fetching data from the third-party API:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch data from the third-party API.' });
    }
  }

module.exports = fetchFunc;