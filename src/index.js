import { fetchBreeds } from './js/cat-api.js';
import { fetchCatByBreed } from './js/cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const select = document.querySelector('.breed-select');
const slim = new SlimSelect({
  select: '#breed-selected',
});

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

function hideError() {
  error.classList.add('hidden');
}
function showError() {
  error.classList.remove('hidden');
}
function clearCatInfo() {
  catInfo.innerHTML = '';
}
hideBreedSelect();

hideError();

showLoader();

fetchBreeds()
  .then(response => {
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
    clearCatInfo();

    hideBreedSelect();
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    hideLoader();
    showError();
  });

select.addEventListener('change', () => {
  const breedId = select.value;
  showLoader();

  clearCatInfo();
  fetchCatByBreed(breedId)
    .then(data => {
      hideLoader();
      catInfo.innerHTML = `
        <img src="${data[0].url}" class="image-cat">
        <div class="content">
        <h3 class="subtitle">${data[0].breeds[0].name}</h3>
        <p class="text"> ${data[0].breeds[0].description}</p>
        <p class="text"><b>Temperament:</b> ${data[0].breeds[0].temperament}</p>
        </div>
      `;
    })
    .catch(error => {
      clearCatInfo();
      hideBreedSelect();
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      hideLoader();
      showError();
    });
});
