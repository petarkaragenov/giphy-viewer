import { key } from './variables';

function fetchData(query, limit, offset=0) {
  let link = '';
  if (query === undefined) {
    link = `http://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=${limit}&offset=${offset}`;
  } else {
    link = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${key}&limit=${limit}&offset=${offset}`;
  }
  return fetch(link)
  .then(res => res.json())
  .then(data => data.data.map(data => data.images))
  .catch(err => console.log(err));
}

  function displayResults(results) {
      let output = ``;
      results.forEach(result => {
        output += `
          <div class="image-container">
            <img src="${result.fixed_width_downsampled.url}">
            <div class="copy">
              <button class="button is-black has-text-white is-rounded is-outlined is-small">Copy URL</button>
            </div>
          </div>
        `;
      });
      trending.innerHTML = output;
  }

  function copyToClipboard(src) {
    const el = document.createElement('textarea');
    el.value = src;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  export { fetchData, displayResults, copyToClipboard };
// }
