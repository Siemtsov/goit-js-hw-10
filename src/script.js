import { fetchBreeds, fetchBreedId } from './cat-api';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorContainer = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

errorContainer.classList.add('is-hidden');

function setSelector(breed) {
  selector.innerHTML = breed
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('\n');
}
function fillSelector() {
  fetchBreeds()
    .then(data => {
      setSelector(data);
      new SlimSelect({ select: '.breed-select' });
    })
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!',
        { timeout: 4000, userIcon: false }
      );
    })
    .finally(() => loader.classList.add('is-hidden'));
}

selector.addEventListener('change', handlerChange);

function handlerChange(evt) {
  const breedId = evt.currentTarget.value;
  catInfo.classList.add('is-hidden');
  loader.classList.remove('is-hidden');
  fetchBreedId(breedId)
    .then(data => {
      markUp(data);
      catInfo.classList.remove('is-hidden');
    })
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloadthe page!',
        { timeout: 4000, userIcon: false }
      );
    })
    .finally(() => {
      loader.classList.add('is-hidden');
    });
}

function markUp(data) {
  const { breeds, url } = data[0];
  const { name, temperament, description } = breeds[0];
  const markUp = `
    <div class="cat-container">
      <img src="${url}" alt="${name}" width="400">
      <h1>${name}</h1>
      <p>
        <span>
        Temperament: 
        </span>
        ${temperament}
      </p>
      <p>
        ${description}
      </p>
    </div>
    `;
  catInfo.innerHTML = markUp;
}
fillSelector();
