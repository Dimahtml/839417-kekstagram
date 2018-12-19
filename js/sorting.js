'use strict';
// этот модуль сортирует фотографии

(function () {
  // показываем блок с кнопками сортировки
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  // находим кнопки сортировки
  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');
  // раздаем обработчики клика кнопкам
  filterPopular.addEventListener('click', function() {
    filterPopular.classList.add('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
  });

  filterNew.addEventListener('click', function() {
    filterPopular.classList.remove('img-filters__button--active');
    filterNew.classList.add('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
  });

  filterDiscussed.addEventListener('click', function() {
    filterPopular.classList.remove('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');
  });



})();
