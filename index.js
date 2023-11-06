const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const axios = require('axios');
const ProductTransaction = require('./models/productSchema')
mongoose.connect(process.env.DB);
const cors = require('cors');

const corsOptions ={
  origin:['http://localhost:3000' ], 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));//set up route

const db = mongoose.connection;

db.on('error', (error) => {
  console.log(error);
});

db.once('open', () => {
  console.log("Database connected successfully");
});
app.use(express.json());


// Your /fetch-data route
const appRoute = require('./routes/appRoute')
app.use('/' , appRoute);


// Function to fetch transactions

// Function to fetch statistics

// Function to generate bar chart data


// Function to generate pie chart data



// Your /combined-data route













app.listen(8000, () => {
  console.log(`App listening on port http://localhost:8000`);
});
