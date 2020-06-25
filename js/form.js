'use strict';

(function () {
  var MAP_PIN_POINTER_HEIGHT = 15;
  var map = document.querySelector('.map');

  var toggleDisabledFormControls = function (formControls, toggle) {
    for (var i = 0; i < formControls.length; i++) {
      formControls[i].disabled = toggle;
    }
  };

  var writeAddressField = function (mapPinElement) {
    var addressField = document.querySelector('#address');
    var mapPinElementWidth = mapPinElement.offsetWidth;
    var mapPinElementHeight = mapPinElement.offsetHeight;
    var mapPinElementLeftValue = parseInt(mapPinElement.style.left, 10);
    var mapPinElementTopValue = parseInt(mapPinElement.style.top, 10);
    var mapPinCoordinateX;
    var mapPinCoordinateY;

    if (map.classList.contains('map--faded')) {
      mapPinCoordinateX = mapPinElementLeftValue + Math.round(mapPinElementWidth / 2);
      mapPinCoordinateY = mapPinElementTopValue + Math.round(mapPinElementHeight / 2);

      addressField.value = mapPinCoordinateX + ', ' + mapPinCoordinateY;
    } else {
      mapPinCoordinateX = mapPinElementLeftValue + Math.round(mapPinElementWidth / 2);
      mapPinCoordinateY = mapPinElementTopValue + mapPinElementHeight + MAP_PIN_POINTER_HEIGHT;

      addressField.value = mapPinCoordinateX + ', ' + mapPinCoordinateY;
    }

    return {
      mainPinCoordinateX: mapPinCoordinateX,
      mainPinCoordinateY: mapPinCoordinateY
    };
  };

  window.form = {
    toggleDisabledFormControls: toggleDisabledFormControls,
    writeAddressField: writeAddressField
  };
})();
