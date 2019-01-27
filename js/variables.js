import dotenv from 'dotenv';
dotenv.config();

const key = process.env.API_KEY;

const giphySearch = document.getElementById('giphy-search');
const search = document.getElementById('search');
const trending = document.getElementById('trending');
const scalable = document.querySelector('.scalable');
const loadMoreContainer = document.getElementById('loadMoreContainer');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

export { key, giphySearch, search, trending, scalable, loadMoreContainer, prevButton, nextButton };
