'use strict';

var QUANTITY_ADS = 8;
var AD_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var AD_CHECK = [
  '12:00',
  '13:00',
  '14:00'
];
var AD_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var AD_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var MAP_WIDTH_MIN = 1;
var MAP_WIDTH_MAX = 1200;
var MAP_HEIGHT_MIN = 130;
var MAP_HEIGHT_MAX = 630;
var MIN_PRICE = 1000;
var MAX_PRICE = 9000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var MAP_PIN_POINTER_HEIGHT = 15;

var getRandomNumber = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);

  return Math.round(rand);
};

var getArrayRandomElement = function (arr) {
  var random = Math.floor(Math.random() * arr.length);

  return arr[random];
};

var getArrayRandomLength = function (len, arr) {
  var newArr = [];
  var value;

  for (var i = 0; i < len; i++) {
    value = getArrayRandomElement(arr);

    newArr.push(value);
    arr = arr.filter(function (item) {
      return item !== value;
    });
  }

  return newArr;
};

var getArrayAds = function (quantity) {
  var arr = [];
  var locationX = 0;
  var locationY = 0;

  for (var i = 0; i < quantity; i++) {
    locationX = getRandomNumber(MAP_WIDTH_MIN, MAP_WIDTH_MAX);
    locationY = getRandomNumber(MAP_HEIGHT_MIN, MAP_HEIGHT_MAX);

    arr.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Заголовок предложения ' + (i + 1),
        address: locationX + ', ' + locationY,
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: getArrayRandomElement(AD_TYPE),
        rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
        checkin: getArrayRandomElement(AD_CHECK),
        checkout: getArrayRandomElement(AD_CHECK),
        features: getArrayRandomLength(getRandomNumber(1, AD_FEATURES.length), AD_FEATURES),
        description: 'Строка с описанием ' + (i + 1),
        photos: getArrayRandomLength(getRandomNumber(1, AD_PHOTOS.length), AD_PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }

  return arr;
};

var map = document.querySelector('.map');
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var mapPinsListElement = document.querySelector('.map__pins');

var getFragmentMapPins = function (ads) {
  var fragment = document.createDocumentFragment();
  var mapPinElement;

  for (var i = 0; i < ads.length; i++) {
    mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.style.left = ads[i].location.x + 'px';
    mapPinElement.style.top = ads[i].location.y + 'px';
    mapPinElement.style.transform = 'translate(-50%, -100%)';
    mapPinElement.querySelector('img').src = ads[i].author.avatar;
    mapPinElement.querySelector('img').alt = ads[i].offer.title;

    fragment.appendChild(mapPinElement);
  }

  return fragment;
};

var arrAds = getArrayAds(QUANTITY_ADS);

var mapCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var getReadableOfferType = function (offerType) {
  switch (offerType) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }

  return '';
};

var getFragmentOfferPhotos = function (arrOfferPhotos, photosElement) {
  var fragment = document.createDocumentFragment();
  var photoElement;

  for (var i = 0; i < arrOfferPhotos.length; i++) {
    photoElement = photosElement.querySelector('.popup__photo').cloneNode();
    photoElement.src = arrOfferPhotos[i];

    fragment.appendChild(photoElement);
  }

  return fragment;
};

var renderOfferFeatures = function (arrOfferFeatures, cardElement) {
  var featuresElement = cardElement.querySelector('.popup__features');
  var featureElement;

  for (var j = 0; j < arrOfferFeatures.length; j++) {
    featureElement = featuresElement.querySelector('[class*="popup__feature--' + arrOfferFeatures[j] + '"]');
    featureElement.classList.remove('hidden');
  }
};

var getFragmentMapCard = function (ad) {
  var fragment = document.createDocumentFragment();
  var mapCardElement = mapCardTemplate.cloneNode(true);

  mapCardElement.querySelector('.popup__title').textContent = ad.offer.title;
  mapCardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  mapCardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  mapCardElement.querySelector('.popup__type').textContent = getReadableOfferType(ad.offer.type);
  mapCardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms +
    ' комнаты для ' + ad.offer.guests + ' гостей';
  mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' +
    ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  renderOfferFeatures(ad.offer.features, mapCardElement);
  mapCardElement.querySelector('.popup__description').textContent = ad.offer.description;

  var mapCardPhotosElement = mapCardElement.querySelector('.popup__photos');

  mapCardPhotosElement.replaceChild(getFragmentOfferPhotos(ad.offer.photos, mapCardPhotosElement), mapCardPhotosElement.querySelector('.popup__photo'));
  mapCardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  fragment.appendChild(mapCardElement);

  return fragment;
};

var adFormElement = document.querySelector('.ad-form');
var adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');
var mapFiltersFormElement = document.querySelector('.map__filters');
var mapPinMainElement = document.querySelector('.map__pin--main');

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

toggleDisabledFormControls(adFormFieldsetElements, true);
toggleDisabledFormControls(mapFiltersFormElement.children, true);
writeAddressField(mapPinMainElement);

var activationPage = function () {
  map.classList.remove('map--faded');
  adFormElement.classList.remove('ad-form--disabled');
  toggleDisabledFormControls(adFormFieldsetElements, false);
  toggleDisabledFormControls(mapFiltersFormElement.children, false);
};

mapPinMainElement.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activationPage();
    writeAddressField(mapPinMainElement);

    mapPinsListElement.appendChild(getFragmentMapPins(arrAds));
    map.insertBefore(getFragmentMapCard(arrAds[0]), map.querySelector('.map__filters-container'));
  }
});

mapPinMainElement.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activationPage();
    writeAddressField(mapPinMainElement);

    mapPinsListElement.appendChild(getFragmentMapPins(arrAds));
    map.insertBefore(getFragmentMapCard(arrAds[0]), map.querySelector('.map__filters-container'));
  }
});

var roomNumberSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');

capacitySelect.addEventListener('change', function (evt) {
  evt.preventDefault();

  var capacitySelectValue = parseInt(capacitySelect.value, 10);
  var roomNumberSelectValue = parseInt(roomNumberSelect.value, 10);
  var minCapacitySelectValue = 0;
  var maxRoomNumberSelectValue = 100;

  if (capacitySelectValue > roomNumberSelectValue &&
    capacitySelectValue > minCapacitySelectValue &&
    roomNumberSelectValue < maxRoomNumberSelectValue) {
    capacitySelect.setCustomValidity(roomNumberSelectValue + ' комнат, не для ' + capacitySelectValue + ' гостя');
  } else if (capacitySelectValue > minCapacitySelectValue &&
    roomNumberSelectValue === maxRoomNumberSelectValue) {
    capacitySelect.setCustomValidity(roomNumberSelectValue + ' комнат, не для ' + capacitySelectValue + ' гостя');
  } else if (capacitySelectValue === minCapacitySelectValue &&
    roomNumberSelectValue < maxRoomNumberSelectValue) {
    capacitySelect.setCustomValidity(roomNumberSelectValue + ' комнат, не для гостей');
  } else {
    capacitySelect.setCustomValidity('');
  }
});
