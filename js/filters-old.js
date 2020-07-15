'use strict';

(function () {
  var MIN_INTERVAL_PRICE = 10000;
  var MAX_INTERVAL_PRICE = 50000;
  var FILTER_NAMES = {
    TYPE: 'type',
    PRICE: 'price',
    ROOMS: 'rooms',
    GUESTS: 'guests',
    FEATURES: 'features'
  };

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

  var getArrFilterByType = function (type, arrFilter, filterVals) {
    if (arrFilter && filterVals[type] !== 'any') {
      var arrAds = (arrFilter.length > 0) ? arrFilter : window.data.arrAds;

      switch (type) {
        case FILTER_NAMES.TYPE:
          arrFilter = filterByType(arrAds, filterVals);
          break;
        case FILTER_NAMES.PRICE:
          arrFilter = filterByPrice(arrAds, filterVals);
          break;
        case FILTER_NAMES.ROOMS:
          arrFilter = filterByRooms(arrAds, filterVals);
          break;
        case FILTER_NAMES.GUESTS:
          arrFilter = filterByGuests(arrAds, filterVals);
          break;
        case FILTER_NAMES.FEATURES:
          arrFilter = filterByFeatures(arrAds, filterVals);
          break;
      }

      arrFilter = (arrFilter.length === 0) ? null : arrFilter;
    }

    return arrFilter;
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

    arrFilter = getArrFilterByType(FILTER_NAMES.TYPE, arrFilter, filterVals);
    arrFilter = getArrFilterByType(FILTER_NAMES.PRICE, arrFilter, filterVals);
    arrFilter = getArrFilterByType(FILTER_NAMES.ROOMS, arrFilter, filterVals);
    arrFilter = getArrFilterByType(FILTER_NAMES.GUESTS, arrFilter, filterVals);
    arrFilter = getArrFilterByType(FILTER_NAMES.FEATURES, arrFilter, filterVals);

    if (JSON.stringify(filterVals) === JSON.stringify(defaultFilteringValues)) {
      arrFilter = window.data.arrAds;
    }

    return (arrFilter) ? arrFilter : [];
  };

  var setFilteringValues = function (type, value) {
    window.filters.filteringValues[type] = value;
  };

  formMapFiltersElement.addEventListener('change', function (evt) {
    var filterOut = window.debounce(function () {
      window.main.resetPins();
      window.main.closeCardHandler();

      if (evt.target) {
        if (evt.target.matches('#housing-type')) {
          setFilteringValues(FILTER_NAMES.TYPE, evt.target.value);
        }

        if (evt.target.matches('#housing-price')) {
          setFilteringValues(FILTER_NAMES.PRICE, evt.target.value);
        }

        if (evt.target.matches('#housing-rooms')) {
          setFilteringValues(FILTER_NAMES.ROOMS, evt.target.value);
        }

        if (evt.target.matches('#housing-guests')) {
          setFilteringValues(FILTER_NAMES.GUESTS, evt.target.value);
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
