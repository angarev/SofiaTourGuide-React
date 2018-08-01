import {CLIENT_ID, CLIENT_SECRET, LAT, LNG } from './keys';


const api = 'https://api.foursquare.com/v2/venues/';
const categoryId='4bf58dd8d48988d181941735';

export const getAll = () => {

  const URL = `${api}search?ll=${LAT},${LNG}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180730&categoryId=${categoryId}&radius=1000&limit=50`;
  const headers = {
    'Accept': 'application/json',
    'Accept-Language': 'en'
  };

  return fetch(URL, { headers })
  .then(response => {
      if (!response.ok) {
          throw Error(response.ok);
      }
      return response.json();
  })
  .then(data => {
    const places = data.response.venues;
    return places;
  }).catch(function(error) {
      return error;
  });
};


export const getDetails = (id) => {
  const URL = `${api}${id}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180730`;
  return  fetch(URL)
  .then(response => {
      if (!response.ok) {
          throw Error(response.ok);
      }
      return response.json();
  }).catch(function(error) {
          return error;
  });
};