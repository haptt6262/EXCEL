const mongoose = require('mongoose')
const ItemModel = new mongoose.Schema({
    Name: { type: String },
})
module.exports = mongoose.model("Excel", ItemModel)