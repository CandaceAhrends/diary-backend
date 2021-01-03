
const router = require("express").Router();
const foodLookup = require("../api/usdaSearch");
const foodDetailLookup = require("../api/usdaDetails");

require("dotenv").config();

const MAX_LEN = 25;
const QUEURY_REG_EX =  /^[a-zA-Z0-9_.-\s']+$/;

router.get("/search", async function (req, res, next) {
  const searchQuery = decodeURIComponent(req.query.query);
  const isValid = QUEURY_REG_EX.test(searchQuery) && searchQuery.length <= MAX_LEN;

  if (isValid) {
    console.log("Search Query =>", searchQuery);
    foodLookup(searchQuery).subscribe((foodList) => {
      if (!foodList) {
        return res.status(400).send("Error getting food data");
      }
      return res.status(200).send(foodList);
    });
  }
  else {


    return res.status(400).send({ error: "Query failed validation" });
  }

});


router.get("/detail", async function (req, res, next) {
  const foodId = req.query.id;
  console.log("query coming in is >>>>>", req.query);
  if (foodId) {
    console.log("Search foodId =>", foodId);
    foodDetailLookup(foodId).subscribe((details) => {
      if (!details) {
        return res.status(400).send("Error getting food data");
      }
      return res.status(200).send(details);
    });
  }
  else {


    return res.status(400).send({ error: "foodId failed validation" });
  }

});



module.exports = router;
