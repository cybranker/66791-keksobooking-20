'use strict';

(function () {
  var MAP_WIDTH_MIN = 1;
  var MAP_WIDTH_MAX = 1200;
  var MAP_HEIGHT_MIN = 130;
  var MAP_HEIGHT_MAX = 630;
  var arrAds = [];

  var mapPinsListElement = document.querySelector('.map__pins');
  var mapFiltersFormElement = document.querySelector('.map__filters');

  var successHandler = function (ads) {
    window.data.arrAds = ads;
    window.filters.ads = ads;

    mapPinsListElement.appendChild(window.pins.getFragment(window.data.arrAds));
    window.form.toggleDisabledFields(mapFiltersFormElement.children, false);
  };

  var setXhrErrorMessage = function (message) {
    var errorXhrMessageElement = document.querySelector('.error-xhr-message');

    if (!errorXhrMessageElement) {
      var node = document.createElement('div');
      node.classList.add('error-xhr-message');

      node.textContent = message;
      document.body.insertAdjacentElement('afterbegin', node);
    } else {
      errorXhrMessageElement.textContent = message;
    }
  };

  var errorHandler = function (errorMessage) {
    setXhrErrorMessage(errorMessage);
  };

  window.data = {
    MAP_WIDTH_MIN: MAP_WIDTH_MIN,
    MAP_WIDTH_MAX: MAP_WIDTH_MAX,
    MAP_HEIGHT_MIN: MAP_HEIGHT_MIN,
    MAP_HEIGHT_MAX: MAP_HEIGHT_MAX,
    successHandler: successHandler,
    errorHandler: errorHandler,
    setXhrErrorMessage: setXhrErrorMessage,
    arrAds: arrAds
  };
})();
