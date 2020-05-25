/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fetchJson = require('fetch-json');

module.exports = function (app) {

  mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
  const StockSchema = new Schema({ stock: String, price: Number, likes: Number, addresses: [Number] });
  const STOCK = mongoose.model("STOCK", StockSchema);

  const urlStart = 'https://repeated-alpaca.glitch.me/v1/stock/';
  const urlEnd = '/quote';

  //I can GET /api/stock-prices with form data containing a Nasdaq stock ticker and recieve back an object stockData.
  //In stockData, I can see the stock(string, the ticker), price(decimal in string format), and likes(int).
  app.route('/api/stock-prices')
    .get(function (req, res) {
      let stocks = req.query.stock;
      let like = req.query.like;
      const handleData = (data) => console.log(data);
      if (Array.isArray(stocks)) {
        for (let i = 0; i < stocks.length; i++) {
          fetchJson.get(urlStart + stocks[i] + urlEnd).then(handleData);
        }
      } else {
        fetchJson.get(urlStart + stocks + urlEnd).then(handleData);
      }
    });
};