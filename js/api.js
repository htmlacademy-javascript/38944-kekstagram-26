const API_URL = 'https://26.javascript.pages.academy/kekstagram';

const loadPhotos = (onSuccess, onError) => {
  fetch(`${API_URL}/data`)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(onError);
};

const sendData = (formData, onSuccess, onError) => {
  fetch(API_URL, {
    method: 'POST',
    body: formData,
  })
    .then(onSuccess)
    .catch(onError);
};

export {loadPhotos, sendData};
