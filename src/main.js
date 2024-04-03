import { getPictures } from './js/pixabay-api';
import { pictureMarkup } from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-photo');
const picturesList = document.querySelector('.pictures-list');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more-button');
export const lightBox = new SimpleLightbox('.pictures-list a', {
  /* options */
  captionsData: 'alt',
  captionDelay: 250,
});
let query = '';
let currentPage = 1;
let maxPage = 0;
const perPage = 15;

form.addEventListener('submit', handleSubmitSearch);
loadMoreButton.addEventListener('click', handleLoadMore);

async function handleSubmitSearch(event) {
  event.preventDefault();
  picturesList.innerHTML = '';
  // Button will be hide after successful query,
  //if user will attempt to complete the request whith empty query
  hideLoadMoreButton();
  currentPage = 1;

  query = form.search.value.toLowerCase().trim();
  if (query != '') {
    try {
      showLoader();
      const photos = await getPictures(query, currentPage, perPage);
      const arrPhotos = photos.hits;
      maxPage = Math.ceil(photos.totalHits / perPage);
      // console.log(maxPage);
      picturesList.insertAdjacentHTML('beforeend', pictureMarkup(arrPhotos));
      lightBox.refresh();
    } catch (error) {
      console.log(error);
    }
    hideLoader();
    if (maxPage !== 0) checkBtnStatus();
    form.reset();
  } else {
    maxPage = 0;
    // checkBtnStatus();
    iziToast.error({
      message: 'Please enter valid query.',
      position: 'topRight',
      theme: 'dark',
    });
  }
}

async function handleLoadMore(event) {
  ++currentPage;
  try {
    showLoader();
    const photos = await getPictures(query, currentPage, perPage);
    const arrPhotos = photos.hits;
    picturesList.insertAdjacentHTML('beforeend', pictureMarkup(arrPhotos));
    lightBox.refresh();
  } catch (error) {
    console.log(error);
  }
  scrollDown();
  hideLoader();
  checkBtnStatus();
}

function showLoader() {
  loader.style.display = 'inline-block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showLoadMoreButton() {
  loadMoreButton.classList.remove('hidden');
}

function hideLoadMoreButton() {
  loadMoreButton.classList.add('hidden');
}

export function checkBtnStatus() {
  if (currentPage >= maxPage) {
    hideLoadMoreButton();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    showLoadMoreButton();
  }
}

function scrollDown() {
  const height = picturesList.firstChild.getBoundingClientRect().height;
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
