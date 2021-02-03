export default {
  apiKey: '42c4fa9c05708253e8c2f9a05f447e85',
  baseUrl: 'https://api.themoviedb.org/3',
  popularFilms: '/trending/all/week',
  searchFilms: '/search/movie',
  searchQuery: '',
  page: 1,

  fetchPopular() {
    const url = `${this.baseUrl}${this.popularFilms}?api_key=${this.apiKey}`;

    return fetch(url)
      .then(res => res.json())
      .then(({ results }) => {
        return results.map(result => result.id);
      })
      .then(array => {
        // array.length = 6;
        array.forEach(arr => {
          this.fetchById(arr);
        });
      })
      .catch(error => console.log(error));
  },

  fetchById(id) {
    const url = `${baseUrl}/movie/${id}?api_key=${apiKey}`;

    return fetch(url)
      .then(res => res.json())
      .then(data => {
        return data;
      })
      .catch(error => console.log(error));
  },

  fetchByQuery() {
    const url = `${this.baseUrl}${this.searchFilms}?api_key=${this.apiKey}&query=${this.query}`;

    return fetch(url)
      .then(res => res.json())
      .then(({ results }) => {
        return results.map(result => result.id);
      })
      .then(array => {
        // array.length = 6;
        array.forEach(arr => {
          this.fetchById(arr);
        });
      })
      .catch(error => console.log(error));
  },

  get query() {
    return this.searchQuery;
  },

  set query(newQuery) {
    this.searchQuery = newQuery;
  },

  resetPage() {
    this.page = 1;
  },

  incrementPage() {
    this.page += 1;
  },

  decrementPage() {
    this.page -= 1;
  },
};
