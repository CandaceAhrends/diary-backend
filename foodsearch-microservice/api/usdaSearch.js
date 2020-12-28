const axios = require("axios");
const Rx = require('rxjs');
const RxOp = require('rxjs/operators');
const nutrition = require('./nutrition');
const flatMap = require('array.prototype.flatmap');
const fromEntries = require('object.fromentries');

const MIN_QUERY_LEN = 3;
const QUERY_LEN_ERROR = `Enter at least ${MIN_QUERY_LEN} charactors`;

const getFood = (query, page) => {
  const api = nutrition.foodLookupUrl(query, page);
  console.log("API => ", api);
  return query.length >= MIN_QUERY_LEN ? Rx.from(axios.get(api)).pipe(RxOp.catchError((err) => Rx.of(err))) : Rx.of({
    error: QUERY_LEN_ERROR
  });

};

const createPageRequests = (res, query) => {

  const pages = Array.from(
    { length: res.totalPages - 1 },
    (x, idx) => idx + 2
  );

  const pageRequests = pages.slice(0,1).map((page) => {
    return [`page${page}`, getFood(query, page)];
  });
  const firstPage = {
    data: res,
  };
  const emptyPage = {
    data: { foods: [] },
  };
	fromEntries.shim();
  const observableList =
    res.totalPages > 1
      ? {
        page1: Rx.of(firstPage),
        ...Object.fromEntries(pageRequests),
      }
      : { page2: Rx.of(emptyPage) };

  const observable = Rx.forkJoin({
    ...observableList,
    page1: Rx.of(firstPage),
  });
  return observable;
}

const transformFoodList = (foodList, query) => {
console.log("transforming food list iwth query = ", query);
  const data = foodList.reduce((nonDuplicates, food) => {
    nonDuplicates.set(food.description, food);
    return nonDuplicates;
  }, new Map());

  return Array.from(data.entries())
    .map(([key, val]) => { 
      return {
        description: val.description,
        id: val.fdcId
      };
    })
    .filter((v) => v);

}

const foodLookup = (query) => {
  return getFood(query, 1).pipe(
    RxOp.switchMap(res => {

      if (res.error) {
        return RxOp.throwError(res.error);
      }

      return Rx.of(res.data);

    }),

    RxOp.switchMap((res) => {
      return createPageRequests(res, query);
    }),

    RxOp.map((data) => {
      return Object.values(data)
        .map((entry) => entry.data)
        .filter((data) => data)
        .map((data) => data.foods);
    }),
    RxOp.map((allPages) => {
      return flatMap(allPages,(data) => data);
    }),
    RxOp.map((foodList) => { 

      const transformedList =  transformFoodList(foodList,query); 
      return transformedList;
    }),
    RxOp.catchError(err => {
      console.log("error getting food lookup", err);
      return Rx.of({ errorMessage: err });
    })

  );
};

module.exports = foodLookup;
