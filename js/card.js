'use strict';

(function () {
  var mapCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var getReadableOfferType = function (offerType) {
    switch (offerType) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
    }

    return '';
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
    var featureElement;

    for (var i = 0; i < featuresElement.children.length; i++) {
      featuresElement.children[i].classList.add('hidden');
    }

    for (var j = 0; j < arrOfferFeatures.length; j++) {
      featureElement = featuresElement.querySelector('[class*="popup__feature--' + arrOfferFeatures[j] + '"]');
      featureElement.classList.remove('hidden');
    }
  };

  window.card = {
    generationMapCard: function (mapCardPopup, ad, adId) {
      mapCardPopup.dataset.id = adId;
      mapCardPopup.querySelector('.popup__title').textContent = ad.offer.title;
      mapCardPopup.querySelector('.popup__text--address').textContent = ad.offer.address;
      mapCardPopup.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
      mapCardPopup.querySelector('.popup__type').textContent = getReadableOfferType(ad.offer.type);
      mapCardPopup.querySelector('.popup__text--capacity').textContent = ad.offer.rooms +
        ' комнаты для ' + ad.offer.guests + ' гостей';
      mapCardPopup.querySelector('.popup__text--time').textContent = 'Заезд после ' +
        ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
      renderOfferFeatures(ad.offer.features, mapCardPopup);
      mapCardPopup.querySelector('.popup__description').textContent = ad.offer.description;

      var mapCardPhotosElement = mapCardPopup.querySelector('.popup__photos');
      mapCardPhotosElement.innerHTML = '<img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
      mapCardPhotosElement.replaceChild(getFragmentOfferPhotos(ad.offer.photos, mapCardPhotosElement), mapCardPhotosElement.querySelector('.popup__photo'));
      mapCardPopup.querySelector('.popup__avatar').src = ad.author.avatar;

      return mapCardPopup;
    },
    getFragmentMapCard: function (ad, adId) {
      var fragment = document.createDocumentFragment();
      var mapCardElement = mapCardTemplate.cloneNode(true);

      fragment.appendChild(this.generationMapCard(mapCardElement, ad, adId));

      return fragment;
    }
  };
})();
