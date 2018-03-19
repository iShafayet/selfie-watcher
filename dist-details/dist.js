
// See https://github.com/nwjs-community/nw-builder

var NwBuilder = require('nw-builder');

var nw = new NwBuilder({
  files: ['./**/**', '!./cache/**/**', '!./build/**/**'], // use the glob format
  platforms: ['win32', 'win64'],
  version: '0.29.1',
  zip: false,
  flavor: 'normal'
});

// Log stuff you want
nw.on('log', console.log);

nw.build().then(function () {
  console.log('all done!');
}).catch(function (error) {
  console.error(error);
});