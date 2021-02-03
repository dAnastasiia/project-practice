import './sass/main.scss';
import cardTpl from './templates/cardTpl.hbs';
import listTpl from './templates/listTpl.hbs';

const refs = {
  homeHeader: document.querySelector('.banner-home'),
  libraryHeader: document.querySelector('.banner-library'),
  moviesList: document.querySelector('.movies-list'),
  movieCard: document.querySelector('.modal'),
  form: document.querySelector('.search-form'),
  header: document.querySelector('.banner'),
  headerBtns: document.getElementById('header-buttons'),
  logoBtn: document.getElementById('logo'),
  homeBtn: document.getElementById('home'),
  libraryBtn: document.getElementById('library'),
  queryErr: document.getElementById('query-error'),
};

const headerContainer = refs.header.querySelector('.container');

refs.logoBtn.addEventListener('click', onClickLogo);
refs.homeBtn.addEventListener('click', onClickHome);
refs.libraryBtn.addEventListener('click', onClickLibrary);

function onClickLogo(e) {
  e.preventDefault();

  refs.header.classList.remove('is-hidden');
  refs.header.classList.remove('banner-library');
  refs.header.classList.add('banner-home');

  refs.homeBtn.classList.add('active');
  refs.libraryBtn.classList.remove('active');

  refs.form.classList.remove('is-hidden');
  refs.headerBtns.classList.add('is-hidden');

  headerContainer.classList.add('home-header');
  headerContainer.classList.remove('library-header');
}

function onClickHome(e) {
  e.preventDefault();

  refs.header.classList.remove('is-hidden');
  refs.header.classList.remove('banner-library');
  refs.header.classList.add('banner-home');

  e.target.classList.add('active');
  refs.libraryBtn.classList.remove('active');

  refs.form.classList.remove('is-hidden');
  refs.headerBtns.classList.add('is-hidden');

  headerContainer.classList.add('home-header');
  headerContainer.classList.remove('library-header');
}

function onClickLibrary(e) {
  e.preventDefault();
  refs.header.classList.remove('is-hidden');
  refs.header.classList.remove('banner-home');
  refs.header.classList.add('banner-library');

  e.target.classList.add('active');
  refs.homeBtn.classList.remove('active');

  refs.form.classList.add('is-hidden');
  refs.headerBtns.classList.remove('is-hidden');

  headerContainer.classList.add('library-header');
  headerContainer.classList.remove('home-header');
}

// refs.form.addEventListener('submit', onSearch);

// function onSearch(e) {
//   e.preventDefault();
//   const form = e.currentTarget;
//   const query = form.elements.query.value;

// }

const popularFilms = '/trending/all/week';
const apiKey = '42c4fa9c05708253e8c2f9a05f447e85';

//!!!!Отрисовка модалки по шаблону!!!!

// fetch(
//   `https://api.themoviedb.org/3/movie/602269?api_key=42c4fa9c05708253e8c2f9a05f447e85`,
// )
//   .then(res => {
//     return res.json();
//   })
//   .then(data => {
//     console.log(data);
//     renderCard(data);
//   });

// function renderCard(data) {
//     const markup = cardTpl(data);
//     refs.movieCard.insertAdjacentHTML('beforeend', markup);
//   }

//!!!!Отрисовка списка по шаблону!!!!

// fetch(`
// https://api.themoviedb.org/3${popularFilms}?api_key=${apiKey}`)
//   .then(res => {
//     return res.json();
//   })
//   .then(({ results }) => {
//     return results.map(result => result.id);
//   })
//   .then(array => {
//     array.length = 9;
//     array.forEach(arr => {
//       fetch(
//         `https://api.themoviedb.org/3/movie/${arr}?api_key=42c4fa9c05708253e8c2f9a05f447e85`,
//       )
//         .then(res => {
//           return res.json();
//         })
//         .then(data => {
//           renderList(data);
//         });
//     });
// })

// function renderList(data) {
//     const markup = listTpl(data);
//     refs.moviesList.insertAdjacentHTML('beforeend', markup);
// }

//Мoжно получить массив жанров
// fetch(
//   'https://api.themoviedb.org/3/genre/movie/list?api_key=42c4fa9c05708253e8c2f9a05f447e85',
// )
//   .then(res => {
//     return res.json();
//   })
//   .then(data => {
//     console.log(data);
//   });
