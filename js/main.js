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
map.classList.remove('map--faded');
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
mapPinsListElement.appendChild(getFragmentMapPins(arrAds));

var mapCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var getReadableOfferType = function (offerType) {
  if (offerType === 'flat') {
    return 'Квартира';
  }

  if (offerType === 'bungalo') {
    return 'Бунгало';
  }

  if (offerType === 'house') {
    return 'Дом';
  }

  return 'Дворец';
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
  var featureElements = featuresElement.querySelectorAll('.popup__feature');
  var featureElement;

  for (var i = 0; i < featureElements.length; i++) {
    featureElements[i].style = 'display: none;';
  }

  for (var j = 0; j < arrOfferFeatures.length; j++) {
    featureElement = featuresElement.querySelector('[class*="popup__feature--' + arrOfferFeatures[j] + '"]');
    featureElement.style = 'display: inline-block;';
  }
};

var getFragmentMapCards = function (ads) {
  var fragment = document.createDocumentFragment();
  var mapCardElement;
  var mapCardPhotosElement;

  for (var i = 0; i < 1; i++) {
    mapCardElement = mapCardTemplate.cloneNode(true);

    mapCardElement.querySelector('.popup__title').textContent = ads[i].offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = ads[i].offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = ads[i].offer.price + '₽/ночь';
    mapCardElement.querySelector('.popup__type').textContent = getReadableOfferType(ads[i].offer.type);
    mapCardElement.querySelector('.popup__text--capacity').textContent = ads[i].offer.rooms +
      ' комнаты для ' + ads[i].offer.guests + ' гостей';
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' +
      ads[i].offer.checkin + ', выезд до ' + ads[i].offer.checkout;
    renderOfferFeatures(ads[i].offer.features, mapCardElement);
    mapCardElement.querySelector('.popup__description').textContent = ads[i].offer.description;
    mapCardPhotosElement = mapCardElement.querySelector('.popup__photos');
    mapCardPhotosElement.replaceChild(getFragmentOfferPhotos(ads[i].offer.photos, mapCardPhotosElement), mapCardPhotosElement.querySelector('.popup__photo'));
    mapCardElement.querySelector('.popup__avatar').src = ads[i].author.avatar;

    fragment.appendChild(mapCardElement);
  }

  return fragment;
};

map.insertBefore(getFragmentMapCards(arrAds), map.querySelector('.map__filters-container'));
