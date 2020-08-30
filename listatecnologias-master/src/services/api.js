import axios from 'axios';

const api = axios.create({baseURL: 'https://rocketseat-node.herokuapp.com/api'});

//const api = fetch('https://rocketseat-node.herokuapp.com/api/products');

export default api;