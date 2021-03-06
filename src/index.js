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
  paginator: document.querySelector('.pagination'),

  watchedFilms: document.querySelector('[data-action="show-watched"]'),
  queueFilms: document.querySelector('[data-action="show-queue"]'),

  libraryMessage: document.querySelector('.library-message-container'),
  libraryMessageText: document.querySelector('.library-message'),
};

refs.watchedFilms.addEventListener('click', onWatched);
refs.queueFilms.addEventListener('click', onQueue);

function onWatched(e) {
  e.preventDefault();
  modalFunc.hideModal();
  clearModal();

  e.target.classList.add('active');

  firstLibraryPage();
}

function firstLibraryPage() {
  refs.queueFilms.classList.remove('active');
  refs.libraryMessage.classList.add('is-hidden');

  clearLibrary();

  const storage = JSON.parse(localStorage.getItem('watched')) || [];

  if (storage.length === 0) {
    spinner.hide();
    refs.libraryMessage.classList.remove('is-hidden');
    refs.paginator.classList.add('is-hidden');
    refs.libraryMessageText.textContent =
      'You haven`t had watched movies yet. Please, add something :)';
    return;
  }

  innerLibraryFetch(storage);
}

function onQueue(e) {
  e.preventDefault();
  modalFunc.hideModal();
  clearModal();

  e.target.classList.add('active');
  refs.watchedFilms.classList.remove('active');
  refs.libraryMessage.classList.add('is-hidden');

  clearLibrary();

  const storage = JSON.parse(localStorage.getItem('queue')) || [];

  if (storage.length === 0) {
    spinner.hide();
    refs.libraryMessage.classList.remove('is-hidden');
    refs.paginator.classList.add('is-hidden');
    refs.libraryMessageText.textContent =
      'You haven`t had movies in the queue yet. Please, add something :)';
    return;
  }

  innerLibraryFetch(storage);
}

function renderLibraryList(data) {
  const markup = listTpl(data);
  refs.libraryList.insertAdjacentHTML('beforeend', markup);
}

function innerLibraryFetch(data) {
  const windowWidth = window.innerWidth;
  const arrayFetches = cutArray(data, windowWidth);

  arrayFetches.forEach(arr => {
    API.fetchID(arr)
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

        renderLibraryList({
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
        refs.paginator.classList.remove('is-hidden');
      })
      .catch(err => console.log(err));
  });
}

const API = new ApiService();

startPage();

function startPage() {
  return API.fetch()
    .then(data => {
      spinner.show();
      innerListFetch(data);
    })
    .catch(err => {
      console.log(err);
    });
}

//============trial pagination================

// const container = document.querySelector('.pagination-container');
// // const paginator = document.querySelector('.pagination');
// const windowWidth = window.innerWidth;
// let liArr = [];

// refs.paginator.innerHTML = '';

// function startPage() {
//   return API.fetch()
//     .then(data => {
//       let pagesOnWindow;

//       if (windowWidth < 321) {
//         pagesOnWindow = 4;
//       }

//       if (windowWidth > 320 && windowWidth < 1024) {
//         pagesOnWindow = 8;
//       }

//       if (windowWidth > 1023) {
//         pagesOnWindow = 9;
//       }

//       //let pages = Math.ceil((API.totalPages * 20) / pagesOnWindow);

//       let pages = Math.ceil(data.length / pagesOnWindow);

//       for (let i = 1; i <= pages; i += 1) {
//         let li = document.createElement('li');
//         li.classList.add('pagination-page');
//         li.innerHTML = i;

//         liArr.push(li);

//         refs.paginator.appendChild(li);
//       }

//       let pageNum = liArr[0].innerHTML;

//       liArr[0].classList.add('active');

//       let start = (pageNum - 1) * pagesOnWindow;
//       let end = start + pagesOnWindow;
//       let newArray = data.slice(start, end);

//       spinner.show();
//       innerListFetch(newArray);

//       refs.paginator.addEventListener('click', onClick);

//       function onClick(e) {
//         e.preventDefault();
//         let pageNum = e.target.innerText;

//         liArr.forEach(el => {
//           el.classList.remove('active');
//         });

//         e.target.classList.add('active');

//         let start = (pageNum - 1) * pagesOnWindow;
//         let end = start + pagesOnWindow;
//         let newArray = data.slice(start, end);

//         clearHome();

//         innerListFetch(newArray);
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// function innerListFetch(data) {
//   // if (data.length === 0) {
//   //   spinner.hide();
//   //   refs.queryErr.classList.remove('is-hidden');
//   //   refs.paginator.classList.add('is-hidden');
//   //   return;
//   // }

//   data.forEach(arr => {
//     API.fetchID(arr)
//       .then(async data => {
//         let id = await data.id;
//         let genres = await data.genres;
//         let original_title = await data.original_title;
//         let overview = await data.overview;
//         let popularity = await data.popularity;
//         let poster_path = await data.poster_path;
//         let release_date = await data.release_date.slice(0, 4);
//         let title = await data.title;
//         let vote_average = await data.vote_average;
//         let vote_count = await data.vote_count;

//         renderFilmsList({
//           id,
//           genres,
//           original_title,
//           overview,
//           popularity,
//           poster_path,
//           release_date,
//           title,
//           vote_average,
//           vote_count,
//         });

//         spinner.hide();
//         refs.queryErr.classList.add('is-hidden');
//       })
//       .catch(err => console.log(err));
//   });
// }
//============trial pagination================

function innerListFetch(data) {
  const windowWidth = window.innerWidth;
  const arrayFetches = cutArray(data, windowWidth);

  if (arrayFetches.length === 0) {
    spinner.hide();
    refs.queryErr.classList.remove('is-hidden');
    refs.paginator.classList.add('is-hidden');
    return;
  }

  arrayFetches.forEach(arr => {
    API.fetchID(arr)
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
        refs.queryErr.classList.add('is-hidden');
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

    refs.queryErr.classList.add('is-hidden');

    refs.form.classList.remove('is-hidden');
    refs.headerBtns.classList.add('is-hidden');

    refs.headerContainer.classList.add('home-header');
    refs.headerContainer.classList.remove('library-header');

    refs.moviesList.classList.remove('is-hidden');
    refs.libraryList.classList.add('is-hidden');
    refs.containerModal.classList.add('is-hidden');

    refs.watchedFilms.classList.remove('active');
    refs.queueFilms.classList.remove('active');

    refs.libraryMessage.classList.add('is-hidden');
  },

  showLibrary() {
    refs.header.classList.remove('banner-home');
    refs.header.classList.remove('banner-modal');
    refs.header.classList.add('banner-library');

    refs.libraryBtn.classList.add('active');
    refs.homeBtn.classList.remove('active');

    refs.queryErr.classList.add('is-hidden');

    refs.form.classList.add('is-hidden');
    refs.headerBtns.classList.remove('is-hidden');

    refs.headerContainer.classList.add('library-header');
    refs.headerContainer.classList.remove('home-header');

    refs.libraryList.classList.remove('is-hidden');
    refs.moviesList.classList.add('is-hidden');
    refs.containerModal.classList.add('is-hidden');

    refs.watchedFilms.classList.remove('active');
    refs.queueFilms.classList.remove('active');

    refs.libraryMessage.classList.add('is-hidden');
  },
};

const modalFunc = {
  showModal() {
    refs.header.classList.add('banner-modal');
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

  refs.watchedFilms.classList.add('active');
  firstLibraryPage();
}
//конец: переключатель хедера библиотеки и дома

//close modal
refs.containerModal.addEventListener('click', onClickModal);

function onClickModal(e) {
  e.preventDefault();

  if (e.target.nodeName === 'BUTTON') {
    return;
  }

  modalFunc.hideModal();
  clearModal();
}

function clearModal() {
  refs.movieCard.innerHTML = '';
}
//конец: close  modal

// //клик по карточке - отрисовка фильма
refs.moviesList.addEventListener('click', onFilmClick);
refs.libraryList.addEventListener('click', onFilmClick);

function onFilmClick(e) {
  e.preventDefault();

  modalFunc.showModal();
  const filmID = e.target.dataset.id;

  modalRender(filmID);
}

function modalRender(id) {
  API.fetchID(id).then(data => {
    renderCard(data);

    const storageWatch = JSON.parse(localStorage.getItem('watched')) || [];
    const storageQueue = JSON.parse(localStorage.getItem('queue')) || [];

    const modalBtn = {
      addToWatched: document.querySelector('[data-action="add-watched"]'),
      addToQueue: document.querySelector('[data-action="add-queue"]'),
    };

    modalWatchBtnStyle(storageWatch, id, modalBtn.addToWatched);
    modalQueueBtnStyle(storageQueue, id, modalBtn.addToQueue);

    modalBtn.addToWatched.addEventListener('click', e => {
      e.preventDefault();
      const id = e.target.dataset.movieid;

      if (storageWatch.includes(id)) {
        let idx = storageWatch.indexOf(id);
        storageWatch.splice(idx, 1);

        e.target.classList.remove('active');
        e.target.textContent = 'add to watched';
      } else {
        storageWatch.push(id);

        e.target.classList.add('active');
        e.target.textContent = 'remove watched';
      }

      localStorage.setItem('watched', JSON.stringify(storageWatch));
    });

    modalBtn.addToQueue.addEventListener('click', e => {
      e.preventDefault();
      const id = e.target.dataset.movieid;

      if (storageQueue.includes(id)) {
        let idx = storageQueue.indexOf(id);
        storageQueue.splice(idx, 1);

        e.target.classList.remove('active');
        e.target.textContent = 'add to queue';
      } else {
        storageQueue.push(id);

        e.target.classList.add('active');
        e.target.textContent = 'remove queue';
      }

      localStorage.setItem('queue', JSON.stringify(storageQueue));
    });
  });
}

function renderCard(data) {
  const markup = cardTpl(data);
  refs.movieCard.insertAdjacentHTML('beforeend', markup);
}

function modalWatchBtnStyle(storage, id, btn) {
  if (storage.includes(id)) {
    btn.classList.add('active');
    btn.textContent = 'remove watched';
  } else {
    btn.classList.remove('active');
    btn.textContent = 'add to watched';
  }
}

function modalQueueBtnStyle(storage, id, btn) {
  if (storage.includes(id)) {
    btn.classList.add('active');
    btn.textContent = 'remove queue';
  } else {
    btn.classList.remove('active');
    btn.textContent = 'add to queue';
  }
}

// //конец: клик по карточке - отрисовка фильма

// //отрисовка фильмов по запросу
refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const query = form.elements.query.value;
  clearHome();
  clearLibrary();
  spinner.show();

  API.fetch(query)
    .then(data => {
      innerListFetch(data);
    })
    .catch(err => {
      console.log(err);
    });

  modalFunc.hideModal();
  clearModal();
  form.reset();
}
// //конец: отрисовка фильмов по запросу
