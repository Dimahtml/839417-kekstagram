'use strict';
// этот модуль проверяет валидацию формы при загрузке фотографии (поля хеш-тегов и комментария)
(function () {
  var MAX_LENGTH_HASHTAG = 20;
  var MAX_QUANTITY_HASHTAGS = 5;
  var MAX_LENGTH_DESCRIPTION = 140;
  // переменная, которая следит за фокусом в поле хеш-тега или комментария
  var isFocusedOnField = false;
  // поле ввода хеш-тега
  var textHashtags = document.querySelector('.text__hashtags');
  // поле ввода комментария
  var textDescription = document.querySelector('.text__description');

  var hashtags = [];

  textHashtags.addEventListener('focus', function () {
    window.isFocusedOnField = true;
  });
  textHashtags.addEventListener('blur', function () {
    window.isFocusedOnField = false;
  });
  textDescription.addEventListener('focus', function () {
    window.isFocusedOnField = true;
  });
  textDescription.addEventListener('blur', function () {
    window.isFocusedOnField = false;
  });

  var addRedBorder = function (element) {
    element.style.border = 'solid 5px red';
  };

  var removeRedBorder = function (element) {
    element.style.border = '';
  };
  // навешиваем обработчик на поле хэш-тегов
  textHashtags.addEventListener('input', function () {
    removeRedBorder(textHashtags);
    // эта запись заменяет несколько пробелов на один и разрезает массив на строки
    hashtags = textHashtags.value.trim().replace(/ +(?= )/g, '').split(' ');
    textHashtags.setCustomValidity('');
    // приводим все теги к нижнему регистру и проверяем на совпадения
    for (var i = 0; i < hashtags.length; i++) {
      for (var j = i + 1; j < hashtags.length; j++) {
        if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
          textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды (теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом)');
          addRedBorder(textHashtags);
        }
      }
      // проверяем первый символ каждого хеш-тега. если первый символ # то вернется 0
      if ((hashtags[i].indexOf('#')) !== 0 && hashtags[0].length > 0) {
        textHashtags.setCustomValidity('Каждый хеш-тег надо начинать с символа решётки #');
        addRedBorder(textHashtags);
      // проверяем длину каждого хэш-тега
      } else if ((hashtags[i].indexOf('#')) === 0 && hashtags[i].length === 1) {
        textHashtags.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
        addRedBorder(textHashtags);
      } else if (hashtags[i].length > MAX_LENGTH_HASHTAG) {
        textHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
        addRedBorder(textHashtags);
      }
    }
    if (hashtags.length > MAX_QUANTITY_HASHTAGS) {
      textHashtags.setCustomValidity('Нельзя указывать больше пяти хеш-тегов');
      addRedBorder(textHashtags);
    }
  });
  textDescription.addEventListener('input', function () {
    removeRedBorder(textDescription);
    textDescription.setCustomValidity('');
    if (textDescription.value.length > MAX_LENGTH_DESCRIPTION - 1) {
      addRedBorder(textDescription);
      textDescription.setCustomValidity('Достигнута максимальная длина комментария');
    }
  });
  window.isFocusedOnField = isFocusedOnField;
})();
