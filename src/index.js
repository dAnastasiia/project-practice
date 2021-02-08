import './sass/main.scss';

import ApiService from './js/api';
import cardTpl from './templates/cardTpl.hbs';
import listTpl from './templates/listTpl.hbs';

const refs = {
  homeHeader: document.querySelector('.banner-home'),
  libraryHeader: document.querySelector('.banner-library'),
  moviesList: document.querySelector('.movies-list'),
  libraryList: document.querySelector('.movies-list-library'),
  containerList: document.querySelector('.container-list'),
  containerModal: document.querySelector('.container-modal'),
  movieCard: document.querySelector('.modal-card'),

  form: document.querySelector('.search-form'),
  header: document.querySelector('.banner'),
  headerContainer: document.querySelector('.banner > .container'),
  headerBtns: document.getElementById('header-buttons'),
  logoBtn: document.getElementById('logo'),
  homeBtn: document.getElementById('home'),
  libraryBtn: document.getElementById('library'),
  queryErr: document.getElementById('query-error'),

  spinner: document.querySelector('.spinner'),

  addToWatched: document.querySelector('[data-action="add-watched"]'),
  addToQueue: document.querySelector('[data-action="add-queue"]'),
  watchedFilms: document.querySelector('[data-action="show-watched"]'),
  queueFilms: document.querySelector('[data-action="show-queue"]'),

  movieCardYear: document.querySelector('.movie-card__year'),
  movieGenres: document.querySelector('.genre'),
};

const API = new ApiService();

startPage();

function startPage() {
  return API.fetch().then(data => {
    spinner.show();
    innerFetch(data);
  });
}

function innerFetch(data) {
  const windowWidth = window.innerWidth;
  const arrayFetches = cutArray(data, windowWidth);

  arrayFetches.forEach(arr => {
    fetch(arr)
      .then(res => res.json())
      .then(async data => {
        let id = await data.id;
        let genres = await data.genres;
        let original_title = await data.original_title;
        let overview = await data.overview;
        let popularity = await data.popularity;
        let poster_path = await data.poster_path;
        let release_date = await data.release_date.slice(0, 4);
        let title = await data.title;
        let vote_average = await data.vote_average;
        let vote_count = await data.vote_count;

        renderFilmsList({
          id,
          genres,
          original_title,
          overview,
          popularity,
          poster_path,
          release_date,
          title,
          vote_average,
          vote_count,
        });

        spinner.hide();
      })
      .catch(err => console.log(err));
  });
}

function cutArray(data, screenWidth) {
  let cards = [];

  if (screenWidth < 321) {
    cards = data.slice(0, 4);
  }

  if (screenWidth > 320 && screenWidth < 1024) {
    cards = data.slice(0, 8);
  }

  if (screenWidth > 1023) {
    cards = data.slice(0, 9);
  }

  return cards;
}

function renderFilmsList(data) {
  const markup = listTpl(data);
  refs.moviesList.insertAdjacentHTML('beforeend', markup);
}

const spinner = {
  show() {
    refs.spinner.classList.remove('is-hidden');
  },

  hide() {
    refs.spinner.classList.add('is-hidden');
  },
};

//переключатель хедера библиотеки и дома
refs.logoBtn.addEventListener('click', onClickHome);
refs.homeBtn.addEventListener('click', onClickHome);
refs.libraryBtn.addEventListener('click', onClickLibrary);

const headerFunc = {
  showHome() {
    refs.header.classList.remove('banner-library');
    refs.header.classList.remove('banner-modal');
    refs.header.classList.add('banner-home');

    refs.homeBtn.classList.add('active');
    refs.libraryBtn.classList.remove('active');

    refs.form.classList.remove('is-hidden');
    refs.headerBtns.classList.add('is-hidden');

    refs.headerContainer.classList.add('home-header');
    refs.headerContainer.classList.remove('library-header');

    refs.moviesList.classList.remove('is-hidden');
    refs.libraryList.classList.add('is-hidden');
    refs.containerModal.classList.add('is-hidden');
  },

  showLibrary() {
    refs.header.classList.remove('banner-home');
    refs.header.classList.remove('banner-modal');
    refs.header.classList.add('banner-library');

    refs.libraryBtn.classList.add('active');
    refs.homeBtn.classList.remove('active');

    refs.form.classList.add('is-hidden');
    refs.headerBtns.classList.remove('is-hidden');

    refs.headerContainer.classList.add('library-header');
    refs.headerContainer.classList.remove('home-header');

    refs.libraryList.classList.remove('is-hidden');
    refs.moviesList.classList.add('is-hidden');
    refs.containerModal.classList.add('is-hidden');
  },
};

const modalFunc = {
  showModal() {
    refs.header.classList.remove('is-hidden');
    refs.header.classList.remove('banner-home');
    refs.header.classList.remove('banner-library');
    refs.header.classList.add('banner-modal');

    refs.libraryBtn.classList.remove('active');
    refs.homeBtn.classList.remove('active');

    refs.form.classList.add('is-hidden');
    refs.headerBtns.classList.add('is-hidden');

    refs.headerContainer.classList.add('home-header');
    refs.headerContainer.classList.remove('library-header');

    refs.containerList.classList.add('is-hidden');
    refs.containerModal.classList.remove('is-hidden');
  },

  hideModal() {
    refs.header.classList.remove('banner-modal');
    refs.containerModal.classList.add('is-hidden');
    refs.containerList.classList.remove('is-hidden');
  },
};

function clearHome() {
  refs.moviesList.innerHTML = '';
}

function clearLibrary() {
  refs.libraryList.innerHTML = '';
}

function onClickHome(e) {
  e.preventDefault();
  headerFunc.showHome();
  modalFunc.hideModal();

  clearLibrary();
  clearModal();

  startPage();
}

function onClickLibrary(e) {
  e.preventDefault();
  headerFunc.showLibrary();
  modalFunc.hideModal();

  clearHome();
  clearModal();

  spinner.show();
  // renderList(); //вставить данные - фильмы из библиотеки;
  // spinner.hide();
}
//конец: переключатель хедера библиотеки и дома

//close modal
refs.containerModal.addEventListener('click', onClickModal);

function onClickModal(e) {
  e.preventDefault();
  modalFunc.hideModal();
  clearModal();
}

function clearModal() {
  refs.movieCard.innerHTML = '';
}
//конец: close  modal

// //клик по карточке - отрисовка фильма
// refs.moviesList.addEventListener('click', onFilmClick);

// function onFilmClick(e) {
//   e.preventDefault();
//   modalFunc.showModal();
//   const filmID = e.target.dataset.id;
//   // spinner.show();
//   clearListMovies();

//   fetch(`${baseUrl}/movie/${filmID}?api_key=${apiKey}`)
//     .then(res => {
//       return res.json();
//     })
//     .then(data => {
//       //показать спиннер внутри грузящейся модалки
//       // spinner.hide();
//       renderCard(data);
//     });
// }

// function onFilmClick(e) {
//   e.preventDefault();
//   modalFunc.showModal();
//   const filmID = e.target.dataset.id;
//   clearListMovies();

//   return API.fetch(filmID)
//     .then(res => {
//       return res.json();
//     })
//     .then(data => {
//       renderCard(data);
//     });

//   // fetch(`${baseUrl}/movie/${filmID}?api_key=${apiKey}`)
//   //   .then(res => {
//   //     return res.json();
//   //   })
//   //   .then(data => {

//   //     renderCard(data);
//   //   });
// }

function renderCard(data) {
  const markup = cardTpl(data);
  refs.movieCard.insertAdjacentHTML('beforeend', markup);
}
// //конец: клик по карточке - отрисовка фильма

// //отрисовка фильмов по запросу
// refs.form.addEventListener('submit', onSearch);

// function onSearch(e) {
//   e.preventDefault();
//   const form = e.currentTarget;
//   const query = form.elements.query.value;
//   clearListMovies();
//   spinner.show();

//   fetch(`${baseUrl}${searchFilms}?api_key=${apiKey}&query=${query}`)
//     .then(res => {
//       return res.json();
//     })
//     .then(({ results }) => {
//       return results.map(result => result.id);
//     })
//     .then(array => {
//       array.length = 6;
//       array.forEach(arr => {
//         fetch(`${baseUrl}/movie/${arr}?api_key=${apiKey}`)
//           .then(res => {
//             return res.json();
//           })
//           .then(data => {
//             spinner.hide();
//             renderFilmsList(data);
//           });
//       });
//     });

//   form.reset();
// }
// //конец: отрисовка фильмов по запросу
