const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var stockSchema = new Schema({
  stockName: String
});

module.exports = mongoose.model('stockModel', stockSchema);
