'use strict';

(function () {
  var mapPinsListElement = document.querySelector('.map__pins');
  var formMapFiltersElement = document.querySelector('.map__filters');
  var priceMap = {
    'low': {
      start: 0,
      end: 10000
    },
    'middle': {
      start: 10000,
      end: 50000
    },
    'high': {
      start: 50000,
      end: Infinity
    }
  };
  var arrFilterAds = [];

  var filterElements = Array.from(document.querySelector('.map__filters').children);

  var filterRules = {
    'housing-type': function (data, filter) {
      return filter.value === data.offer.type;
    },
    'housing-price': function (data, filter) {
      return data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
    },
    'housing-rooms': function (data, filter) {
      return filter.value === data.offer.rooms.toString();
    },
    'housing-guests': function (data, filter) {
      return filter.value === data.offer.guests.toString();
    },
    'housing-features': function (data, filter) {
      var checkListElements = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));

      return checkListElements.every(function (it) {
        return data.offer.features.some(function (feature) {
          return feature === it.value;
        });
      });
    }
  };

  var filterData = function (data) {
    return data.filter(function (item) {
      return filterElements.every(function (filter) {
        return (filter.value === 'any') ? true : filterRules[filter.id](item, filter);
      });
    });
  };

  var mapFiltersChangeHandler = window.debounce(function () {
    window.main.resetPins();
    window.main.closeCardHandler();

    window.filters.arrFilterAds = filterData(window.data.arrAds.slice());
    mapPinsListElement.appendChild(window.pins.getFragmentMapPins(window.filters.arrFilterAds));
  });

  formMapFiltersElement.addEventListener('change', mapFiltersChangeHandler);

  window.filters = {
    arrFilterAds: arrFilterAds
  };
})();
