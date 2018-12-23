'use strict';
// этот модуль сортирует фотографии
(function () {
  var QUANTITY_PHOTOS = 25;
  var TIMEOUT = 500;
  // показываем блок с кнопками сортировки
  var showSortingBlock = function () {
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };
  // находим кнопки сортировки
  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');
  // выбор активной кнопки
  var chooseButton = function (buttonName) {
    filterPopular.classList.remove('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    buttonName.classList.add('img-filters__button--active');
  };
  // убирает фотографии с главной страницы (удаляет их из разметки)
  function cleanThePage() {
    // одна из фотографий
    var elem = document.querySelector('.picture');
    // количество фотографий
    var quantityPhotos = document.querySelectorAll('.picture').length;
    for (var j = 0; j < quantityPhotos; j++) {
      elem = document.querySelector('.picture');
      elem.remove();
    }
  }
  // Возвращает случайное целое число между min (включительно) и max (не включая max)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  window.sortByPopular = function (data, quantity) {
    window.miniPictures.fillThePage(data, quantity);
  };
  // показывает 10 случайных фотографий
  window.sortByNew = function (data, quantity) {
    var dataCopy = data.slice();
    var newArray = [];
    var index;
    // цикл составляет новый массив из 10 разных элементов начального массива
    for (var i = 0; i < 10; i++) {
      index = getRandomInt(0, quantity);
      newArray.push(dataCopy[index]);
      dataCopy.splice(index, 1); // удаляем 1 элемент под индексом = index
      quantity--;
    }
    window.miniPictures.fillThePage(newArray, 10);
  };
  window.sortByDiscussed = function (data) {
    var dataCopy2 = data.slice();
    dataCopy2.sort(function (a, b) {
      if (a.comments.length < b.comments.length) {
        return 1;
      } else
      if (a.comments.length > b.comments.length) {
        return -1;
      } else
      if (a.likes < b.likes) {
        return 1;
      }
      if (a.likes > b.likes) {
        return -1;
      }
      return 0;
    });
    window.miniPictures.fillThePage(dataCopy2, QUANTITY_PHOTOS);
  };
  var lastTimeout;
  // раздаем обработчики клика кнопкам
  filterPopular.addEventListener('click', function () {
    chooseButton(filterPopular);
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cleanThePage();
      window.sortByPopular(window.miniPictures.arrayOfObjects, QUANTITY_PHOTOS);
      window.miniPictures.addHandlerToAllPictures();
    }, TIMEOUT);
  });
  filterNew.addEventListener('click', function () {
    chooseButton(filterNew);
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cleanThePage();
      window.sortByNew(window.miniPictures.arrayOfObjects, QUANTITY_PHOTOS);
      window.miniPictures.addHandlerToAllPictures();
    }, TIMEOUT);
  });
  filterDiscussed.addEventListener('click', function () {
    chooseButton(filterDiscussed);
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cleanThePage();
      window.sortByDiscussed(window.miniPictures.arrayOfObjects);
      window.miniPictures.addHandlerToAllPictures();
    }, TIMEOUT);
  });
  window.showSortingBlock = showSortingBlock;
})();
