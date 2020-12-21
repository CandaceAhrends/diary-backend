

const tokenSaver = require("./fatSecretTokenManager");

const axios = require("axios");
const Rx = require('rxjs');
const RxOp = require('rxjs/operators');
const nutrition = require('./nutrition');
const flatMap = require('array.prototype.flatmap');
const fromEntries = require('object.fromentries');

const FAT_SECRET_ITEM_API = foodId => `https://platform.fatsecret.com/rest/server.api?method=food.get.v2&format=json&food_id=${foodId}`;
const foodDetailLookup = async (foodId = 0) => {
    const numericRegEx = /^\d+$/;
    console.log("will check valid request for detail id ", foodId);
    
    if (numericRegEx.test(foodId)) {
        const token = await tokenSaver.getToken();
        const api = FAT_SECRET_ITEM_API(foodId);        
        return Rx.from(axios.get(api, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })).pipe(RxOp.map(res => {            
            return res.data;
        }),
            RxOp.map(data => {                
                return data.food.servings;
            }),
            RxOp.switchMap(servings => {
                const servingData = Array.isArray(servings.serving) ? servings.serving : [servings.serving];                
                return Rx.from(servingData).pipe(
                    RxOp.reduce((acc, s) => {

                        const {
                            serving_description, serving_id, serving_url, metric_serving_unit, measurement_description, number_of_units, metric_serving_amount, ...rest
                        } = s;

                        acc[s.serving_description] = rest;
                        return acc;
                    }, {})
                )
            }), RxOp.catchError((err) => Rx.of(err)));
    } else {
        return Rx.of("Invalid ID");
    }


    // return Rx.of(dummy()).pipe(
    //     RxOp.map(data => {
    //         return data.food.servings;
    //     }),
    //     RxOp.switchMap(servings =>
    //         Rx.from(servings.serving).pipe(
    //             RxOp.reduce((acc, s) => {
    //                 console.log("calling reduce");
    //                 const {
    //                     serving_description, serving_id, serving_url, metric_serving_unit, measurement_description, number_of_units, metric_serving_amount, ...rest
    //                 } = s;

    //                 acc[s.serving_description] = rest;
    //                 return acc;
    //             }, {})
    //         ))
    // );
};

module.exports = foodDetailLookup;



function dummy() {
    return {
        "food": {
            "food_id": "4823",
            "food_name": "Taco or Tostada with Beef, Cheese and Lettuce",
            "food_type": "Generic",
            "food_url": "https://www.fatsecret.com/calories-nutrition/generic/taco-or-tostada-with-beef-cheese-and-lettuce",
            "servings": {
                "serving": [
                    {
                        "calcium": "90",
                        "calories": "221",
                        "carbohydrate": "16.20",
                        "cholesterol": "31",
                        "fat": "12.65",
                        "fiber": "2.1",
                        "iron": "1.50",
                        "measurement_description": "taco or tostada",
                        "metric_serving_amount": "78.000",
                        "metric_serving_unit": "g",
                        "monounsaturated_fat": "5.147",
                        "number_of_units": "1.000",
                        "polyunsaturated_fat": "2.332",
                        "potassium": "179",
                        "protein": "10.88",
                        "saturated_fat": "3.924",
                        "serving_description": "1 taco or tostada",
                        "serving_id": "17163",
                        "serving_url": "https://www.fatsecret.com/calories-nutrition/generic/taco-or-tostada-with-beef-cheese-and-lettuce?portionid=17163&portionamount=1.000",
                        "sodium": "462",
                        "sugar": "0.47",
                        "vitamin_a": "18",
                        "vitamin_c": "0.5"
                    },
                    {
                        "calcium": "140",
                        "calories": "345",
                        "carbohydrate": "25.34",
                        "cholesterol": "49",
                        "fat": "19.79",
                        "fiber": "3.3",
                        "iron": "2.35",
                        "measurement_description": "cup",
                        "metric_serving_amount": "122.000",
                        "metric_serving_unit": "g",
                        "monounsaturated_fat": "8.050",
                        "number_of_units": "1.000",
                        "polyunsaturated_fat": "3.647",
                        "potassium": "279",
                        "protein": "17.02",
                        "saturated_fat": "6.138",
                        "serving_description": "1 cup",
                        "serving_id": "16930",
                        "serving_url": "https://www.fatsecret.com/calories-nutrition/generic/taco-or-tostada-with-beef-cheese-and-lettuce?portionid=16930&portionamount=1.000",
                        "sodium": "722",
                        "sugar": "0.73",
                        "vitamin_a": "28",
                        "vitamin_c": "0.7"
                    },
                    {
                        "calcium": "90",
                        "calories": "221",
                        "carbohydrate": "16.20",
                        "cholesterol": "31",
                        "fat": "12.65",
                        "fiber": "2.1",
                        "iron": "1.50",
                        "measurement_description": "serving (78g)",
                        "metric_serving_amount": "78.000",
                        "metric_serving_unit": "g",
                        "monounsaturated_fat": "5.147",
                        "number_of_units": "1.000",
                        "polyunsaturated_fat": "2.332",
                        "potassium": "179",
                        "protein": "10.88",
                        "saturated_fat": "3.924",
                        "serving_description": "1 serving (78 g)",
                        "serving_id": "17042",
                        "serving_url": "https://www.fatsecret.com/calories-nutrition/generic/taco-or-tostada-with-beef-cheese-and-lettuce?portionid=17042&portionamount=1.000",
                        "sodium": "462",
                        "sugar": "0.47",
                        "vitamin_a": "18",
                        "vitamin_c": "0.5"
                    },
                    {
                        "calcium": "115",
                        "calories": "283",
                        "carbohydrate": "20.77",
                        "cholesterol": "40",
                        "fat": "16.22",
                        "fiber": "2.7",
                        "iron": "1.93",
                        "measurement_description": "g",
                        "metric_serving_amount": "100.000",
                        "metric_serving_unit": "g",
                        "monounsaturated_fat": "6.599",
                        "number_of_units": "100.000",
                        "polyunsaturated_fat": "2.990",
                        "potassium": "229",
                        "protein": "13.95",
                        "saturated_fat": "5.031",
                        "serving_description": "100 g",
                        "serving_id": "53503",
                        "serving_url": "https://www.fatsecret.com/calories-nutrition/generic/taco-or-tostada-with-beef-cheese-and-lettuce?portionid=53503&portionamount=100.000",
                        "sodium": "592",
                        "sugar": "0.60",
                        "vitamin_a": "23",
                        "vitamin_c": "0.6"
                    },
                    {
                        "calcium": "33",
                        "calories": "80",
                        "carbohydrate": "5.89",
                        "cholesterol": "11",
                        "fat": "4.60",
                        "fiber": "0.8",
                        "iron": "0.55",
                        "measurement_description": "oz",
                        "metric_serving_amount": "28.350",
                        "metric_serving_unit": "g",
                        "monounsaturated_fat": "1.871",
                        "number_of_units": "1.000",
                        "polyunsaturated_fat": "0.848",
                        "potassium": "65",
                        "protein": "3.95",
                        "saturated_fat": "1.426",
                        "serving_description": "1 oz",
                        "serving_id": "182746",
                        "serving_url": "https://www.fatsecret.com/calories-nutrition/generic/taco-or-tostada-with-beef-cheese-and-lettuce?portionid=182746&portionamount=1.000",
                        "sodium": "168",
                        "sugar": "0.17",
                        "vitamin_a": "7",
                        "vitamin_c": "0.2"
                    }
                ]
            }
        }
    };
}