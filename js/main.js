'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapPinsListElement = document.querySelector('.map__pins');
  var adFormElement = document.querySelector('.ad-form');
  var adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
  var mapFiltersFormElement = document.querySelector('.map__filters');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var activePage = false;

  window.form.toggleDisabledFormControls(adFormFieldsetElements, true);
  window.form.toggleDisabledFormControls(mapFiltersFormElement.children, true);
  window.form.setAddressField(mapPinMainElement);

  var activatePage = function () {
    mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    window.form.toggleDisabledFormControls(adFormFieldsetElements, false);
    window.form.toggleDisabledFormControls(mapFiltersFormElement.children, false);
    activePage = true;
  };

  var resetPins = function () {
    var mapPinElements = mapPinsListElement.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < mapPinElements.length; i++) {
      mapPinsListElement.removeChild(mapPinElements[i]);
    }
  };

  var closeCardHandler = function () {
    var mapCardElement = document.querySelector('.map__card');

    if (mapCardElement) {
      window.map.closeCardAds();
    }
  };

  var formMapFiltersElement = document.querySelector('.map__filters');

  var deactivatePage = function () {
    mapElement.classList.add('map--faded');
    adFormElement.classList.add('ad-form--disabled');
    window.form.toggleDisabledFormControls(adFormFieldsetElements, true);
    window.form.toggleDisabledFormControls(mapFiltersFormElement.children, true);
    closeCardHandler();
    resetPins();

    mapPinMainElement.style = 'left: 570px; top: 375px;';
    window.form.setAddressField(mapPinMainElement);
    window.filters.arrFilterAds = window.data.arrAds;
    window.filters.filteringValues = {
      type: 'any',
      price: 'any',
      rooms: 'any',
      guests: 'any',
      features: []
    };
    formMapFiltersElement.reset();
    activePage = false;
  };

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt. clientY
    };

    var restrictMoveMainPin = function (coordinates) {
      var MIN_POSITION_PIN_X = -32;
      var MAX_POSITION_PIN_X = 1167;
      var MIN_POSITION_PIN_Y = 50;
      var MAX_POSITION_PIN_Y = 550;

      if (coordinates.mainPinCoordinateX < window.data.MAP_WIDTH_MIN) {
        mapPinMainElement.style.left = MIN_POSITION_PIN_X + 'px';
      }

      if (coordinates.mainPinCoordinateX > window.data.MAP_WIDTH_MAX) {
        mapPinMainElement.style.left = MAX_POSITION_PIN_X + 'px';
      }

      if (coordinates.mainPinCoordinateY < window.data.MAP_HEIGHT_MIN) {
        mapPinMainElement.style.top = MIN_POSITION_PIN_Y + 'px';
      }

      if (coordinates.mainPinCoordinateY > window.data.MAP_HEIGHT_MAX) {
        mapPinMainElement.style.top = MAX_POSITION_PIN_Y + 'px';
      }
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

      var mapPinMainCoordinates = window.form.setAddressField(mapPinMainElement);

      restrictMoveMainPin(mapPinMainCoordinates);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      mapElement.removeEventListener('mousemove', mouseMoveHandler);
      document. removeEventListener('mouseup', mouseUpHandler);

      if (evt.button === 0 && !activePage) {
        activatePage();
        window.form.setAddressField(mapPinMainElement);

        mapPinsListElement.appendChild(window.pins.getFragmentMapPins(window.data.arrAds));
      }
    };

    mapElement.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && !activePage) {
      activatePage();
      window.form.setAddressField(mapPinMainElement);

      mapPinsListElement.appendChild(window.pins.getFragmentMapPins(window.data.arrAds));
    }
  });

  window.main = {
    deactivatePage: deactivatePage,
    resetPins: resetPins,
    closeCardHandler: closeCardHandler
  };
})();
