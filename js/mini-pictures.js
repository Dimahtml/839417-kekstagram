'use strict';
// этот модуль загружает на главную страницу коллекцию мини-фотографий

(function () {

  // шаблон, который будем копировать
  var template = document.querySelector('#picture').content.querySelector('a');
  // сюда вставляем элементы
  var photoContainer = document.querySelector('.pictures');

  // функция создания DOM-элемента на основе JS-объекта
  var createPhoto = function (someArrayOfObjects) {
    var photo = template.cloneNode(true);
    photo.querySelector('img').src = someArrayOfObjects.url;
    photo.querySelector('.picture__likes').textContent = someArrayOfObjects.likes;
    photo.querySelector('.picture__comments').textContent = 1;
    return photo;
  };

  // функция заполнения блока DOM-элементами на основе массива JS-объектов
  var fillThePage = function (someArrayOfObjects, quantityPhotos) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < quantityPhotos; j++) {
      fragment.appendChild(createPhoto(someArrayOfObjects[j]));
    }
    photoContainer.appendChild(fragment);
  };

  fillThePage(window.arrayOfObjects, window.constants.QUANTITY_PHOTOS);

})();
