'use strict';

(function () {
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

  window.utils = {
    getRandomNumber: getRandomNumber,
    getArrayRandomElement: getArrayRandomElement,
    getArrayRandomLength: getArrayRandomLength
  };
})();
