'use strict';

(function () {
  var MIN_CAPACITY_SELECT_VALUE = 0;
  var MAX_ROOM_NUMBER_SELECT_VALUE = 100;

  var adFormElement = document.querySelector('.ad-form');
  var selectRoomNumberElement = document.querySelector('#room_number');
  var selectCapacityElement = document.querySelector('#capacity');

  var disabledCapacityInvalidOptions = function () {
    var roomNumberSelectValue = parseInt(selectRoomNumberElement.value, 10);
    var selectCapacityOptionElements = selectCapacityElement.querySelectorAll('option');
    var selectCapacityOptionValue;

    for (var i = 0; i < selectCapacityOptionElements.length; i++) {
      selectCapacityOptionValue = parseInt(selectCapacityOptionElements[i].value, 10);

      if (selectCapacityOptionValue > roomNumberSelectValue ||
        (selectCapacityOptionValue === MIN_CAPACITY_SELECT_VALUE &&
          roomNumberSelectValue !== MAX_ROOM_NUMBER_SELECT_VALUE) ||
        (selectCapacityOptionValue > MIN_CAPACITY_SELECT_VALUE &&
          roomNumberSelectValue === MAX_ROOM_NUMBER_SELECT_VALUE)) {
        selectCapacityOptionElements[i].disabled = true;
      } else {
        selectCapacityOptionElements[i].disabled = false;
      }
    }
  };

  var setValidityCapacitySelect = function () {
    var selectCapacityValue = parseInt(selectCapacityElement.value, 10);
    var selectRoomNumberValue = parseInt(selectRoomNumberElement.value, 10);

    if (selectCapacityValue > selectRoomNumberValue &&
      selectCapacityValue > MIN_CAPACITY_SELECT_VALUE &&
      selectRoomNumberValue < MAX_ROOM_NUMBER_SELECT_VALUE) {
      selectCapacityElement.setCustomValidity('Такое количество гостей - ' + selectCapacityValue + ', не для такого количества комнат - ' + selectRoomNumberValue);
    } else if (selectCapacityValue > MIN_CAPACITY_SELECT_VALUE &&
      selectRoomNumberValue === MAX_ROOM_NUMBER_SELECT_VALUE) {
      selectCapacityElement.setCustomValidity('Такое количество гостей - ' + selectCapacityValue + ', не для такого количества комнат - ' + selectRoomNumberValue);
    } else if (selectCapacityValue === MIN_CAPACITY_SELECT_VALUE &&
      selectRoomNumberValue < MAX_ROOM_NUMBER_SELECT_VALUE) {
      selectCapacityElement.setCustomValidity('Не для гостей, количество комнат должно быть ' + MAX_ROOM_NUMBER_SELECT_VALUE);
    } else {
      selectCapacityElement.setCustomValidity('');
    }
  };

  var selectTypeElement = document.querySelector('#type');
  var inputPriceElement = document.querySelector('#price');

  var setValidityPriceInput = function (typeValue) {
    var minPrice = 0;

    switch (typeValue) {
      case 'flat':
        minPrice = 1000;
        inputPriceElement.min = minPrice;
        inputPriceElement.placeholder = minPrice;
        break;
      case 'bungalo':
        minPrice = 0;
        inputPriceElement.min = minPrice;
        inputPriceElement.placeholder = minPrice;
        break;
      case 'house':
        minPrice = 5000;
        inputPriceElement.min = minPrice;
        inputPriceElement.placeholder = minPrice;
        break;
      case 'palace':
        minPrice = 10000;
        inputPriceElement.min = minPrice;
        inputPriceElement.placeholder = minPrice;
        break;
    }
  };

  var selectTimeinElement = document.querySelector('#timein');
  var selectTimeoutElement = document.querySelector('#timeout');

  var synchronizationTimeOptions = function (selector, timeValue) {
    var selectTimeElement = document.querySelector(selector);
    var selectTimeOptionElements = selectTimeElement.querySelectorAll('option');

    for (var i = 0; i < selectTimeOptionElements.length; i++) {
      if (selectTimeOptionElements[i].value === timeValue) {
        selectTimeOptionElements[i].selected = true;
      } else {
        selectTimeOptionElements[i].selected = false;
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
      var typeSelectValue = selectTypeElement.value;

      setValidityPriceInput(typeSelectValue);
    }

    if (evt.target && evt.target.matches('#timein')) {
      synchronizationTimeOptions('#timeout', selectTimeinElement.value);
    }

    if (evt.target && evt.target.matches('#timeout')) {
      synchronizationTimeOptions('#timein', selectTimeoutElement.value);
    }
  });

  disabledCapacityInvalidOptions();
  setValidityCapacitySelect();
})();
