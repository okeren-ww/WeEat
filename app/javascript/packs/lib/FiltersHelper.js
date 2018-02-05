export default function runFiltersOnRestaurant(restaurants,
  { filterText, filterCuisine, filterRating, filterTenBis, filterDelTime }) {
  let filtersArray = [];
  let restaurantList = restaurants;
  if (filterCuisine !== 'All') {
    filtersArray.push(function (rest) {
      return parseInt(rest.cuisine_id, 10) === parseInt(filterCuisine, 10);
    });
  }

  if (filterRating !== 'All') {
    filtersArray.push(function (rest) {
      let ratingFloor = (Math.floor(rest.rating)).toString();
      return ratingFloor >= filterRating;
    });
  }
  if (filterText !== '') {
    filtersArray.push(function (rest) {
      return rest.name.toLowerCase().includes(filterText.toLowerCase());
    });
  }

  if (filterDelTime) {
    filtersArray.push(function (rest) {
      return rest.max_delivery_time <= filterDelTime;
    });
  }

  filtersArray.push(function (rest) {
    if (filterTenBis && rest.accepts_ten_bis) {
      return true;
    }
    return !(filterTenBis && !rest.accepts_ten_bis);
  });

  function applyFilter(filter) {
    restaurantList = restaurantList.filter(filter);
  }
  filtersArray.map(applyFilter);

  return restaurantList;
}
