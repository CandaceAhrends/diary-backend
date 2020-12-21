
const router = require("express").Router();
const foodLookup = require("../api/fatSecretSearch");
const foodDetailLookup = require("../api/fatSecretDetails");

require("dotenv").config();

router.get("/search", async function (req, res, next) {
  const searchQuery = decodeURIComponent(req.query.query);
  const isValid = /^[a-zA-Z0-9_.-\s']+$/.test(searchQuery);

  if (isValid) {
    console.log("Search Query =>", searchQuery);
    foodLookup(searchQuery).then( foodData=>{

      foodData.subscribe((foodList) => {
      if (!foodList) {
        return res.status(400).send("Error getting food data");
      }
      return res.status(200).send(foodList);
    });
   }).catch(err=>{
     console.log(err);
   });
  }
  else {


    return res.status(400).send({ error: "Query failed validation" });
  }

});


router.get("/detail", async function (req, res, next) {
  const foodId = req.query.id;
  
  if (foodId) {
 
    foodDetailLookup(foodId).then( detailsList=>{
      console.log("Fat secret details detailsList observable here");
      detailsList.subscribe((details) => {
        console.log("observabl res >>>>>", details);
        if (!details) {
          return res.status(400).send("Error getting food data");
        }
        return res.status(200).send(details);
      });

    });
    
  }
  else {


    return res.status(400).send({ error: "foodId failed validation" });
  }

});



module.exports = router;
