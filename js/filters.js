import {getRandomPositiveInteger} from './utils.js';

const RANDOM_PHOTO_COUNT = 10;
const FILTER_ACTIVE_CLASS = 'img-filters__button--active';

const FilterId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};


const filtersElement = document.querySelector('.img-filters');
const formElement = filtersElement.querySelector('.img-filters__form');

const sortPhotosByCommentsCount = (photos) => {
  const tempPhotos = photos.slice();
  tempPhotos.sort((elementA, elementB) => elementB.comments.length - elementA.comments.length );
  return tempPhotos;
};

const getRandomPhotos = (photos, count) => {
  const tempPhotos = photos.slice();
  const randomPhotos = [];

  while (randomPhotos.length < count) {
    const [photo] = tempPhotos.splice(getRandomPositiveInteger(0,tempPhotos.length - 1), 1);
    randomPhotos.push(photo);
  }
  return randomPhotos;
};

const showFilters = () => {
  filtersElement.classList.remove('img-filters--inactive');
};

const filterPhotos = (photos) => {
  // определим, какой фильтр сейчас активен
  const activeFilterId = document.querySelector(`.${FILTER_ACTIVE_CLASS}`).id;

  // если случайные - ретерним массив из 10 случайных фото
  if(activeFilterId === FilterId.RANDOM) {
    return getRandomPhotos(photos, RANDOM_PHOTO_COUNT);
  }

  // если обсуждаемые - сортируем массив по убыванию числа коммментов
  if(activeFilterId === FilterId.DISCUSSED) {
    return sortPhotosByCommentsCount(photos);
  }

  return photos;
};

const renderFilteredPhotos = (callback) => {
  formElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains(FILTER_ACTIVE_CLASS)) {
      const activeButtonElement = formElement.querySelector(`.${FILTER_ACTIVE_CLASS}`);
      activeButtonElement.classList.remove(FILTER_ACTIVE_CLASS);
      evt.target.classList.add(FILTER_ACTIVE_CLASS);
    }

    callback();
  });
};


export {filterPhotos, showFilters, renderFilteredPhotos};
