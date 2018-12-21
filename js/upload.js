'use strict';
// этот модуль отправляет данные на сервер
(function () {
  var ESC_KEYCODE = 27;
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
  // успешная отправка данных. показываем попап. закрываем попап.
  var upLoadSuccess = function () {
    clearForm();
    // шаблон, который будем копировать
    var template = document.querySelector('#success').content.querySelector('section');
    // создаем окно
    var popup = template.cloneNode(true);
    // куда будем вставлять
    var main = document.querySelector('main');
    // вставляем
    main.appendChild(popup);
    var handlerClick = function () {
      main.removeChild(popup);
      document.removeEventListener('click', handlerClick);
      window.removeEventListener('click', handlerClick);
      document.removeEventListener('keydown', handlerESC);
    };
    var handlerESC = function (evt) {
      if ((evt.keyCode === ESC_KEYCODE) && (!(window.isFocusedOnField === true))) {
        main.removeChild(popup);
      }
      document.removeEventListener('click', handlerClick);
      window.removeEventListener('click', handlerClick);
      document.removeEventListener('keydown', handlerESC);
    };
    // обработчик на закрытие по клику мыши на кнопку
    document.querySelector('.success__button').addEventListener('click', handlerClick);
    // обработчик на закрытие по клику мыши на произвольную область экрана
    window.addEventListener('click', handlerClick);
    // обработчик на закрытие по нажатию ESC
    document.addEventListener('keydown', handlerESC);
  };
  // неуспешная отправка данных. показываем попап. закрываем попап.
  var upLoadError = function () {
    clearForm();
    // шаблон, который будем копировать
    var template = document.querySelector('#error').content.querySelector('section');
    // создаем окно
    var popup = template.cloneNode(true);
    // куда будем вставлять
    var main = document.querySelector('main');
    // вставляем
    main.appendChild(popup);
    // заголовок ошибки
    // console.log(document.querySelector('.error__title'));
    // document.querySelector('.error__title').textContent = message;
    var handlerClick = function () {
      main.removeChild(popup);
      document.removeEventListener('click', handlerClick);
      window.removeEventListener('click', handlerClick);
      document.removeEventListener('keydown', handlerESC);
    };
    var handlerESC = function (evt) {
      if ((evt.keyCode === ESC_KEYCODE) && (!(window.isFocusedOnField === true))) {
        main.removeChild(popup);
      }
      document.removeEventListener('click', handlerClick);
      window.removeEventListener('click', handlerClick);
      document.removeEventListener('keydown', handlerESC);
    };
    // обработчик на закрытие по клику мыши на кнопку
    document.querySelector('.error__button').addEventListener('click', handlerClick);
    // обработчик на закрытие по клику мыши на произвольную область экрана
    window.addEventListener('click', handlerClick);
    // обработчик на закрытие по нажатию ESC
    document.addEventListener('keydown', handlerESC);
  };
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('#upload-file').value = '';// сбрасываем значение кнопки "загрузить" (для повторного открытия)
  document.querySelector('.text__hashtags').value = '';// сбрасываем значение поля хешей
  document.querySelector('.text__description').value = '';// сбрасываем значение поля комментов
  var form = document.querySelector('#upload-select-image');
  // при отправке формы: отменяем действие формы по умолчанию, закрываем окно с большой фоткой
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), upLoadSuccess, upLoadError);
    evt.preventDefault();
  });
  window.clearForm = clearForm;
})();
