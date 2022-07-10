import {isUploadFormValid, resetValidation} from './validation.js';
import {isEscapeCode} from './utils.js';
import {addScalingHandlers, removeScalingHandlers} from './scaling.js';
import {setDefaultScalingValues} from './scaling.js';
import {setDefaultEffect, removeEffectHandler, addEffectHandler} from './photo-effects.js';
import {renderSuccessPopup} from './success-popup.js';
import {renderUploadErrorPopup} from './error-popup.js';
import {sendData} from './api.js';
import {HIDDEN_CLASS, MODAL_OPEN_CLASS} from './constants.js';

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
  setDefaultEffect();
  resetValidation();
};

const setPhotoPreview = () => {
  {
    const file = uploadFileElement.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

    if(matches) {
      previewElement.src = URL.createObjectURL(file);
    }
  }
};

const onCancelButtonClick = () => {
  closePopup();
};

const onEscapeButtonPress = (evt) => {
  const isInputActive = document.activeElement === hashtagsInputElement || document.activeElement === commentTextareaElement;

  if (isEscapeCode(evt) && !isInputActive) {
    closePopup();
  }
};

const onInputChange = () => {
  uploadPopupElement.classList.remove(HIDDEN_CLASS);
  document.body.classList.add(MODAL_OPEN_CLASS);

  setDefaultScalingValues();
  addScalingHandlers();
  addEffectHandler();

  document.addEventListener('keydown', onEscapeButtonPress);
  uploadCancelElement.addEventListener('click', onCancelButtonClick);

  setPhotoPreview();
};

function closePopup () {
  uploadPopupElement.classList.add(HIDDEN_CLASS);
  document.body.classList.remove(MODAL_OPEN_CLASS);

  resetForm();

  uploadCancelElement.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onEscapeButtonPress);

  removeEffectHandler();
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
