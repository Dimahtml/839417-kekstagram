'use strict';
// этот модуль показывает и закрывет загружаемую фотографию (при нажатии кнопки ЗАГРУЗИТЬ) и
// отправляет данные на сервер
(function () {
  var ESC_KEYCODE = 27;
  var DEFAULT_SCALE = '100%';
  // Кнопка ЗАГРУЗИТЬ
  var uploadFile = document.querySelector('#upload-file');
  // Форма редактирования изображения
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  // устанавливаем масштаб по умолчанию = 100%
  document.querySelector('.scale__control--value').value = DEFAULT_SCALE;

  // показываем форму редактирования загружаемого изображения (и прячем слайдер),
  // запускаем обработчик для закрытия формы
  uploadFile.addEventListener('change', function () {
    imgUploadOverlay.classList.remove('hidden');
    // устанавливаем масштаб 100% при открытии формы
    document.querySelector('.scale__control--value').value = DEFAULT_SCALE;
    document.querySelector('.img-upload__preview').querySelector('img').style.transform = 'scale(1)';
    document.querySelector('.img-upload__preview').querySelector('img').style.filter = '';
    document.querySelector('.img-upload__effect-level').classList.add('hidden');

    var onCancelButtonClick = function () {
      window.upload.clearForm();
      document.querySelector('#upload-cancel').removeEventListener('click', onCancelButtonClick);
      document.removeEventListener('keydown', onDocumentESCpress);
    };

    var onDocumentESCpress = function (evt) {
      if ((evt.keyCode === ESC_KEYCODE) && (!(window.isFocusedOnField === true))) {
        window.upload.clearForm();
        document.querySelector('#upload-cancel').removeEventListener('click', onCancelButtonClick);
        document.removeEventListener('keydown', onDocumentESCpress);
      }
    };

    document.querySelector('#upload-cancel').addEventListener('click', onCancelButtonClick);
    document.addEventListener('keydown', onDocumentESCpress);
  });
})();
