import {isUploadFormValid} from './validator.js';
import {isEscapeCode} from './utils.js';
import {addScalingHandlers, removeScalingHandlers} from './scaling.js';

const uploadPopupElement = document.querySelector('.img-upload__overlay') ;
const uploadFileElement = document.querySelector('#upload-file');
const uploadCancelElement = uploadPopupElement.querySelector('#upload-cancel');

const formElement = document.querySelector('#upload-select-image');

const onCancelButtonClick = () => {
  closePopup();
};

const onEscapeButtonDown = (evt) => {
  if (isEscapeCode(evt)) {
    closePopup();
  }
};

const onInputChange = () => {
  uploadPopupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscapeButtonDown);
  uploadCancelElement.addEventListener('click', onCancelButtonClick);

  addScalingHandlers();
};

function closePopup () {
  uploadPopupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  formElement.reset();

  uploadCancelElement.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onEscapeButtonDown);

  removeScalingHandlers();
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = isUploadFormValid();
  if (isValid) {
    // eslint-disable-next-line no-console
    console.log('Можно отправлять');
  } else {
    // eslint-disable-next-line no-console
    console.log('Форма невалидна');
  }
};

uploadFileElement.addEventListener('change', onInputChange);

formElement.addEventListener('submit', onFormSubmit);


