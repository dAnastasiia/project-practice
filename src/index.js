import './sass/main.scss';
// import './js/header';
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

// console.dir(refs.watchedFilms);
// console.dir(refs.queueFilms);
// console.log(refs.addToWatched, refs.addToQueue);

const spinner = {
  show() {
    refs.spinner.classList.remove('is-hidden');
  },

  hide() {
    refs.spinner.classList.add('is-hidden');
  },
};

//переменные для запросов
const baseUrl = 'https://api.themoviedb.org/3';
const popularFilms = '/trending/all/week';
const searchFilms = '/search/movie';
const apiKey = '42c4fa9c05708253e8c2f9a05f447e85';

startPage();

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

  // hideModal() {
  //   refs.header.classList.remove('banner-modal');
  //   refs.containerModal.classList.add('is-hidden');
  //   refs.containerList.classList.remove('is-hidden');
  // },
};

function onClickHome(e) {
  e.preventDefault();
  headerFunc.showHome();
  clearListMovies();

  startPage();
}

function onClickLibrary(e) {
  e.preventDefault();
  headerFunc.showLibrary();
  clearListMovies();

  spinner.show();
  // renderList(); //вставить данные - фильмы из библиотеки;
  // spinner.hide();
}
//конец: переключатель хедера библиотеки и дома

//клик по лого, хоум и лайбрари в режиме открытой карточки
// refs.containerModal.addEventListener('click', onClickModal);
refs.logoBtn.addEventListener('click', modalOnClickLogoHome);
refs.homeBtn.addEventListener('click', modalOnClickLogoHome);
refs.libraryBtn.addEventListener('click', modalOnClickLibrary);

// function onClickModal(e) {
//   e.preventDefault();
//   modalFunc.hideModal();
//   clearModal();

//   startPage();
// }

function modalOnClickLogoHome(e) {
  e.preventDefault();
  headerFunc.showHome();
  refs.containerModal.classList.add('is-hidden');
  refs.containerList.classList.remove('is-hidden');

  clearModal();

  startPage();
}

function clearModal() {
  refs.movieCard.innerHTML = '';
}

function modalOnClickLibrary(e) {
  e.preventDefault();
  headerFunc.showLibrary();
  refs.containerModal.classList.add('is-hidden');
  refs.containerList.classList.remove('is-hidden');

  clearModal();

  spinner.show();
  // renderList(); //вставить данные - фильмы из библиотеки;
  // spinner.hide();
}
//конец: клик по лого, хоум и лайбрари в режиме открытой карточки

//клик по карточке - отрисовка фильма
refs.moviesList.addEventListener('click', onFilmClick);

function onFilmClick(e) {
  e.preventDefault();
  modalFunc.showModal();
  const filmID = e.target.dataset.id;
  // spinner.show();
  clearListMovies();

  fetch(`${baseUrl}/movie/${filmID}?api_key=${apiKey}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      //показать спиннер внутри грузящейся модалки
      // spinner.hide();
      renderCard(data);
    });
}

function clearListMovies() {
  refs.moviesList.innerHTML = '';
}

function renderCard(data) {
  const markup = cardTpl(data);
  refs.movieCard.insertAdjacentHTML('beforeend', markup);
}
//конец: клик по карточке - отрисовка фильма

//отрисовка фильмов по запросу
refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const query = form.elements.query.value;
  clearListMovies();
  spinner.show();

  fetch(`${baseUrl}${searchFilms}?api_key=${apiKey}&query=${query}`)
    .then(res => {
      return res.json();
    })
    .then(({ results }) => {
      return results.map(result => result.id);
    })
    .then(array => {
      array.length = 6;
      array.forEach(arr => {
        fetch(`${baseUrl}/movie/${arr}?api_key=${apiKey}`)
          .then(res => {
            return res.json();
          })
          .then(data => {
            spinner.hide();
            renderFilmsList(data);
          });
      });
    });

  form.reset();
}
//конец: отрисовка фильмов по запросу

//отрисовка популярных фильмов по шаблону
function startPage() {
  spinner.show();

  fetch(`${baseUrl}${popularFilms}?api_key=${apiKey}`)
    .then(res => {
      return res.json();
    })
    .then(({ results }) => {
      return results.map(result => result.id);
    })
    .then(array => {
      array.length = 6;
      array.forEach(arr => {
        fetch(`${baseUrl}/movie/${arr}?api_key=${apiKey}`)
          .then(res => {
            return res.json();
          })
          .then(data => {
            spinner.hide();
            renderFilmsList(data);
          });
      });
    });
}

function renderFilmsList(data) {
  const markup = listTpl(data);
  refs.moviesList.insertAdjacentHTML('beforeend', markup);
}

function renderLibraryList(data) {
  const markup = listTpl(data);
  refs.libraryList.insertAdjacentHTML('beforeend', markup);
}
//конец: отрисовка популярных фильмов по шаблону

// function cutYear() {
//   return refs.movieCardYear.textContent.slice(0, 4);
// }

// function cutGenres() {
//   return refs.movieCardYear.textContent.slice(0, 3);
// }

//Мoжно получить массив жанров
// fetch(
//   '${baseUrl}genre/movie/list?api_key=${apiKey}',
// )
//   .then(res => {
//     return res.json();
//   })
//   .then(data => {
//     console.log(data);
//   });
//конец: получить массив жанров
