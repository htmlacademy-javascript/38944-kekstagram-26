const loadPhotos = (onSuccess, onError) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => onSuccess(photos))
    .catch((err) => onError(err));
};

const sendData = (formData, onSuccess, onError) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    })
    .then(onSuccess)
    .catch(onError);
};

export {loadPhotos, sendData};
