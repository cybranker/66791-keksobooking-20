'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var getFragmentMapPins = function (ads) {
    var fragment = document.createDocumentFragment();
    var mapPinElement;

    for (var i = 0; i < ads.length; i++) {
      mapPinElement = mapPinTemplate.cloneNode(true);

      mapPinElement.dataset.id = i;
      mapPinElement.style.left = ads[i].location.x + 'px';
      mapPinElement.style.top = ads[i].location.y + 'px';
      mapPinElement.style.transform = 'translate(-50%, -100%)';
      mapPinElement.querySelector('img').src = ads[i].author.avatar;
      mapPinElement.querySelector('img').alt = ads[i].offer.title;

      fragment.appendChild(mapPinElement);
    }

    return fragment;
  };

  window.pins = {
    getFragmentMapPins: getFragmentMapPins
  };
})();
