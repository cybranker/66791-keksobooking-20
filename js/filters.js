'use strict';

(function () {
  var mapPinsListElement = document.querySelector('.map__pins');
  var housingTypeSelect = document.querySelector('#housing-type');

  housingTypeSelect.addEventListener('change', function (evt) {
    window.main.cleaningPins();
    window.main.hideOpenCardAds();

    var housingTypeSelectVal = evt.target.value;

    var arrFilterHousingTypeAds = window.data.arrAds.filter(function (ad) {
      return ad.offer.type === housingTypeSelectVal;
    });

    var arrAds = (housingTypeSelectVal === 'any') ? window.data.arrAds : arrFilterHousingTypeAds;

    mapPinsListElement.appendChild(window.pins.getFragmentMapPins(arrAds));
  });
})();
