'use strict';

(function () {
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

  var getArrayAds = function (quantity) {
    var arr = [];
    var locationX = 0;
    var locationY = 0;

    for (var i = 0; i < quantity; i++) {
      locationX = window.utils.getRandomNumber(MAP_WIDTH_MIN, MAP_WIDTH_MAX);
      locationY = window.utils.getRandomNumber(MAP_HEIGHT_MIN, MAP_HEIGHT_MAX);

      arr.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: 'Заголовок предложения ' + (i + 1),
          address: locationX + ', ' + locationY,
          price: window.utils.getRandomNumber(MIN_PRICE, MAX_PRICE),
          type: window.utils.getArrayRandomElement(AD_TYPE),
          rooms: window.utils.getRandomNumber(MIN_ROOMS, MAX_ROOMS),
          guests: window.utils.getRandomNumber(MIN_GUESTS, MAX_GUESTS),
          checkin: window.utils.getArrayRandomElement(AD_CHECK),
          checkout: window.utils.getArrayRandomElement(AD_CHECK),
          features: window.utils.getArrayRandomLength(window.utils.getRandomNumber(1, AD_FEATURES.length), AD_FEATURES),
          description: 'Строка с описанием ' + (i + 1),
          photos: window.utils.getArrayRandomLength(window.utils.getRandomNumber(1, AD_PHOTOS.length), AD_PHOTOS)
        },
        location: {
          x: locationX,
          y: locationY
        }
      });
    }

    return arr;
  };

  window.data = getArrayAds(QUANTITY_ADS);
})();
