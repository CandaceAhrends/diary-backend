const Activity = require("../models/activity");
const moment = require('moment');
const router = require("express").Router();
require("dotenv").config();
const SAVE_DATE_FORMAT = 'MMDDYYYY';


router.post("/save", async function (req, res, next) {
    console.log("req body", req.body, req.body.activity);

    const { id, date, userId, qty, action, cal } = req.body.activity;
    console.log("databse getting id ", id, date, userId, action);
    let activityItem = {
        id: `${id}-${date}`,
        userId: userId,
        date: date,
        hour: moment().format('HH'),
        activity: action,
        burnedCalories: cal
    };

    console.log(activityItem);
    const filter = { id: activityItem.id };
    const update = {
        ...activityItem,
        $inc: {
            qty: qty
        }
    };
    const opts = { new: true, upsert: true };
    const success = await Activity.findOneAndUpdate(filter, update, opts);

    if (!success) {
        return res.status(400).send({
            message: err,
        });
    }


    return res.status(200).send({ message: 'added action' });

});


router.get("/list", async function (req, res, next) {

    const activity = await Activity.find({ date: req.query.date, userId: req.query.userId }).exec();

    const results = activity.map(action => ({
        action: action.activity,
        qty: action.qty,
        cal: action.burnedCalories,



    }));


    return res.status(200).send(results);

});


module.exports = router;
