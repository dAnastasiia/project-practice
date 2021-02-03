const form = document.querySelector('.search-form');
const header = document.querySelector('.banner');
const headerContainer = header.querySelector('.container');
const headerBtns = document.getElementById('header-buttons');
const logoBtn = document.getElementById('logo');
const homeBtn = document.getElementById('home');
const libraryBtn = document.getElementById('library');
const queryErr = document.getElementById('query-error');

logoBtn.addEventListener('click', onClickHome);
homeBtn.addEventListener('click', onClickHome);
libraryBtn.addEventListener('click', onClickLibrary);

const headerFunc = {
  showHome() {
    header.classList.remove('is-hidden');
    header.classList.remove('banner-library');
    header.classList.add('banner-home');

    homeBtn.classList.add('active');
    libraryBtn.classList.remove('active');

    form.classList.remove('is-hidden');
    headerBtns.classList.add('is-hidden');

    headerContainer.classList.add('home-header');
    headerContainer.classList.remove('library-header');
  },

  showLibrary() {
    header.classList.remove('is-hidden');
    header.classList.remove('banner-home');
    header.classList.add('banner-library');

    libraryBtn.classList.add('active');
    homeBtn.classList.remove('active');

    form.classList.add('is-hidden');
    headerBtns.classList.remove('is-hidden');

    headerContainer.classList.add('library-header');
    headerContainer.classList.remove('home-header');
  },
};

function onClickHome(e) {
  e.preventDefault();
  headerFunc.showHome();
}

function onClickLibrary(e) {
  e.preventDefault();
  headerFunc.showLibrary();
}
