const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects');
const effectFieldsetElement = document.querySelector('.effect-level');
const effectValueElement = document.querySelector('.effect-level__value');

const effectOptions = {
  'chrome': {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  'sepia': {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  'marvin': {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  'phobos': {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  'heat': {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  },
};

const defaultSliderOptions = {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
  level: 'lower',
  format: {
    to: (value) => value,
    from: (value) => parseFloat(value),
  },
};

const createSlider = () => {
  noUiSlider.create(effectFieldsetElement, defaultSliderOptions);
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

  const { min, max, step, unit, filter } = effectOptions[effectValue];

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
    imagePreviewElement.style.filter =  `${filter}(${effectValueElement.value}${unit})`;
  });
};

const onEffectInputChange = (evt) => {
  changeEffect(evt.target.value);
};

const addEffectHandler = () => {
  effectsListElement.addEventListener('change', onEffectInputChange);
};

const removeEffectHandler = () => {
  effectsListElement.removeEventListener('change', onEffectInputChange);
};

const setDefaultEffect = () => {
  changeEffect('none');
};

export {setDefaultEffect, removeEffectHandler, addEffectHandler};
