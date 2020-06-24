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

    if (map.classList.contains('map--faded')) {
      addressField.value = (mapPinElementLeftValue + Math.round(mapPinElementWidth / 2)) + ', '
        + (mapPinElementTopValue + Math.round(mapPinElementHeight / 2));
    } else {
      addressField.value = (mapPinElementLeftValue + Math.round(mapPinElementWidth / 2)) + ', '
        + (mapPinElementTopValue + mapPinElementHeight + MAP_PIN_POINTER_HEIGHT);
    }
  };

  window.form = {
    toggleDisabledFormControls: toggleDisabledFormControls,
    writeAddressField: writeAddressField
  };
})();
