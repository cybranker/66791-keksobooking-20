'use strict';

(function () {
  var Key = {
    ESCAPE: 'Escape',
    ENTER: 'Enter'
  };
  var mapElement = document.querySelector('.map');
  var mapPinsListElement = document.querySelector('.map__pins');

  var pinElementEscPressHandler = function (evt) {
    if (evt.key === Key.ESCAPE) {
      evt.preventDefault();
      closeCardAds();
    }
  };

  var openCardAds = function (mapPinElement) {
    var mapPinElementId = mapPinElement.dataset.id;
    var mapCardPopupElement = document.querySelectorAll('.map__card');

    if (mapCardPopupElement.length === 0) {
      mapElement.insertBefore(window.card.getFragmentMapCard(window.filters.arrFilterAds[mapPinElementId], mapPinElementId), mapElement.querySelector('.map__filters-container'));

      document.addEventListener('keydown', pinElementEscPressHandler);

      var popupCloseElement = document.querySelector('.map__card').querySelector('.popup__close');

      popupCloseElement.addEventListener('click', function () {
        closeCardAds();
      });
    } else {
      if (mapCardPopupElement[0].dataset.id !== mapPinElementId) {
        window.card.generationMapCard(mapCardPopupElement[0], window.filters.arrFilterAds[mapPinElementId], mapPinElementId);
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
    if (evt.key === Key.ENTER && evt.target && evt.target.matches('.map__pin:not(.map__pin--main)')) {
      openCardAds(evt.target);
    }

    if (evt.key === Key.ENTER && evt.target && evt.target.parentElement.matches('.map__pin:not(.map__pin--main)')) {
      openCardAds(evt.target.parentElement);
    }
  });

  window.map = {
    Key: Key,
    closeCardAds: closeCardAds
  };
})();
