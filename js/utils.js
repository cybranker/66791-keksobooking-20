'use strict';

(function () {
  window.utils = {
    getRandomNumber: function (min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);

      return Math.round(rand);
    },
    getArrayRandomElement: function (arr) {
      var random = Math.floor(Math.random() * arr.length);

      return arr[random];
    },
    getArrayRandomLength: function (len, arr) {
      var newArr = [];
      var value;

      for (var i = 0; i < len; i++) {
        value = this.getArrayRandomElement(arr);

        newArr.push(value);
        arr = arr.filter(function (item) {
          return item !== value;
        });
      }

      return newArr;
    }
  };
})();
