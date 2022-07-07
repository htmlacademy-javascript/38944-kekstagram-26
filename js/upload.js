import {isUploadFormValid} from './validator.js';
import {isEscapeCode} from './utils.js';
import {addScalingHandlers, removeScalingHandlers} from './scaling.js';
import {setDefaultScalingValues} from './scaling.js';
import {changeEffect, removeEffectListHandler, addffectListHandler} from './photo-effects.js';
import {renderSuccessPopup} from './success-popup.js';
import {renderUploadErrorPopup} from './error-popup.js';
import {sendData} from './api.js';
import './photo-effects.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadPopupElement = document.querySelector('.img-upload__overlay') ;
const uploadFileElement = document.querySelector('#upload-file');
const uploadCancelElement = uploadPopupElement.querySelector('#upload-cancel');
const formElement = document.querySelector('#upload-select-image');
const hashtagsInputElement = document.querySelector('[name="hashtags"]');
const commentTextareaElement = document.querySelector('[name="description"]');
const buttonUploadElement = document.querySelector('.img-upload__submit');
const previewElement = document.querySelector('.img-upload__preview img');

const resetForm = () => {
  formElement.reset();
  setDefaultScalingValues();
  changeEffect('none');
  removeEffectListHandler();
};

const uploadPreview = () => {
  {
    const file = uploadFileElement.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if(matches) {
      previewElement.src = URL.createObjectURL(file);
    }
  }
};

const onCancelButtonClick = () => {
  closePopup();
};

const onEscapeButtonDown = (evt) => {
  const isInputActive = document.activeElement === hashtagsInputElement || document.activeElement === commentTextareaElement;

  if (isEscapeCode(evt) && !isInputActive) {
    resetForm();
    closePopup();
  }
};

const onInputChange = () => {
  uploadPopupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  setDefaultScalingValues();

  document.addEventListener('keydown', onEscapeButtonDown);
  uploadCancelElement.addEventListener('click', onCancelButtonClick);

  addScalingHandlers();
  addffectListHandler();

  uploadPreview();
};

function closePopup () {
  uploadPopupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  resetForm();

  uploadCancelElement.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onEscapeButtonDown);

  removeScalingHandlers();
}

const setUploadButtonDisabled = (value) => {
  buttonUploadElement.disabled = value;
};

const onSuccess = (response) => {
  setUploadButtonDisabled(false);
  if (response.ok){
    closePopup();
    renderSuccessPopup();
    return;
  }
  renderUploadErrorPopup();
};

const onError = () => {
  setUploadButtonDisabled(false);
  renderUploadErrorPopup();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = isUploadFormValid();
  if (isValid) {
    setUploadButtonDisabled(true);
    const formData = new FormData(evt.target);
    sendData(formData, onSuccess, onError);
  }

};

uploadFileElement.addEventListener('change', onInputChange);

formElement.addEventListener('submit', onFormSubmit);
