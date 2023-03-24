import axios from 'axios';

const API_ENDPOINT = 'http://localhost:3000'; // API URL

// Register a webhook endpoint for the "song added" event
axios.post(`${API_ENDPOINT}/webhooks/song-added`, { endpointUrl: 'http://localhost:8080/songs' })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error.response.data);
  });

// Register a webhook endpoint for the "artist updated" event
axios.post(`${API_ENDPOINT}/webhooks/artist-updated`, { endpointUrl: 'http://localhost:8080/artists' })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error.response.data);
  });