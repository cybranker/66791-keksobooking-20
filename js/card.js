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

    arrOfferPhotos.forEach(function (src) {
      photoElement = photosElement.querySelector('.popup__photo').cloneNode();
      photoElement.src = src;

      fragment.appendChild(photoElement);
    });

    return fragment;
  };

  var renderOfferFeatures = function (arrOfferFeatures, cardElement) {
    var featuresElement = cardElement.querySelector('.popup__features');
    var featureElement;

    Array.from(featuresElement.children).forEach(function (it) {
      it.classList.add('hidden');
    });

    arrOfferFeatures.forEach(function (feature) {
      featureElement = featuresElement.querySelector('[class*="popup__feature--' + feature + '"]');
      featureElement.classList.remove('hidden');
    });
  };

  var generationMapCard = function (popupMapCardElement, ad, adId) {
    popupMapCardElement.dataset.id = adId;
    popupMapCardElement.querySelector('.popup__title').textContent = ad.offer.title;
    popupMapCardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    popupMapCardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    popupMapCardElement.querySelector('.popup__type').textContent = getReadableOfferType(ad.offer.type);
    popupMapCardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms +
      ' комнаты для ' + ad.offer.guests + ' гостей';
    popupMapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' +
      ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    renderOfferFeatures(ad.offer.features, popupMapCardElement);
    popupMapCardElement.querySelector('.popup__description').textContent = ad.offer.description;

    var mapCardPhotosElement = popupMapCardElement.querySelector('.popup__photos');
    mapCardPhotosElement.innerHTML = '<img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    mapCardPhotosElement.replaceChild(getFragmentOfferPhotos(ad.offer.photos, mapCardPhotosElement), mapCardPhotosElement.querySelector('.popup__photo'));
    popupMapCardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    return popupMapCardElement;
  };

  var getFragmentMapCard = function (ad, adId) {
    var fragment = document.createDocumentFragment();
    var mapCardElement = mapCardTemplate.cloneNode(true);

    fragment.appendChild(generationMapCard(mapCardElement, ad, adId));

    return fragment;
  };

  window.card = {
    generation: generationMapCard,
    getFragment: getFragmentMapCard
  };
})();
