'use strict';

(function () {
  var messageEscHandler;
  var messageEscClose = function (evt, messageElement) {
    if (evt.key === window.map.KEY.ESCAPE) {
      evt.preventDefault();
      closeMessage(messageElement);
    }
  };
  var messageMousedownHandler;
  var messageMousedownClose = function (evt, messageElement) {
    evt.preventDefault();

    var errorButtonElement = messageElement.querySelector('.error__button');

    if (errorButtonElement) {
      if (!errorButtonElement.contains(evt.target)) {
        closeMessage(messageElement);
      }
    } else {
      closeMessage(messageElement);
    }
  };

  var openMessage = function (messageElement) {
    document.body.querySelector('main').appendChild(messageElement);

    messageEscHandler = function (evt) {
      messageEscClose(evt, messageElement);
    };

    document.addEventListener('keydown', messageEscHandler);

    messageMousedownHandler = function (evt) {
      messageMousedownClose(evt, messageElement);
    };

    document.addEventListener('mouseup', messageMousedownHandler);
  };

  var closeMessage = function (messageElement) {
    document.body.querySelector('main').removeChild(messageElement);
    document.removeEventListener('keydown', messageEscHandler);
    document.removeEventListener('mouseup', messageMousedownHandler);
  };

  var openSuccessMessage = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

    openMessage(successTemplate);
  };

  var openErrorMessage = function () {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

    openMessage(errorTemplate);

    var errorButtonElement = errorTemplate.querySelector('.error__button');

    errorButtonElement.addEventListener('click', function (evt) {
      evt.preventDefault();

      closeMessage(errorTemplate);
    });
  };

  window.message = {
    openSuccessMessage: openSuccessMessage,
    openErrorMessage: openErrorMessage
  };
})();
