const DEFAULT_SCALING_VALUE = 100;
const SCALING_STEP = 25;

const scaleInputElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const controlSmallerElement = document.querySelector('.scale__control--smaller');
const controlBiggerElement = document.querySelector('.scale__control--bigger');

let currentValue = DEFAULT_SCALING_VALUE;

const onDecreaseScalingButtonClick = () => {
  if (currentValue > SCALING_STEP) {
    currentValue -= SCALING_STEP;
    scaleInputElement.value = `${currentValue}%`;
    imagePreviewElement.style.transform = `scale(${currentValue * 0.01})`;
  }
};

const onIncreaseScalingButtonClick = () => {
  if (currentValue < DEFAULT_SCALING_VALUE) {
    currentValue += SCALING_STEP;
    scaleInputElement.value = `${currentValue}%`;
    imagePreviewElement.style.transform = `scale(${currentValue * 0.01})`;
  }
};

const addScalingHandlers = () => {
  controlSmallerElement.addEventListener('click', onDecreaseScalingButtonClick);
  controlBiggerElement.addEventListener('click', onIncreaseScalingButtonClick);
};

const removeScalingHandlers = () => {
  controlSmallerElement.removeEventListener('click', onDecreaseScalingButtonClick);
  controlBiggerElement.removeEventListener('click', onIncreaseScalingButtonClick);
};

const setDefaultScalingValues = () => {
  imagePreviewElement.style.transform = '';
  scaleInputElement.value = `${DEFAULT_SCALING_VALUE}%`;
  currentValue = DEFAULT_SCALING_VALUE;
};

export {addScalingHandlers, removeScalingHandlers, setDefaultScalingValues};

