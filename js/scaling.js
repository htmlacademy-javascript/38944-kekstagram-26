const DEFAULT_SCALING_VALUE = 100;

const scaleInputElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const controlSmallerElement = document.querySelector('.scale__control--smaller');
const controlBiggerElement = document.querySelector('.scale__control--bigger');

let currentValue = DEFAULT_SCALING_VALUE;

const onDecreaseScalingButtonClick = () => {
  if (currentValue > 25) {
    currentValue -= 25;
    scaleInputElement.value = `${currentValue}%`;
    imagePreviewElement.style.transform = `scale(${currentValue * 0.01})`;
  }
};

const onIncreaseScalingButtonClick = () => {
  if (currentValue < 100) {
    currentValue += 25;
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
};

export {addScalingHandlers, removeScalingHandlers, setDefaultScalingValues};

