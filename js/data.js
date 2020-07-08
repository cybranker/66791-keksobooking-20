'use strict';

(function () {
  var MAP_WIDTH_MIN = 1;
  var MAP_WIDTH_MAX = 1200;
  var MAP_HEIGHT_MIN = 130;
  var MAP_HEIGHT_MAX = 630;
  var arrAds = [];

  var successHandler = function (ads) {
    window.data.arrAds = ads;
    window.filters.arrFilterAds = ads;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-xhr-message');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  window.data = {
    MAP_WIDTH_MIN: MAP_WIDTH_MIN,
    MAP_WIDTH_MAX: MAP_WIDTH_MAX,
    MAP_HEIGHT_MIN: MAP_HEIGHT_MIN,
    MAP_HEIGHT_MAX: MAP_HEIGHT_MAX,
    arrAds: arrAds
  };
})();
