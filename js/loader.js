const loadPhotos = (onSuccess, onError) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => onSuccess(photos))
    .catch((err) => onError(err));
};

export {loadPhotos};
