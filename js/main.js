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
    if (evt.button === 0) {
      activationPage();
      window.form.writeAddressField(mapPinMainElement);

      mapPinsListElement.appendChild(window.pins.getFragmentMapPins(window.data));
    }
  });

  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activationPage();
      window.form.writeAddressField(mapPinMainElement);

      mapPinsListElement.appendChild(window.pins.getFragmentMapPins(window.data));
    }
  });
})();
