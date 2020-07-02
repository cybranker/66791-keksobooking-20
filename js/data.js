'use strict';

(function () {
  var MAP_WIDTH_MIN = 1;
  var MAP_WIDTH_MAX = 1200;
  var MAP_HEIGHT_MIN = 130;
  var MAP_HEIGHT_MAX = 630;
  var arrAds = [];

  var successHandler = function (ads) {
    window.data.arrAds = ads;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = '0';
    node.style.right = '0';
    node.style.fontSize = '30px';

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
