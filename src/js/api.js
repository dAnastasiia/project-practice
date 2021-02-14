export default class ApiService {
  constructor() {
    this.totalPages;
    this.totalResults;

    this.url = '';

    this.apiKey = '42c4fa9c05708253e8c2f9a05f447e85';
    this.baseUrl = 'https://api.themoviedb.org/3';
    this.popularMovies = '/trending/all/week';
    this.searchMovies = '/search/movie';
    this.searchQuery = '';
    this.page = 1;
  }

  async fetch(searchQuery) {
    if (searchQuery && searchQuery !== '') {
      this.url = `${this.baseUrl}${this.searchMovies}?api_key=${this.apiKey}&query=${searchQuery}&page=${this.page}`;
    } else {
      this.url = `${this.baseUrl}${this.popularMovies}?api_key=${this.apiKey}&page=${this.page}`;
    }

    try {
      let response = await fetch(this.url);
      let moviesResponse = await response.json();
      let arrayMovieId = await moviesResponse.results.map(el => el.id);

      this.totalPages = moviesResponse.total_pages;
      this.totalResults = moviesResponse.total_results;

      this.page = moviesResponse.page;

      this.url = '';

      return arrayMovieId;
    } catch (err) {
      console.log(err);
    }
  }

  //-------возвращаем не массив ид
  // async fetch(searchQuery) {
  //   if (searchQuery && searchQuery !== '') {
  //     this.url = `${this.baseUrl}${this.searchMovies}?api_key=${this.apiKey}&query=${searchQuery}&page=${this.page}`;
  //   } else {
  //     this.url = `${this.baseUrl}${this.popularMovies}?api_key=${this.apiKey}&page=${this.page}`;
  //   }

  //   try {
  //     let response = await fetch(this.url);
  //     let moviesResponse = await response.json();
  //     let arrayMovieId = await moviesResponse.results.map(el => el.id);

  //     this.totalPages = moviesResponse.total_pages;
  //     this.totalResults = moviesResponse.total_results;

  //     this.page = moviesResponse.page;

  //     this.url = '';

  //     return arrayMovieId;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // ---------задаем страницу
  // async fetch(searchQuery, page) {
  //   if (searchQuery && searchQuery !== '') {
  //     this.url = `${this.baseUrl}${this.searchMovies}?api_key=${this.apiKey}&query=${searchQuery}&page=${page}`;
  //   } else {
  //     this.url = `${this.baseUrl}${this.popularMovies}?api_key=${this.apiKey}&page=${page}`;
  //   }

  //   try {
  //     let response = await fetch(this.url);
  //     let moviesResponse = await response.json();
  //     let arrayMovieId = await moviesResponse.results.map(el => el.id);

  //     this.totalPages = moviesResponse.total_pages;
  //     this.totalResults = moviesResponse.total_results;

  //     this.url = '';

  //     return arrayMovieId;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async fetchID(id) {
    this.url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`;

    try {
      let response = await fetch(this.url);
      let moviesResponse = await response.json();

      this.url = '';

      return moviesResponse;
    } catch (err) {
      console.log(err);
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get results() {
    return this.totalResults;
  }

  get pageNum() {
    return this.page;
  }

  set pageNum(newPage) {
    this.page = newPage;
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }
}
