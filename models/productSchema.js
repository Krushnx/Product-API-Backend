const mongoose = require('mongoose');

const productTransactionSchema = new mongoose.Schema({
    // Define the schema structure based on the data from the third-party API
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: Date,
  });
  
const ProductTransaction = mongoose.model('ProductTransaction', productTransactionSchema);

module.exports = ProductTransaction;