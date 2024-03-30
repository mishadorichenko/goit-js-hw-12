import { getPictures } from './js/pixabay-api';
import { pictureMarkup } from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-photo');
const picturesList = document.querySelector('.pictures-list');
const loader = document.querySelector('.loader');
export const lightBox = new SimpleLightbox('.pictures-list a', {
  /* options */
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', handleSubmitSearch);

function handleSubmitSearch(event) {
  event.preventDefault();
  picturesList.innerHTML = '';

  const query = form.search.value.toLowerCase().trim();
  if (query != '') {
    loader.style.display = 'inline-block';
    getPictures(query)
      .then(photos => {
        const arrPhotos = photos.hits;
        console.log(arrPhotos);
        picturesList.innerHTML = pictureMarkup(arrPhotos);
        lightBox.refresh();
        loader.style.display = 'none';
      })
      .catch(error => console.log(error));
    form.reset();
  } else {
    iziToast.error({
      message: 'Please enter valid query.',
      position: 'topRight',
      theme: 'dark',
    });
  }
}
