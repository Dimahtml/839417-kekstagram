'use strict';
// этот модуль показывает загружаемую фотографию (при нажатии кнопки ЗАГРУЗИТЬ)

(function () {

  // Кнопка ЗАГРУЗИТЬ
  var uploadFile = document.querySelector('#upload-file');

  // Форма редактирования изображения
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');

  // устанавливаем масштаб по умолчанию = 100%
  document.querySelector('.scale__control--value').value = 100 + '%';

  // масштаб изображения
  var scaleOfImage = parseInt(document.querySelector('.scale__control--value').value, 10);

  // показываем форму редактирования загружаемого изображения (и прячем слайдер),
  // запускаем обработчик для закрытия формы
  uploadFile.addEventListener('change', function () {
    imgUploadOverlay.classList.remove('hidden');

    document.querySelector('.img-upload__effect-level').classList.add('hidden');

    // Кнопка для закрытия формы редактирования изображения
    var uploadCancel = document.querySelector('#upload-cancel');

    uploadCancel.addEventListener('click', function () {
      imgUploadOverlay.classList.add('hidden');
      uploadFile.value = '';
    });

    document.addEventListener('keydown', function (evt) {
      if ((evt.keyCode === window.constants.ESC_KEYCODE) && (!(window.isfocusedOnField === 1))) {
        imgUploadOverlay.classList.add('hidden');
        uploadFile.value = '';
      }
    });
  });

  // масштаб изображения
  window.scaleOfImage = scaleOfImage;

})();
