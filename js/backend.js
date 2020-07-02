'use strict';

(function () {
  var SERVER_URL = 'https://javascript.pages.academy/keksobooking';
  var STATUS_CODE = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var getCustomizedXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = getCustomizedXhr(onLoad, onError);

    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
