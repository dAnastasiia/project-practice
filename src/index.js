import './sass/main.scss';
import './js/header';
import cardTpl from './templates/cardTpl.hbs';
import listTpl from './templates/listTpl.hbs';

const refs = {
  homeHeader: document.querySelector('.banner-home'),
  libraryHeader: document.querySelector('.banner-library'),
  moviesList: document.querySelector('.movies-list'),
  movieCard: document.querySelector('.modal'),
  form: document.querySelector('.search-form'),
};

// refs.moviesList.addEventListener('click', onFilmClick);

// function onFilmClick(e) {
//   e.preventDefault();
//   console.log(e.target);
// }

//!!!!Отрисовка фильмов по запросу!!!!

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
// }

const baseUrl = 'https://api.themoviedb.org/3';
const popularFilms = '/trending/all/week';
const searchFilms = '/search/movie';
const apiKey = '42c4fa9c05708253e8c2f9a05f447e85';

//!!!!Отрисовка модалки по шаблону!!!!

// fetch(`${baseUrl}/movie/602269?api_key=${apiKey}`)
//   .then(res => {
//     return res.json();
//   })
//   .then(data => {
//     console.log(data);
//     renderCard(data);
//   });

// function renderCard(data) {
//   const markup = cardTpl(data);
//   refs.movieCard.insertAdjacentHTML('beforeend', markup);
// }

//!!!!Отрисовка списка по шаблону!!!!

// fetch(`${baseUrl}${popularFilms}?api_key=${apiKey}`)
//   .then(res => {
//     return res.json();
//   })
//   .then(({ results }) => {
//     return results.map(result => result.id);
//   })
//   .then(array => {
//     array.length = 6;
//     array.forEach(arr => {
//       fetch(`${baseUrl}/movie/${arr}?api_key=${apiKey}`)
//         .then(res => {
//           return res.json();
//         })
//         .then(data => {
//           renderList(data);
//         });
//     });
//   });

// function renderList(data) {
//   const markup = listTpl(data);
//   refs.moviesList.insertAdjacentHTML('beforeend', markup);
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
