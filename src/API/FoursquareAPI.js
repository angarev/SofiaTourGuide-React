import {CLIENT_ID, CLIENT_SECRET } from './keys';

const api = 'https://api.foursquare.com/v2/venues/search';

export const getDetails = (lat, lnt, name) => {
  const URL = `${api}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180802&ll=${lat},${lnt}&intent=checkin&query=${name}`;
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
