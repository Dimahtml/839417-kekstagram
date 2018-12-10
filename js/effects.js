'use strict';

// КОЛЛЕКЦИЯ кнопок смены эффектов (фильтров)
var effects = document.querySelectorAll('.effects__radio');

// фото "предварительный просмотр изображения"
var imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');

// полоска слайдера. сюда, в свойство value, записываем уровень эффекта
// var effectLevel = document.querySelector('.effect-level__value');

// ползунок слайдера регулировки эффекта фотографии
var effectLevelPin = document.querySelector('.effect-level__pin');

// добавляем обработчик, который прописывает класс "cls" элементу imageUploadPreview
// и устанавливает ползунок на 100% (пока еще не устанавливает)
var addClickHandlerEffect = function (image, cls, filterName) {
  image.addEventListener('click', function () {
    imgUploadPreview.setAttribute('class', cls);
    imgUploadPreview.style.filter = filterName;
    filterNameCurrent = filterName;
  });
};

// переменная, которая = эффекту в процентах и зависит от положения ползунка
var pinPosition = window.getComputedStyle(effectLevelPin, null).getPropertyValue('left');
pinPosition = parseInt(pinPosition, 10);
// переменная, которая = текущему выбранному эффекту (фильтру)
var filterNameCurrent = '';

// навешиваем обработчик на каждую из кнопок, которая переключает эффект (фильтр)
for (var q = 0; q < effects.length; q++) {
  addClickHandlerEffect(effects[q], EFFECTS[q], FILTER_NAMES[q]);
}

// яркая шкала (уровень эффекта)
var effectLevelDepth = document.querySelector('.effect-level__depth');

// навешиваем обработчик на ползунок
effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoordsX = evt.clientX;
  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;
    var shiftX = startCoordsX - moveEvt.clientX;
    startCoordsX = moveEvt.clientX;
    var coordsPin = effectLevelPin.offsetLeft - shiftX;
    effectLevelPin.style.left = coordsPin + 'px';
    // effectLevelDepth.style.width = (coordsPin) + '%';
    // console.log(coordsPin);
    if (coordsPin < 0) {
      effectLevelPin.style.left = '0px';
    };
    if (coordsPin > 453) {
      effectLevelPin.style.left = '453px';
    };
    var percentOfEffect = Math.round((coordsPin) / 453 * 100);
    console.log(percentOfEffect);
    var computedStyle = getComputedStyle(effectLevelDepth);
    effectLevelDepth.style.width = percentOfEffect + '%';

            if (filterNameCurrent === '') {
                imgUploadPreview.style.filter = '';
              } else if (filterNameCurrent === 'grayscale(1)') {
                imgUploadPreview.style.filter = 'grayscale(' + percentOfEffect / 100 + ')';
              } else if (filterNameCurrent === 'sepia(1)') {
                imgUploadPreview.style.filter = 'sepia(' + percentOfEffect / 100 + ')';
              } else if (filterNameCurrent === 'invert(100%)') {
                imgUploadPreview.style.filter = 'invert(' + percentOfEffect + '%)';
              } else if (filterNameCurrent === 'blur(3px)') {
                imgUploadPreview.style.filter = 'blur(' + percentOfEffect / 100 * 3 + 'px)';
              } else if (filterNameCurrent === 'brightness(3)') {
                imgUploadPreview.style.filter = 'brightness(' + percentOfEffect / 100 * 3 + ')';
              }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    if (dragged) {
      var onClickPreventDefault = function (evnt) {
        evnt.preventDefault();
        effectLevelPin.removeEventListener('click', onClickPreventDefault);
      };
      effectLevelPin.addEventListener('click', onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});
