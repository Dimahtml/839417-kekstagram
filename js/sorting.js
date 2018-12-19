'use strict';
// этот модуль сортирует фотографии

(function () {
  // показываем блок с кнопками сортировки
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  // находим кнопки сортировки
  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');

  var arrayOfPhotos = window.arrayOfObjects;

  // выбор активной кнопки
  var chooseButton = function (buttonName) {
    filterPopular.classList.remove('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    buttonName.classList.add('img-filters__button--active');
  };

  // одна из фотографий
  var elem = document.querySelector('.picture');
  // количество фотографий
  var quantityPhotos = document.querySelectorAll('.picture').length;

  // убирает фотографии с главной страницы (удаляет их из разметки)
  function cleanThePage() {
    // одна из фотографий
    var elem = document.querySelector('.picture');
    // количество фотографий
    var quantityPhotos = document.querySelectorAll('.picture').length;
    for (var j = 0; j < quantityPhotos; j ++) {
      elem = document.querySelector('.picture');
      elem.remove();
    }
  };

  // Возвращает случайное целое число между min (включительно) и max (не включая max)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // показывает 10 случайных фотографий
  window.sortByNew = function (data, quantity) {
    console.log(data);
    var dataCopy = data.slice();
    console.log(data);
    var newArray = [];
    var index;
    // цикл составляет новый массив из 10 разных элементов начального массива
    for (var i = 0; i < 10; i ++) {
      index = getRandomInt (0, quantity);
      console.log(quantity + ' фоток в начальном массиве');
      console.log('выбираем фотографию под номером ' + index);
      newArray.push(dataCopy[index]);
      dataCopy.splice(index, 1); // удаляем 1 элемент под индексом = index
      quantity--;
    }
    console.log(newArray);
    window.fillThePage(newArray, 10);
  };

  // window.sortByPopular = function () {
  //   window.fillThePage(window.arrayOfObjects, window.constants.QUANTITY_PHOTOS);
  // };

  // раздаем обработчики клика кнопкам
  filterPopular.addEventListener('click', function() {
    chooseButton (filterPopular);
    cleanThePage();
    window.fillThePage(window.arrayOfObjects, window.constants.QUANTITY_PHOTOS);
  });

  filterNew.addEventListener('click', function() {
    chooseButton (filterNew);
    var quantityPhotos = document.querySelectorAll('.picture').length;
    cleanThePage();
    window.sortByNew(window.arrayOfObjects, window.constants.QUANTITY_PHOTOS);
  });

  filterDiscussed.addEventListener('click', function() {
    chooseButton(filterDiscussed);
  });

})();
