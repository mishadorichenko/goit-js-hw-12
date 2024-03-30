// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// import { lightBox } from '../main';

export function pictureMarkup(arr) {
  if (arr.length === 0) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
      theme: 'dark',
    });
    return '';
  } else {
    const markup = arr
      .map(
        arr =>
          `<li class="pictures-list-item">
        <a class="picture-link" href="${arr.largeImageURL}">
        <img src="${arr.webformatURL}" alt="${arr.tags}" class="picture" />
        </a>
        <ul class="picture-data-list">
          <li class="picture-data-item"><p class="picture-inf">Likes</p><p class = "picture-inf-data">${arr.likes}</p></li>
          <li class="picture-data-item"><p class="picture-inf">Views</p><p class = "picture-inf-data">${arr.views}</p></li>
          <li class="picture-data-item"><p class="picture-inf">Comments</p><p class = "picture-inf-data">${arr.comments}</p></li>
          <li class="picture-data-item"><p class="picture-inf">Downloads</p><p class = "picture-inf-data">${arr.downloads}</p></li>
        </ul>
      </li>`
      )
      .join('');
    return markup;
  }
}
