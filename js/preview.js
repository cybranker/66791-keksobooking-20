'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarElement = document.querySelector('#avatar');
  var adFormPreviewElement = document.querySelector('.ad-form-header__preview img');
  var imagesElement = document.querySelector('#images');
  var adFormPhotoElement = document.querySelector('.ad-form__photo');

  var setPreview = function (fileChooser, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (preview.matches('img')) {
          preview.src = reader.result;
        } else {
          preview.style.backgroundImage = 'url(' + reader.result + ')';
          preview.style.backgroundPosition = '50% 50%';
          preview.style.backgroundSize = 'cover';
        }
      });

      reader.readAsDataURL(file);
    }
  };

  avatarElement.addEventListener('change', function (evt) {
    setPreview(evt.target, adFormPreviewElement);
  });

  imagesElement.addEventListener('change', function (evt) {
    setPreview(evt.target, adFormPhotoElement);
  });
})();
