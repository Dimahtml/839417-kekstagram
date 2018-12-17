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

  // при отправке формы: отменяем действие формы по умолчанию, закрываем окно с большой фоткой
  var form = document.querySelector('#upload-select-image');
  form.addEventListener('submit', function (evt) {
    // window.save(new FormData(form), function (response) {  было так, но response   не определена, что это вообще такое???
    window.save(new FormData(form), function () {
      imgUploadOverlay.classList.add('hidden');
      uploadFile.value = '';// сбрасываем значение кнопки "загрузить" (для повторного открытия)
      document.querySelector('.text__hashtags').value = '';// сбрасываем значение поля хешей
      document.querySelector('.text__description').value = '';// сбрасываем значение поля комментов
    });
    evt.preventDefault();
  });

  // масштаб изображения
  window.scaleOfImage = scaleOfImage;

})();
