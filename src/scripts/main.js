// Test asset loading
const imageUrl = new URL('/images/svg/icon/logo.svg', import.meta.url).href;
const bgImage = document.createElement('img');
const label = document.createElement('p');
label.innerText = 'Javascript Image';
bgImage.src = imageUrl;
document.body.appendChild(label);
document.body.appendChild(bgImage);

// Test dynamic import
import('lodash').then(({ default: _ }) => {
  console.log(
    _.map(['Hello', 'World'], (item) => {
      return item;
    }).join(' '),
  );
}).catch(_error => 'An error occurred while loading the module');
