import {getRandomPositiveInteger} from './utils.js';

const RANDOM_PHOTO_COUNT = 10;

const FilterId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersElement = document.querySelector('.img-filters');
const formElement = filtersElement.querySelector('.img-filters__form');

const sortByCommentsCount = (photos) => {
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
  // 1) определим, какой фильтр сейчас активен
  const activeFilterId = document.querySelector('.img-filters__button--active').id;

  // 2) если дефолтный - возвращаем photos
  if (activeFilterId === FilterId.DEFAULT) {
    return photos;
  }

  // 3) если случайные - ретерним массив из 10 случайных фото
  if(activeFilterId === FilterId.RANDOM) {
    return getRandomPhotos(photos, RANDOM_PHOTO_COUNT);
  }

  // 4) если обсуждаемые - сортируем КОПИЮ массива по убыванию числа коммментов
  if(activeFilterId === FilterId.DISCUSSED) {
    return sortByCommentsCount(photos);
  }
};

const renderFilteredPhotos = (callback) => {
  formElement.addEventListener('click', (evt) => {

    if (!evt.target.classList.contains('.img-filters__button--active')) {
      const activeButtonElement = formElement.querySelector('.img-filters__button--active');
      activeButtonElement.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    }

    callback();
  });
};


export {filterPhotos, showFilters, renderFilteredPhotos};
