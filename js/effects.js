'use strict';
// этот модуль применяет эффекты к загружаемой фотографии (масштаб, фильтр, движение ползунка)
(function () {
  // шаг изменения масштаба изображения (25%);
  var STEP = 25;
  var SCALE_MINIMUM = 25;
  var SCALE_MAXIMUM = 100;
  var effectNames = [
    'effects__preview--none',
    'effects__preview--chrome',
    'effects__preview--sepia',
    'effects__preview--marvin',
    'effects__preview--phobos',
    'effects__preview--heat'
  ];

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
  // кнопки МИНУС и ПЛЮС
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  // масштаб изображения
  window.scaleOfImage = parseInt(document.querySelector('.scale__control--value').value, 10);
  // нажатие на кнопку МИНУС
  scaleControlSmaller.addEventListener('click', function () {
    if (window.scaleOfImage > SCALE_MINIMUM) {
      document.querySelector('.scale__control--value').value = (window.scaleOfImage - STEP) + '%';
      window.scaleOfImage -= STEP;
      imgUploadPreview.style.transform = 'scale(' + window.scaleOfImage / 100 + ')';
    }
  });
  // нажатие на кнопку ПЛЮС
  scaleControlBigger.addEventListener('click', function () {
    if (window.scaleOfImage < SCALE_MAXIMUM) {
      document.querySelector('.scale__control--value').value = (window.scaleOfImage + STEP) + '%';
      window.scaleOfImage += STEP;
      imgUploadPreview.style.transform = 'scale(' + window.scaleOfImage / 100 + ')';
    }
  });
  // добавляем обработчик, который скрывает слайдер (если фильтр оригинал).
  // устанавливает ползунок на 100% (при других фильтрах)
  var addClickHandlerEffect = function (image, filterName) {
    image.addEventListener('click', function () {
      imgUploadPreview.setAttribute('class', filterName);
      if (filterName === 'effects__preview--none') {
        document.querySelector('.img-upload__effect-level').classList.add('hidden');
      } else {
        document.querySelector('.img-upload__effect-level').classList.remove('hidden');
      }
      imgUploadPreview.style.filter = '';
      effectLevelPin.style.left = '100%';
      effectLevelDepth.style.width = '100%';
      filterNameCurrent = filterName;
    });
  };
  // переменная, которая = текущему выбранному эффекту (фильтру)
  var filterNameCurrent = '';
  // навешиваем обработчик на каждую из кнопок, которая переключает эффект (фильтр)
  for (var i = 0; i < effects.length; i++) {
    addClickHandlerEffect(effects[i], effectNames[i]);
  }

  var onClickPreventDefault = function (evt) {
    evt.preventDefault();
    effectLevelPin.removeEventListener('click', onClickPreventDefault);
  };

  // навешиваем обработчик на ползунок
  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordsX = evt.clientX;
    var dragged = false;
    var onMouseMove = function (moveEvt) {
      // ширина полоски-шкалы эффекта
      var effectLevelWidth = document.querySelector('.effect-level__line').offsetWidth;
      moveEvt.preventDefault();
      dragged = true;
      var shiftX = startCoordsX - moveEvt.clientX;
      startCoordsX = moveEvt.clientX;
      // рассчитываем координаты ползунка
      var coordsPin = effectLevelPin.offsetLeft - shiftX;
      // уровень эффекта (от 0 до 100)
      var percentOfEffect = Math.round((coordsPin) / effectLevelWidth * 100);
      // положение ползунка
      effectLevelPin.style.left = percentOfEffect + '%';
      // ограничиваем ползунок пределами слайдера
      if (coordsPin < 0) {
        effectLevelPin.style.left = '0';
      }
      if (coordsPin > effectLevelWidth) {
        effectLevelPin.style.left = '100%';
      }
      // это значение меняем согласно заданию
      effectLevelValue.value = percentOfEffect;
      // яркая шкала (уровень эффекта)
      effectLevelDepth.style.width = percentOfEffect + '%';
      switch (filterNameCurrent) {
        case 'effects__preview--chrome':
          imgUploadPreview.style.filter = 'grayscale(' + percentOfEffect / 100 + ')';
          break;
        case 'effects__preview--sepia':
          imgUploadPreview.style.filter = 'sepia(' + percentOfEffect / 100 + ')';
          break;
        case 'effects__preview--marvin':
          imgUploadPreview.style.filter = 'invert(' + percentOfEffect + '%)';
          break;
        case 'effects__preview--phobos':
          imgUploadPreview.style.filter = 'blur(' + percentOfEffect / 100 * 3 + 'px)';
          break;
        case 'effects__preview--heat':
          imgUploadPreview.style.filter = 'brightness(' + percentOfEffect / 100 * 3 + ')';
          break;
        default: imgUploadPreview.style.filter = '';
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        effectLevelPin.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
