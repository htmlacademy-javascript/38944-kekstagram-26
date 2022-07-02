import {isUploadFormValid} from './validator.js';
import {isEscapeCode} from './utils.js';
import {addScalingHandlers, removeScalingHandlers} from './scaling.js';
import {setDefaultScaling} from './scaling.js';
import {changeEffect, removeEffectListHandler} from './photo-effects.js';
import {renderSuccessPopup} from './success-popup.js';
import './photo-effects.js';

const uploadPopupElement = document.querySelector('.img-upload__overlay') ;
const uploadFileElement = document.querySelector('#upload-file');
const uploadCancelElement = uploadPopupElement.querySelector('#upload-cancel');
const formElement = document.querySelector('#upload-select-image');
const hashtagsInputElement = document.querySelector('[name="hashtags"]');
const commentTextareaElement = document.querySelector('[name="description"]');

const resetForm = () => {
  formElement.reset();
  setDefaultScaling();
  changeEffect('none');
  removeEffectListHandler();
};

const onCancelButtonClick = () => {
  closePopup();
};

const onEscapeButtonDown = (evt) => {
  if (isEscapeCode(evt) && document.activeElement !== hashtagsInputElement && document.activeElement !== commentTextareaElement) {
    resetForm();
    closePopup();
  }
};

const onInputChange = () => {
  uploadPopupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  setDefaultScaling();

  document.addEventListener('keydown', onEscapeButtonDown);
  uploadCancelElement.addEventListener('click', onCancelButtonClick);

  addScalingHandlers();
};

function closePopup () {
  uploadPopupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  resetForm();

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
    const formData = new FormData(evt.target);

    // TODO зеленая + красная плашка, добавить catch, вынести в loader.js (sendData(data, onSuccess, onError))
    fetch(
      'https://26.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      })
      .then(closePopup)
      .then(renderSuccessPopup);

  } else {
    // eslint-disable-next-line no-console
    console.log('Форма невалидна');
  }
};
// };

uploadFileElement.addEventListener('change', onInputChange);

formElement.addEventListener('submit', onFormSubmit);
