const axios = require("axios");
const Rx = require('rxjs');
const RxOp = require('rxjs/operators');
const nutrition = require('./nutrition');
const flatMap = require('array.prototype.flatmap');
const fromEntries = require('object.fromentries');
const NURIENT_IDS = [1005,1004, 1008,1003, 1185, 1114, 1109,1166,1167,1186,1242,1246,1253,
       1079, 1087, 1089, 1098, 1090, 1091, 1092, 1093, 1095, 1106, 1098, 1101, 1103, 1162, 1165,
    1166, 1175, 1177, 1186, 1178, 1104, 1110, 1258, 1292, 1293,  1162, 1057, 2000];

const getFoodDetails = (foodId = 0) => {
    const numericRegEx = /^\d+$/;
    
    if (numericRegEx.test(foodId)) {
        console.log("getting for id = ", foodId);
        const api = nutrition.foodDetailUrl(foodId);
        console.log(api);
        return Rx.from(axios.get(api));
    }

    return Rx.of(dummy());
};

const cleanUpLabel = label => {
    const shortenedLabel = label.replace("total", "").replace("International Units", "IU");
    return shortenedLabel;
}
const foodDetailLookup = (foodId) => {    
    return getFoodDetails(foodId).pipe(
        RxOp.switchMap(res => {
            
            if (!res || res.error) {
                console.log("not getting response");
                return RxOp.throwError('Server Error');
            }
            

            return Rx.of(res.data);

        }),

        RxOp.map((data) => {
            const foodPortions = data.foodPortions || [];
            const portionList = nutrition.getPortions(foodPortions);

            
            const nutrients = data.foodNutrients.map(item => {

                return {
                    amount: item.amount || 0,
                    ...item.nutrient, name: cleanUpLabel(item.nutrient.name)
                };
            }).filter(
                item => NURIENT_IDS.includes(item.id)
            );

            return {
                nutrients, portionList, description: data.description
            }


        }),

        RxOp.catchError(err => {
            console.log("error getting food details will return error message ", err);
            return Rx.of({ errorMessage: 'Server Error' });
        })

    );
};

module.exports = foodDetailLookup;




function dummy() {


    return {
        data: {
            "fdcId": 171881,
            "description": "Beverages, coffee, brewed, breakfast blend",
            "publicationDate": "4/1/2019",
            "foodNutrients": [
                {
                    "nutrient": {
                        "id": 2045,
                        "number": "951",
                        "name": "Proximates",
                        "rank": 50,
                        "unitName": "g"
                    },
                    "type": "FoodNutrient"
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1051,
                        "number": "255",
                        "name": "Water",
                        "rank": 100,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648611,
                    "amount": 99.47000000,
                    "dataPoints": 6,
                    "max": 99.50000000,
                    "min": 99.40000000
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1008,
                        "number": "208",
                        "name": "Energy",
                        "rank": 300,
                        "unitName": "kcal"
                    },
                    "foodNutrientDerivation": {
                        "id": 49,
                        "code": "NC",
                        "description": "Calculated",
                        "foodNutrientSource": {
                            "id": 2,
                            "code": "4",
                            "description": "Calculated or imputed"
                        }
                    },
                    "id": 1648610,
                    "amount": 2.00000000,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1062,
                        "number": "268",
                        "name": "Energy",
                        "rank": 400,
                        "unitName": "kJ"
                    },
                    "foodNutrientDerivation": {
                        "id": 49,
                        "code": "NC",
                        "description": "Calculated",
                        "foodNutrientSource": {
                            "id": 2,
                            "code": "4",
                            "description": "Calculated or imputed"
                        }
                    },
                    "id": 1648644,
                    "amount": 8.00000000,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1003,
                        "number": "203",
                        "name": "Protein",
                        "rank": 600,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648575,
                    "amount": 0.30000000,
                    "dataPoints": 6,
                    "max": 0.40000000,
                    "min": 0.24000000
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1004,
                        "number": "204",
                        "name": "Total lipid (fat)",
                        "rank": 800,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648609,
                    "amount": 0E-8,
                    "dataPoints": 6,
                    "max": 0E-8,
                    "min": 0E-8
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1007,
                        "number": "207",
                        "name": "Ash",
                        "rank": 1000,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 51,
                        "code": "NR",
                        "description": "Nutrient that is based on other nutrient/s; value used directly, ex. Nut.#204 from Nut.#298",
                        "foodNutrientSource": {
                            "id": 2,
                            "code": "4",
                            "description": "Calculated or imputed"
                        }
                    },
                    "id": 1648646,
                    "amount": 0.06000000,
                    "dataPoints": 0
                },
                {
                    "nutrient": {
                        "id": 2039,
                        "number": "956",
                        "name": "Carbohydrates",
                        "rank": 1100,
                        "unitName": "g"
                    },
                    "type": "FoodNutrient"
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1005,
                        "number": "205",
                        "name": "Carbohydrate, by difference",
                        "rank": 1110,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 49,
                        "code": "NC",
                        "description": "Calculated",
                        "foodNutrientSource": {
                            "id": 2,
                            "code": "4",
                            "description": "Calculated or imputed"
                        }
                    },
                    "id": 1648643,
                    "amount": 0.17000000,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1079,
                        "number": "291",
                        "name": "Fiber, total dietary",
                        "rank": 1200,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648577,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 2000,
                        "number": "269",
                        "name": "Sugars, total including NLEA",
                        "rank": 1510,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648612,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "nutrient": {
                        "id": 2043,
                        "number": "300",
                        "name": "Minerals",
                        "rank": 5200,
                        "unitName": "mg"
                    },
                    "type": "FoodNutrient"
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1087,
                        "number": "301",
                        "name": "Calcium, Ca",
                        "rank": 5300,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648613,
                    "amount": 2.00000000,
                    "dataPoints": 6,
                    "max": 2.00000000,
                    "min": 2.00000000
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1089,
                        "number": "303",
                        "name": "Iron, Fe",
                        "rank": 5400,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648578,
                    "amount": 0.02000000,
                    "dataPoints": 6,
                    "max": 0.03000000,
                    "min": 0.02000000
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1090,
                        "number": "304",
                        "name": "Magnesium, Mg",
                        "rank": 5500,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648579,
                    "amount": 4.00000000,
                    "dataPoints": 6,
                    "max": 4.00000000,
                    "min": 3.00000000
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1091,
                        "number": "305",
                        "name": "Phosphorus, P",
                        "rank": 5600,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648580,
                    "amount": 3.00000000,
                    "dataPoints": 6,
                    "max": 3.00000000,
                    "min": 3.00000000
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1092,
                        "number": "306",
                        "name": "Potassium, K",
                        "rank": 5700,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648614,
                    "amount": 50.00000000,
                    "dataPoints": 6,
                    "max": 56.00000000,
                    "min": 44.00000000
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1093,
                        "number": "307",
                        "name": "Sodium, Na",
                        "rank": 5800,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648581,
                    "amount": 1.00000000,
                    "dataPoints": 6,
                    "max": 1.00000000,
                    "min": 1.00000000
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1095,
                        "number": "309",
                        "name": "Zinc, Zn",
                        "rank": 5900,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648615,
                    "amount": 0.02000000,
                    "dataPoints": 6,
                    "max": 0.02000000,
                    "min": 0.01000000
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1098,
                        "number": "312",
                        "name": "Copper, Cu",
                        "rank": 6000,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648582,
                    "amount": 0.00500000,
                    "dataPoints": 6,
                    "max": 0.00500000,
                    "min": 0.00500000
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1101,
                        "number": "315",
                        "name": "Manganese, Mn",
                        "rank": 6100,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648583,
                    "amount": 0.03200000,
                    "dataPoints": 6,
                    "max": 0.04100000,
                    "min": 0.02400000
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1103,
                        "number": "317",
                        "name": "Selenium, Se",
                        "rank": 6200,
                        "unitName": "µg"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648616,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "nutrient": {
                        "id": 2046,
                        "number": "952",
                        "name": "Vitamins and Other Components",
                        "rank": 6250,
                        "unitName": "g"
                    },
                    "type": "FoodNutrient"
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1162,
                        "number": "401",
                        "name": "Vitamin C, total ascorbic acid",
                        "rank": 6300,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648591,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1165,
                        "number": "404",
                        "name": "Thiamin",
                        "rank": 6400,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648592,
                    "amount": 0.02000000,
                    "dataPoints": 3,
                    "max": 0.02000000,
                    "min": 0.02000000
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1166,
                        "number": "405",
                        "name": "Riboflavin",
                        "rank": 6500,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648593,
                    "amount": 0E-8,
                    "dataPoints": 3,
                    "max": 0E-8,
                    "min": 0E-8
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1167,
                        "number": "406",
                        "name": "Niacin",
                        "rank": 6600,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648620,
                    "amount": 0.80000000,
                    "dataPoints": 3,
                    "max": 1.02000000,
                    "min": 0.60000000
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1170,
                        "number": "410",
                        "name": "Pantothenic acid",
                        "rank": 6700,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648621,
                    "amount": 0E-8,
                    "dataPoints": 2,
                    "max": 0E-8,
                    "min": 0E-8
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1175,
                        "number": "415",
                        "name": "Vitamin B-6",
                        "rank": 6800,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648622,
                    "amount": 0E-8,
                    "dataPoints": 1
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1177,
                        "number": "417",
                        "name": "Folate, total",
                        "rank": 6900,
                        "unitName": "µg"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648594,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1186,
                        "number": "431",
                        "name": "Folic acid",
                        "rank": 7000,
                        "unitName": "µg"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648625,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1187,
                        "number": "432",
                        "name": "Folate, food",
                        "rank": 7100,
                        "unitName": "µg"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648598,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1190,
                        "number": "435",
                        "name": "Folate, DFE",
                        "rank": 7200,
                        "unitName": "µg"
                    },
                    "foodNutrientDerivation": {
                        "id": 49,
                        "code": "NC",
                        "description": "Calculated",
                        "foodNutrientSource": {
                            "id": 2,
                            "code": "4",
                            "description": "Calculated or imputed"
                        }
                    },
                    "id": 1648626,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1180,
                        "number": "421",
                        "name": "Choline, total",
                        "rank": 7220,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648623,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1178,
                        "number": "418",
                        "name": "Vitamin B-12",
                        "rank": 7300,
                        "unitName": "µg"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648595,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1246,
                        "number": "578",
                        "name": "Vitamin B-12, added",
                        "rank": 7340,
                        "unitName": "µg"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648599,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1106,
                        "number": "320",
                        "name": "Vitamin A, RAE",
                        "rank": 7420,
                        "unitName": "µg"
                    },
                    "id": 1648645,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1105,
                        "number": "319",
                        "name": "Retinol",
                        "rank": 7430,
                        "unitName": "µg"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648585,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1107,
                        "number": "321",
                        "name": "Carotene, beta",
                        "rank": 7440,
                        "unitName": "µg"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648586,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1108,
                        "number": "322",
                        "name": "Carotene, alpha",
                        "rank": 7450,
                        "unitName": "µg"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648587,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1120,
                        "number": "334",
                        "name": "Cryptoxanthin, beta",
                        "rank": 7460,
                        "unitName": "µg"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648589,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1104,
                        "number": "318",
                        "name": "Vitamin A, IU",
                        "rank": 7500,
                        "unitName": "IU"
                    },
                    "id": 1648584,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1122,
                        "number": "337",
                        "name": "Lycopene",
                        "rank": 7530,
                        "unitName": "µg"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648590,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1123,
                        "number": "338",
                        "name": "Lutein + zeaxanthin",
                        "rank": 7560,
                        "unitName": "µg"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648619,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1109,
                        "number": "323",
                        "name": "Vitamin E (alpha-tocopherol)",
                        "rank": 7905,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648617,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1242,
                        "number": "573",
                        "name": "Vitamin E, added",
                        "rank": 7920,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648627,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1110,
                        "number": "324",
                        "name": "Vitamin D (D2 + D3), International Units",
                        "rank": 8650,
                        "unitName": "IU"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648618,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1114,
                        "number": "328",
                        "name": "Vitamin D (D2 + D3)",
                        "rank": 8700,
                        "unitName": "µg"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648588,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1185,
                        "number": "430",
                        "name": "Vitamin K (phylloquinone)",
                        "rank": 8800,
                        "unitName": "µg"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648597,
                    "amount": 0E-8,
                    "dataPoints": 1
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1184,
                        "number": "429",
                        "name": "Vitamin K (Dihydrophylloquinone)",
                        "rank": 8900,
                        "unitName": "µg"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648596,
                    "amount": 0E-8,
                    "dataPoints": 1
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1183,
                        "number": "428",
                        "name": "Vitamin K (Menaquinone-4)",
                        "rank": 8950,
                        "unitName": "µg"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648624,
                    "amount": 0E-8,
                    "dataPoints": 1
                },
                {
                    "nutrient": {
                        "id": 2044,
                        "number": "950",
                        "name": "Lipids",
                        "rank": 9600,
                        "unitName": "g"
                    },
                    "type": "FoodNutrient"
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1258,
                        "number": "606",
                        "name": "Fatty acids, total saturated",
                        "rank": 9700,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648601,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1259,
                        "number": "607",
                        "name": "4:0",
                        "rank": 9800,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648628,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1260,
                        "number": "608",
                        "name": "6:0",
                        "rank": 9900,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648629,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1261,
                        "number": "609",
                        "name": "8:0",
                        "rank": 10000,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648602,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1262,
                        "number": "610",
                        "name": "10:0",
                        "rank": 10100,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648630,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1263,
                        "number": "611",
                        "name": "12:0",
                        "rank": 10300,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648603,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1264,
                        "number": "612",
                        "name": "14:0",
                        "rank": 10500,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648604,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1265,
                        "number": "613",
                        "name": "16:0",
                        "rank": 10700,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648631,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1266,
                        "number": "614",
                        "name": "18:0",
                        "rank": 10900,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648632,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1292,
                        "number": "645",
                        "name": "Fatty acids, total monounsaturated",
                        "rank": 11400,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648640,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1275,
                        "number": "626",
                        "name": "16:1",
                        "rank": 11700,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648606,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1268,
                        "number": "617",
                        "name": "18:1",
                        "rank": 12100,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648633,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1277,
                        "number": "628",
                        "name": "20:1",
                        "rank": 12400,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648638,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1279,
                        "number": "630",
                        "name": "22:1",
                        "rank": 12500,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648639,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1293,
                        "number": "646",
                        "name": "Fatty acids, total polyunsaturated",
                        "rank": 12900,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648641,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1269,
                        "number": "618",
                        "name": "18:2",
                        "rank": 13100,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648634,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1270,
                        "number": "619",
                        "name": "18:3",
                        "rank": 13900,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648635,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1276,
                        "number": "627",
                        "name": "18:4",
                        "rank": 14250,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648637,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1271,
                        "number": "620",
                        "name": "20:4",
                        "rank": 14700,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648636,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1278,
                        "number": "629",
                        "name": "20:5 n-3 (EPA)",
                        "rank": 15000,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648607,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1280,
                        "number": "631",
                        "name": "22:5 n-3 (DPA)",
                        "rank": 15200,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648608,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1272,
                        "number": "621",
                        "name": "22:6 n-3 (DHA)",
                        "rank": 15300,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648605,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1253,
                        "number": "601",
                        "name": "Cholesterol",
                        "rank": 15700,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648600,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "nutrient": {
                        "id": 2042,
                        "number": "500",
                        "name": "Amino acids",
                        "rank": 16250,
                        "unitName": "g"
                    },
                    "type": "FoodNutrient"
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1018,
                        "number": "221",
                        "name": "Alcohol, ethyl",
                        "rank": 18200,
                        "unitName": "g"
                    },
                    "foodNutrientDerivation": {
                        "id": 68,
                        "code": "Z",
                        "description": "Assumed zero (Insignificant amount or not naturally occurring in a food, such as fiber in meat)",
                        "foodNutrientSource": {
                            "id": 5,
                            "code": "7",
                            "description": "Assumed zero"
                        }
                    },
                    "id": 1648576,
                    "amount": 0E-8,
                    "dataPoints": 0
                },
                {
                    "type": "FoodNutrient",
                    "nutrient": {
                        "id": 1057,
                        "number": "262",
                        "name": "Caffeine",
                        "rank": 18300,
                        "unitName": "mg"
                    },
                    "foodNutrientDerivation": {
                        "id": 1,
                        "code": "A",
                        "description": "Analytical",
                        "foodNutrientSource": {
                            "id": 1,
                            "code": "1",
                            "description": "Analytical or derived from analytical"
                        }
                    },
                    "id": 1648642,
                    "amount": 37.00000000,
                    "dataPoints": 0
                }
            ],
            "foodPortions": [
                {
                    "id": 89505,
                    "dataPoints": 11,
                    "gramWeight": 248.00000000,
                    "sequenceNumber": 1,
                    "amount": 1.00000000,
                    "modifier": "cup",
                    "measureUnit": {
                        "id": 9999,
                        "name": "undetermined",
                        "abbreviation": "undetermined"
                    }
                }
            ],
            "dataType": "SR Legacy",
            "foodClass": "FinalFood",
            "foodComponents": [],
            "foodAttributes": [],
            "nutrientConversionFactors": [],
            "inputFoods": [],
            "ndbNumber": 14180,
            "isHistoricalReference": true,
            "foodCategory": {
                "id": 14,
                "code": "1400",
                "description": "Beverages"
            }
        }
    }
}
