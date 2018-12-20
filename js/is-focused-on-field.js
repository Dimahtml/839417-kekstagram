'use strict';
// этот модуль проверяет валидацию формы при загрузке фотографии (поля хеш-тегов и комментария)
(function () {
  // переменная, которая следит за фокусом в поле хеш-тега или комментария
  var isfocusedOnField = 0;
  // поле ввода хеш-тега
  var textHashtags = document.querySelector('.text__hashtags');
  // поле ввода комментария
  var textDescription = document.querySelector('.text__description');
  var hashtags = '';
  var arrayOfHashtags = [];
  textHashtags.addEventListener('focus', function () {
    isfocusedOnField = 1;
  });
  textHashtags.addEventListener('blur', function () {
    isfocusedOnField = 0;
  });
  textDescription.addEventListener('focus', function () {
    isfocusedOnField = 1;
  });
  textDescription.addEventListener('blur', function () {
    isfocusedOnField = 0;
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
    hashtags = textHashtags.value.trim();
    // эта запись заменяет несколько пробелов на один и разрезает массив на строки
    arrayOfHashtags = hashtags.replace(/ +(?= )/g, '').split(' ');
    textHashtags.setCustomValidity('');
    // приводим все теги к нижнему регистру и проверяем на совпадения
    for (var k = 0; k < arrayOfHashtags.length; k++) {
      for (var j = k + 1; j < arrayOfHashtags.length; j++) {
        if (arrayOfHashtags[k].toLowerCase() === arrayOfHashtags[j].toLowerCase()) {
          textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды (теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом)');
          addRedBorder(textHashtags);
        }
      }
      // проверяем первый символ каждого хеш-тега. если первый символ # то вернется 0
      if ((arrayOfHashtags[k].indexOf('#')) !== 0 && arrayOfHashtags[0].length > 0) {
        textHashtags.setCustomValidity('Каждый хеш-тег надо начинать с символа решётки #');
        addRedBorder(textHashtags);
      // проверяем длину каждого хэш-тега
      } else if ((arrayOfHashtags[k].indexOf('#')) === 0 && arrayOfHashtags[k].length === 1) {
        textHashtags.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
        addRedBorder(textHashtags);
      } else if (arrayOfHashtags[k].length > 20) {
        textHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
        addRedBorder(textHashtags);
      }
    }
    if (arrayOfHashtags.length > 5) {
      textHashtags.setCustomValidity('Нельзя указывать больше пяти хеш-тегов');
      addRedBorder(textHashtags);
    }
  });
  textDescription.addEventListener('input', function () {
    removeRedBorder(textDescription);
    textDescription.setCustomValidity('');
    if (textDescription.value.length > 139) {
      addRedBorder(textDescription);
      textDescription.setCustomValidity('Достигнута максимальная длина комментария');
    }
  });
  window.isfocusedOnField = isfocusedOnField;
})();
