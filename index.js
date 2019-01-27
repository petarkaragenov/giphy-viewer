import { fetchData, displayResults, copyToClipboard } from './js/giphy';
import { giphySearch, search, trending, scalable, loadMoreContainer, nextButton, prevButton } from './js/variables';
import 'bulma/css/bulma.css';
import './css/styles.css';

let state = {
  loadMore: 0,
  searchQuery: '',
  limitResults: ''
}

// Fetch Trending GIFs
fetchData(undefined, 25).then(results => displayResults(results));

// Fetch GIFs
giphySearch.addEventListener('submit', function(e) {
  state.loadMore = 0;
  state.searchQuery = search.value;
  state.limitResults = parseInt(document.getElementById('limit').value);

  if (state.searchQuery === '') {
    scalable.classList.add('active', 'section');

    setTimeout(() => scalable.classList.remove('active', 'section'), 3000);

  } else {
    fetchData(state.searchQuery, state.limitResults)
  	.then(results => displayResults(results));
    prevButton.innerHTML = `<button disabled id="loadPrev" class="button is-rounded is-outlined is-primary is-fullwidth">Prev</button>`;
    nextButton.innerHTML = `<button id="loadNext" class="button is-rounded is-outlined is-primary is-fullwidth">Next</button>`;

  }

  e.preventDefault();
})

// Copy URL to Clipboard
trending.addEventListener('click', function(e) {
  if (e.target.classList.contains('button')) {
    copyToClipboard(e.target.parentNode.previousSibling.previousSibling.src);
  }
})

// Load Next
loadMoreContainer.addEventListener('click', function(e) {
  document.getElementById('loadPrev').removeAttribute('disabled');
  if (e.target === document.getElementById('loadNext')) {
    state.loadMore += state.limitResults;
    fetchData(state.searchQuery, state.limitResults, state.loadMore)
    .then(results => displayResults(results));
  }
})

// Load Prev
loadMoreContainer.addEventListener('click', function(e) {
  if (e.target === document.getElementById('loadPrev')) {
    state.loadMore -= state.limitResults;
    fetchData(state.searchQuery, state.limitResults, state.loadMore)
    .then(results => displayResults(results));
    if (state.loadMore === 0) {
      e.target.setAttribute('disabled', 'disabled');
    }
  }
})
