import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showError } from './js/render-functions.js';
import './css/loader.css';
import './css/styles.css';

const form = document.querySelector('#search-form');
const loader = document.querySelector('#loader'); // Перевір, чи цей селектор правильний

function showLoader() {
  loader.hidden = false;
}

function hideLoader() {
  loader.hidden = true;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = form.elements.searchQuery.value.trim();

  if (!query) {
    showError('Please enter a search query!');
    return;
  }

  try {
    showLoader(); 
    const data = await fetchImages(query);
    hideLoader(); 

    if (data.hits.length === 0) {
      showError('Sorry, there are no images matching your search query. Please try again!');
      return;
    }

    renderGallery(data.hits);

  } catch (error) {
    hideLoader(); // Приховуємо прелоадер при помилці
    console.error('Помилка при завантаженні зображень:', error);
    showError('An error occurred while fetching data. Please try again later.');
  }
});

