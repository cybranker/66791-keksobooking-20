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

  for (var i = 1; i <= quantity; i++) {
    arr.push({
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: 'Заголовок предложения ' + i,
        address: (600 + i * getRandomNumber(2, 20)) + ', ' + (350 + i * getRandomNumber(2, 20)),
        price: getRandomNumber(1000, 9000),
        type: getArrayRandomElement(AD_TYPE),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 10),
        checkin: getArrayRandomElement(AD_CHECK),
        checkout: getArrayRandomElement(AD_CHECK),
        features: getArrayRandomLength(getRandomNumber(1, AD_FEATURES.length), AD_FEATURES),
        description: 'Строка с описанием ' + i,
        photos: getArrayRandomLength(getRandomNumber(1, AD_PHOTOS.length), AD_PHOTOS)
      },
      location: {
        x: getRandomNumber(1, 1200),
        y: getRandomNumber(130, 630)
      }
    });
  }

  return arr;
};
