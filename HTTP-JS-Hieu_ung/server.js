const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Helper function to serve static files
function serveStaticFile(res, filePath, contentType) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

// Create the HTTP server
const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        serveStaticFile(res, path.join(__dirname, 'views', 'index.html'), 'text/html');
    } else if (req.url.startsWith('/public/')) {
        const filePath = path.join(__dirname, req.url);
        const ext = path.extname(filePath).toLowerCase();
        const contentType = ext === '.css' ? 'text/css' : 'application/octet-stream';
        serveStaticFile(res, filePath, contentType);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
