import './sass/main.scss';
import cardTpl from './templates/cardTpl.hbs';
import listTpl from './templates/listTpl.hbs';

const refs = {
  homeHeader: document.querySelector('.banner-home'),
  libraryHeader: document.querySelector('.banner-library'),
  moviesList: document.querySelector('.movies-list'),
  movieCard: document.querySelector('.modal'),
  inputValue: document.getElementById('input'),
};

const popularFilms = '/trending/all/day';
const apiKey = '42c4fa9c05708253e8c2f9a05f447e85';

function renderList(data) {
  const markup = listTpl(data);
  refs.moviesList.insertAdjacentHTML('beforeend', markup);
}

// fetch(`
// https://api.themoviedb.org/3${popularFilms}?api_key=${apiKey}`)
//   .then(res => {
//     return res.json();
//   })
//   .then(({ results }) => {
//     // console.log(results.map(result => result.id));
//     let arrId = results.map(result => result.id);
//     console.log(arrId);
// });

// fetch(`
// https://api.themoviedb.org/3${popularFilms}?api_key=${apiKey}`)
//   .then(res => {
//     return res.json();
//   })
//   .then(({ results }) => {
//     // console.log(results.map(result => result.id));
//     let arrId = results.map(result => result.id);
//     // const movie_id = arrId[0];

//     return arrId;
//   })
//   .then(array => {
//     // array.length = 9;
//     array.forEach(arr => {
//       fetch(
//         `https://api.themoviedb.org/3/movie/${arr}?api_key=42c4fa9c05708253e8c2f9a05f447e85`,
//       )
//         .then(res => {
//           return res.json();
//         })
//         .then(data => {
//           console.log(data);
//           renderList(data);
//         });
//     });
// });

// const service = {
//   apiKey: '42c4fa9c05708253e8c2f9a05f447e85',
//   baseUrl: 'https://api.themoviedb.org/3',
//   popularFilms: '/trending/all/day',
//   filmDetails: '/movie/',
//   //   filmID: '',
//   searchQuery: '',
//   page: 1,

//   fetchPopularFilms() {
//     const url = `${this.baseUrl}${this.popularFilms}?api_key=${this.apiKey}`;

//     return fetch(url)
//       .then(res => res.json())
//       .then(({ results }) => {
//         // this.incrementPage();
//         return results.map(result => result.id);
//       })
//       .catch(error => console.log(error));
//   },

//   fetchFilm(id) {
//     const url = `${this.baseUrl}${this.filmDetails}${id}?api_key=${this.apiKey}`;

//     return fetch(url)
//       .then(res => res.json())
//       .then(data => {
//         // this.incrementPage();
//         return data;
//       })
//       .catch(error => console.log(error));
//   },

//     get query() {
//       return this.searchQuery;
//     },

//     set query(newQuery) {
//       this.searchQuery = newQuery;
//     },

//   //   resetPage() {
//   //     this.page = 1;
//   //   },

//   //   incrementPage() {
//   //     this.page += 1;
//   //   },
// };

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

//Мщжно получить массив жанров
// fetch(
//   'https://api.themoviedb.org/3/genre/movie/list?api_key=42c4fa9c05708253e8c2f9a05f447e85',
// )
//   .then(res => {
//     return res.json();
//   })
//   .then(data => {
//     console.log(data);
//   });
