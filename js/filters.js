'use strict';

(function () {
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
    for (var i = 0; i < arrFilterFeatures.length; i++) {
      if (arrFeatures.indexOf(arrFilterFeatures[i]) === -1) {
        return false;
      }
    }

    return true;
  };

  var getArrFilterAds = function (filterVals) {
    var defaultfilteringValues = {
      type: 'any',
      price: 'any',
      rooms: 'any',
      guests: 'any',
      features: []
    };
    var arrFilter = [];
    var arrAds;

    if (filterVals.type !== 'any') {
      arrAds = (arrFilter.length > 0) ? arrFilter : window.data.arrAds;

      arrFilter = arrAds.filter(function (ad) {
        return ad.offer.type === filterVals.type;
      });

      arrFilter = (arrFilter.length === 0) ? null : arrFilter;
    }

    if (filterVals.price !== 'any' && arrFilter) {
      arrAds = (arrFilter.length > 0) ? arrFilter : window.data.arrAds;

      arrFilter = arrAds.filter(function (ad) {
        var priceType = '';

        if (ad.offer.price >= 10000 && ad.offer.price <= 50000) {
          priceType = 'middle';
        }

        if (ad.offer.price < 10000) {
          priceType = 'low';
        }

        if (ad.offer.price > 50000) {
          priceType = 'high';
        }

        return priceType === filterVals.price;
      });
    }

    if (filterVals.rooms !== 'any' && arrFilter) {
      arrAds = (arrFilter.length > 0) ? arrFilter : window.data.arrAds;

      arrFilter = arrAds.filter(function (ad) {
        return ad.offer.rooms === parseInt(filterVals.rooms, 10);
      });
    }

    if (filterVals.guests !== 'any' && arrFilter) {
      arrAds = (arrFilter.length > 0) ? arrFilter : window.data.arrAds;

      arrFilter = arrAds.filter(function (ad) {
        return ad.offer.guests === parseInt(filterVals.guests, 10);
      });
    }

    if (filterVals.features !== 'any' && arrFilter) {
      arrAds = (arrFilter.length > 0) ? arrFilter : window.data.arrAds;

      arrFilter = arrAds.filter(function (ad) {
        return isSameFeatures(ad.offer.features, filterVals.features);
      });
    }

    if (JSON.stringify(filterVals) === JSON.stringify(defaultfilteringValues)) {
      arrFilter = window.data.arrAds;
    }

    return (arrFilter) ? arrFilter : [];
  };

  formMapFiltersElement.addEventListener('change', function (evt) {
    window.main.cleaningPins();
    window.main.hideOpenCardAds();

    if (evt.target) {
      if (evt.target.matches('#housing-type')) {
        filteringValues.type = evt.target.value;
      }

      if (evt.target.matches('#housing-price')) {
        filteringValues.price = evt.target.value;
      }

      if (evt.target.matches('#housing-rooms')) {
        filteringValues.rooms = evt.target.value;
      }

      if (evt.target.matches('#housing-guests')) {
        filteringValues.guests = evt.target.value;
      }

      if (evt.target.matches('input[name="features"]')) {
        if (evt.target.checked) {
          filteringValues.features.push(evt.target.value);
        } else {
          var indexDel = filteringValues.features.indexOf(evt.target.value);

          filteringValues.features.splice(indexDel, 1);
        }
      }
    }

    window.filters.arrFilterAds = getArrFilterAds(filteringValues);

    mapPinsListElement.appendChild(window.pins.getFragmentMapPins(window.filters.arrFilterAds));
  });

  window.filters = {
    arrFilterAds: arrFilterAds
  };
})();
