

const tokenSaver = require("./fatSecretTokenManager");
const axios = require("axios");
const Rx = require('rxjs');
const RxOp = require('rxjs/operators');
const nutrition = require('./nutrition');
const flatMap = require('array.prototype.flatmap');
const fromEntries = require('object.fromentries');

const MIN_QUERY_LEN = 3;
const QUERY_LEN_ERROR = `Enter at least ${MIN_QUERY_LEN} charactors`;


const FAT_SECRET_API = query => `https://platform.fatsecret.com/rest/server.api?method=foods.search&search_expression=${query}&format=json`;

const  foodLookup = async (query) => {
    const api = FAT_SECRET_API(query);
    const token = await tokenSaver.getToken();


    console.log("token before search is : ", token);
    return Rx.from(axios.get(api, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })).pipe(
        RxOp.map(res => {
            return res.data;
        })
    );



    //return Rx.of(dummy());

};

module.exports = foodLookup;


function dummy() {

    return {
        "foods": {
            "food": [
                {
                    "brand_name": "Kraft",
                    "food_description": "Per 2 tbsp - Calories: 130kcal | Fat: 13.00g | Carbs: 2.00g | Protein: 0.00g",
                    "food_id": "7348165",
                    "food_name": "Taco Bell Southwest Ranch Dressing & Dip",
                    "food_type": "Brand",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/kraft/taco-bell-southwest-ranch-dressing-and-dip"
                },
                {
                    "food_description": "Per 100g - Calories: 26kcal | Fat: 0.30g | Carbs: 6.03g | Protein: 0.99g",
                    "food_id": "285829",
                    "food_name": "Bell Peppers",
                    "food_type": "Generic",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/generic/bell-peppers"
                },
                {
                    "food_description": "Per 1589g - Calories: 2783kcal | Fat: 174.90g | Carbs: 148.22g | Protein: 163.03g",
                    "food_id": "23088783",
                    "food_name": "Taco Bake",
                    "food_type": "Generic",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/generic/taco-bake"
                },
                {
                    "food_description": "Per 514g - Calories: 895kcal | Fat: 50.57g | Carbs: 2.80g | Protein: 100.64g",
                    "food_id": "17472327",
                    "food_name": "Taco Meat",
                    "food_type": "Generic",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/generic/taco-meat"
                },
                {
                    "food_description": "Per 110g - Calories: 30kcal | Fat: 0.18g | Carbs: 6.89g | Protein: 1.69g",
                    "food_id": "296432",
                    "food_name": "Taco Sauce",
                    "food_type": "Generic",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/generic/taco-sauce"
                },
                {
                    "food_description": "Per 3395g - Calories: 2745kcal | Fat: 73.99g | Carbs: 279.27g | Protein: 257.70g",
                    "food_id": "1870138",
                    "food_name": "Taco Soup",
                    "food_type": "Generic",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/generic/taco-soup"
                },
                {
                    "brand_name": "Bartaco",
                    "food_description": "Per 1 taco - Calories: 300kcal | Fat: 17.00g | Carbs: 31.00g | Protein: 10.00g",
                    "food_id": "29501653",
                    "food_name": "Pork Belly Taco",
                    "food_type": "Brand",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/bartaco/pork-belly-taco"
                },
                {
                    "food_description": "Per 115g - Calories: 248kcal | Fat: 9.51g | Carbs: 27.43g | Protein: 12.43g",
                    "food_id": "2736",
                    "food_name": "Taco Burger on Bun",
                    "food_type": "Generic",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/generic/taco-burger-on-bun"
                },
                {
                    "food_description": "Per 100g - Calories: 468kcal | Fat: 22.60g | Carbs: 62.40g | Protein: 7.20g",
                    "food_id": "3744",
                    "food_name": "Corn Taco Shell",
                    "food_type": "Generic",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/generic/taco-shell-corn"
                },
                {
                    "food_description": "Per 68g - Calories: 124kcal | Fat: 7.56g | Carbs: 4.16g | Protein: 8.94g",
                    "food_id": "2594",
                    "food_name": "Beef Taco with Cheese, Tomato and Taco Sauce",
                    "food_type": "Generic",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/generic/beef-taco-filling-beef-cheese-tomato-taco-sauce"
                },
                {
                    "food_description": "Per 100g - Calories: 497kcal | Fat: 27.58g | Carbs: 52.94g | Protein: 8.55g",
                    "food_id": "3745",
                    "food_name": "Flour Taco Shell",
                    "food_type": "Generic",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/generic/taco-shell-flour"
                },
                {
                    "food_description": "Per 1657g - Calories: 3661kcal | Fat: 197.97g | Carbs: 252.30g | Protein: 216.19g",
                    "food_id": "4930",
                    "food_name": "Puerto Rican Style Taco with Crab Meat (Taco De Jueye)",
                    "food_type": "Generic",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/generic/taco-with-crab-meat-puerto-rican-style-(taco-de-jueye)"
                },
                {
                    "food_description": "Per 100g - Calories: 216kcal | Fat: 12.02g | Carbs: 15.63g | Protein: 12.08g",
                    "food_id": "39919",
                    "food_name": "Taco",
                    "food_type": "Generic",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/usda/taco"
                },
                {
                    "food_description": "Per 128g - Calories: 247kcal | Fat: 8.76g | Carbs: 18.70g | Protein: 22.08g",
                    "food_id": "4828",
                    "food_name": "Soft Taco with Chicken, Cheese and Lettuce",
                    "food_type": "Generic",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/generic/soft-taco-with-chicken-cheese-and-lettuce"
                },
                {
                    "food_description": "Per 71g - Calories: 199kcal | Fat: 9.03g | Carbs: 18.26g | Protein: 10.44g",
                    "food_id": "4827",
                    "food_name": "Soft Taco with Beef, Cheese and Lettuce",
                    "food_type": "Generic",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/generic/soft-taco-with-beef-cheese-and-lettuce"
                },
                {
                    "food_description": "Per 100g - Calories: 141kcal | Fat: 7.46g | Carbs: 11.91g | Protein: 6.68g",
                    "food_id": "39920",
                    "food_name": "Taco Salad",
                    "food_type": "Generic",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/usda/taco-salad"
                },
                {
                    "food_description": "Per 78g - Calories: 221kcal | Fat: 12.65g | Carbs: 16.20g | Protein: 10.88g",
                    "food_id": "4823",
                    "food_name": "Taco or Tostada with Beef, Cheese and Lettuce",
                    "food_type": "Generic",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/generic/taco-or-tostada-with-beef-cheese-and-lettuce"
                },
                {
                    "food_description": "Per 76g - Calories: 158kcal | Fat: 9.36g | Carbs: 10.01g | Protein: 8.83g",
                    "food_id": "4825",
                    "food_name": "Taco or Tostada with Beef, Cheese, Lettuce, Tomato and Salsa",
                    "food_type": "Generic",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/generic/taco-or-tostada-with-beef-cheese-lettuce-tomato-and-salsa"
                },
                {
                    "food_description": "Per 77g - Calories: 99kcal | Fat: 3.45g | Carbs: 9.92g | Protein: 7.50g",
                    "food_id": "4833",
                    "food_name": "Taco or Tostada with Fish, Lettuce, Tomato and Salsa",
                    "food_type": "Generic",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/generic/taco-or-tostada-with-fish-lettuce-tomato-salsa"
                },
                {
                    "food_description": "Per 94g - Calories: 138kcal | Fat: 5.53g | Carbs: 18.85g | Protein: 4.34g",
                    "food_id": "4834",
                    "food_name": "Meatless Taco or Tostada with Beans, Lettuce, Tomato and Salsa",
                    "food_type": "Generic",
                    "food_url": "https://www.fatsecret.com/calories-nutrition/generic/taco-or-tostada-with-beans-meatless-with-lettuce-tomato-and-salsa"
                }
            ],
            "max_results": "20",
            "page_number": "0",
            "total_results": "3320"
        }
    };
}