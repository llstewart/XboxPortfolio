import { createServer } from 'http';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
  try {
    let filePath = join(__dirname, 'client', req.url === '/' ? 'index.html' : req.url);
    
    // Set content type based on file extension
    const ext = filePath.split('.').pop();
    const contentTypes = {
      'html': 'text/html',
      'css': 'text/css',
      'js': 'application/javascript',
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'pdf': 'application/pdf'
    };
    
    res.setHeader('Content-Type', contentTypes[ext] || 'text/plain');
    
    const content = readFileSync(filePath);
    res.writeHead(200);
    res.end(content);
  } catch (error) {
    res.writeHead(404);
    res.end('File not found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Xbox Portfolio server running on port ${PORT}`);
});