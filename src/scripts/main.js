import imageUrl from '/images/svg/icon/logo.svg';

console.log('Image URL is: ', imageUrl);

import('lodash').then(({ default: _ }) => {
  console.log(
    _.map(['Hello', 'World'], (item) => {
      return item;
    }).join(' '),
  );
}).catch(_error => 'An error occurred while loading the module');
