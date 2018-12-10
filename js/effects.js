'use strict';

var EFFECTS = ['effects__preview--none', 'effects__preview--chrome',
  'effects__preview--sepia', 'effects__preview--marvin',
  'effects__preview--phobos', 'effects__preview--heat'
];

var FILTER_NAMES = ['', 'grayscale(1)', 'sepia(1)', 'invert(100%)', 'blur(3px)', 'brightness(3)'];

// КОЛЛЕКЦИЯ кнопок смены эффектов (фильтров)
var effects = document.querySelectorAll('.effects__radio');

// фото "предварительный просмотр изображения"
var imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');

// ползунок слайдера регулировки эффекта фотографии
var effectLevelPin = document.querySelector('.effect-level__pin');

// яркая шкала (уровень эффекта)
var effectLevelDepth = document.querySelector('.effect-level__depth');

// переменная-инпут.  Уровень эффекта записывается в поле .effect-level__value согласно заданию
var effectLevelValue = document.querySelector('.effect-level__value');

// добавляем обработчик, который прописывает класс "cls" предварительной фотографии imageUploadPreview,
// скрывает слайдер (если фильтр оригинал). устанавливает ползунок на 100% (при других фильтрах)
var addClickHandlerEffect = function (image, cls, filterName) {

  image.addEventListener('click', function () {
    imgUploadPreview.setAttribute('class', cls);
    if (cls === 'effects__preview--none') {
      document.querySelector('.img-upload__effect-level').classList.add('hidden');
    } else {
      document.querySelector('.img-upload__effect-level').classList.remove('hidden');
    }
    imgUploadPreview.style.filter = filterName;
    effectLevelPin.style.left = '453px';
    effectLevelDepth.style.width = '100%';
    filterNameCurrent = filterName;
  });

};

// переменная, которая = текущему выбранному эффекту (фильтру)
var filterNameCurrent = '';

// навешиваем обработчик на каждую из кнопок, которая переключает эффект (фильтр)
for (var q = 0; q < effects.length; q++) {
  addClickHandlerEffect(effects[q], EFFECTS[q], FILTER_NAMES[q]);
}

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
    // рассчитываем координаты ползунка
    var coordsPin = effectLevelPin.offsetLeft - shiftX;
    // положение ползунка
    effectLevelPin.style.left = coordsPin + 'px';
    // ограничиваем ползунок пределами слайдера
    if (coordsPin < 0) {
      effectLevelPin.style.left = '0px';
    }
    if (coordsPin > 453) {
      effectLevelPin.style.left = '453px';
    }
    // уровень эффекта (от 0 до 100)
    var percentOfEffect = Math.round((coordsPin) / 453 * 100);
    // это значение меняем согласно заданию
    effectLevelValue.value = percentOfEffect;
    // яркая шкала (уровень эффекта)
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
