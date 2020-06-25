'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsListElement = document.querySelector('.map__pins');
  var adFormElement = document.querySelector('.ad-form');
  var adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
  var mapFiltersFormElement = document.querySelector('.map__filters');
  var mapPinMainElement = document.querySelector('.map__pin--main');

  window.form.toggleDisabledFormControls(adFormFieldsetElements, true);
  window.form.toggleDisabledFormControls(mapFiltersFormElement.children, true);
  window.form.writeAddressField(mapPinMainElement);

  var activationPage = function () {
    map.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    window.form.toggleDisabledFormControls(adFormFieldsetElements, false);
    window.form.toggleDisabledFormControls(mapFiltersFormElement.children, false);
  };

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt. clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMainElement.style.top = (mapPinMainElement.offsetTop - shift.y) + 'px';
      mapPinMainElement.style.left = (mapPinMainElement.offsetLeft - shift.x) + 'px';

      var mapPinMainCoordinates = window.form.writeAddressField(mapPinMainElement);

      if (mapPinMainCoordinates.mainPinCoordinateX < window.data.MAP_WIDTH_MIN ||
        mapPinMainCoordinates.mainPinCoordinateX > window.data.MAP_WIDTH_MAX ||
        mapPinMainCoordinates.mainPinCoordinateY < window.data.MAP_HEIGHT_MIN ||
        mapPinMainCoordinates.mainPinCoordinateY > window.data.MAP_HEIGHT_MAX) {
        map.removeEventListener('mousemove', mouseMoveHandler);
      }
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      map.removeEventListener('mousemove', mouseMoveHandler);
      map. removeEventListener('mouseup', mouseUpHandler);

      if (evt.button === 0) {
        activationPage();
        window.form.writeAddressField(mapPinMainElement);

        mapPinsListElement.appendChild(window.pins.getFragmentMapPins(window.data.arrAds));
      }
    };

    map.addEventListener('mousemove', mouseMoveHandler);
    map.addEventListener('mouseup', mouseUpHandler);
  });

  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activationPage();
      window.form.writeAddressField(mapPinMainElement);

      mapPinsListElement.appendChild(window.pins.getFragmentMapPins(window.data.arrAds));
    }
  });
})();
