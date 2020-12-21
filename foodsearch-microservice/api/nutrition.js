require("dotenv").config();
const flatMap = require('array.prototype.flatmap');
const popularNutrients = ["Protein", "Total lipid (fat)"];
const nutrientIds = [1166, 1089, 1090, 1093, 1177, 1087, 1175, 1114, 1167];


const foodLookupUrl = (query, pageNumber) =>
  `https://api.nal.usda.gov/fdc/v1/foods/search?query='${query}'&pageNumber=${pageNumber}&dataType=Survey%20(FNDDS)&api_key=${process.env.USDA_API_KEY}`;

const foodDetailUrl = foodId=>`https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${process.env.USDA_API_KEY}`;


const sortNutrients = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
const extractPopularNutrients = (nutrients) => {
  return nutrients
    .filter((n) => popularNutrients.includes(n.nutrientName))
    .map((n) => {
      return {
        value: n.value,
        name: `${n.nutrientName} G`,
      };
    })
    .sort(sortNutrients);
};

const getPortions = (portions) => {

  return portions.map(portion => {
      return {
          description: portion.portionDescription,
          weight: portion.gramWeight
      };
  });
}

const extractNutrients = (nutrients) => {
  return nutrients
    .filter((nutrient) => nutrientIds.includes(nutrient.nutrientId))
    .map((nutrient) => {
      return {
        value: nutrient.value,
        name: nutrient.nutrientName,
        unitName: nutrient.unitName
      };
    })
    .sort(sortNutrients);;
};

const CAL_UNIT = "KCAL";
const findCalories = (nutrients) => {
   
  const energyNutrients = nutrients.filter(
    (nutrient) => nutrient.unitName === CAL_UNIT
  );

  return energyNutrients.length ? energyNutrients[0].value : "N/A";
};
const nutrition = {
  extractPopularNutrients,
  extractNutrients,
  foodLookupUrl,
  findCalories,
  foodDetailUrl,
  getPortions

}

module.exports = nutrition;


