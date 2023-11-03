import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_MLyGVnh3kRkOutkpv33JEYLhrkCo7kxLPJ72lOc4sGnq038d26A1w8UP842vM0IM';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios.get('/breeds').then(response => {
    return response.data;
  });
}

function fetchBreedId(breedId) {
  return axios.get(`/images/search?breed_ids=${breedId}`).then(resp => {
    return resp.data;
  });
}

module.exports = { fetchBreeds, fetchBreedId };
