const express = require('express');
const router = express.Router();
const fetchFunc = require('../controllers/fetchData');
const {statFunc} = require('../controllers/statistics');
const listFunc = require('../controllers/listTransactions');
const {barFunc} = require('../controllers/barChart');
const {pieFunc} = require('../controllers/pieChart');
const combineFunc = require('../controllers/combineData');



router.get('/fetch-data',fetchFunc);
router.get('/list-transactions', listFunc);
router.get('/statistics', statFunc);
router.get('/bar-chart', barFunc);
router.get('/pie-chart', pieFunc);
router.get('/combined-data',combineFunc);
  
  

module.exports = router;