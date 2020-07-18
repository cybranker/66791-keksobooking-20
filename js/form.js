'use strict';

(function () {
  var MAP_PIN_POINTER_HEIGHT = 15;
  var mapElement = document.querySelector('.map');

  var toggleDisabledFields = function (formControls, toggle) {
    Array.from(formControls).map(function (formControl) {
      formControl.disabled = toggle;
    });
  };

  var setAddressField = function (mapPinElement) {
    var addressFieldElement = document.querySelector('#address');
    var mapPinElementWidth = mapPinElement.offsetWidth;
    var mapPinElementHeight = mapPinElement.offsetHeight;
    var mapPinElementLeftValue = parseInt(mapPinElement.style.left, 10);
    var mapPinElementTopValue = parseInt(mapPinElement.style.top, 10);
    var mapPinCoordinateX;
    var mapPinCoordinateY;

    if (mapElement.classList.contains('map--faded')) {
      mapPinCoordinateX = mapPinElementLeftValue + Math.round(mapPinElementWidth / 2);
      mapPinCoordinateY = mapPinElementTopValue + Math.round(mapPinElementHeight / 2);

      addressFieldElement.value = mapPinCoordinateX + ', ' + mapPinCoordinateY;
    } else {
      mapPinCoordinateX = mapPinElementLeftValue + Math.round(mapPinElementWidth / 2);
      mapPinCoordinateY = mapPinElementTopValue + mapPinElementHeight + MAP_PIN_POINTER_HEIGHT;

      if (mapPinCoordinateX < window.data.MAP_WIDTH_MIN) {
        mapPinCoordinateX = window.data.MAP_WIDTH_MIN;
      }

      if (mapPinCoordinateX > window.data.MAP_WIDTH_MAX) {
        mapPinCoordinateX = window.data.MAP_WIDTH_MAX;
      }

      if (mapPinCoordinateY < window.data.MAP_HEIGHT_MIN) {
        mapPinCoordinateY = window.data.MAP_HEIGHT_MIN;
      }

      if (mapPinCoordinateY > window.data.MAP_HEIGHT_MAX) {
        mapPinCoordinateY = window.data.MAP_HEIGHT_MAX;
      }

      addressFieldElement.value = mapPinCoordinateX + ', ' + mapPinCoordinateY;
    }

    return {
      mainPinCoordinateX: mapPinCoordinateX,
      mainPinCoordinateY: mapPinCoordinateY
    };
  };

  var adFormElement = document.querySelector('.ad-form');

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-xhr-message');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);

    window.message.openError();
  };

  adFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(adFormElement), function () {
      window.message.openSuccess();
      adFormElement.reset();
      window.main.deactivatePage();
    }, errorHandler);
  });

  var adFormResetButtonElement = adFormElement.querySelector('.ad-form__reset');

  adFormResetButtonElement.addEventListener('click', function (evt) {
    evt.preventDefault();

    adFormElement.reset();
    window.main.deactivatePage();
  });

  window.form = {
    toggleDisabledFields: toggleDisabledFields,
    setAddressField: setAddressField
  };
})();
