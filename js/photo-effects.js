const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects');
const effectFieldsetElement = document.querySelector('.effect-level');
const effectValueElement = document.querySelector('.effect-level__value');

const FILTER_NAME = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness'
};

const RANGE_OPTIONS = {
  'grayscale': {
    min: 0,
    max: 1,
    step: 0.1
  },
  'sepia': {
    min: 0,
    max: 1,
    step: 0.1
  },
  'invert': {
    min: 0,
    max: 100,
    step: 1
  },
  'blur': {
    min: 0,
    max: 3,
    step: 0.1
  },
  'brightness': {
    min: 1,
    max: 3,
    step: 0.1
  },
};

const UNIT = {
  'invert': '%',
  'blur': 'px',
};

const createSlider = () => {
  noUiSlider.create(effectFieldsetElement, {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    level: 'lower',
  });
};

const changeEffect = (effectValue) => {
  if(effectValue === 'none') {
    // удаляем слайдер и сбрасываем стили, если выбрано значение без эффектов
    if (effectFieldsetElement.noUiSlider) {
      effectFieldsetElement.noUiSlider.destroy();
    }

    imagePreviewElement.style = '';
    imagePreviewElement.className = '';
    return;
  }

  // если слайдер не инициализирован - создаем
  if (!effectFieldsetElement.noUiSlider) {
    createSlider();
  }

  const effect = FILTER_NAME[effectValue];
  const { min, max, step } = RANGE_OPTIONS[effect];
  const unit = UNIT[effect] || '';

  imagePreviewElement.className = '';
  imagePreviewElement.classList.add(`effects__preview--${effectValue}`);

  effectFieldsetElement.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    start: max,
    step,
  });

  effectFieldsetElement.noUiSlider.on('update', () => {
    effectValueElement.value = effectFieldsetElement.noUiSlider.get();
    imagePreviewElement.style.filter =  `${effect}(${effectValueElement.value}${unit})`;
  });
};

const onEffectInputChange = (evt) => {
  changeEffect(evt.target.value);
};

const addEffectsListHandler = () => {
  effectsListElement.addEventListener('change', onEffectInputChange);
};

const removeEffectsListHandler = () => {
  effectsListElement.removeEventListener('change', onEffectInputChange);
};

export {changeEffect, removeEffectsListHandler, addEffectsListHandler};
