import './sass/main.scss';
import './js/header';
import cardTpl from './templates/cardTpl.hbs';
import listTpl from './templates/listTpl.hbs';

const refs = {
  homeHeader: document.querySelector('.banner-home'),
  libraryHeader: document.querySelector('.banner-library'),
  moviesList: document.querySelector('.movies-list'),

  form: document.querySelector('.search-form'),

  logoBtn: document.getElementById('logo'),
  homeBtn: document.getElementById('home'),
  libraryBtn: document.getElementById('library'),

  containerList: document.querySelector('.container-list'),
  containerModal: document.querySelector('.container-modal'),

  movieCard: document.querySelector('.modal'),
  form: document.querySelector('.search-form'),
};

const baseUrl = 'https://api.themoviedb.org/3';
const popularFilms = '/trending/all/week';
const searchFilms = '/search/movie';
const apiKey = '42c4fa9c05708253e8c2f9a05f447e85';

refs.moviesList.addEventListener('click', onFilmClick);

refs.logoBtn.addEventListener('click', modalOnClickLogoHome);
refs.homeBtn.addEventListener('click', modalOnClickLogoHome);
refs.libraryBtn.addEventListener('click', modalOnClickLibrary);

console.log(refs.containerModal);
console.log(refs.containerList);

function modalOnClickLogoHome(e) {
  e.preventDefault();
  headerFunc.showHome();
  refs.containerModal.classList.add('is-hidden');

  refs.containerList.classList.remove('is-hidden');

  console.dir(e.target);

  //   fetch(`${baseUrl}${popularFilms}?api_key=${apiKey}`)
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(({ results }) => {
  //       return results.map(result => result.id);
  //     })
  //     .then(array => {
  //       // array.length = 6;
  //       array.forEach(arr => {
  //         fetch(`${baseUrl}/movie/${arr}?api_key=${apiKey}`)
  //           .then(res => {
  //             return res.json();
  //           })
  //           .then(data => {
  //             renderList(data);
  //           });
  //       });
  //     });
}

function modalOnClickLibrary(e) {
  e.preventDefault();
  headerFunc.showLibrary();
}

function onFilmClick(e) {
  e.preventDefault();
  const filmID = e.target.dataset.id;
  //   console.log(filmID);

  refs.containerList.classList.add('is-hidden');
  refs.form.classList.add('is-hidden');
  refs.containerModal.classList.remove('is-hidden');

  refs.homeBtn.classList.remove('active');
  refs.libraryBtn.classList.remove('active');

  fetch(`${baseUrl}/movie/${filmID}?api_key=${apiKey}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      renderCard(data);
    });
}

// !!!!Отрисовка фильмов по запросу!!!!

// refs.form.addEventListener('submit', onSearch);

// function onSearch(e) {
//   e.preventDefault();
//   const form = e.currentTarget;
//   const query = form.elements.query.value;

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
//             renderList(data);
//           });
//       });
//     });

//   form.reset();
// }

//!!!!Отрисовка модалки по шаблону!!!!

// fetch(`${baseUrl}/movie/602269?api_key=${apiKey}`)
//   .then(res => {
//     return res.json();
//   })
//   .then(data => {
//     console.log(data);
//     renderCard(data);
//   });

function renderCard(data) {
  const markup = cardTpl(data);
  refs.movieCard.insertAdjacentHTML('beforeend', markup);
}

//!!!!Отрисовка популярных фильмов по шаблону!!!!

fetch(`${baseUrl}${popularFilms}?api_key=${apiKey}`)
  .then(res => {
    return res.json();
  })
  .then(({ results }) => {
    return results.map(result => result.id);
  })
  .then(array => {
    // array.length = 6;
    array.forEach(arr => {
      fetch(`${baseUrl}/movie/${arr}?api_key=${apiKey}`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          renderList(data);
        });
    });
  });

function renderList(data) {
  const markup = listTpl(data);
  refs.moviesList.insertAdjacentHTML('beforeend', markup);
}

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
