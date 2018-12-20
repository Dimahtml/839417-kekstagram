'use strict';
// этот модуль показывает и закрывет загружаемую фотографию (при нажатии кнопки ЗАГРУЗИТЬ) и
// отправляет данные на сервер
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
    // устанавливаем масштаб 100% при открытии формы
    document.querySelector('.scale__control--value').value = 100 + '%';
    scaleOfImage = 100;
    document.querySelector('.img-upload__preview').querySelector('img').style.transform = 'scale(1)';
    document.querySelector('.img-upload__preview').querySelector('img').style.filter = '';
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    // Кнопка для закрытия формы редактирования изображения
    var uploadCancel = document.querySelector('#upload-cancel');
    // обработчик закрытия формы сбрасывает фильтры и масштаб с фото
    uploadCancel.addEventListener('click', function () {
      window.clearForm();
    });
    document.addEventListener('keydown', function (evt) {
      if ((evt.keyCode === window.constants.ESC_KEYCODE) && (!(window.isFocusedOnField === 1))) {
        window.clearForm();
      }
    });
  });
  // масштаб изображения
  window.scaleOfImage = scaleOfImage;
})();
