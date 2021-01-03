const mongoose = require("mongoose");

require("dotenv").config();

const ActivitySchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true

  },  
  burnedCalories: Number,
  qty: Number,     
  date: Number,
  hour: Number,
  dateFormat: String,
  userId: String,
  activity: String
});


const activity = (module.exports = mongoose.model("Activity", ActivitySchema));
