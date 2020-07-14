'use strict';

(function () {
  var MIN_INTERVAL_PRICE = 10000;
  var MAX_INTERVAL_PRICE = 50000;

  var mapPinsListElement = document.querySelector('.map__pins');
  var formMapFiltersElement = document.querySelector('.map__filters');
  var arrFilterAds = [];

  var filteringValues = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };

  var isSameFeatures = function (arrFeatures, arrFilterFeatures) {
    var isSame = true;

    arrFilterFeatures.forEach(function (it) {
      if (arrFeatures.indexOf(it) === -1) {
        isSame = false;
      }
    });

    return isSame;
  };

  var filterByType = function (ads, filterVals) {
    return ads.filter(function (ad) {
      return ad.offer.type === filterVals.type;
    });
  };

  var filterByPrice = function (ads, filterVals) {
    return ads.filter(function (ad) {
      var priceType = '';

      if (ad.offer.price >= MIN_INTERVAL_PRICE && ad.offer.price <= MAX_INTERVAL_PRICE) {
        priceType = 'middle';
      }

      if (ad.offer.price < MIN_INTERVAL_PRICE) {
        priceType = 'low';
      }

      if (ad.offer.price > MAX_INTERVAL_PRICE) {
        priceType = 'high';
      }

      return priceType === filterVals.price;
    });
  };

  var filterByRooms = function (ads, filterVals) {
    return ads.filter(function (ad) {
      return ad.offer.rooms === parseInt(filterVals.rooms, 10);
    });
  };

  var filterByGuests = function (ads, filterVals) {
    return ads.filter(function (ad) {
      return ad.offer.guests === parseInt(filterVals.guests, 10);
    });
  };

  var filterByFeatures = function (ads, filterVals) {
    return ads.filter(function (ad) {
      return isSameFeatures(ad.offer.features, filterVals.features);
    });
  };

  var getFilterData = function (filterVals) {
    var defaultFilteringValues = {
      type: 'any',
      price: 'any',
      rooms: 'any',
      guests: 'any',
      features: []
    };
    var arrFilter = [];
    var arrAds;

    if (filterVals.type !== 'any' && arrFilter) {
      arrAds = (arrFilter.length > 0) ? arrFilter : window.data.arrAds;
      arrFilter = filterByType(arrAds, filterVals);
      arrFilter = (arrFilter.length === 0) ? null : arrFilter;
    }

    if (filterVals.price !== 'any' && arrFilter) {
      arrAds = (arrFilter.length > 0) ? arrFilter : window.data.arrAds;
      arrFilter = filterByPrice(arrAds, filterVals);
      arrFilter = (arrFilter.length === 0) ? null : arrFilter;
    }

    if (filterVals.rooms !== 'any' && arrFilter) {
      arrAds = (arrFilter.length > 0) ? arrFilter : window.data.arrAds;
      arrFilter = filterByRooms(arrAds, filterVals);
      arrFilter = (arrFilter.length === 0) ? null : arrFilter;
    }

    if (filterVals.guests !== 'any' && arrFilter) {
      arrAds = (arrFilter.length > 0) ? arrFilter : window.data.arrAds;
      arrFilter = filterByGuests(arrAds, filterVals);
      arrFilter = (arrFilter.length === 0) ? null : arrFilter;
    }

    if (filterVals.features !== [] && arrFilter) {
      arrAds = (arrFilter.length > 0) ? arrFilter : window.data.arrAds;
      arrFilter = filterByFeatures(arrAds, filterVals);
      arrFilter = (arrFilter.length === 0) ? null : arrFilter;
    }

    if (JSON.stringify(filterVals) === JSON.stringify(defaultFilteringValues)) {
      arrFilter = window.data.arrAds;
    }

    return (arrFilter) ? arrFilter : [];
  };

  formMapFiltersElement.addEventListener('change', function (evt) {
    var filterOut = window.debounce(function () {
      window.main.resetPins();
      window.main.closeCardHandler();

      if (evt.target) {
        if (evt.target.matches('#housing-type')) {
          window.filters.filteringValues.type = evt.target.value;
        }

        if (evt.target.matches('#housing-price')) {
          window.filters.filteringValues.price = evt.target.value;
        }

        if (evt.target.matches('#housing-rooms')) {
          window.filters.filteringValues.rooms = evt.target.value;
        }

        if (evt.target.matches('#housing-guests')) {
          window.filters.filteringValues.guests = evt.target.value;
        }

        if (evt.target.matches('input[name="features"]')) {
          if (evt.target.checked) {
            window.filters.filteringValues.features.push(evt.target.value);
          } else {
            var indexDel = window.filters.filteringValues.features.indexOf(evt.target.value);

            window.filters.filteringValues.features.splice(indexDel, 1);
          }
        }
      }

      window.filters.arrFilterAds = getFilterData(window.filters.filteringValues);

      mapPinsListElement.appendChild(window.pins.getFragmentMapPins(window.filters.arrFilterAds));
    });

    filterOut();
  });

  window.filters = {
    filteringValues: filteringValues,
    arrFilterAds: arrFilterAds
  };
})();
