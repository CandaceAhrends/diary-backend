require("dotenv").config();
const flatMap = require('array.prototype.flatmap');

const foodLookupUrl = (query, pageNumber) =>
  `https://api.nal.usda.gov/fdc/v1/foods/search?query='${query}'&pageSize=100&pageNumber=${pageNumber}&dataType=Branded,Survey%20(FNDDS)&api_key=${process.env.USDA_API_KEY}`;

const foodDetailUrl = foodId => `https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${process.env.USDA_API_KEY}`;


const sortNutrients = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}


const getPortions = (portions) => {

  return portions.map(portion => {
    return {
      description: portion.portionDescription,
      weight: portion.gramWeight
    };
  });
}


const nutrition = {

  foodLookupUrl,
  foodDetailUrl,
  getPortions

}

module.exports = nutrition;


