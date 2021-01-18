const FoodItem = require("../models/fooditem");
const moment = require('moment');
const router = require("express").Router();
require("dotenv").config();
const SAVE_DATE_FORMAT = 'MMDDYYYY';

router.get("/remove", async function (req, res, next) {

  const removedAll = await FoodItem.deleteMany({
    date: req.query.date, userId: req.query.userId
  }).exec();

  return res.status(200).send({
    message: removedAll
  })

});


router.get("/list", async function (req, res, next) {

  const diary = await FoodItem.find({ date: req.query.date, userId: req.query.userId }).exec();
  if (!diary) {
    return res.status(400).send({
      message: err,
    });
  }
  const results = diary.map(foodItem => ({
    foodId: foodItem.lookupId,
    qty: foodItem.qty,
    type: foodItem.databaseType,
    portion: foodItem.foodPortion,
    details: foodItem.foodDetails


  }));


  return res.status(200).send(results);

});


router.post("/save", async function (req, res, next) {

  const { id, date, userId, qty, type, portion, details } = req.body.foodItem;
  console.log("databse getting id ", id, date, userId, type);
  let foodItem = {
    id: `${id}-${date}-${userId}-${portion}`,
    userId: userId,
    date: date,
    hour: moment().format('HH'),
    databaseType: type,
    lookupId: id,
    foodPortion: portion,
    foodDetails: details
  };

  console.log(foodItem);
  const filter = { id: foodItem.id };
  const update = {
    ...foodItem,
    $inc: {
      qty: qty
    }
  };
  const opts = { new: true, upsert: true };
  const success = await FoodItem.findOneAndUpdate(filter, update, opts);

  if (!success) {
    return res.status(400).send({
      message: err,
    });
  }


  return res.status(200).send({ message: 'added' });

});


module.exports = router;
