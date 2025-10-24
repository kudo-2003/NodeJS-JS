const path = require('path');

module.exports = {
  PORT: process.env.PORT || process.env.PORT_UI || 4000,
  API_BASE: process.env.API_BASE || 'http://localhost:3000/api',
  uiDir: path.join(__dirname, 'public'),
  staticOptions: {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders(res) {
      res.set('x-timestamp', new Date().toUTCString());
    }
  }
};