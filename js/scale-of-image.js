'use strict';
// этот модуль показывает и закрывет загружаемую фотографию (при нажатии кнопки ЗАГРУЗИТЬ)

// закрываем и очищаем форму
var clearForm = function () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  // сбрасываем значение кнопки "загрузить" (для повторного открытия)
  document.querySelector('#upload-file').value = '';
  // сбрасываем значение поля хешей
  document.querySelector('.text__hashtags').value = '';
  // сбрасываем значение поля комментов и фильтров
  document.querySelector('.text__description').value = '';
  document.querySelector('.img-upload__preview').querySelector('img').style.filter = '';
  document.querySelector('.img-upload__preview').querySelector('img').setAttribute('class', 'effects__preview--none');
  window.scaleOfImage = 100;
};

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
      clearForm();
    });

    document.addEventListener('keydown', function (evt) {
      if ((evt.keyCode === window.constants.ESC_KEYCODE) && (!(window.isfocusedOnField === 1))) {
        clearForm();
      }
    });

  });

  var upLoadSuccess  = function (message) {

    clearForm ();
    // alert(message);
  };

  var upLoadError = function (message) {
    // alert(message);
  };


  imgUploadOverlay.classList.add('hidden');
      uploadFile.value = '';// сбрасываем значение кнопки "загрузить" (для повторного открытия)
      document.querySelector('.text__hashtags').value = '';// сбрасываем значение поля хешей
      document.querySelector('.text__description').value = '';// сбрасываем значение поля комментов

  var form = document.querySelector('#upload-select-image');

  // при отправке формы: отменяем действие формы по умолчанию, закрываем окно с большой фоткой
  form.addEventListener('submit', function (evt) {
    window.save(new FormData(form), upLoadSuccess, upLoadError);
    evt.preventDefault();
  });

  // масштаб изображения
  window.scaleOfImage = scaleOfImage;

})();
