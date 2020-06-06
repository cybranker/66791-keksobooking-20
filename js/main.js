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
        price: getRandomNumber(1000, 9000),
        type: getArrayRandomElement(AD_TYPE),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 10),
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

mapPinsListElement.appendChild(getFragmentMapPins(getArrayAds(QUANTITY_ADS)));
