import {isUploadFormValid} from './validator.js';
import {isEscapeCode} from './utils.js';
import {addScalingHandlers, removeScalingHandlers} from './scaling.js';
import {setDefaultScaling} from './scaling.js';
import {changeEffect, removeEffectListHandler} from './photo-effects.js';
import {renderSuccessPopup} from './success-popup.js';
import {renderErrorPopupUpload} from './error-popup.js';
import {sendData} from './loader.js';
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

const onSuccess = (response) => {
  if (response.ok){
    closePopup();
    renderSuccessPopup();
    return;
  }
  renderErrorPopupUpload();
};

const onError = () => {renderErrorPopupUpload();};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = isUploadFormValid();
  if (isValid) {
    const formData = new FormData(evt.target);
    sendData(formData, onSuccess, onError);
  }};

uploadFileElement.addEventListener('change', onInputChange);

formElement.addEventListener('submit', onFormSubmit);
