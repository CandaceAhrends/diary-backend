const mongoose = require("mongoose");

require("dotenv").config();

const FoodSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true

  },  
  qty: Number,  
  databaseType: String,
  lookupId: Number,
  date: Number,
  hour: Number,
  dateFormat: String,
  userId: String,
  foodPortion: String,
  foodDetails: String
});


const FoodItem = (module.exports = mongoose.model("FoodItem", FoodSchema));
