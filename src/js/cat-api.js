import axios from 'axios';
export function fetchBreeds() {
  axios.defaults.headers.common['x-api-key'] =
    'live_Dykis0fGpIoX8hZGnPWpC9sCEGBWTVN4fXPcIQBVMxtx38nEpjSsQh7Q85pfsUZO';
  return axios.get(' https://api.thecatapi.com/v1/breeds').then(response => {
    return response;
  });
}

export function fetchCatByBreed(breedId) {
  axios.defaults.headers.common['x-api-key'] =
    'live_Dykis0fGpIoX8hZGnPWpC9sCEGBWTVN4fXPcIQBVMxtx38nEpjSsQh7Q85pfsUZO';
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url).then(response => {
    return response.data;
  });
}
