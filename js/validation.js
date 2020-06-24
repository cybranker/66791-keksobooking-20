'use strict';

(function () {
  var MIN_CAPACITY_SELECT_VALUE = 0;
  var MAX_ROOM_NUMBER_SELECT_VALUE = 100;

  var adFormElement = document.querySelector('.ad-form');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');

  var disabledCapacityInvalidOptions = function () {
    var roomNumberSelectValue = parseInt(roomNumberSelect.value, 10);
    var capacitySelectOptions = capacitySelect.querySelectorAll('option');
    var capacitySelectOptionValue;

    for (var i = 0; i < capacitySelectOptions.length; i++) {
      capacitySelectOptionValue = parseInt(capacitySelectOptions[i].value, 10);

      if (capacitySelectOptionValue > roomNumberSelectValue ||
        (capacitySelectOptionValue === MIN_CAPACITY_SELECT_VALUE &&
          roomNumberSelectValue !== MAX_ROOM_NUMBER_SELECT_VALUE) ||
        (capacitySelectOptionValue > MIN_CAPACITY_SELECT_VALUE &&
          roomNumberSelectValue === MAX_ROOM_NUMBER_SELECT_VALUE)) {
        capacitySelectOptions[i].disabled = true;
      } else {
        capacitySelectOptions[i].disabled = false;
      }
    }
  };

  var setValidityCapacitySelect = function () {
    var capacitySelectValue = parseInt(capacitySelect.value, 10);
    var roomNumberSelectValue = parseInt(roomNumberSelect.value, 10);

    if (capacitySelectValue > roomNumberSelectValue &&
      capacitySelectValue > MIN_CAPACITY_SELECT_VALUE &&
      roomNumberSelectValue < MAX_ROOM_NUMBER_SELECT_VALUE) {
      capacitySelect.setCustomValidity('Такое количество гостей - ' + capacitySelectValue + ', не для такого количества комнат - ' + roomNumberSelectValue);
    } else if (capacitySelectValue > MIN_CAPACITY_SELECT_VALUE &&
      roomNumberSelectValue === MAX_ROOM_NUMBER_SELECT_VALUE) {
      capacitySelect.setCustomValidity('Такое количество гостей - ' + capacitySelectValue + ', не для такого количества комнат - ' + roomNumberSelectValue);
    } else if (capacitySelectValue === MIN_CAPACITY_SELECT_VALUE &&
      roomNumberSelectValue < MAX_ROOM_NUMBER_SELECT_VALUE) {
      capacitySelect.setCustomValidity('Не для гостей, количество комнат должно быть ' + MAX_ROOM_NUMBER_SELECT_VALUE);
    } else {
      capacitySelect.setCustomValidity('');
    }
  };

  var typeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');

  var setValidityPriceInput = function (typeValue) {
    var minPrice = 0;

    switch (typeValue) {
      case 'flat':
        minPrice = 1000;
        priceInput.min = minPrice;
        priceInput.placeholder = minPrice;
        break;
      case 'bungalo':
        minPrice = 0;
        priceInput.min = minPrice;
        priceInput.placeholder = minPrice;
        break;
      case 'house':
        minPrice = 5000;
        priceInput.min = minPrice;
        priceInput.placeholder = minPrice;
        break;
      case 'palace':
        minPrice = 10000;
        priceInput.min = minPrice;
        priceInput.placeholder = minPrice;
        break;
    }
  };

  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');

  var synchronizationTimeOptions = function (selector, timeValue) {
    var timeSelect = document.querySelector(selector);
    var timeSelectOptions = timeSelect.querySelectorAll('option');

    for (var i = 0; i < timeSelectOptions.length; i++) {
      if (timeSelectOptions[i].value === timeValue) {
        timeSelectOptions[i].selected = true;
      } else {
        timeSelectOptions[i].selected = false;
      }
    }
  };

  adFormElement.addEventListener('change', function (evt) {
    if (evt.target && evt.target.matches('#room_number')) {
      disabledCapacityInvalidOptions();
      setValidityCapacitySelect();
    }

    if (evt.target && evt.target.matches('#capacity')) {
      setValidityCapacitySelect();
    }

    if (evt.target && evt.target.matches('#type')) {
      var typeSelectValue = typeSelect.value;

      setValidityPriceInput(typeSelectValue);
    }

    if (evt.target && evt.target.matches('#timein')) {
      synchronizationTimeOptions('#timeout', timeinSelect.value);
    }

    if (evt.target && evt.target.matches('#timeout')) {
      synchronizationTimeOptions('#timein', timeoutSelect.value);
    }
  });

  disabledCapacityInvalidOptions();
  setValidityCapacitySelect();
})();
