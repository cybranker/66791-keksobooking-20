'use strict';

(function () {
  var mapPinsListElement = document.querySelector('.map__pins');
  var selectHousingTypeElement = document.querySelector('#housing-type');
  var arrFilterAds = [];

  selectHousingTypeElement.addEventListener('change', function (evt) {
    window.main.cleaningPins();
    window.main.hideOpenCardAds();

    var housingTypeSelectVal = evt.target.value;

    arrFilterAds = window.data.arrAds.filter(function (ad) {
      return ad.offer.type === housingTypeSelectVal;
    });

    window.filters.arrFilterAds = (housingTypeSelectVal === 'any') ? window.data.arrAds : arrFilterAds;

    mapPinsListElement.appendChild(window.pins.getFragmentMapPins(window.filters.arrFilterAds));
  });

  window.filters = {
    arrFilterAds: arrFilterAds
  };
})();
