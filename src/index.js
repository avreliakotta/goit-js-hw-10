import { fetchBreeds } from './js/cat-api.js';
import { fetchCatByBreed } from './js/cat-api.js';
import Notiflix from 'notiflix';

const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const select = document.querySelector('.breed-select');

function hideLoader() {
  loader.classList.add('hidden');
}
function showLoader() {
  loader.classList.remove('hidden');
}
function hideBreedSelect() {
  select.classList.add('hidden');
}
function showBreedSelect() {
  select.classList.remove('hidden');
}
function hideCatInfo() {
  catInfo.classList.add('hidden');
}
function showCatInfo() {
  catInfo.classList.remove('hidden');
}
function hideError() {
  error.classList.add('hidden');
}
function showError() {
  error.classList.remove('hidden');
}
hideCatInfo();
hideError();
showLoader();
hideBreedSelect();
fetchBreeds()
  .then(response => {
    // const select = document.querySelector('.breed-select');

    const breeds = response.data;
    breeds.map(breed => {
      const options = breeds.map(breed => {
        return `<option value="${breed.id}">${breed.name}</option>`;
      });
      select.innerHTML = options.join('');
    });
    hideLoader();
    showBreedSelect();
  })
  .catch(error => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    hideLoader();
    showError();
  });

select.addEventListener('change', () => {
  const breedId = select.value;
  showLoader();
  hideCatInfo();
  fetchCatByBreed(breedId)
    .then(data => {
      hideLoader();
      showCatInfo();

      catInfo.innerHTML = `
        <img src="${data[0].url}" class="image-cat">
        <div class="content">
        <h3>${data[0].breeds[0].name}</h3>
        <p> ${data[0].breeds[0].description}</p>
        <p><b>Temperament:</b> ${data[0].breeds[0].temperament}</p>
        </div>
      `;
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      hideLoader();
      showError();
    });
});
