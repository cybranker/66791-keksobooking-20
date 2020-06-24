'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsListElement = document.querySelector('.map__pins');

  var pinElementEscPressHandler = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeCardAds();
    }
  };

  var openCardAds = function (mapPinElement) {
    var mapPinElementId = mapPinElement.dataset.id;
    var mapCardPopupElement = document.querySelectorAll('.map__card');

    if (mapCardPopupElement.length === 0) {
      map.insertBefore(window.card.getFragmentMapCard(window.data[mapPinElementId], mapPinElementId), map.querySelector('.map__filters-container'));

      document.addEventListener('keydown', pinElementEscPressHandler);

      var mapCardAdClose = document.querySelector('.map__card').querySelector('.popup__close');

      mapCardAdClose.addEventListener('click', function () {
        closeCardAds();
      });
    } else {
      if (mapCardPopupElement[0].dataset.id !== mapPinElementId) {
        window.card.generationMapCard(mapCardPopupElement[0], window.data[mapPinElementId], mapPinElementId);
      }
    }
  };

  var closeCardAds = function () {
    document.removeEventListener('keydown', pinElementEscPressHandler);
    document.querySelector('.map__card').remove();
  };

  mapPinsListElement.addEventListener('click', function (evt) {
    if (evt.target && evt.target.matches('.map__pin:not(.map__pin--main)')) {
      openCardAds(evt.target);
    }

    if (evt.target && evt.target.parentElement.matches('.map__pin:not(.map__pin--main)')) {
      openCardAds(evt.target.parentElement);
    }
  });

  mapPinsListElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && evt.target && evt.target.matches('.map__pin:not(.map__pin--main)')) {
      openCardAds(evt.target);
    }

    if (evt.key === 'Enter' && evt.target && evt.target.parentElement.matches('.map__pin:not(.map__pin--main)')) {
      openCardAds(evt.target.parentElement);
    }
  });
})();
