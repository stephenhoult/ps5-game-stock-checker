const axios = require('axios');
const colors = require('colors');
const moment = require('moment');
const open = require('open');

// the url we're checking
const url = 'https://www.game.co.uk/en/hardware/playstation-5/';

const check = async () => {
  // make the request
  axios.get(url).then(async res => {
    // if we're not redirected we have stock, check for redirects
    const numberOfRedirects = res.request._redirectable._redirectCount;

    if (numberOfRedirects) {
      // log our result to console
      console.log(`[${moment().format('HH:mm:ss')}] no stock :-( `.black.bgRed);

      // try again in half a second
      setTimeout(async () => {
        await check();
      }, 500);
    } else {
      // log our result to console
      console.log(
        `[${moment().format('HH:mm:ss')}] IN STOCK!! :-D `.black.bgGreen
      );
      // open our physical browser
      open(url);
    }
  });
};

check();
