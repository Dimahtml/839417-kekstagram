'use strict';
// этот модуль создает массив случайных данных

(function () {

  // Возвращает случайное целое число между min (включительно) и max (не включая max)
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // функция генерации случайных данных, возвращающая массив данных
  var generateData = function (comments, names, quantityPhotos) {
    var arr = [];
    for (var i = 0; i < quantityPhotos; i++) {
      var obj = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: getRandomInt(15, 201),
        comments: {
          avatar: 'img/avatar-' + getRandomInt(1, (window.constants.QUANTITY_AVATARS + 1)) + '.svg',
          message: comments[getRandomInt(0, comments.length)],
          name: names[getRandomInt(0, names.length)]
        }
      };
      arr.push(obj);
    }
    return arr;
  };

  // массив с данными
  var arrayOfObjects = generateData(window.constants.COMMENTS, window.constants.NAMES, window.constants.QUANTITY_PHOTOS);
  window.arrayOfObjects = arrayOfObjects;

})();

