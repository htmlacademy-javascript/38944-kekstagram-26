import {shuffle, sortArray} from './utils.js';

const NUMBER_RANDOM_PHOTO = 10;

const filtersElement = document.querySelector('.img-filters');
const formElement = filtersElement.querySelector('.img-filters__form');
const filterDefaultElement = formElement.querySelector('#filter-default');
const filterRandomElement = formElement.querySelector('#filter-random');
const filterDiscussedElement = formElement.querySelector('#filter-discussed');


const showFilters = () => {
  filtersElement.classList.remove('img-filters--inactive');
};

const filterPhotos = (photos) => {
  // 1) определим, какой фильтр сейчас активен
  const activeFilterId = document.querySelector('.img-filters__button--active').id;

  // 2) если дефолтный - возвращаем photos
  if (activeFilterId === 'filter-default') {
    return photos;
  }

  // 3) если случайные - ретерним массив из 10 случайных фото
  if(activeFilterId === 'filter-random') {
    return shuffle(photos).slice(0, NUMBER_RANDOM_PHOTO);
  }

  // 4) если обсуждаемые - сортируем КОПИЮ массива по убыванию числа коммментов
  if(activeFilterId === 'filter-discussed') {
    return  sortArray(photos.slice());
  }
};

const renderFilteredPhotos = (render) => {
  formElement.addEventListener('click', (evt) => {
    if(evt.target === filterDefaultElement ) {
      filterDefaultElement.classList.add('img-filters__button--active');
      filterRandomElement.classList.remove('img-filters__button--active');
      filterDiscussedElement.classList.remove('img-filters__button--active');
    } else if (evt.target === filterRandomElement) {
      filterRandomElement.classList.add('img-filters__button--active');
      filterDefaultElement.classList.remove('img-filters__button--active');
      filterDiscussedElement.classList.remove('img-filters__button--active');
    } else {
      filterDiscussedElement.classList.add('img-filters__button--active');
      filterRandomElement.classList.remove('img-filters__button--active');
      filterDefaultElement.classList.remove('img-filters__button--active');
    }

    render();
  });
};


export {filterPhotos, showFilters, renderFilteredPhotos};
