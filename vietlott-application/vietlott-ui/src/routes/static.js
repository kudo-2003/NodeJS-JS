// ...existing code...
const express = require('express');
const fs = require('fs');
const path = require('path');
const { uiDir, staticOptions, API_BASE } = require('../config');

const router = express.Router();

// serve static files normally
router.use(express.static(uiDir, staticOptions));

// inject window.__API_BASE__ into index.html on root requests
router.get(['/', '/index.html'], (req, res, next) => {
  const indexPath = path.join(uiDir, 'index.html');
  if (!fs.existsSync(indexPath)) return next();
  try {
    let html = fs.readFileSync(indexPath, 'utf8');
    const inject = `<script>window.__API_BASE__ = ${JSON.stringify(API_BASE)};</script>`;
    if (html.includes('</head>')) {
      html = html.replace('</head>', `${inject}</head>`);
    } else {
      html = inject + html;
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) {
    next(err);
  }
});

module.exports = router;